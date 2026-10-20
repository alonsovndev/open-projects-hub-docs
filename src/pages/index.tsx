import type { ReactNode } from "react";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";
import HomepageFeatures from "@site/src/components/HomepageFeatures";
import styles from "./index.module.css";

function RequirementsWorkflow() {
  return (
    <figure className={styles.workflow}>
      <div className={styles.workflowHeading}>
        <span>The core workflow</span>
        <span className={styles.exampleLabel}>Illustrative example</span>
      </div>
      <ol className={styles.workflowSteps}>
        <li>
          <span className={styles.stepMarker} aria-hidden="true">1</span>
          <div>
            <Heading as="h2">Client notes</Heading>
            <p className={styles.note}>“Visitors need a way to send us an enquiry.”</p>
          </div>
        </li>
        <li>
          <span className={styles.stepMarker} aria-hidden="true">2</span>
          <div>
            <Heading as="h2">AI-generated draft</Heading>
            <p>A proposed user story and acceptance criteria.</p>
          </div>
        </li>
        <li>
          <span className={styles.stepMarker} aria-hidden="true">3</span>
          <div>
            <Heading as="h2">Human approval</Heading>
            <p>Review and edit the draft before approving it.</p>
            <span className={styles.question}>
              <strong>Reviewer checks</strong>
              Which mailbox should receive the enquiry?
            </span>
          </div>
        </li>
        <li className={styles.approvedStep}>
          <span className={styles.stepMarker} aria-hidden="true">4</span>
          <div>
            <Heading as="h2">Approved backlog</Heading>
            <p>Requirements ready for Markdown export and read-only client review.</p>
            <div className={styles.outputs}>
              <span>Markdown export</span>
              <span>Client access code</span>
            </div>
          </div>
        </li>
      </ol>
      <figcaption>AI proposes. People decide what becomes a requirement.</figcaption>
    </figure>
  );
}

export default function Home(): ReactNode {
  const backlogPreviewUrl = useBaseUrl("/img/product/approved-backlog.png");

  return (
    <Layout
      title="Engineering documentation"
      description="Explore Open Projects Hub: the problem, requirements, architecture, decisions, and evidence behind an AI-assisted requirements planning platform."
    >
      <main>
        <header className={styles.hero}>
          <div className={`container ${styles.heroLayout}`}>
            <div className={styles.introduction}>
              <p className={styles.eyebrow}>Open Projects Hub · Master’s final project</p>
              <Heading as="h1" className={styles.title}>
                From client ideas to <span>approved requirements.</span>
              </Heading>
              <p className={styles.description}>
                An open-source workspace for freelancers to organize projects,
                clarify requirements with AI, and share an approved backlog with clients.
              </p>
              <div className={styles.actions}>
                <Link className={styles.primaryAction} to="/docs/00-context/reviewer-guide">
                  Start the review <span aria-hidden="true">→</span>
                </Link>
                <Link className={styles.secondaryAction} to="/docs/03-architecture/core/architecture-solution-design">
                  Explore the architecture <span aria-hidden="true">↗</span>
                </Link>
              </div>
              <p className={styles.heroNote}>
                The engineering story: context, requirements, design decisions,
                and evidence—with limitations made explicit.
              </p>
            </div>
            <RequirementsWorkflow />
          </div>
        </header>
        <HomepageFeatures />
        <section className={styles.preview} aria-labelledby="preview-title">
          <div className={`container ${styles.previewLayout}`}>
            <div className={styles.previewIntroduction}>
              <p className={styles.eyebrow}>Inside the workspace</p>
              <Heading as="h2" id="preview-title">A requirement, ready for review.</Heading>
              <p>
                The approved backlog brings a user story and its acceptance
                criteria together. Follow the same example from refinement
                through approval to the client’s read-only view.
              </p>
              <Link className={styles.previewLink} to="/docs/05-prototype/#current-implementation">
                View the current interface <span aria-hidden="true">→</span>
              </Link>
            </div>
            <figure className={styles.productFigure}>
              <Link to="/docs/05-prototype/#current-implementation" aria-label="Explore current interface screenshots and demonstration details">
                <img
                  src={backlogPreviewUrl}
                  width="1440"
                  height="1100"
                  loading="lazy"
                  decoding="async"
                  alt="Open Projects Hub approved backlog showing a contact-form user story and acceptance criteria for required fields, email validation, confirmation, and failure feedback."
                />
              </Link>
              <figcaption>
                Current local interface · Fictional data; API responses staged for demonstration.
              </figcaption>
            </figure>
          </div>
        </section>
        <section className={styles.explore} aria-labelledby="explore-title">
          <div className={`container ${styles.exploreLayout}`}>
            <div>
              <p className={styles.eyebrow}>Go a little deeper</p>
              <Heading as="h2" id="explore-title">See how the pieces come together.</Heading>
            </div>
            <div className={styles.exploreLinks}>
              <Link to="/docs/00-context/run-the-system">
                <strong>Run the system <span aria-hidden="true">↗</span></strong>
                <span>Set up the application and follow the main workflow.</span>
              </Link>
              <Link to="/docs/05-prototype/">
                <strong>Explore the prototype <span aria-hidden="true">↗</span></strong>
                <span>Historical design explorations and the decisions that followed.</span>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
