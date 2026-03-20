import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "ПромСтрой — Коммерческое строительство в Самаре";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "#0F1C26",
          padding: "80px",
          position: "relative",
        }}
      >
        {/* Top accent line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 80,
            right: 80,
            height: "2px",
            background: "linear-gradient(90deg, transparent, #C4AE94, transparent)",
          }}
        />

        {/* Category label */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "32px",
          }}
        >
          <div style={{ width: "32px", height: "1px", background: "#C4AE94" }} />
          <span
            style={{
              fontSize: "13px",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#7A8E98",
              fontFamily: "sans-serif",
            }}
          >
            Самара и область
          </span>
        </div>

        {/* Logo / company name */}
        <div
          style={{
            fontSize: "72px",
            fontWeight: 700,
            color: "#EAE0CF",
            fontFamily: "sans-serif",
            letterSpacing: "-0.02em",
            lineHeight: 1,
            marginBottom: "24px",
          }}
        >
          ПромСтрой
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: "28px",
            color: "rgba(234,224,207,0.55)",
            fontFamily: "sans-serif",
            fontWeight: 400,
            lineHeight: 1.4,
            maxWidth: "700px",
          }}
        >
          Коммерческое строительство и ремонт с 2008 года
        </div>

        {/* Bottom accent */}
        <div
          style={{
            position: "absolute",
            bottom: 80,
            left: 80,
            display: "flex",
            alignItems: "center",
            gap: "20px",
          }}
        >
          {["Строительство под ключ", "Ремонт и реновация", "Инженерные сети"].map((s) => (
            <div
              key={s}
              style={{
                fontSize: "14px",
                color: "rgba(234,224,207,0.35)",
                fontFamily: "sans-serif",
                borderLeft: "1px solid rgba(196,174,148,0.25)",
                paddingLeft: "16px",
              }}
            >
              {s}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
