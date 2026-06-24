"use client";

import { usePathname } from "next/navigation";
// import { Search, Bell, Settings, Home as HomeIcon, Moon, Sun, Menu, X } from "lucide-react";
import { Search, Bell, Settings, Home as HomeIcon, Moon, Sun, Menu, X, FileText as FileTextIcon, Mail as MailIcon } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { memo, useMemo, useState } from "react";
import { useUI } from "@/context/UIContext";

/**
 * Navbar - Shared Design Component
 */
const NAV_LINKS = (t: any) => [
  { label: t("Home"), path: "/", icon: HomeIcon },
  { label: t("GIS Explorer"), path: "/explorer" },
  { label: t("Data Catalog"), path: "/catalog" },
  //  { label: t("National Water Data Policy"), path: "/docs/NWDP_Document.pdf", icon: FileTextIcon, target: "_blank" },
  { label: t("Documentation & Gallery"), path: "/resources" },
  { label: t("Contact Us"), path: "/contact", icon: MailIcon },
];

/**
 * Navbar - Shared Design Component
 */
export const Navbar = memo(function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme, language, setLanguage, t } = useUI();
  const links = useMemo(() => NAV_LINKS(t), [t]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="relative w-full z-50 transition-all duration-300">
      <div className="flex justify-between items-center w-full px-8 h-20 bg-blue-50/90 dark:bg-slate-950/80 backdrop-blur-md border-b border-blue-100/50 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-12">
          {/* Brand Terminal */}
          <Link href="/" className="flex flex-col group max-w-lg">
            <span className="text-base md:text-lg font-bold tracking-tight text-primary-blue dark:text-cyan-400 group-hover:text-primary-container transition-colors leading-tight">
              {t("AssamWRIS")}
            </span>
            <div className="flex flex-col mt-0.5">
               <span className="text-[8px] font-bold text-aquatic-teal dark:text-cyan-200 tracking-wider uppercase leading-none opacity-80">
                 {t("Water Resources Department")}
               </span>
               <span className="text-[10px] font-bold text-primary-container dark:text-blue-300 tracking-[0.1em] uppercase leading-tight mt-0.5">
                 {t("Govt. of Assam")}
               </span>
            </div>
          </Link>
          
          {/* Navigation Grid */}
          <nav className="hidden xl:flex gap-8 items-center h-full">
            {links.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                target={(link as any).target}
                rel={(link as any).target === "_blank" ? "noopener noreferrer" : undefined}
                className={`text-xs font-bold uppercase tracking-widest transition-all relative py-1 flex items-center gap-2 group ${
                  pathname === link.path
                    ? "text-primary-blue dark:text-cyan-400 opacity-100"
                    : "text-gray-400 dark:text-slate-400 hover:text-primary-blue dark:hover:text-cyan-400 opacity-70 hover:opacity-100"
                }`}
              >
                {pathname === link.path && (
                  <motion.div layoutId="nav-glow" className="absolute -bottom-2 left-0 right-0 h-1 bg-primary-blue dark:bg-cyan-500 rounded-full" />
                )}
                {link.icon && <link.icon className="w-3.5 h-3.5 transition-transform group-hover:scale-110" />}
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Control Actions */}
        <div className="flex items-center gap-4 md:gap-6">
          {/* Language Switcher - Hide label on tiny screens but keep selector */}
          <div className="flex items-center bg-white/60 dark:bg-slate-800 border border-blue-100/50 dark:border-slate-700 rounded-xl overflow-hidden shadow-sm backdrop-blur-sm">
            <button 
              onClick={() => setLanguage("en")}
              className={`px-3 py-1.5 text-[10px] font-bold transition-colors ${language === "en" ? "bg-primary-blue text-white" : "text-gray-400 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-700"}`}
            >
              EN
            </button>
            <button 
              onClick={() => setLanguage("as")}
              className={`px-3 py-1.5 text-[10px] font-bold transition-colors ${language === "as" ? "bg-primary-blue text-white" : "text-gray-400 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-700 font-hindi"}`}
            >
              AS
            </button>
          </div>

          {/* Theme Switcher */}
          <button 
            onClick={toggleTheme}
            className="p-2.5 bg-white/60 dark:bg-slate-800 border border-blue-100/50 dark:border-slate-700 rounded-xl hover:bg-white dark:hover:bg-slate-700 transition-all group flex items-center justify-center text-gray-500 dark:text-gray-400 shadow-sm backdrop-blur-sm"
            title={theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
          >
            {theme === "light" ? (
              <Moon className="w-5 h-5 group-hover:text-primary-blue transition-colors" />
            ) : (
              <Sun className="w-5 h-5 group-hover:text-yellow-500 transition-colors" />
            )}
          </button>

          {/* Mobile Menu Hamburger (Visible beneath xl) */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="xl:hidden p-2.5 bg-white/60 dark:bg-slate-800 border border-blue-100/50 dark:border-slate-700 rounded-xl hover:bg-white dark:hover:bg-slate-700 transition-all text-primary-blue dark:text-cyan-400 shadow-sm backdrop-blur-sm"
            title="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Accordion Overlay List */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="absolute top-20 left-0 right-0 bg-white/95 dark:bg-slate-950/95 border-b border-blue-100 dark:border-slate-800 shadow-lg p-5 flex flex-col gap-4 z-50 xl:hidden backdrop-blur-md"
          >
            <div className="flex flex-col gap-1.5">
              {links.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  target={(link as any).target}
                  rel={(link as any).target === "_blank" ? "noopener noreferrer" : undefined}    
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-xs font-bold uppercase tracking-widest transition-all p-3 rounded-lg flex items-center gap-3 ${
                    pathname === link.path
                      ? "text-primary-blue dark:text-cyan-400 bg-blue-50/50 dark:bg-slate-900"
                      : "text-gray-500 dark:text-slate-400 hover:text-primary-blue dark:hover:text-cyan-400 hover:bg-blue-50/20 dark:hover:bg-slate-900/30"
                  }`}
                >
                  {link.icon && <link.icon className="w-4 h-4 text-primary-blue dark:text-cyan-500" />}
                  <span>{link.label}</span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
});

/**
 * Footer - Visual Anchor
 */
export const Footer = memo(function Footer() {
  const pathname = usePathname();
  const { t } = useUI();
  if (pathname === "/explorer") return null;
  return (
    <footer className="w-full py-16 px-12 bg-[#001c3b] dark:bg-slate-950 text-white border-t border-blue-900 dark:border-slate-800 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12">
        <div className="flex flex-col gap-6 max-w-sm">
          <h2 className="text-3xl font-bold tracking-tight">{t("AssamWRIS")}</h2>
          <p className="text-sm text-blue-200/50 dark:text-slate-400 font-medium leading-relaxed">
            The integrated water resources decision support system for the state of Assam, ensuring sustainable development through data-driven governance.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-12">
        <div className="flex flex-col gap-4">
          <h4 className="text-xs font-bold uppercase tracking-widest text-cyan-400">Governance</h4>
          {["About Dept", "Minister Quote", "Organograms", "Tenders"].map(item => (
             <a key={item} href="#" className="text-sm text-blue-100/60 hover:text-white transition-colors">{item}</a>
          ))}
        </div>
        <div className="flex flex-col gap-4">
          <h4 className="text-xs font-bold uppercase tracking-widest text-cyan-400">Quick Links</h4>
          {["Real-time Alerts", "Basin Maps", "Open Data", "Newsletters"].map(item => (
             <a key={item} href="#" className="text-sm text-blue-100/60 hover:text-white transition-colors">{item}</a>
          ))}
        </div>
        <div className="flex flex-col gap-4">
          <h4 className="text-xs font-bold uppercase tracking-widest text-cyan-400">Legal</h4>
          {["Privacy Policy", "Sitemap", "Copyright Notice", "Accessibility"].map(item => (
             <a key={item} href="#" className="text-sm text-blue-100/60 hover:text-white transition-colors">{item}</a>
          ))}
        </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto border-t border-blue-900 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-[10px] font-bold text-blue-300/40 uppercase tracking-widest">
           © {new Date().getFullYear()} WATER RESOURCES DEPARTMENT • GOVT OF ASSAM
        </p>
        <div className="flex items-center gap-6">
           <span className="text-[10px] text-blue-300/40 font-semibold uppercase tracking-widest">Developed by Hydro Informatics Unit</span>
        </div>
      </div>
    </footer>
  );
});
