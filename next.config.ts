import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // Emit the X-Robots-Tag HTTP header on every route so crawlers get
        // indexing directives even before parsing the HTML <meta> robots tag.
        source: "/:path*",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "index, follow",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
