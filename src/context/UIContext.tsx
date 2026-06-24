"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Theme = "light" | "dark";
type Language = "en" | "as";

interface UIContextType {
  theme: Theme;
  language: Language;
  toggleTheme: () => void;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

/**
 * UI PROVIDER
 * 
 * For Beginners:
 * This is a "Global Store". It keeps track of settings like Theme and Language
 * so that any component in the entire app can access them without 
 * passing "props" through every single file.
 */
export function UIProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [language, setLanguage] = useState<Language>("en");

  // Load saved settings from browser memory (LocalStorage)
  useEffect(() => {
    const savedTheme = localStorage.getItem("app-theme") as Theme;
    const savedLang = localStorage.getItem("app-lang") as Language;
    if (savedTheme) setTheme(savedTheme);
    if (savedLang) setLanguage(savedLang);
  }, []);

  // Apply theme to the HTML element
  useEffect(() => {
    const html = document.documentElement;
    if (theme === "dark") {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
    localStorage.setItem("app-theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((prev) => (prev === "light" ? "dark" : "light"));
  
  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("app-lang", lang);
  };

  /**
   * TRANSLATION HELPER (Simplified)
   * 
   * This function looks up a key (like "Home") and returns the correct
   * language version.
   */
  const t = (key: string): string => {
    const translations: Record<string, Record<Language, string>> = {
      "Home": { en: "Home", as: "গৃহ" },
      "GIS Explorer": { en: "GIS Explorer", as: "জিআইএছ এক্সপ্ল’ৰাৰ" },
      "Data Catalog": { en: "Data Catalog", as: "তথ্য তালিকা" },
      "Documentation & Gallery": { en: "Documentation & Gallery", as: "নথি আৰু গেলাৰী" },
      "Contact Us": { en: "Contact Us", as: "যোগাযোগ" },
      "AssamWRIS": { en: "Assam Water Resources Information System", as: "অসম জলসম্পদ তথ্য ব্যৱস্থা" },
      "Water Resources Department": { en: "Water Resources Department", as: "জলসম্পদ বিভাগ" },
      "Govt. of Assam": { en: "Govt. of Assam", as: "অসম চৰকাৰ" },
      "HeroTitle": { en: "Assam-WRIS", as: "অসম জলসম্পদ তথ্য ব্যৱস্থা" },
      "HeroSubtitle": { en: "An interactive spatial intelligence platform for hydrological monitoring, GIS basin mapping, and water resources decision support in Assam", as: "অসম ৰাজ্যৰ বাবে জলতাত্ত্বিক নিৰীক্ষণ, জিআইএছ অৱবাহিকা মানচিত্ৰকৰণ আৰু জলসম্পদ সিদ্ধান্ত সমৰ্থনৰ এক সংকলিত স্থানিক মঞ্চ।" },
      "ExploreExplorer": { en: "GIS Explorer", as: "জিআইএছ এক্সপ্ল’ৰাৰ" },
      "ViewDashboard": { en: "Live Telemetry", as: "লাইভ টেলিমেট্ৰি" },
      "DataArchitecture": { en: "DATA ARCHITECTURE", as: "তথ্য স্থাপত্য" },
      "PrecisionHydrology": { en: "About Assam-WRIS", as: "Assam-WRIS ৰ বিষয়ে" },
    };

    return translations[key]?.[language] || key;
  };

  return (
    <UIContext.Provider value={{ theme, language, toggleTheme, setLanguage: handleSetLanguage, t }}>
      {children}
    </UIContext.Provider>
  );
}

export function useUI() {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error("useUI must be used within a UIProvider");
  }
  return context;
}
