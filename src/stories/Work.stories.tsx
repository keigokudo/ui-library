import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";

import {
  Container,
  PageIntro,
  ProjectRow,
  SectionHeader,
  SiteFooter,
  SiteHeader,
} from "../index";
import styles from "./Work.stories.module.css";

const projects = [
  {
    index: "01",
    category: "REUSABLE UI SYSTEM",
    title: "@krnjs/react-ui",
    focus: "Design systems · TypeScript · Storybook · npm",
    href: "/work/react-ui",
  },
  {
    index: "02",
    category: "COMMERCIAL CASE STUDY",
    title: "Ottobock Expert Search",
    focus: "Algolia · Geolocation · Geocoding · Integrations",
    href: "/work/ottobock-expert-search",
  },
  {
    index: "03",
    category: "PRODUCT ENGINEERING",
    title: "PhraseRecall",
    focus: "React · Browser APIs · Learning UX",
    href: "/work/phrase-recall",
  },
] as const;

const meta = {
  title: "Pages/Work",
  parameters: {
    layout: "fullscreen",
  },
  render: () => (
    <div className={`portfolio-foundation ${styles.page}`}>
      <SiteHeader brand="Portfolio" currentPath="/work" />

      <main>
        <PageIntro
          className={styles.intro}
          eyebrow="SELECTED WORK"
          heading="Selected work, across systems and products."
          description="A focused set of projects across design systems, search experiences and product engineering."
        />

        <section className={styles.workIndex}>
          <Container>
            <SectionHeader
              heading="WORK INDEX"
              meta="03 selected projects"
            />

            <div>
              {projects.map((project) => (
                <ProjectRow key={project.index} {...project} />
              ))}
            </div>
          </Container>
        </section>

        <section
          className={styles.howIWork}
          aria-labelledby="how-i-work-heading"
        >
          <Container>
            <div className={styles.statement}>
              <h2 id="how-i-work-heading" className={styles.statementTitle}>
                HOW I WORK
              </h2>
              <p className={styles.statementText}>
                I favor clear constraints, small composable systems and
                implementation choices that stay legible in the real product.
              </p>
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
    const siteHeader = canvasElement.querySelector(".portfolio-site-header");
    const workLink = canvas.getByRole("link", { name: "Work" });

    await expect(headings).toHaveLength(1);
    await expect(headings[0]).toHaveTextContent(
      "Selected work, across systems and products.",
    );
    await expect(siteHeader).toBeVisible();
    await expect(workLink).toHaveAttribute("href", "/work");
    await expect(workLink).toHaveAttribute("aria-current", "page");
    await expect(
      canvas.getByRole("heading", { level: 2, name: "WORK INDEX" }),
    ).toBeVisible();

    for (const project of projects) {
      const projectLink = canvas.getByText(project.title).closest("a");
      await expect(projectLink).toHaveAttribute("href", project.href);
    }

    await expect(
      canvas.getByRole("heading", { level: 2, name: "HOW I WORK" }),
    ).toBeVisible();
    await expect(
      canvas.getByText(
        "I favor clear constraints, small composable systems and implementation choices that stay legible in the real product.",
      ),
    ).toBeVisible();
    await expect(
      canvas.getByText("Let’s build something that lasts."),
    ).toBeVisible();
    await expect(canvas.getByRole("contentinfo")).toBeVisible();
    await expect(canvas.queryAllByRole("button")).toHaveLength(0);
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
        name: "Selected work, across systems and products.",
      }),
    ).toBeVisible();

    for (const project of projects) {
      await expect(canvas.getByText(project.title)).toBeVisible();
    }

    await expect(canvas.getByText("HOW I WORK")).toBeVisible();
    await expect(page?.scrollWidth).toBeLessThanOrEqual(page?.clientWidth ?? 0);
  },
};
