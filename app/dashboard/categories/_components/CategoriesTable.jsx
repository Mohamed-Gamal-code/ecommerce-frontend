/** @format */

'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/Context/AuthContext';
import { deleteCategory } from '@/lib/categories';
import { toast } from 'sonner';
import { 
  Edit3, 
  Trash2, 
  MoreVertical, 
  Calendar, 
  Layers
} from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from "@/components/ui/button";

export default function CategoriesTable({ data }) {
  const router = useRouter();
  const { getValidToken } = useAuth();
  const [isDeleting, setIsDeleting] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  const handleDelete = async () => {
    if (!categoryToDelete) return;
    setIsDeleting(true);
    try {
      const token = await getValidToken();
      if (!token) throw new Error("Authentication failed.");
      await deleteCategory(categoryToDelete._id, token);
      toast.success(`Category '${categoryToDelete.name}' deleted.`);
      setCategoryToDelete(null);
      router.refresh();
    } catch (error) {
      toast.error(error.message || "Failed to delete.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="w-full">
      {/* Main Table Container - Edge to Edge */}
      <div className="w-full bg-white rounded-[2.5rem] border border-zinc-100 shadow-sm overflow-hidden">
        <Table className="w-full border-collapse">
          <TableHeader className="bg-zinc-50/50">
            <TableRow className="hover:bg-transparent border-zinc-100">
              <TableHead className="py-6 px-10 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 w-[180px]">
                Asset Image
              </TableHead>
              {/* العمود ده ملوش عرض ثابت عشان يملأ باقي مساحة الشاشة */}
              <TableHead className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 w-full">
                Category Name
              </TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 w-[220px]">
                Deployment Date
              </TableHead>
              <TableHead className="text-right px-10 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 w-[150px]">
                Management
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data && data.length > 0 ? (
              data.map((category) => (
                <TableRow 
                  key={category._id} 
                  className="group hover:bg-zinc-50/50 transition-colors border-zinc-100 h-24"
                >
                  <TableCell className="px-10">
                    <div className="relative h-16 w-16 rounded-2xl overflow-hidden border border-zinc-100 bg-zinc-50 group-hover:scale-105 transition-transform duration-300">
                      {category.image?.url ? (
                        <Image
                          src={category.image.url}
                          alt={category.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <Layers className="text-zinc-300" size={24} />
                        </div>
                      )}
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="flex flex-col">
                      <span className="text-xl font-black italic uppercase tracking-tighter text-black leading-tight group-hover:translate-x-1 transition-transform">
                        {category.name}
                      </span>
                      <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                        System Node #{category._id.slice(-4)}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-2 text-zinc-500 font-bold uppercase text-[11px] tracking-tight">
                      <Calendar size={14} className="text-zinc-300" />
                      {new Date(category.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </div>
                  </TableCell>

                  <TableCell className="text-right px-10">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-12 w-12 p-0 rounded-2xl hover:bg-black hover:text-white transition-all shadow-none">
                          <MoreVertical size={20} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-56 p-2 rounded-[1.5rem] border-zinc-100 shadow-2xl bg-white/95 backdrop-blur">
                        <DropdownMenuItem
                          className="flex items-center gap-3 py-4 px-5 rounded-xl cursor-pointer font-black text-[10px] uppercase tracking-widest hover:bg-zinc-50"
                          onClick={() => router.push(`/dashboard/categories/edit/${category._id}`)}
                        >
                          <Edit3 size={16} /> Edit Node
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="flex items-center gap-3 py-4 px-5 rounded-xl cursor-pointer font-black text-[10px] uppercase tracking-widest text-red-500 focus:text-red-500 focus:bg-red-50"
                          onClick={() => setCategoryToDelete(category)}
                        >
                          <Trash2 size={16} /> Terminate
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="h-64 text-center">
                  <div className="flex flex-col items-center justify-center gap-4 opacity-20">
                    <Layers size={60} strokeWidth={1} />
                    <span className="text-black font-black uppercase italic tracking-[0.3em] text-xs">
                      Zero Data Nodes Detected
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Delete Dialog */}
      <AlertDialog open={!!categoryToDelete} onOpenChange={() => setCategoryToDelete(null)}>
        <AlertDialogContent className="rounded-[3rem] p-10 border-none shadow-2xl max-w-lg">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-3xl font-black uppercase italic tracking-tighter text-black">
              Confirm Termination?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-zinc-400 font-bold text-sm leading-relaxed uppercase tracking-tighter pt-4">
              The node <span className="text-red-500 underline underline-offset-4">{categoryToDelete?.name}</span> will be purged. This action is irreversible.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-3 pt-8">
            <AlertDialogCancel className="rounded-2xl font-black uppercase text-[10px] tracking-widest h-14 px-8 border-zinc-100 hover:bg-zinc-50 cursor-pointer">Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDelete} 
              className="bg-black hover:bg-zinc-800 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest h-14 px-8 cursor-pointer"
              disabled={isDeleting}
            >
              {isDeleting ? "PURGING..." : "CONFIRM PURGE"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}