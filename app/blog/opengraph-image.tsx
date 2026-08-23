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
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background:
            "radial-gradient(ellipse at 50% 0%, #17171a 0%, #0a0a0a 65%)",
          color: "#fafafa",
        }}
      >
        <div style={{ display: "flex", gap: 16, fontSize: 30, color: "#a1a1aa" }}>
          <span style={{ color: "#e0a33e", fontSize: 40 }}>{"//"}</span>
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
          <div style={{ fontSize: 100, fontWeight: 700, color: "#e0a33e" }}>
            and wrote down.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "2px solid #27272a",
            paddingTop: 32,
            fontSize: 30,
          }}
        >
          <div style={{ display: "flex" }}>
            <span style={{ fontWeight: 700 }}>Piotr Wittig</span>
            <span style={{ fontWeight: 700, color: "#e0a33e" }}>.</span>
          </div>
          <div style={{ color: "#71717a" }}>
            {`${count} ${count === 1 ? "post" : "posts"}`}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
