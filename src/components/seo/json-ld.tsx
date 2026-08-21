// Renders one or more JSON-LD structured-data blocks. Server component (no
// client JS). Use with the schema builders in @/lib/seo, e.g.
//   <JsonLd data={[organizationSchema(), websiteSchema()]} />
export function JsonLd({ data }: { data: object | object[] }) {
  const blocks = Array.isArray(data) ? data : [data];
  return (
    <>
      {blocks.map((block, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }}
        />
      ))}
    </>
  );
}
