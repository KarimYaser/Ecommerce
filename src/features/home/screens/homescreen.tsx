import Slider from "../components/slider";
import PromoBanner from "../components/PromoBanner";
import OurCategories from "../components/OurCategories";
import DealsBanner from "../components/DealsBanner";
import FeaturedProducts from "../components/FeaturedProducts";
import NewsLetter from "../components/NewsLetter";

export default function HomeScreen() {
  return (
    <div>
      <Slider />
      <PromoBanner />
      <OurCategories />
      <DealsBanner />
      <FeaturedProducts />
      <NewsLetter />
    </div>
  );
}
