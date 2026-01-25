/** @format */

import AllCategorys from "./_components/AllCategorys";
import OnSaleProducts from "./_components/OnSaleProducts";
import FeaturedProducts from "./_components/FeaturedProducts";
import AllProducts from "./_components/AllProducts";
import HeroSection from "./_components/HeroSection";
export default function Home() {
  return (
    <div>
      <HeroSection />
      <FeaturedProducts />
         
       <OnSaleProducts />
      <AllCategorys />
      <AllProducts />
    </div>
  );
}
