import satori from "satori";
import type { CollectionEntry } from "astro:content";
import { SITE } from "@config";
import getMinutesRead from "../getMinutesRead";
import loadFonts from "../loadFonts";
import { OG, OG_FONT } from "./palette";
import Frame from "./frame";

const DATE_FORMAT = new Intl.DateTimeFormat("fr-FR", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

export default async (post: CollectionEntry<"blog">) => {
  const { title, description, pubDatetime, modDatetime } = post.data;
  const date = DATE_FORMAT.format(modDatetime ?? pubDatetime);
  const readingTime = getMinutesRead(post);

  // L'auteur du site, pas celui du frontmatter : les 24 articles y portent
  // « 56kode », ce qui affichait le nom du site deux fois dans le pied.
  const footerLeft = [SITE.author, readingTime].filter(Boolean).join("  ·  ");

  return satori(
    <Frame statusLeft="Posts" statusRight={date} footerLeft={footerLeft}>
      <p
        style={{
          fontFamily: OG_FONT.reading,
          fontSize: 60,
          fontWeight: 600,
          letterSpacing: "-0.02em",
          lineHeight: 1.12,
          color: OG.textStrong,
          margin: 0,
          // Satori pose lui-même l'ellipse, à condition d'un display block ;
          // le `overflow: hidden` d'avant tranchait la phrase en plein mot.
          display: "block",
          lineClamp: 3,
        }}
      >
        {title}
      </p>
      {description && (
        <p
          style={{
            fontFamily: OG_FONT.reading,
            fontSize: 26,
            lineHeight: 1.45,
            color: OG.textBody,
            marginTop: 26,
            marginBottom: 0,
            maxWidth: 940,
            display: "block",
            lineClamp: 3,
          }}
        >
          {description}
        </p>
      )}
    </Frame>,
    {
      width: 1200,
      height: 630,
      embedFont: true,
      fonts: loadFonts(),
    }
  );
};
