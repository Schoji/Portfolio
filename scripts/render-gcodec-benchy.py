"""Project actual G0/G1 toolpaths into an SVG for the featured illustration.

Usage: python3 scripts/render-gcodec-benchy.py input.gcode output.svg
Rasterize the SVG with sharp at 2400px, then encode as WebP at quality 95.
Only object-labelled moves are included; printer startup/purge paths are omitted.
"""
import math
import re
import sys
from pathlib import Path

position = dict(X=0.0, Y=0.0, Z=0.0, E=0.0)
relative_e = False
in_object = False
segments = []
for line in Path(sys.argv[1]).read_text().splitlines():
    if line.startswith("; printing object"):
        in_object = True
    elif line.startswith("; stop printing object"):
        in_object = False
    words = line.split(";", 1)[0].split()
    if not words:
        continue
    command = words[0]
    if command == "M83":
        relative_e = True
    elif command == "M82":
        relative_e = False
    elif command in ("G0", "G1", "G92"):
        values = {word[0]: float(word[1:]) for word in words[1:]
                  if re.fullmatch(r"[XYZE][-+]?\d*\.?\d+", word)}
        previous = position.copy()
        position.update({k: v for k, v in values.items() if k != "E"})
        delta_e = values.get("E", 0.0) if relative_e else values.get("E", position["E"]) - position["E"]
        if "E" in values:
            position["E"] = position["E"] + delta_e if relative_e and command != "G92" else values["E"]
        if command != "G92" and in_object and any(position[k] != previous[k] for k in "XYZ"):
            kind = "extrusion" if delta_e > 0.0001 else "retraction" if delta_e < -0.0001 else "travel"
            segments.append((previous, position.copy(), kind))

extrusions = [p for a, b, kind in segments if kind == "extrusion" for p in (a, b)]
center = {k: (min(p[k] for p in extrusions) + max(p[k] for p in extrusions)) / 2 for k in "XYZ"}
azimuth, elevation = math.radians(35), math.radians(30)

def project(p):
    x, y, z = (p[k] - center[k] for k in "XYZ")
    horizontal = math.cos(azimuth) * x - math.sin(azimuth) * y
    forward = math.sin(azimuth) * x + math.cos(azimuth) * y
    vertical = math.sin(elevation) * forward - math.cos(elevation) * z
    depth = math.cos(elevation) * forward + math.sin(elevation) * z
    return horizontal, vertical, depth

points = [project(p) for p in extrusions]
min_x, max_x = min(p[0] for p in points), max(p[0] for p in points)
min_y, max_y = min(p[1] for p in points), max(p[1] for p in points)
width = 1200
scale = (width - 80) / (max_x - min_x)
height = round((max_y - min_y) * scale + 80)
depth_min, depth_max = min(p[2] for p in points), max(p[2] for p in points)
groups = {}
for a, b, kind in segments:
    pa, pb = project(a), project(b)
    depth = (pa[2] + pb[2]) / 2
    band = max(0, min(47, int(47 * (depth - depth_min) / (depth_max - depth_min))))
    x1, y1 = (pa[0] - min_x) * scale + 40, (pa[1] - min_y) * scale + 40
    x2, y2 = (pb[0] - min_x) * scale + 40, (pb[1] - min_y) * scale + 40
    groups.setdefault((band, kind), []).append(f"M{x1:.1f},{y1:.1f}L{x2:.1f},{y2:.1f}")

svg = [f'<svg xmlns="http://www.w3.org/2000/svg" width="{width}" height="{height}" viewBox="0 0 {width} {height}">']
svg.append('<title>Benchy: original G-code extrusion and travel paths</title>')
for (band, kind), paths in sorted(groups.items()):
    if kind == "extrusion":
        color = f"rgb(0,{180 + round(75 * band / 47)},{24 + round(24 * band / 47)})"
        opacity, stroke = "1", "2.4"
    else:
        color = "#226bff" if kind == "travel" else "#ff4545"
        opacity, stroke = ".85", "1.25"
    svg.append(f'<path d="{"".join(paths)}" fill="none" stroke="{color}" stroke-width="{stroke}" opacity="{opacity}" stroke-linecap="round"/>')
svg.append('</svg>')
Path(sys.argv[2]).write_text("\n".join(svg))
print(f"{len(segments)} toolpath segments, {width} x {height}, transparent background")
