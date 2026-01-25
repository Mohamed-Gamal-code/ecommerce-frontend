/** @format */
import { getAllCategory } from "@/lib/categories";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const AllCategorys = async () => {
  try {
    const { data: categories } = await getAllCategory();

    return (
      <section className="bg-white py-20 px-6">
        <div className="mx-auto max-w-screen-xl">
          
          {/* Header Section - Modern & Clean */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="w-8 h-[1.5px] bg-black"></span>
                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.3em]">
                  The Collections
                </p>
              </div>
              <h2 className="text-4xl font-black uppercase tracking-tighter text-black leading-none">
                THE LIBRARY
              </h2>
            </div>
            
            <Link 
              href="/products" 
              className="group flex items-center gap-2 text-[11px] font-black uppercase tracking-widest border-b-2 border-black pb-1 hover:text-zinc-500 hover:border-zinc-300 transition-all duration-300"
            >
              Explore All <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>

          {categories && categories.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((category) => (
                <Link 
                  href={`/category/${category.slug || category._id}`} 
                  key={category._id}
                  className="group relative h-[380px] w-full bg-zinc-100 rounded-[2rem] overflow-hidden transition-all duration-700 hover:shadow-2xl hover:shadow-black/10"
                >
                  {/* Image Layer */}
                  <div className="relative w-full h-full">
                    <Image
                      src={category.image?.url || "/bg.jpg"}
                      alt={category.name}
                      fill
                      priority
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-1000 ease-in-out group-hover:scale-110"
                    />
                    
                    {/* Dark Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                  </div>

                  {/* Content Overlay */}
                  <div className="absolute inset-0 p-8 flex flex-col justify-end">
                    <div className="space-y-3">
                      <span className="inline-block px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[8px] font-bold text-white uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                        View Category
                      </span>
                      
                      <div className="flex items-center justify-between">
                        <h3 className="text-2xl font-black text-white uppercase tracking-tighter">
                          {category.name}
                        </h3>
                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-black transform translate-y-10 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                          <ArrowUpRight size={20} />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="py-32 text-center">
              <span className="inline-block animate-pulse text-[11px] font-black uppercase tracking-[0.6em] text-zinc-400">
                Architecting Catalog...
              </span>
            </div>
          )}
        </div>
      </section>
    );
  } catch (error) {
    return (
      <div className="py-24 text-center">
        <div className="inline-block px-6 py-3 rounded-full bg-red-50 text-red-500 text-[10px] font-bold uppercase tracking-widest border border-red-100">
          Sync_Error // Failed to fetch library
        </div>
      </div>
    );
  }
};

export default AllCategorys;