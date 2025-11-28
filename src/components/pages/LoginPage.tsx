import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card } from "../ui/card";
import { Page } from "../Router";
import { ImageWithFallback } from "../figma/ImageWithFallback";

interface LoginPageProps {
  onPageChange?: (page: Page) => void;
}

export function LoginPage({ onPageChange }: LoginPageProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    farmName: "",
    phoneNumber: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login - redirect to home
    if (onPageChange) {
      onPageChange("home");
    }
  };

  return (
    <div className="pt-16 min-h-screen flex items-center justify-center">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1625246333195-78d9c38ad449?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBmYXJtJTIwZmllbGRzJTIwZ3JlZW58ZW58MXx8fHwxNzU3MDgxNTc0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')`
        }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/80 via-slate-800/70 to-blue-900/80" />
      
      <div className="relative z-10 w-full max-w-md mx-4">
        <Card className="modern-card border-emerald-200/30 dark:border-emerald-600/30 p-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl mb-4">
              <span className="text-white text-2xl">🌾</span>
            </div>
            <h1 className="text-emerald-600 dark:text-emerald-400 text-2xl mb-2">
              Welcome to KrishiMitra
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              Your Smart Farming Companion
            </p>
          </div>

          {/* Tab Toggle */}
          <div className="flex bg-slate-100 dark:bg-slate-800 rounded-lg p-1 mb-6">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 px-4 rounded-md text-sm transition-all ${
                isLogin
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-emerald-600'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 px-4 rounded-md text-sm transition-all ${
                !isLogin
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-emerald-600'
              }`}
            >
              Register
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <>
                <div>
                  <Label htmlFor="name" className="text-slate-700 dark:text-slate-300">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="mt-1 bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600"
                  />
                </div>
                <div>
                  <Label htmlFor="farmName" className="text-slate-700 dark:text-slate-300">Farm Name</Label>
                  <Input
                    id="farmName"
                    type="text"
                    placeholder="Enter your farm name"
                    value={formData.farmName}
                    onChange={(e) => handleInputChange('farmName', e.target.value)}
                    className="mt-1 bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600"
                  />
                </div>
                <div>
                  <Label htmlFor="phoneNumber" className="text-slate-700 dark:text-slate-300">Phone Number</Label>
                  <Input
                    id="phoneNumber"
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={formData.phoneNumber}
                    onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                    className="mt-1 bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600"
                  />
                </div>
              </>
            )}
            
            <div>
              <Label htmlFor="email" className="text-slate-700 dark:text-slate-300">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="farmer@example.com"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="mt-1 bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600"
              />
            </div>
            
            <div>
              <Label htmlFor="password" className="text-slate-700 dark:text-slate-300">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className="mt-1 bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600"
              />
            </div>

            {isLogin && (
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2 rounded border-slate-300" />
                  <span className="text-slate-600 dark:text-slate-400">Remember me</span>
                </label>
                <button type="button" className="text-emerald-600 hover:text-emerald-700">
                  Forgot password?
                </button>
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white py-3"
            >
              {isLogin ? 'Login to KrishiMitra' : 'Create Account'}
            </Button>
          </form>

          {/* Features Preview */}
          <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
            <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 text-center">
              What you'll get with KrishiMitra:
            </p>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="flex items-center space-x-2">
                <span className="text-emerald-600">🌱</span>
                <span className="text-slate-600 dark:text-slate-400">Crop Monitoring</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-blue-600">🌤️</span>
                <span className="text-slate-600 dark:text-slate-400">Weather Alerts</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-purple-600">📈</span>
                <span className="text-slate-600 dark:text-slate-400">Market Prices</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-orange-600">💧</span>
                <span className="text-slate-600 dark:text-slate-400">Smart Irrigation</span>
              </div>
            </div>
          </div>

          {/* Back to Home */}
          <div className="mt-6 text-center">
            <button
              onClick={() => onPageChange?.("home")}
              className="text-slate-500 dark:text-slate-400 text-sm hover:text-emerald-600 transition-colors"
            >
              ← Back to Home
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}