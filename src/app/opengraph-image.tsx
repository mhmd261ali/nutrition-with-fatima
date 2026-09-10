import { ImageResponse } from "next/og";
import { dietitian } from "@/data/site-content";

export const alt = "فاطمة شعيب | أخصائية تغذية";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "#F3F6F4",
          color: "#5D7F82",
        }}
      >
        <div
          style={{
            display: "flex",
            width: 88,
            height: 88,
            borderRadius: 999,
            border: "1px solid rgba(93,127,130,0.28)",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 28,
            letterSpacing: 2,
          }}
        >
          FS
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "flex", fontSize: 64, fontWeight: 500 }}>
            {dietitian.name}
          </div>
          <div style={{ display: "flex", fontSize: 28, color: "#A8B8AE" }}>
            {`${dietitian.title} · ${dietitian.englishTitle}`}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
