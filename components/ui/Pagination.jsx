/** @format */

"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Pagination({
  currentPage,
  totalPages,
  totalProducts,
  basePath = "/products",
}) {
  const searchParams = useSearchParams();

  const createPageURL = (pageNumber) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${basePath}?${params.toString()}`;
  };

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  return (
    <>
      <div className="mt-6 flex items-center justify-between">
        <div className="text-sm text-gray-700">
          Total Products: <span className="font-semibold">{totalProducts}</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm">
            Page {currentPage} of {totalPages}
          </span>
          <div className="flex items-center gap-2">
            <Link href={createPageURL(currentPage - 1)}>
              <Button variant="outline" size="sm" disabled={isFirstPage}>
                Previous
              </Button>
            </Link>
            <Link href={createPageURL(currentPage + 1)}>
              <Button variant="outline" size="sm" disabled={isLastPage}>
                Next
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* إخفاء جملة Total Products و Page 1 of X وكل النصوص الجانبية */
        .text-sm,
        .text-gray-700,
        span:not([class*="chevron"]) {
          display: none !important;
        }

        /* جعل الحاوية تلتزم بأقصى اليمين */
        div {
          display: flex !important;
          justify-content: flex-end !important;
          align-items: center !important;
          gap: 0.75rem !important;
          margin-top: 0 !important;
          width: auto !important;
        }

        /* تجميل أزرار Previous و Next */
        button {
          border-radius: 9999px !important; /* شكل دائري */
          padding: 0.6rem 1.5rem !important;
          font-size: 11px !important;
          font-weight: 900 !important;
          text-transform: uppercase !important;
          letter-spacing: 0.1em !important;
          transition: all 0.3s ease !important;
          border: 2px solid #000 !important;
          background: white !important;
          color: black !important;
          height: auto !important;
        }

        /* تمييز زرار الـ Next باللون الأسود */
        a:last-child button {
          background: black !important;
          color: white !important;
        }

        button:hover:not(:disabled) {
          transform: translateY(-2px);
          opacity: 0.8;
        }

        button:disabled {
          opacity: 0.2 !important;
          border-color: #e4e4e7 !important;
        }
      `}</style>
    </>
  );
}
