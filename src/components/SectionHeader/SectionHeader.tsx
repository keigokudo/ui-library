import type { ReactNode } from "react";

export type SectionHeaderProps = {
  heading: ReactNode;
  meta: ReactNode;
};

export function SectionHeader({ heading, meta }: SectionHeaderProps) {
  return (
    <div className="portfolio-section-header">
      <h2 className="portfolio-section-header__heading">{heading}</h2>
      <div className="portfolio-section-header__meta">{meta}</div>
    </div>
  );
}
