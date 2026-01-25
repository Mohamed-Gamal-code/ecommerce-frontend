/** @format */

import { getAllProducts } from "@/lib/product";
import ProductsTable from "../_components/ProductsTable";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Pagination from "../_components/Pagination";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
export const dynamic = "force-dynamic";
export default async function ProductsPage({ searchParams }) {
  const page = parseInt(searchParams?.page) || 1;
  const limit = 10; // يمكن تعديله إذا لزم الأمر
  const productsData = await getAllProducts(page, limit);
  const {
    data: products,
    totalProducts,
    totalPages: backendTotalPages,
  } = productsData;
  const totalPages = backendTotalPages || Math.ceil(totalProducts / limit);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Products</CardTitle>
            <CardDescription>
              Manage your products and view their sales performance.
            </CardDescription>
          </div>
          <Link href="/dashboard/products/create">
            <Button>Create Product</Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        {products && products.length > 0 ? (
          <>
            <ProductsTable products={products} />
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              totalProducts={totalProducts}
            />
          </>
        ) : (
          <div className="text-center py-10">
            <p>No products found.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
