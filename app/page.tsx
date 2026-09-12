import { Hero } from '@/components/sections/Hero';
import { getHomePage } from '@/lib/api/home';

export default async function Home() {
  const home = await getHomePage();

  return (
    <>
      <Hero data={home.hero} />
    </>
  );
}
