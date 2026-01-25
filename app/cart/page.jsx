/** @format */

"use client";

import React, { useMemo } from "react";
import { useCart } from "../Context/CartContext";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Trash2, ShoppingBag, Minus, Plus, ArrowRight } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { toast } from "sonner";
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

const EmptyCart = () => (
  <div className="container mx-auto px-6 py-24 text-center flex flex-col items-center">
    <div className="w-20 h-20 bg-zinc-50 rounded-full flex items-center justify-center mb-6">
      <ShoppingBag className="h-8 w-8 text-zinc-300" />
    </div>
    <h1 className="text-4xl font-black uppercase italic tracking-tighter">Your Bag is Empty</h1>
    <p className="mt-3 text-zinc-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-8">
      Start adding assets to your collection.
    </p>
    <Button asChild className="bg-black text-white hover:bg-zinc-800 px-10 py-6 rounded-full text-[10px] font-black uppercase tracking-widest">
      <Link href="/products">Continue Shopping</Link>
    </Button>
  </div>
);

const CartItem = React.memo(({ item, onUpdate, onRemove }) => {
  return (
    <div className="flex flex-col md:flex-row gap-6 py-8 border-b border-zinc-100 last:border-0 items-center">
      {/* Product Image */}
      <div className="relative w-28 h-32 bg-zinc-50 rounded-[1.5rem] overflow-hidden flex-shrink-0 border border-zinc-100">
        <Image
          src={item.coverImage?.url || "/placeholder.jpg"}
          alt={item.title}
          fill
          className="object-cover"
        />
      </div>

      {/* Details */}
      <div className="flex-grow text-center md:text-left">
        <h2 className="text-lg font-black uppercase italic tracking-tighter mb-1 leading-none">{item.title}</h2>
        <div className="flex flex-wrap justify-center md:justify-start gap-3 text-[9px] font-bold uppercase tracking-widest text-zinc-400 mb-4">
          {item.size && <span>Size: <span className="text-black">{item.size}</span></span>}
          {item.color && <span>Color: <span className="text-black">{item.color}</span></span>}
        </div>
        
        {/* Quantity Controls */}
        <div className="flex items-center justify-center md:justify-start gap-4">
            <div className="flex items-center border border-zinc-200 rounded-full p-1 bg-white">
                <button 
                    onClick={() => onUpdate(item._id, item.size, item.color, -1)}
                    disabled={item.quantity <= 1}
                    className="w-8 h-8 flex items-center justify-center hover:bg-zinc-50 rounded-full transition-colors disabled:opacity-30"
                >
                    <Minus size={14} />
                </button>
                <span className="w-8 text-center text-xs font-black">{item.quantity}</span>
                <button 
                    onClick={() => onUpdate(item._id, item.size, item.color, 1)}
                    disabled={item.quantity >= item.stock}
                    className="w-8 h-8 flex items-center justify-center hover:bg-zinc-50 rounded-full transition-colors disabled:opacity-30"
                >
                    <Plus size={14} />
                </button>
            </div>
            <button 
                onClick={() => onRemove(item)}
                className="text-zinc-300 hover:text-red-600 transition-colors"
            >
                <Trash2 size={18} />
            </button>
        </div>
      </div>

      {/* Pricing */}
      <div className="text-right flex flex-col items-center md:items-end gap-1 min-w-[120px]">
        <span className="text-xl font-black italic tracking-tighter">
          {formatPrice(item.price * item.quantity, item.currency)}
        </span>
        <span className="text-[9px] font-bold text-zinc-300 uppercase tracking-widest">
            {formatPrice(item.price, item.currency)} / unit
        </span>
      </div>
    </div>
  );
});

CartItem.displayName = "CartItem";

const OrderSummary = ({ total, currency, onClearCart }) => {
  return (
    <div className="w-full lg:w-[380px]">
      <div className="bg-zinc-50 rounded-[2rem] p-8 md:p-10 sticky top-28 border border-zinc-100">
        <h2 className="text-xl font-black uppercase italic tracking-tighter mb-8">Order Summary</h2>
        
        <div className="space-y-4 mb-8 text-[11px] font-bold uppercase tracking-widest">
            <div className="flex justify-between text-zinc-400">
                <span>Subtotal</span>
                <span className="text-black">{formatPrice(total, currency)}</span>
            </div>
            <div className="flex justify-between text-zinc-400">
                <span>Shipping</span>
                <span className="text-black italic">Calculated at next step</span>
            </div>
            <div className="h-px bg-zinc-200 my-6" />
            <div className="flex justify-between items-end">
                <span className="text-xs font-black tracking-tighter">Estimated Total</span>
                <span className="text-3xl font-black italic tracking-tighter leading-none">{formatPrice(total, currency)}</span>
            </div>
        </div>

        <div className="flex flex-col gap-3">
          <Button asChild className="w-full py-8 bg-black text-white rounded-2xl hover:bg-zinc-800 shadow-lg shadow-black/5 group">
            <Link href="/checkout" className="flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-widest">
              Proceed to Checkout
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button className="w-full py-2 text-[9px] font-bold uppercase tracking-widest text-zinc-400 hover:text-red-600 transition-colors">
                Clear Cart
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent className="rounded-[2rem]">
              <AlertDialogHeader>
                <AlertDialogTitle className="font-black uppercase italic tracking-tighter text-2xl">Are you sure?</AlertDialogTitle>
                <AlertDialogDescription className="text-xs font-bold uppercase tracking-widest">
                  This will remove all assets from your current bag.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className="gap-2">
                <AlertDialogCancel className="rounded-xl font-black uppercase text-[10px] tracking-widest">Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={onClearCart} className="bg-red-600 hover:bg-red-700 text-white rounded-xl font-black uppercase text-[10px] tracking-widest">
                  Clear Everything
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
};

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();

  const total = useMemo(
    () => cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
    [cart]
  );

  const currency = cart.length > 0 ? cart[0].currency : "EGP";

  if (cart.length === 0) return <EmptyCart />;

  return (
    <div className="container mx-auto px-6 py-12 md:py-20">
      <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
        <div className="flex-grow">
          <div className="flex items-baseline gap-4 mb-12">
            <h1 className="text-5xl font-black uppercase italic tracking-tighter">Your Bag</h1>
            <span className="text-xs font-bold text-zinc-300 uppercase tracking-widest">[{cart.length} Assets]</span>
          </div>
          
          <div className="flex flex-col">
            {cart.map((item) => (
              <CartItem
                key={`${item._id}-${item.size}-${item.color}`}
                item={item}
                onUpdate={updateQuantity}
                onRemove={(i) => {
                    removeFromCart(i._id, i.size, i.color);
                    toast.error(`"${i.title}" removed`);
                }}
              />
            ))}
          </div>
        </div>
        
        <OrderSummary 
          total={total} 
          currency={currency} 
          onClearCart={() => {
            clearCart();
            toast.success("Bag cleared");
          }} 
        />
      </div>
    </div>
  );
};

export default CartPage;