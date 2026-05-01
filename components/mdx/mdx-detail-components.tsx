import type { MDXComponents } from "mdx/types";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import Image from "next/image";

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
  img: (props: any) => (
    <Image
      src={props.src}
      alt={props.alt || ""}
      width={1200}
      height={630}
      style={{ width: "100%", height: "auto" }}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 50vw"
    />
  ),
} satisfies MDXComponents;
