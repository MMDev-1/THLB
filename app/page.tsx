import { SectionRenderer } from '@/components/sections/SectionRenderer';
import { getHomePage } from '@/lib/api/home';

/* The homepage is data-driven: home.json lists the sections in order. */
export default async function Home() {
  const { sections } = await getHomePage();

  return (
    <>
      {sections.map((section, index) => (
        <SectionRenderer key={`${section.type}-${index}`} section={section} />
      ))}
    </>
  );
}
