import RevealWords from "@/components/RevealWords/RevealWords";
import styles from "./SectionHeading.module.scss";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  summary?: string;
};

/** The eyebrow + H2 (+ optional lede) block every section opens with in Figma. */
export default function SectionHeading({ eyebrow, title, summary }: SectionHeadingProps) {
  return (
    <div className={styles.root}>
      <p className={styles.eyebrow} data-reveal="">
        {eyebrow}
      </p>
      <h2 className={styles.title}>
        <RevealWords text={title} />
      </h2>
      {summary && (
        <p className={styles.summary} data-reveal="">
          {summary}
        </p>
      )}
    </div>
  );
}
