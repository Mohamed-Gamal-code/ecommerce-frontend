/** @format */

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from "./_components/Sidebar";
import { Menu, X } from 'lucide-react';

const LoadingScreen = () => (
  <div className="flex flex-col items-center justify-center h-screen w-full bg-white gap-4">
    <div className="w-12 h-12 border-[3px] border-zinc-100 border-t-black animate-spin rounded-full" />
    <p className="text-[10px] font-black uppercase tracking-[0.5em] text-black italic animate-pulse">
      Authenticating Hub
    </p>
  </div>
);

export default function DashboardLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const router = useRouter();

  useEffect(() => {
    let user = null;
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        user = JSON.parse(storedUser);
      }
    } catch (e) {
      // تم مسح console.log بناءً على طلبك السابق
    }

    if (user && user.role === 'admin') {
      setIsVerified(true);
    } else {
      router.push('/login');
    }
  }, [router]);

  if (!isVerified) {
    return <LoadingScreen />;
  }

  return (
    <div className="flex h-screen bg-white w-full overflow-hidden font-sans">
      
      {/* 1. السايد بار - تأكد إن عرضه الثابت مطابق للـ Margin اللي تحت (هنا فرضنا إنه 280px أو w-72) */}
      <aside className={`fixed inset-y-0 left-0 z-[50] transition-transform duration-300 md:relative md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
         <Sidebar isSidebarOpen={isSidebarOpen} />
      </aside>
      
      {/* 2. منطقة المحتوى الأساسية */}
      <div className="flex-1 flex flex-col min-w-0 h-full relative overflow-hidden">
        
        {/* هيدر الموبايل فقط */}
        <header className="bg-white/80 backdrop-blur-md border-b border-zinc-100 md:hidden sticky top-0 z-[49]">
          <div className="px-6 py-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-black rounded flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rotate-45"></div>
                </div>
                <h1 className="text-sm font-black uppercase italic tracking-tighter text-black">
                  Velo<span className="text-zinc-400">core.</span>
                </h1>
            </div>
            
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="w-10 h-10 flex items-center justify-center bg-black text-white rounded-full transition-transform active:scale-90"
            >
              {isSidebarOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </header>

        {/* منطقة الـ Scroll الأساسية */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden bg-[#fafafa] relative scroll-smooth">
            
           {/* خلفية جمالية علوية */}
           <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-white to-transparent pointer-events-none opacity-50 z-0"></div>
           
           {/* الحاوية الفعلية للـ DashboardPage */}
           <div className="relative z-10 p-6 md:p-10 lg:p-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
              {children}
           </div>

           {/* Footer */}
           <footer className="p-12 mt-auto opacity-20 pointer-events-none">
              <p className="text-[8px] font-black uppercase tracking-[1em] text-center">Velocore Terminal</p>
           </footer>
        </main>
      </div>

      {/* Overlay للموبايل فقط */}
      {isSidebarOpen && (
        <div 
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[45] md:hidden transition-all duration-500"
        ></div>
      )}
    </div>
  );
}