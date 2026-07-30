import { DocsSidebar } from "@/components/docs/docs-sidebar";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex max-w-[1400px]">
      <DocsSidebar />
      <main id="main-content" className="min-w-0 flex-1 px-4 sm:px-6 lg:px-10">
        {children}
      </main>
    </div>
  );
}
