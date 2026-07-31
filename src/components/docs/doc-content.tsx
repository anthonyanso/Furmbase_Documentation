import type { DocBlock } from "@/types/docs";
import { DocHeading } from "@/components/docs/doc-heading";
import { Callout } from "@/components/docs/callout";
import { CodeBlock } from "@/components/docs/code-block";

export function DocContent({ blocks }: { blocks: DocBlock[] }) {
  return (
    <div className="max-w-none">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "heading":
            return (
              <DocHeading key={block.id} id={block.id} level={block.level}>
                {block.title}
              </DocHeading>
            );

          case "paragraph":
            return (
              <p key={i} className="my-4 leading-7 text-[15px] text-foreground/85">
                {block.content}
              </p>
            );

          case "list":
            return block.ordered ? (
              <ol key={i} className="my-4 list-decimal space-y-2 pl-6 text-[15px] leading-7 text-foreground/85">
                {block.items.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ol>
            ) : (
              <ul key={i} className="my-4 list-disc space-y-2 pl-6 text-[15px] leading-7 text-foreground/85">
                {block.items.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
            );

          case "callout":
            return (
              <Callout key={i} variant={block.variant} title={block.title}>
                {block.content}
              </Callout>
            );

          case "code":
            return (
              <CodeBlock
                key={i}
                language={block.language}
                code={block.code}
                title={block.title}
              />
            );

          case "steps":
            return (
              <ol key={i} className="my-6 space-y-5">
                {block.items.map((step, j) => (
                  <li key={j} className="flex gap-4">
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                      {j + 1}
                    </span>
                    <div className="pt-0.5">
                      <p className="font-medium text-foreground">{step.title}</p>
                      <p className="mt-1 text-[15px] leading-relaxed text-foreground/75">
                        {step.content}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            );

          case "table":
            return (
              <div key={i} className="my-6 overflow-x-auto rounded-xl border border-border">
                <table className="w-full min-w-[420px] border-collapse text-left text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/60">
                      {block.headers.map((header, j) => (
                        <th
                          key={j}
                          className="px-4 py-2.5 font-semibold text-foreground whitespace-nowrap"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row, r) => (
                      <tr key={r} className="border-b border-border last:border-0 even:bg-muted/20">
                        {row.map((cell, c) => (
                          <td key={c} className="px-4 py-2.5 text-foreground/80 align-top">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );

          case "image":
            return (
              <figure key={i} className="my-6">
                <img
                  src={block.src}
                  alt={block.alt}
                  loading="lazy"
                  className="w-full rounded-xl border border-border"
                />
                {block.caption && (
                  <figcaption className="mt-2 text-center text-sm text-muted-foreground">
                    {block.caption}
                  </figcaption>
                )}
              </figure>
            );

          case "video":
            return (
              <figure key={i} className="my-6">
                <video
                  src={block.src}
                  poster={block.poster}
                  controls
                  playsInline
                  className="w-full rounded-xl border border-border bg-black"
                />
                {block.caption && (
                  <figcaption className="mt-2 text-center text-sm text-muted-foreground">
                    {block.caption}
                  </figcaption>
                )}
              </figure>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
