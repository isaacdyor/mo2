"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const routes: { title: string; href: string }[] = [
  { title: "Features", href: "#features" },
  { title: "Resources", href: "#resources" },
  { title: "Pricing", href: "#pricing" },
];

export const Navbar: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="border-b-border flex h-16 items-center justify-between border-b px-6 lg:px-14">
      <div className="flex items-center">
        <Link href={"/"} className="shrink-0">
          <div className="flex items-start gap-2">
            <h1 className="text-accent-foreground text-2xl font-bold">Mo</h1>
          </div>
        </Link>
        <div className="bg-background hidden w-full justify-end gap-1 px-4 sm:flex">
          {routes.map((route, index) => (
            <Link
              key={index}
              href={route.href}
              className={`text-muted-foreground hover:text-accent-foreground inline-flex h-10 w-full items-center px-4 py-2 text-sm transition-colors sm:w-auto`}
            >
              {route.title}
            </Link>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-6">{children}</div>

      {menuOpen && (
        <MobileMenu toggleMenu={toggleMenu} routes={routes}>
          {children}
        </MobileMenu>
      )}

      <button onClick={toggleMenu} className="sm:hidden">
        {menuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
      </button>
    </div>
  );
};

type MobileMenuProps = {
  toggleMenu: () => void;
  routes: { href: string; title: string }[];
  children: React.ReactNode;
};

const MobileMenu: React.FC<MobileMenuProps> = ({
  toggleMenu,
  routes,
  children,
}) => {
  return (
    <div className="absolute right-0 top-16 z-50 flex h-[calc(100vh-64px)] w-full flex-col">
      <div className="bg-background  flex w-full grow flex-col gap-1 px-4 pb-2 sm:hidden">
        {routes.map((route, index) => (
          <Link
            key={index}
            href={route.href}
            onClick={toggleMenu}
            className={`text-muted-foreground hover:text-accent-foreground inline-flex h-10 w-full items-center text-sm transition-colors sm:w-auto`}
          >
            {route.title}
          </Link>
        ))}
        {children}
      </div>
      <div className="bg-background/60 h-screen w-full sm:hidden" />
    </div>
  );
};
