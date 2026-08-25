import satori from "satori";
import type { CollectionEntry } from "astro:content";
import { SITE } from "@config";
import loadGoogleFonts, { type FontOptions } from "../loadGoogleFont";
import { OG } from "./palette";

export default async (post: CollectionEntry<"blog">) => {
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
      {/* Filet accent à gauche : la signature du bloc de code, reprise en OG. */}
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
            justifyContent: "space-between",
            margin: "40px",
            width: "90%",
            height: "84%",
          }}
        >
          <p
            style={{
              fontSize: 64,
              fontWeight: 600,
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              color: OG.textStrong,
              maxHeight: "78%",
              overflow: "hidden",
            }}
          >
            {post.data.title}
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              fontSize: 24,
              letterSpacing: "0.13em",
              color: OG.textMuted,
            }}
          >
            <span style={{ overflow: "hidden" }}>{post.data.author}</span>
            <span style={{ overflow: "hidden", color: OG.accent }}>
              {SITE.titleShort}
            </span>
          </div>
        </div>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
      embedFont: true,
      fonts: (await loadGoogleFonts(
        post.data.title + post.data.author + SITE.titleShort
      )) as FontOptions[],
    }
  );
};
