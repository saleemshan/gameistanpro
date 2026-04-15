import { ListOrdered } from "lucide-react";

import { JsonLd } from "@/components/seo/JsonLd";

export function InstallSteps({
  steps,
  productTitle,
}: {
  steps: { title: string; description: string }[];
  /** When set, HowTo JSON-LD name is specific to this product (better intent match). */
  productTitle?: string;
}) {
  if (!steps.length) return null;

  const howToName = productTitle?.trim()
    ? `How to download and install ${productTitle.trim()} on Android`
    : "How to download and install on Android";

  const howTo = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: howToName,
    step: steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.title,
      text: s.description,
    })),
  };

  return (
    <section id="how-to-download" className="scroll-mt-24 space-y-4">
      <JsonLd data={howTo} />
      <h2 className="flex items-center gap-2 font-heading text-xl font-bold text-foreground">
        <ListOrdered className="size-5 text-primary" />
        {productTitle?.trim()
          ? `How to download & install ${productTitle.trim()}`
          : "How to download & install"}
      </h2>
      <ol className="space-y-4">
        {steps.map((s, i) => (
          <li
            key={s.title}
            className="flex gap-4 rounded-xl border border-border bg-card/70 p-4"
          >
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted font-mono text-sm font-bold text-accent">
              {i + 1}
            </span>
            <div>
              <h3 className="font-heading font-semibold text-foreground">{s.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{s.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
