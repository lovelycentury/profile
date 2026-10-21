import type { CSSProperties } from "react";
import styles from "./RevealWords.module.scss";

type RevealWordsProps = {
  text: string;
};

/**
 * Splits a heading into per-word spans that rise in one after another when the
 * surrounding `RevealOnView` becomes visible. The animation itself lives in
 * `RevealOnView.module.scss`; this only provides the markup and word indices.
 *
 * Screen readers get the intact string — the split copy is `aria-hidden` so it
 * is not announced word by word.
 */
export default function RevealWords({ text }: RevealWordsProps) {
  const words = text.split(/\s+/).filter(Boolean);

  return (
    <>
      <span className={styles.srOnly}>{text}</span>
      <span aria-hidden="true" data-reveal-words="">
        {words.map((word, index) => (
          <span key={index}>
            {index > 0 && " "}
            <span
              className={styles.word}
              data-reveal-word=""
              style={{ "--word-i": index } as CSSProperties}
            >
              {word}
            </span>
          </span>
        ))}
      </span>
    </>
  );
}
