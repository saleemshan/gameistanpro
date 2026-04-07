"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

export function FAQSection({
  faqs,
}: {
  faqs: { question: string; answer: string }[];
}) {
  if (!faqs.length) return null;

  return (
    <section className="space-y-4">
      <h2 className="font-display text-xl font-bold text-text">FAQ</h2>
      <Accordion.Root type="single" collapsible className="space-y-2">
        {faqs.map((f, i) => (
          <Accordion.Item
            key={i}
            value={`faq-${i}`}
            className="overflow-hidden rounded-xl border border-border-subtle bg-bg-card/50"
          >
            <Accordion.Header>
              <Accordion.Trigger className="flex w-full items-center justify-between gap-2 px-4 py-3 text-left font-medium text-text hover:bg-accent-dim/30 [&[data-state=open]>svg]:rotate-180">
                {f.question}
                <ChevronDown className="size-4 shrink-0 text-accent transition-transform" />
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content className="border-t border-border-subtle px-4 py-3 text-sm text-text-muted">
              {f.answer}
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </section>
  );
}
