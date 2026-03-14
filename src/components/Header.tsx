"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  ArrowRight,
  Utensils,
  Beef,
  Pizza,
  Wine,
  Coffee,
  Store,
  ShoppingBag,
  TreePalm,
  Phone,
  Video,
  Mic,
  Users,
} from "lucide-react";
import { NAV_LINKS, WHATSAPP_URL, PHONE as PHONE_NUMBER } from "@/lib/constants";

const dropdownIcons: Record<string, React.ElementType> = {
  Restaurantes: Utensils,
  Hamburguerias: Beef,
  Pizzarias: Pizza,
  Bares: Wine,
  Cafeterias: Coffee,
  "Food Service": Store,
  Varejo: ShoppingBag,
  Turismo: TreePalm,
  "Lucro Real em 30 Min": Video,
  "3 Erros de Crescimento": Mic,
  "Liderança na Prática": Users,
};

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [dropdown, setDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const closeMenu = () => {
    setIsOpen(false);
    setMobileExpanded(null);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-cream/95 backdrop-blur-md shadow-lg shadow-navy-950/5"
            : "bg-cream/80 backdrop-blur-sm"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between lg:h-20">
            {/* Logo: ícone no mobile, horizontal no desktop */}
            <Link href="/" className="group flex items-center gap-2">
              <Image
                src="/images/logo/ija-icone-azul.png"
                alt="Instituto João Alves"
                width={200}
                height={200}
                className="h-10 w-10 lg:h-12 lg:w-12"
                priority
              />
            </Link>

            {/* Desktop Nav */}
            <nav
              className="hidden items-center gap-0.5 lg:flex"
              ref={dropdownRef}
            >
              {NAV_LINKS.map((link) =>
                link.children ? (
                  <div key={link.href} className="relative">
                    <button
                      onClick={() =>
                        setDropdown(
                          dropdown === link.label ? null : link.label
                        )
                      }
                      className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-navy-700 transition-colors hover:bg-navy-50 hover:text-navy-950"
                    >
                      {link.label}
                      <ChevronDown
                        size={14}
                        className={`transition-transform duration-200 ${
                          dropdown === link.label ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <AnimatePresence>
                      {dropdown === link.label && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.96 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                          className="absolute left-0 top-full mt-2 w-64 overflow-hidden rounded-xl border border-navy-100 bg-white p-2 shadow-xl shadow-navy-950/10"
                        >
                          {link.children.map((child) => {
                            const Icon =
                              dropdownIcons[child.label] || Utensils;
                            return (
                              <Link
                                key={child.href}
                                href={child.href}
                                onClick={() => setDropdown(null)}
                                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-navy-700 transition-all hover:bg-navy-50 hover:text-navy-950"
                              >
                                <Icon size={16} className="text-accent" />
                                {child.label}
                              </Link>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="rounded-lg px-3 py-2 text-sm font-medium text-navy-700 transition-colors hover:bg-navy-50 hover:text-navy-950"
                  >
                    {link.label}
                  </Link>
                )
              )}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex">
              <Link
                href="/diagnostico"
                className="glow-orange-sm rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-accent-dark hover:scale-105"
              >
                Diagnóstico Gratuito
              </Link>
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="relative z-[60] rounded-lg p-2 text-navy-700 transition-colors hover:bg-navy-50 lg:hidden"
              aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={24} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={24} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.header>

      {/* ===== MOBILE MENU ===== */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-white lg:hidden"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="flex h-full flex-col overflow-y-auto pt-16 pb-4"
            >
              {/* Nav Links - compacto */}
              <nav className="flex-1 px-4">
                <div className="divide-y divide-navy-100/60">
                  {NAV_LINKS.map((link, index) => {
                    const hasChildren = !!link.children;
                    const isExpanded = mobileExpanded === link.label;

                    return (
                      <motion.div
                        key={link.href}
                        initial={{ opacity: 0, x: -16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.25,
                          delay: 0.03 * index,
                        }}
                      >
                        {hasChildren ? (
                          <>
                            <button
                              onClick={() =>
                                setMobileExpanded(
                                  isExpanded ? null : link.label
                                )
                              }
                              className="flex w-full items-center justify-between px-2 py-3.5"
                            >
                              <span className="text-[15px] font-semibold text-navy-950">
                                {link.label}
                              </span>
                              <ChevronDown
                                size={16}
                                className={`text-navy-400 transition-transform duration-300 ${
                                  isExpanded ? "rotate-180" : ""
                                }`}
                              />
                            </button>

                            <AnimatePresence>
                              {isExpanded && link.children && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{
                                    duration: 0.25,
                                    ease: [0.22, 1, 0.36, 1],
                                  }}
                                  className="overflow-hidden"
                                >
                                  <div className="grid grid-cols-2 gap-1.5 pb-3">
                                    {link.children.map((child) => {
                                      const ChildIcon =
                                        dropdownIcons[child.label] || Utensils;
                                      return (
                                        <Link
                                          key={child.href}
                                          href={child.href}
                                          onClick={closeMenu}
                                          className="flex items-center gap-2 rounded-xl bg-cream px-3 py-2.5 transition-colors hover:bg-navy-50"
                                        >
                                          <ChildIcon
                                            size={14}
                                            className="shrink-0 text-accent"
                                          />
                                          <span className="text-sm font-medium text-navy-700">
                                            {child.label}
                                          </span>
                                        </Link>
                                      );
                                    })}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </>
                        ) : (
                          <Link
                            href={link.href}
                            onClick={closeMenu}
                            className="flex items-center justify-between px-2 py-3.5"
                          >
                            <span className="text-[15px] font-semibold text-navy-950">
                              {link.label}
                            </span>
                            <ChevronRight size={16} className="text-navy-300" />
                          </Link>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </nav>

              {/* Bottom section - compacto */}
              <div className="space-y-2.5 px-4 pt-4">
                <div className="h-px bg-navy-100" />

                {/* WhatsApp */}
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMenu}
                  className="flex items-center gap-3 rounded-xl bg-navy-50 px-4 py-3"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#25D366]/10 text-[#25D366]">
                    <Phone size={15} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-navy-950">
                      WhatsApp
                    </p>
                    <p className="text-xs text-navy-500">{PHONE_NUMBER}</p>
                  </div>
                </a>

                {/* CTA */}
                <Link
                  href="/diagnostico"
                  onClick={closeMenu}
                  className="flex items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-accent-dark active:scale-[0.98]"
                >
                  Diagnóstico Gratuito
                  <ArrowRight size={16} />
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
