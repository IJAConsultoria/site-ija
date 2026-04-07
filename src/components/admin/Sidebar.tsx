"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  MessageSquare,
  Download,
  Trophy,
  Megaphone,
  Mail,
  Users,
  Shield,
  LogOut,
  Menu,
  X,
  ExternalLink,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

const navItems = [
  { href: "/acesso/painel", label: "Painel", icon: LayoutDashboard },
  { href: "/acesso/artigos", label: "Artigos", icon: FileText },
  { href: "/acesso/comentarios", label: "Comentários", icon: MessageSquare },
  { href: "/acesso/iscas", label: "Iscas Digitais", icon: Download },
  { href: "/acesso/historias", label: "Histórias", icon: Trophy },
  { href: "/acesso/banners", label: "Banners", icon: Megaphone },
  { href: "/acesso/leads", label: "Email Marketing", icon: Mail },
  { href: "/acesso/ouvidoria", label: "Ouvidoria", icon: Shield },
  { href: "/acesso/usuarios", label: "Usuários", icon: Users },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  if (pathname === "/acesso") return null;

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/acesso");
  };

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="fixed top-4 left-4 z-50 rounded-lg bg-navy-900 p-2 text-white lg:hidden"
      >
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-40 flex h-full w-64 flex-col bg-navy-950 transition-transform duration-300 lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="flex h-16 items-center gap-3 border-b border-white/10 px-6">
          <Image
            src="/images/logo/ija-icone-azul.png"
            alt="IJA"
            width={32}
            height={32}
            className="h-8 w-8 brightness-0 invert"
          />
          <span className="text-sm font-bold text-white">IJA Admin</span>
        </div>

        {/* Nav */}
        <nav className="flex-1 space-y-1 px-3 py-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive(item.href)
                  ? "bg-accent text-white"
                  : "text-navy-300 hover:bg-white/5 hover:text-white"
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </Link>
          ))}

          <div className="my-4 h-px bg-white/10" />

          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-navy-400 transition-colors hover:bg-white/5 hover:text-white"
          >
            <ExternalLink size={18} />
            Ver site
          </a>
        </nav>

        {/* Logout */}
        <div className="border-t border-white/10 p-3">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-navy-400 transition-colors hover:bg-red-500/10 hover:text-red-400"
          >
            <LogOut size={18} />
            Sair
          </button>
        </div>
      </aside>
    </>
  );
}
