import type { ReactNode } from "react";
import clsx from "clsx";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";

type FeatureItem = {
  title: string;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: "AI-Assisted Requirements Refinement",
    description: (
      <>
        An integrated AI engine detects ambiguities and turns raw client input
        into structured, actionable user stories.
      </>
    ),
  },
  {
    title: "Centralized Client & Project Management",
    description: (
      <>
        One hub to manage clients, projects, and requirements — instead of
        scattered docs, spreadsheets, and messages.
      </>
    ),
  },
  {
    title: "Role-Based Access Control",
    description: (
      <>
        Admins and Members work inside their own workspace, and clients
        review approved stories with a project access code, no account needed.
      </>
    ),
  },
];

function Feature({ title, description }: FeatureItem) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
