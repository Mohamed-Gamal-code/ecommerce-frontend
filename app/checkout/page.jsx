/** @format */

"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useCart } from "../Context/CartContext";
import { useAuth } from "../Context/AuthContext";
import { useRouter } from "next/navigation";
import { formatPrice } from "@/lib/utils";
import { createOrder } from "@/lib/order";
import { toast } from "sonner";
import {
  ShieldCheck,
  Truck,
  CreditCard,
  ArrowLeft,
  ShoppingBag,
} from "lucide-react";
import Link from "next/link";

const CheckoutPage = () => {
  const { cart, clearCart } = useCart();
  const { user, token } = useAuth();
  const router = useRouter();

  const total = useMemo(
    () => cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
    [cart]
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    zip: "",
  });

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.name || "",
        email: user.email || "",
        address: user.address || "",
      }));
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please login to complete your order.");
      router.push("/login");
      return;
    }

    setIsSubmitting(true);
    const toastId = toast.loading("Processing your VELOCORE order...");

    try {
      const orderData = {
        shippingInfo: {
          address: formData.address,
          city: formData.city,
          zipCode: formData.zip,
        },
        orderItems: cart.map((item) => ({
          product: item._id,
          title: item.title,
          quantity: item.quantity,
          price: item.price,
          color: item.color,
          size: item.size,
        })),
        totalPrice: total,
        paymentInfo: { status: "pending" },
      };

      const data = await createOrder(orderData, token);
      toast.success("Order Placed Successfully", { id: toastId });
      clearCart();
      router.push(`/order/confirmation?orderId=${data.order._id}`);
    } catch (error) {
      toast.error(error.message || "Checkout failed", { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cart.length === 0 && !isSubmitting) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white p-6">
        <div className="w-20 h-20 bg-zinc-50 rounded-full flex items-center justify-center mb-6">
          <ShoppingBag className="text-zinc-300" size={32} />
        </div>
        <h1 className="text-2xl font-black uppercase tracking-tighter mb-2 text-black">
          Cart is Empty.
        </h1>
        <p className="text-zinc-400 text-[10px] font-bold uppercase tracking-[0.3em] mb-8">
          Curation incomplete.
        </p>
        <Link
          href="/products"
          className="px-8 py-4 bg-black text-white rounded-full text-[10px] font-black uppercase tracking-[0.3em] hover:bg-zinc-800 transition-all"
        >
          Return to Library
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black font-sans pb-24">
      <div className="max-w-7xl mx-auto px-6 pt-16">
        
        {/* Header - التعديل هنا: ملموم واحترافي جداً */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16 border-b border-zinc-100 pb-8">
          <div className="space-y-1">
            <Link
              href="/cart"
              className="group flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.4em] text-zinc-400 hover:text-black transition-all"
            >
              <ArrowLeft size={10} className="group-hover:-translate-x-1 transition-transform" />
              Review Cart
            </Link>
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-black">
              Checkout <span className="text-zinc-200 italic font-medium">Process.</span>
            </h1>
          </div>

          <div className="flex items-center gap-3 px-4 py-2 bg-zinc-50 rounded-full border border-zinc-100">
            <ShieldCheck size={16} className="text-zinc-400" />
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-500">
              Secured Checkout Active
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Left: Forms */}
          <div className="lg:col-span-7 space-y-16">
            <form onSubmit={handleSubmit} id="checkout-form" className="space-y-16">
              
              {/* Shipping Section */}
              <section className="space-y-10">
                <div className="flex items-center gap-4">
                  <span className="text-2xl font-black text-zinc-100 italic">01</span>
                  <h2 className="text-[11px] font-black uppercase tracking-[0.3em] border-b border-black pb-1">
                    Shipping Logistics
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
                  {[
                    { id: "name", label: "Full Name", type: "text" },
                    { id: "email", label: "Email Address", type: "email" },
                    { id: "address", label: "Street Address", type: "text", full: true },
                    { id: "city", label: "City", type: "text" },
                    { id: "zip", label: "ZIP / Postal Code", type: "text" },
                  ].map((field) => (
                    <div key={field.id} className={`${field.full ? "md:col-span-2" : ""} group`}>
                      <label className="text-[9px] font-black uppercase tracking-widest text-zinc-400 mb-2 block transition-colors group-focus-within:text-black">
                        {field.label}
                      </label>
                      <input
                        id={field.id}
                        type={field.type}
                        value={formData[field.id]}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-white border-b border-zinc-200 focus:border-black py-3 outline-none transition-all font-medium text-sm"
                      />
                    </div>
                  ))}
                </div>
              </section>

              {/* Payment Mockup */}
              <section className="space-y-8 pt-6">
                <div className="flex items-center gap-4">
                  <span className="text-2xl font-black text-zinc-100 italic"></span>
                  <h2 className="text-[11px] font-black uppercase tracking-[0.3em] border-b border-black pb-1">
                    Payment Method
                  </h2>
                </div>
              
              </section>
            </form>
          </div>

          {/* Right: Summary Card */}
          <div className="lg:col-span-5 lg:sticky lg:top-12">
            <div className="bg-black text-white rounded-[2.5rem] p-10 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.3)]">
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-2 opacity-60">
                  <ShoppingBag size={16} />
                  <span className="text-[9px] font-black uppercase tracking-[0.4em]">Cart Summary</span>
                </div>
                <span className="text-[9px] font-bold text-zinc-500">{cart.length} Items</span>
              </div>

              <div className="space-y-6 mb-12 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {cart.map((item) => (
                  <div key={`${item._id}-${item.size}`} className="flex justify-between items-start gap-4">
                    <div className="space-y-1">
                      <p className="text-[10px] font-black uppercase tracking-widest leading-tight">
                        {item.title}
                      </p>
                      <p className="text-[8px] font-bold text-zinc-500 uppercase tracking-[0.2em]">
                        QTY: {item.quantity} • {item.size} • {item.color}
                      </p>
                    </div>
                    <span className="text-[11px] font-bold italic">
                      {formatPrice(item.price * item.quantity, item.currency)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-5 border-t border-zinc-800 pt-8">
                <div className="flex justify-between text-zinc-500 text-[9px] font-black uppercase tracking-widest">
                  <span>Shipping</span>
                  <span className="text-zinc-300 italic">Complementary</span>
                </div>
                <div className="flex justify-between items-end pt-2">
                  <div className="flex flex-col">
                    <span className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-500">Grand Total</span>
                    <span className="text-4xl font-black tracking-tighter italic">
                      {formatPrice(total, cart[0]?.currency)}
                    </span>
                  </div>
                </div>
              </div>

              <button
                form="checkout-form"
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-10 py-6 bg-white text-black rounded-full font-black uppercase tracking-[0.3em] text-[10px] hover:bg-zinc-200 transition-all flex items-center justify-center gap-3 disabled:opacity-30 active:scale-95 shadow-xl shadow-white/5"
              >
                {isSubmitting ? (
                  "Finalizing Order..."
                ) : (
                  <>
                    Confirm Order <Truck size={16} />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;