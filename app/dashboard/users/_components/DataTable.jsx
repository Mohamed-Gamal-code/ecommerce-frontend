/** @format */
"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/app/Context/AuthContext";
import { deleteUser } from "@/lib/user";
import { toast } from "sonner";
import { Trash2, Edit, ShieldCheck, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export function DataTable({ data, onDelete }) {
  const { user: authUser, getValidToken } = useAuth();
  const isAdmin = authUser?.role === "admin";

  const handleDelete = async (userId) => {
    if (!userId) return;
    toast.promise(deleteUser(getValidToken, userId), {
      loading: "Processing Archive Purge...",
      success: () => {
        onDelete(userId);
        return "User data purged successfully.";
      },
      error: "Operation failed.",
    });
  };

  return (
    <div className="w-full overflow-x-auto custom-scrollbar">
      <div className="min-w-[1000px] w-full bg-white rounded-[2.5rem] border border-zinc-100 shadow-sm overflow-hidden">
        <table className="w-full border-collapse table-fixed">
          <thead>
            <tr className="border-b border-zinc-100 bg-zinc-50/50 h-20">
              {/* Identity - خد مساحة كافية للاسم والصورة */}
              <th className="px-8 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 text-left w-[30%]">
                User Identity
              </th>
              {/* Access Point - الإيميل */}
              <th className="px-8 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 text-left w-[30%] hidden md:table-cell">
                Access Point
              </th>
              {/* Status - محاذاته في السنتر وعرضه محدد */}
              <th className="px-4 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 text-center w-[15%]">
                Status
              </th>
              {/* Management - في الآخر خالص ومحاذاة لليمين */}
              {isAdmin && (
                <th className="px-8 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 text-right w-[25%]">
                  Management
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-50">
            {data?.map((row) => (
              <tr 
                key={row._id} 
                className="group hover:bg-zinc-50/40 transition-all duration-300 h-24"
              >
                {/* Identity */}
                <td className="px-8">
                  <div className="flex items-center gap-4">
                    <div className="relative flex-shrink-0">
                      <img
                        src={row.avatar?.url || "/default-avatar.png"}
                        alt={row.name}
                        className="w-12 h-12 rounded-2xl object-cover ring-4 ring-zinc-50 shadow-sm"
                      />
                      {row.role === 'admin' && (
                        <div className="absolute -top-1 -right-1 bg-black text-white p-1 rounded-lg">
                          <ShieldCheck size={10} />
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-base font-black uppercase italic tracking-tighter text-black truncate leading-tight">
                        {row.name}
                      </span>
                    </div>
                  </div>
                </td>

                {/* Access Point */}
                <td className="px-8 hidden md:table-cell">
                  <div className="flex flex-col truncate">
                    <span className="text-[11px] font-bold text-zinc-600 tracking-tight truncate lowercase">
                      {row.email}
                    </span>
                    <span className="text-[8px] font-black text-zinc-300 uppercase tracking-[0.2em] mt-0.5">
                      NODE_{row._id.slice(-6)}
                    </span>
                  </div>
                </td>

                {/* Status - Privilege */}
                <td className="px-4 text-center">
                  <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] ${
                    row.role === 'admin' 
                    ? 'bg-black text-white shadow-lg shadow-black/5' 
                    : 'bg-zinc-100 text-zinc-400'
                  }`}>
                    {row.role}
                  </span>
                </td>

                {/* Management - أزرار التعديل والمسح في آخر عمود */}
                {isAdmin && (
                  <td className="px-8 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <Link href={`/dashboard/users/${row._id}/edit`}>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-10 w-10 rounded-xl border-zinc-100 hover:bg-black hover:text-white transition-all shadow-none"
                        >
                          <Edit size={16} />
                        </Button>
                      </Link>

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className="h-10 w-10 rounded-xl border-zinc-100 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all text-red-400"
                          >
                            <Trash2 size={16} />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="rounded-[3rem] p-10 border-none shadow-2xl">
                          <AlertDialogHeader>
                            <AlertDialogTitle className="text-3xl font-black uppercase italic tracking-tighter text-black">
                              Purge Account?
                            </AlertDialogTitle>
                            <AlertDialogDescription className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 leading-relaxed pt-4">
                              Archive deletion for <span className="text-red-600 underline">{row.name}</span> is permanent.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter className="mt-10 flex gap-4">
                            <AlertDialogCancel className="h-14 flex-1 rounded-2xl border-zinc-100 text-[10px] font-black uppercase tracking-[0.3em]">
                              Abort
                            </AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(row._id)}
                              className="h-14 flex-1 rounded-2xl bg-black text-white text-[10px] font-black uppercase tracking-[0.3em]"
                            >
                              Purge Data
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}