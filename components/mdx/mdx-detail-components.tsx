import type { MDXComponents } from "mdx/types";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

function Table(
  props: ComponentPropsWithoutRef<"table"> & { children?: ReactNode },
) {
  const { children, className, ...rest } = props;
  return (
    <div className="mdx-table-wrap not-prose my-6 w-full min-w-0">
      <table
        className={
          className ??
          "w-full border-collapse text-left text-sm text-muted-foreground"
        }
        {...rest}
      >
        {children}
      </table>
    </div>
  );
}

export const mdxDetailComponents = {
  table: Table,
} satisfies MDXComponents;
