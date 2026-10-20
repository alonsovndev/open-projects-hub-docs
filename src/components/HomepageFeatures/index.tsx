import type { ReactNode } from "react";
import Link from "@docusaurus/Link";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";

const reviewSections = [
  {
    title: "Understand the problem",
    description: "Who the platform serves, the problem it addresses, and the boundaries of the MVP.",
    to: "/docs/00-context/overview",
    label: "Context & scope",
  },
  {
    title: "Inspect the requirements",
    description: "Functional behavior, acceptance criteria, and the path from discovery to an approved backlog.",
    to: "/docs/01-requirements/",
    label: "Requirements",
  },
  {
    title: "Evaluate the architecture",
    description: "System boundaries, data flows, security, and the deployment design.",
    to: "/docs/03-architecture/",
    label: "Architecture",
  },
  {
    title: "Follow the decisions",
    description: "The alternatives considered, trade-offs accepted, and reasons behind the design.",
    to: "/docs/04-decisions/",
    label: "Decision records",
  },
  {
    title: "Examine the evidence",
    description: "What has been verified, what remains unvalidated, and the limits of the project’s claims.",
    to: "/docs/00-context/evidence-and-limitations",
    label: "Evidence & limitations",
  },
];

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.review} aria-labelledby="review-title">
      <div className={`container ${styles.layout}`}>
        <div className={styles.introduction}>
          <p className={styles.eyebrow}>A guided reading path</p>
          <Heading as="h2" id="review-title">Review the thinking behind the system.</Heading>
          <p>
            Start with the problem, then trace the requirements into the technical
            solution. Each section makes a different part of the project open to review.
          </p>
          <Link className={styles.guideLink} to="/docs/00-context/reviewer-guide">
            Open the reviewer’s guide <span aria-hidden="true">→</span>
          </Link>
        </div>
        <ol className={styles.readingPath}>
          {reviewSections.map((section, index) => (
            <li key={section.to}>
              <Link to={section.to} className={styles.readingLink}>
                <span className={styles.number} aria-hidden="true">0{index + 1}</span>
                <div className={styles.sectionContent}>
                  <span className={styles.sectionLabel}>{section.label}</span>
                  <Heading as="h3">{section.title}</Heading>
                  <span className={styles.sectionDescription}>{section.description}</span>
                </div>
                <span className={styles.arrow} aria-hidden="true">↗</span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
