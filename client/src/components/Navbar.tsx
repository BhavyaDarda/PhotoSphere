import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";

export default function Navbar() {
  const [location] = useLocation();

  const links = [
    { href: "/", label: "Home" },
    { href: "/gallery", label: "Gallery" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="fixed w-full z-50 bg-black/80 backdrop-blur-sm border-b border-primary/20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/">
            <a className="font-playfair text-2xl text-primary">Lens & Light</a>
          </Link>
          
          <div className="hidden md:flex space-x-8">
            {links.map((link) => (
              <Link key={link.href} href={link.href}>
                <a className="relative">
                  <span className={`font-montserrat text-sm hover:text-primary transition-colors ${
                    location === link.href ? "text-primary" : "text-white"
                  }`}>
                    {link.label}
                  </span>
                  {location === link.href && (
                    <motion.div
                      className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary"
                      layoutId="navbar-underline"
                    />
                  )}
                </a>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
