import satori from "satori";
import { SITE } from "@config";
import loadFonts from "../loadFonts";
import { OG, OG_FONT } from "./palette";
import Frame from "./frame";

export default async (stats?: { posts: number; radar: number }) => {
  const statusRight = stats
    ? `${stats.posts} posts · ${stats.radar} radar entries`
    : undefined;

  return satori(
    <Frame
      statusLeft={SITE.titleShort}
      statusRight={statusRight}
      footerLeft="Flavien Beninca · Context engineer"
    >
      <p
        style={{
          fontFamily: OG_FONT.reading,
          fontSize: 60,
          fontWeight: 600,
          letterSpacing: "-0.02em",
          lineHeight: 1.12,
          color: OG.textStrong,
          margin: 0,
          maxWidth: 940,
        }}
      >
        {SITE.title}
      </p>
      <p
        style={{
          fontFamily: OG_FONT.reading,
          fontSize: 26,
          lineHeight: 1.45,
          color: OG.textBody,
          marginTop: 26,
          marginBottom: 0,
          maxWidth: 940,
        }}
      >
        {SITE.desc}
      </p>
    </Frame>,
    {
      width: 1200,
      height: 630,
      embedFont: true,
      fonts: loadFonts(),
    }
  );
};
