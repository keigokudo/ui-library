import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";

import {
  Container,
  ProjectRow,
  SiteFooter,
  SiteHeader,
} from "../index";
import styles from "./Home.stories.module.css";

const meta = {
  title: "Pages/Home",
  parameters: {
    layout: "fullscreen",
  },
  render: () => (
    <div className={`c2-foundation ${styles.page}`}>
      <SiteHeader currentPath="/" />

      <main>
        <section className={styles.hero}>
          <Container>
            <div className={styles.heroContent}>
              <p className={styles.eyebrow}>FULL-STACK SOFTWARE ENGINEER</p>
              <h1 className={styles.headline}>
                Thoughtful software, built to last.
              </h1>
              <p className={styles.description}>
                Deep frontend expertise, with practical experience across
                backend systems, APIs, integrations and cloud platforms.
              </p>
              <div className={styles.actions}>
                <a
                  className={`${styles.action} ${styles.actionPrimary}`}
                  href="#selected-work"
                >
                  Selected work
                </a>
                <a className={styles.action} href="/about">
                  About me
                </a>
              </div>
            </div>
          </Container>
        </section>

        <section id="selected-work" className={styles.selectedWork}>
          <Container>
            <header className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Selected work</h2>
              <p className={styles.sectionSummary}>
                Systems · Products · Integrations
              </p>
            </header>

            <div>
              <ProjectRow
                index="01"
                category="REUSABLE UI SYSTEM"
                title="@krnjs/react-ui"
                focus="Design systems · TypeScript · Storybook · npm"
                href="/work/react-ui"
              />
              <ProjectRow
                index="02"
                category="COMMERCIAL CASE STUDY"
                title="Ottobock Expert Search"
                focus="Algolia · Geolocation · Geocoding · Integrations"
                href="/work/ottobock-expert-search"
              />
              <ProjectRow
                index="03"
                category="PRODUCT ENGINEERING"
                title="PhraseRecall"
                focus="React · Browser APIs · Learning UX"
                href="/work/phrase-recall"
              />
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
    const selectedWork = canvasElement.querySelector("#selected-work");
    const page = canvasElement.querySelector(`.${styles.page}`);

    await expect(headings).toHaveLength(1);
    await expect(headings[0]).toHaveTextContent(
      "Thoughtful software, built to last.",
    );
    await expect(
      canvas.getByText(
        "Deep frontend expertise, with practical experience across backend systems, APIs, integrations and cloud platforms.",
      ),
    ).toBeVisible();
    await expect(
      canvas.getByRole("link", { name: "Selected work" }),
    ).toHaveAttribute("href", "#selected-work");
    await expect(canvas.getByRole("link", { name: "About me" })).toHaveAttribute(
      "href",
      "/about",
    );
    await expect(selectedWork).not.toBeNull();

    const projects = [
      ["@krnjs/react-ui", "/work/react-ui"],
      ["Ottobock Expert Search", "/work/ottobock-expert-search"],
      ["PhraseRecall", "/work/phrase-recall"],
    ] as const;

    for (const [title, href] of projects) {
      const project = canvas.getByText(title).closest("a");
      await expect(project).toHaveAttribute("href", href);
    }

    await expect(
      canvas.getByRole("link", { name: "KEIGO KUDO" }),
    ).toBeVisible();
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
        name: "Thoughtful software, built to last.",
      }),
    ).toBeVisible();
    await expect(canvas.getByText("@krnjs/react-ui")).toBeVisible();
    await expect(canvas.getByText("Ottobock Expert Search")).toBeVisible();
    await expect(canvas.getByText("PhraseRecall")).toBeVisible();
    await expect(page?.scrollWidth).toBeLessThanOrEqual(page?.clientWidth ?? 0);
  },
};
