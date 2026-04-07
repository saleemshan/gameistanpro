import { ListOrdered } from "lucide-react";

import { JsonLd } from "@/components/seo/JsonLd";

export function InstallSteps({
  steps,
}: {
  steps: { title: string; description: string }[];
}) {
  if (!steps.length) return null;

  const howTo = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Install steps",
    step: steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.title,
      text: s.description,
    })),
  };

  return (
    <section className="space-y-4">
      <JsonLd data={howTo} />
      <h2 className="flex items-center gap-2 font-display text-xl font-bold text-text">
        <ListOrdered className="size-5 text-accent" />
        Install steps
      </h2>
      <ol className="space-y-4">
        {steps.map((s, i) => (
          <li
            key={s.title}
            className="flex gap-4 rounded-xl border border-border-subtle bg-bg-card/50 p-4"
          >
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-accent-dim font-mono text-sm font-bold text-accent">
              {i + 1}
            </span>
            <div>
              <h3 className="font-display font-semibold text-text">{s.title}</h3>
              <p className="mt-1 text-sm text-text-muted">{s.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
