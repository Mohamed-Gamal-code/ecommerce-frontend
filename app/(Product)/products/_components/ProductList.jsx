/** @format */
import ProductCard from "./ProductCard";

const ProductList = ({ products }) => {
  if (!products || products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-zinc-50 rounded-3xl border border-dashed border-zinc-200">
        <p className="text-zinc-400 font-medium uppercase tracking-[0.3em] text-[10px]">
          No products found in this collection.
        </p>
      </div>
    );
  }

  return (
    <section className="w-full">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-8 md:gap-y-16">
        {products.map((product) => (
          <ProductCard product={product} key={product._id} />
        ))}
      </div>
    </section>
  );
};

export default ProductList;