import { Button } from "./ui/button";
import { Page } from "./Router";
import { useLanguage } from "../contexts/LanguageContext";
import { LanguageSelector } from "./LanguageSelector";

interface NavbarProps {
  currentPage: Page;
  onPageChange: (page: Page) => void;
}

export function Navbar({ currentPage, onPageChange }: NavbarProps) {
  const { t } = useLanguage();
  
  const navItems = [
    { id: "home" as Page, label: t("navbar.home") },
    { id: "crops" as Page, label: t("navbar.crops") },
    { id: "weather" as Page, label: t("navbar.weather") },
    { id: "market" as Page, label: t("navbar.market") },
    { id: "support" as Page, label: t("navbar.support") },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-700 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => onPageChange("home")}
          >
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-lg">🌾</span>
            </div>
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-semibold text-xl">
              KrishiMitra
            </span>
          </div>
          
          {/* Navigation Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onPageChange(item.id)}
                className={`transition-all duration-300 relative group px-3 py-2 rounded-lg ${
                  currentPage === item.id 
                    ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30' 
                    : 'text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          
          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {/* Language Selector */}
            <LanguageSelector />
            
            {/* Login Button */}
            <Button 
              onClick={() => onPageChange("login")}
              className="hidden sm:flex bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              {t("navbar.login")}
            </Button>
            
            {/* Farmer Help Button - Hidden on mobile, shown on desktop */}
            <Button 
              onClick={() => onPageChange("support")}
              className="hidden sm:flex bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              {t("navbar.support")}
            </Button>
            
            {/* Mobile Buttons */}
            <Button 
              onClick={() => onPageChange("login")}
              className="sm:hidden bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 px-3"
            >
              {t("navbar.login")}
            </Button>
            <Button 
              onClick={() => onPageChange("support")}
              className="sm:hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 px-3"
            >
              {t("navbar.support")}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}