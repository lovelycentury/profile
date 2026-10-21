import { getTranslations } from "next-intl/server";
import { Photo } from "@okkly/react";
import HeroActions from "./HeroActions";
import RevealWords from "@/components/RevealWords/RevealWords";
import styles from "./HeroSection.module.scss";

export default async function HeroSection() {
  const t = await getTranslations("Hero");

  return (
    <section className={styles.section}>
      <div className={styles.layout}>
        <div className={styles.content}>
          <p className={styles.availability} data-reveal="">
            <span className={styles.dot} aria-hidden="true" />
            {t("availability")}
          </p>
          <h1 className={styles.title}>
            <RevealWords text={t("title")} />
          </h1>
          <p className={styles.summary} data-reveal="">
            {t("summary")}
          </p>
          <p className={styles.meta} data-reveal="">
            <span>{t("role")}</span>
            <span aria-hidden="true">·</span>
            <span>{t("location")}</span>
          </p>
          <div data-reveal="">
            <HeroActions
              className={styles.actions}
              primaryLabel={t("primaryCta")}
              secondaryLabel={t("secondaryCta")}
            />
          </div>
        </div>

        <div className={styles.portrait}>
          <div className={styles.plate}>
            <Photo
              className={styles.photoDark}
              alt={t("portraitAlt")}
              variant="scrim"
              size="lg"
              image="/images/me-light.jpg"
              // caption={t("fullName")}
            />
            <Photo
              className={styles.photoLight}
              alt={t("portraitAlt")}
              variant="scrim"
              size="lg"
              image="/images/me-light.jpg"
              // caption={t("fullName")}
            />
            {/* <Icon name="iconUser" fontSize="large" className={styles.glyph} />
            <p className={styles.caption}>{t("portraitPlaceholder")}</p> */}
          </div>
        </div>
      </div>
    </section>
  );
}
