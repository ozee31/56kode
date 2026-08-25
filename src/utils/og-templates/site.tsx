import satori from "satori";
import { SITE } from "@config";
import loadGoogleFonts, { type FontOptions } from "../loadGoogleFont";
import { OG } from "./palette";

export default async () => {
  return satori(
    <div
      style={{
        background: OG.canvas,
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          border: `1px solid ${OG.line}`,
          borderLeft: `8px solid ${OG.accent}`,
          background: OG.raised,
          display: "flex",
          justifyContent: "center",
          margin: "2.5rem",
          width: "90%",
          height: "82%",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            margin: "40px",
            width: "90%",
            height: "84%",
          }}
        >
          <p
            style={{
              fontSize: 24,
              letterSpacing: "0.13em",
              color: OG.accent,
              marginBottom: 16,
            }}
          >
            {SITE.titleShort}
          </p>
          <p
            style={{
              fontSize: 64,
              fontWeight: 600,
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              color: OG.textStrong,
              marginBottom: 20,
            }}
          >
            {SITE.title}
          </p>
          <p
            style={{
              fontSize: 28,
              lineHeight: 1.5,
              color: OG.textMuted,
              maxHeight: "30%",
              overflow: "hidden",
            }}
          >
            {SITE.desc}
          </p>
        </div>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
      embedFont: true,
      fonts: (await loadGoogleFonts(
        SITE.title + SITE.desc + SITE.titleShort
      )) as FontOptions[],
    }
  );
};
