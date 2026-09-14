import { CategoryTiles } from '@/components/sections/CategoryTiles';
import { Hero } from '@/components/sections/Hero';
import { ProductCarousel } from '@/components/sections/ProductCarousel';
import { SplitBanner } from '@/components/sections/SplitBanner';
import { ValueProps } from '@/components/sections/ValueProps';
import { getHomePage } from '@/lib/api/home';

export default async function Home() {
  const home = await getHomePage();

  return (
    <>
      <Hero data={home.hero} />
      <CategoryTiles data={home.categoryTiles} />
      <ProductCarousel data={home.productCarousel} />
      <ValueProps data={home.valueProps} />
      <SplitBanner data={home.splitBanner} />
    </>
  );
}
