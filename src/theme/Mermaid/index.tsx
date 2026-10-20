import type { ComponentProps, ReactNode } from "react";
import OriginalMermaid from "@theme-original/Mermaid";

export default function Mermaid(
  props: ComponentProps<typeof OriginalMermaid>,
): ReactNode {
  return (
    <div
      className="oph-diagram"
      role="region"
      aria-label="Diagram. Scroll horizontally to explore."
      tabIndex={0}
    >
      <OriginalMermaid {...props} />
    </div>
  );
}
