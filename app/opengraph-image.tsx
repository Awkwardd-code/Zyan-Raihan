import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #07111f 0%, #102640 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          padding: 80,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 44, letterSpacing: 10, opacity: 0.7, textTransform: "uppercase" }}>
            Zayn Raihan
          </div>
          <div style={{ marginTop: 14, fontSize: 94, fontWeight: 900, letterSpacing: -8, lineHeight: 0.9 }}>
            Creative growth partner
          </div>
        </div>
      </div>
    ),
    size,
  );
}
