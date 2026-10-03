import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";

import {
  Container,
  PageIntro,
  SectionHeader,
  SiteFooter,
  SiteHeader,
  Tag,
} from "../index";
import styles from "./About.stories.module.css";

const GITHUB_URL = "https://github.com/keigokudo";

const meta = {
  title: "Pages/About",
  parameters: {
    layout: "fullscreen",
  },
  render: () => (
    <div className={`portfolio-foundation ${styles.page}`}>
      <SiteHeader brand="Portfolio" currentPath="/about" />

      <main>
        <PageIntro
          className={styles.intro}
          eyebrow="ABOUT"
          heading="Software engineer focused on clear systems and reliable delivery."
          description="I work primarily across frontend and full-stack product development, with an emphasis on maintainable interfaces, practical integrations and software that teams can continue to understand."
        />

        <section className={styles.experience}>
          <Container>
            <SectionHeader
              heading="EXPERIENCE"
              meta="Selected engineering work"
            />

            <div className={styles.experienceList}>
              <div className={styles.experienceRow}>
                <h3>Frontend &amp; full-stack engineering</h3>
                <p>Product interfaces, APIs and integrations</p>
              </div>
              <div className={styles.experienceRow}>
                <h3>Reusable UI systems</h3>
                <p>React, TypeScript, Storybook and package design</p>
              </div>
              <div className={styles.experienceRow}>
                <h3>Cloud &amp; delivery</h3>
                <p>Application delivery across modern web platforms</p>
              </div>
            </div>
          </Container>
        </section>

        <section
          className={styles.editorialSection}
          aria-labelledby="technical-focus-heading"
        >
          <Container>
            <div className={styles.sectionLayout}>
              <h2 id="technical-focus-heading" className={styles.sectionHeading}>
                TECHNICAL FOCUS
              </h2>
              <div className={styles.prose}>
                <p>
                  My focus is maintainable product interfaces and reusable UI,
                  supported by practical work across APIs, integrations and
                  cloud platforms.
                </p>
                <ul className={styles.tags} aria-label="Technical focus">
                  <li>
                    <Tag>React</Tag>
                  </li>
                  <li>
                    <Tag>TypeScript</Tag>
                  </li>
                  <li>
                    <Tag>Storybook</Tag>
                  </li>
                </ul>
              </div>
            </div>
          </Container>
        </section>

        <section
          className={styles.editorialSection}
          aria-labelledby="working-style-heading"
        >
          <Container>
            <div className={styles.sectionLayout}>
              <h2 id="working-style-heading" className={styles.sectionHeading}>
                HOW I WORK
              </h2>
              <div className={styles.prose}>
                <p>
                  I prefer clear constraints, small composable systems and
                  implementation choices that remain understandable after the
                  first release.
                </p>
                <p>
                  I value pragmatic collaboration: clarify the problem, reduce
                  unnecessary complexity, ship in manageable steps and keep the
                  codebase legible for the next person.
                </p>
              </div>
            </div>
          </Container>
        </section>

        <section
          className={styles.closing}
          aria-labelledby="collaboration-heading"
        >
          <Container>
            <div className={styles.closingLayout}>
              <h2 id="collaboration-heading" className={styles.sectionHeading}>
                OPEN TO COLLABORATION
              </h2>
              <div className={styles.closingContent}>
                <p>
                  Interested in product engineering, reusable UI systems and
                  practical full-stack work.
                </p>
                <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
                  View GitHub ↗
                </a>
              </div>
            </div>
          </Container>
        </section>
      </main>

      <SiteFooter />
    </div>
  ),
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const headings = canvas.getAllByRole("heading", { level: 1 });
    const page = canvasElement.querySelector(`.${styles.page}`);
    const aboutLink = canvas.getByRole("link", { name: "About" });

    await expect(headings).toHaveLength(1);
    await expect(headings[0]).toHaveTextContent(
      "Software engineer focused on clear systems and reliable delivery.",
    );
    await expect(canvas.getByRole("link", { name: "Portfolio" })).toHaveAttribute(
      "href",
      "/",
    );
    await expect(aboutLink).toHaveAttribute("href", "/about");
    await expect(aboutLink).toHaveAttribute("aria-current", "page");

    for (const heading of ["EXPERIENCE", "TECHNICAL FOCUS", "HOW I WORK"]) {
      await expect(
        canvas.getByRole("heading", { level: 2, name: heading }),
      ).toBeVisible();
    }

    for (const tag of ["React", "TypeScript", "Storybook"]) {
      await expect(canvas.getByText(tag, { selector: ".portfolio-tag" })).toBeVisible();
    }

    await expect(
      canvas.getByRole("link", { name: "View GitHub ↗" }),
    ).toHaveAttribute("href", GITHUB_URL);
    await expect(
      canvas.getByText("Let’s build something that lasts."),
    ).toBeVisible();
    await expect(page?.scrollWidth).toBeLessThanOrEqual(page?.clientWidth ?? 0);
  },
};

export const NarrowViewport: Story = {
  globals: {
    viewport: { value: "iphone12", isRotated: false },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const page = canvasElement.querySelector(`.${styles.page}`);

    await expect(
      canvas.getByRole("heading", {
        level: 1,
        name: "Software engineer focused on clear systems and reliable delivery.",
      }),
    ).toBeVisible();
    await expect(canvas.getByText("Frontend & full-stack engineering")).toBeVisible();
    await expect(canvas.getByText("React", { selector: ".portfolio-tag" })).toBeVisible();
    await expect(canvas.getByRole("link", { name: "View GitHub ↗" })).toBeVisible();
    await expect(page?.scrollWidth).toBeLessThanOrEqual(page?.clientWidth ?? 0);
  },
};
