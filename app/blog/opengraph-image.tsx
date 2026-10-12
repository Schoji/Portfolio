import { ImageResponse } from "next/og";
import { listedPosts } from "./posts";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Blog — Piotr Wittig";

/** Preview card for /blog. Same frame as the per-post card. */
export default function Image() {
  const count = listedPosts.length;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", padding: 24, background: "#000" }}>
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          // The v2 paper segment, inset on the black page like on the site.
          // Satori cannot read CSS variables, so v2.css's colours repeat here.
          background: "#f2f2f0",
          borderRadius: 32,
          color: "#000",
        }}
      >
        <div style={{ display: "flex", fontSize: 30, color: "rgba(0,0,0,0.55)" }}>
          <span>piotrwittig.com/blog</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 100,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}
          >
            Things I figured out
          </div>
          <div style={{ fontSize: 100, fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.02em" }}>
            and wrote down.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "2px solid rgba(0,0,0,0.1)",
            paddingTop: 32,
            fontSize: 30,
          }}
        >
          <div style={{ display: "flex" }}>
            <span style={{ fontWeight: 700 }}>Piotr Wittig</span>
          </div>
          <div style={{ color: "rgba(0,0,0,0.55)" }}>
            {`${count} ${count === 1 ? "post" : "posts"}`}
          </div>
        </div>
      </div>
      </div>
    ),
    size,
  );
}
