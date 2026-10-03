import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";

import { Container, SiteFooter, SiteHeader, Tag } from "../index";
import styles from "./WorkDetail.stories.module.css";

const meta = {
  title: "Pages/Work Detail",
  parameters: {
    layout: "fullscreen",
  },
  render: () => (
    <div className={`portfolio-foundation ${styles.page}`}>
      <SiteHeader brand="Portfolio" />

      <main>
        <div className={styles.backNavigation}>
          <Container>
            <a className={styles.backLink} href="/work">
              ← Back to work
            </a>
          </Container>
        </div>

        <article>
          <header className={styles.hero}>
            <Container>
              <p className={styles.eyebrow}>COMMERCIAL CASE STUDY</p>
              <h1 className={styles.title}>Ottobock Expert Search</h1>

              <div className={styles.heroDetails}>
                <p className={styles.summary}>
                  A search experience centred on location-aware discovery,
                  structured search and external integrations.
                </p>

                <dl className={styles.metadata}>
                  <div>
                    <dt>TYPE</dt>
                    <dd>Commercial case study</dd>
                  </div>
                  <div>
                    <dt>FOCUS</dt>
                    <dd>
                      Algolia · Geolocation · Geocoding · Integrations
                    </dd>
                  </div>
                </dl>
              </div>
            </Container>
          </header>

          <Container>
            <figure className={`${styles.figure} ${styles.primaryFigure}`}>
              <div className={styles.primaryMedia} aria-hidden="true">
                <span>Search experience</span>
                <strong>Media placeholder</strong>
              </div>
              <figcaption>
                Search experience — Storybook media placeholder
              </figcaption>
            </figure>
          </Container>

          <section className={styles.editorialSection}>
            <Container>
              <div className={styles.sectionLayout}>
                <h2>Overview</h2>
                <div className={styles.prose}>
                  <p>
                    This provisional case-study narrative is organised around
                    the project’s established focus: Algolia, geolocation,
                    geocoding and external integrations.
                  </p>
                  <p>
                    It provides enough context to test a long-form editorial
                    layout while leaving project-specific evidence and outcomes
                    open for future canonical content.
                  </p>
                </div>
              </div>
            </Container>
          </section>

          <section className={styles.editorialSection}>
            <Container>
              <div className={styles.sectionLayout}>
                <h2>The problem</h2>
                <div className={styles.prose}>
                  <p>
                    The design challenge presented for this composition is to
                    make structured search and geographic context legible
                    together, while preserving space to explain external
                    integration boundaries.
                  </p>
                  <p>
                    Detailed user, organisational and performance claims are
                    intentionally omitted because no canonical project account
                    is present in the repository.
                  </p>
                </div>
              </div>
            </Container>
          </section>

          <section className={styles.editorialSection}>
            <Container>
              <div className={styles.sectionLayout}>
                <h2>Approach</h2>
                <div className={styles.prose}>
                  <p>
                    The known focus is separated into four themes so the page
                    can test concise technical framing without implying
                    unsupported scope or results.
                  </p>
                  <div className={styles.tags} aria-label="Technical themes">
                    <Tag>Structured search</Tag>
                    <Tag>Location-aware discovery</Tag>
                    <Tag>Geocoding</Tag>
                    <Tag>External integrations</Tag>
                  </div>
                </div>
              </div>
            </Container>
          </section>

          <section className={styles.editorialSection}>
            <Container>
              <div className={styles.sectionLayout}>
                <h2>Technical decisions</h2>
                <div className={styles.decisions}>
                  <div>
                    <h3>Search structure</h3>
                    <p>
                      Reserve space to explain how Algolia and result structure
                      shape the search experience when verified implementation
                      detail becomes available.
                    </p>
                  </div>
                  <div>
                    <h3>Location context</h3>
                    <p>
                      Keep geolocation and geocoding distinct so location input,
                      resolution and search context can be documented clearly.
                    </p>
                  </div>
                  <div>
                    <h3>Integration boundaries</h3>
                    <p>
                      Give external integrations a clear place in the narrative
                      without speculating about providers or implementation
                      responsibilities.
                    </p>
                  </div>
                </div>
              </div>
            </Container>
          </section>

          <Container>
            <figure className={`${styles.figure} ${styles.secondaryFigure}`}>
              <div className={styles.secondaryMedia} aria-hidden="true">
                <span>Location-aware results</span>
                <strong>Secondary media placeholder</strong>
              </div>
              <figcaption>
                Location-aware results — Storybook media placeholder
              </figcaption>
            </figure>
          </Container>

          <section className={styles.editorialSection}>
            <Container>
              <div className={styles.sectionLayout}>
                <h2>Outcome</h2>
                <div className={styles.prose}>
                  <p>
                    This provisional reflection makes no measured product or
                    business claims. It demonstrates how a future canonical
                    account can connect project context, technical decisions and
                    verified outcomes in one readable sequence.
                  </p>
                </div>
              </div>
            </Container>
          </section>

          <nav className={styles.nextProject} aria-label="Project navigation">
            <Container>
              <div className={styles.nextProjectInner}>
                <p>NEXT PROJECT</p>
                <a href="/work/phrase-recall">PhraseRecall ↗</a>
              </div>
            </Container>
          </nav>
        </article>
      </main>

      <SiteFooter />
    </div>
  ),
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const OttobockExpertSearch: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const headings = canvas.getAllByRole("heading", { level: 1 });
    const page = canvasElement.querySelector(`.${styles.page}`);

    await expect(headings).toHaveLength(1);
    await expect(headings[0]).toHaveTextContent("Ottobock Expert Search");
    await expect(canvas.getByRole("link", { name: "Portfolio" })).toHaveAttribute(
      "href",
      "/",
    );
    await expect(
      canvas.getByRole("link", { name: "Work" }),
    ).not.toHaveAttribute("aria-current");
    await expect(
      canvas.getByRole("link", { name: "← Back to work" }),
    ).toHaveAttribute("href", "/work");
    await expect(canvas.getByText("COMMERCIAL CASE STUDY")).toBeVisible();
    await expect(
      canvas.getByText("Algolia · Geolocation · Geocoding · Integrations"),
    ).toBeVisible();

    for (const heading of [
      "Overview",
      "The problem",
      "Approach",
      "Technical decisions",
      "Outcome",
    ]) {
      await expect(
        canvas.getByRole("heading", { level: 2, name: heading }),
      ).toBeVisible();
    }

    await expect(
      canvas.getByRole("link", { name: "PhraseRecall ↗" }),
    ).toHaveAttribute("href", "/work/phrase-recall");
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
        name: "Ottobock Expert Search",
      }),
    ).toBeVisible();
    await expect(canvas.getByText("Commercial case study")).toBeVisible();
    await expect(canvas.getAllByText(/Storybook media placeholder/)).toHaveLength(
      2,
    );
    await expect(
      canvas.getByRole("link", { name: "PhraseRecall ↗" }),
    ).toBeVisible();
    await expect(page?.scrollWidth).toBeLessThanOrEqual(page?.clientWidth ?? 0);
  },
};
