import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@beta-lyfe/ui/components/button";
import { Menu, X } from "lucide-react";

export default function TopNavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <img src="/images/betalyfe-icon.svg" className="w-10 h-10 rounded-full" />
            <span className="text-xl font-bold">BetaLyfe</span>
          </Link>
        </div>
        <nav className="hidden md:flex gap-6">
          <Link to="/" className="text-sm font-medium hover:text-primary">Home</Link>
          <Link to="/about-us" className="text-sm font-medium hover:text-primary">About Us</Link>
          <Link to="/pharmacy" className="text-sm font-medium hover:text-primary">Phramacy</Link>
          <Link to="/how-to-use" className="text-sm font-medium hover:text-primary">How To Use</Link>
          <Link to="/care-services" className="text-sm font-medium hover:text-primary">Care Services</Link>
          <Link to="/contact-us" className="text-sm font-medium hover:text-primary">Contact Us</Link>
        </nav>
        <div className="flex items-center gap-4">
          <Button asChild variant="outline" className="hidden md:inline-flex">
            <Link to="/get-the-app">Get the App</Link>
          </Button>
          <Button asChild>
            <Link to="/signup" className="text-white">Get Started</Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-background border-b shadow-lg">
          <nav className="flex flex-col p-4 space-y-4">
            <Link to="/" className="text-sm font-medium hover:text-primary" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link to="/about-us" className="text-sm font-medium hover:text-primary" onClick={() => setIsMenuOpen(false)}>About Us</Link>
            <Link to="/pharmacy" className="text-sm font-medium hover:text-primary">Phramacy</Link>
            <Link to="/how-to-use" className="text-sm font-medium hover:text-primary" onClick={() => setIsMenuOpen(false)}>How To Use</Link>
            <Link to="/care-services" className="text-sm font-medium hover:text-primary" onClick={() => setIsMenuOpen(false)}>Care Services</Link>
            <Link to="/contact-us" className="text-sm font-medium hover:text-primary" onClick={() => setIsMenuOpen(false)}>Contact Us</Link>
          </nav>
        </div>
      )}
    </header>
  );
}
