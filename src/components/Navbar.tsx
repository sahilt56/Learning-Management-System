"use client";
import React, { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { BookOpen, Menu as IconMenu2, X as IconX } from "lucide-react";
import { AnimatedButton } from "./ui/animated-button";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";

interface NavbarProps {
  children: React.ReactNode;
  className?: string;
}

interface NavBodyProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface NavItemsProps {
  items: {
    name: string;
    link: string;
  }[];
  className?: string;
  onItemClick?: () => void;
}

interface MobileNavProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface MobileNavHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface MobileNavMenuProps {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

// -------------------------------------------------------------
// Core Resizable Navbar Components
// -------------------------------------------------------------

export const Navbar = ({ children, className }: NavbarProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const [visible, setVisible] = useState<boolean>(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 100) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  });

  return (
    <motion.div
      ref={ref}
      className={cn("sticky inset-x-0 top-20 z-40 w-full", className)}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(
              child as React.ReactElement<{ visible?: boolean }>,
              { visible },
            )
          : child,
      )}
    </motion.div>
  );
};

export const NavBody = ({ children, className, visible }: NavBodyProps) => {
  return (
    <motion.div
      animate={{
        backdropFilter: "blur(12px)",
        boxShadow: visible
          ? "0 4px 24px rgba(0,0,0,0.4), 0 1px 0 rgba(255,255,255,0.1) inset"
          : "none",
        width: visible ? "50%" : "100%",
        y: visible ? 20 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 50,
      }}
      style={{
        minWidth: "700px",
      }}
      className={cn(
        "relative z-[60] mx-auto hidden w-full max-w-7xl flex-row items-center justify-between self-start rounded-full px-4 py-2 lg:flex border transition-colors duration-300",
        visible ? "bg-white/10 border-white/20" : "bg-transparent border-transparent",
        className,
      )}
    >
      {children}
    </motion.div>
  );
};

export const NavItems = ({ items, className, onItemClick }: NavItemsProps) => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <motion.div
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "absolute inset-0 hidden flex-1 flex-row items-center justify-center space-x-2 text-sm font-medium transition duration-200 lg:flex lg:space-x-2",
        className,
      )}
    >
      {items.map((item, idx) => (
        <a
          onMouseEnter={() => setHovered(idx)}
          onClick={onItemClick}
          className="relative px-4 py-2 text-slate-300 transition-colors"
          key={`link-${idx}`}
          href={item.link}
        >
          {hovered === idx && (
            <motion.div
              layoutId="hovered"
              className="absolute inset-0 h-full w-full rounded-full bg-white"
            />
          )}
          <span className={cn("relative z-20 transition-colors", hovered === idx ? "text-black font-semibold" : "")}>{item.name}</span>
        </a>
      ))}
    </motion.div>
  );
};

export const MobileNav = ({ children, className, visible }: MobileNavProps) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? "blur(10px)" : "none",
        boxShadow: visible
          ? "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset"
          : "none",
        width: visible ? "90%" : "100%",
        paddingRight: visible ? "12px" : "0px",
        paddingLeft: visible ? "12px" : "0px",
        borderRadius: "2rem",
        y: visible ? 20 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 50,
      }}
      className={cn(
        "relative z-50 mx-auto flex w-full max-w-[calc(100vw-2rem)] flex-col items-center justify-between bg-transparent px-0 py-2 lg:hidden",
        visible && "bg-white/80 dark:bg-neutral-950/80",
        className,
      )}
    >
      {children}
    </motion.div>
  );
};

export const MobileNavHeader = ({
  children,
  className,
}: MobileNavHeaderProps) => {
  return (
    <div
      className={cn(
        "flex w-full flex-row items-center justify-between",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const MobileNavMenu = ({
  children,
  className,
  isOpen,
  onClose,
}: MobileNavMenuProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={cn(
            "absolute inset-x-0 top-16 z-50 flex w-full flex-col items-start justify-start gap-4 rounded-lg bg-white px-4 py-8 shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] dark:bg-neutral-950",
            className,
          )}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const MobileNavToggle = ({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) => {
  return isOpen ? (
    <IconX className="text-slate-300 hover:text-white cursor-pointer" onClick={onClick} />
  ) : (
    <IconMenu2 className="text-slate-300 hover:text-white cursor-pointer" onClick={onClick} />
  );
};

export const NavbarButton = ({
  href,
  children,
  className,
  ...props
}: {
  href?: string;
  children?: React.ReactNode;
  className?: string;
  variant?: any;
} & (
  | React.ComponentPropsWithoutRef<"a">
  | React.ComponentPropsWithoutRef<"button">
)) => {
  return (
    <AnimatedButton 
      href={href} 
      className={className} 
      wrapperClassName="w-full sm:w-auto" 
      style={{ "--btn-padding": "12px 37px", "--btn-font-size": "16px", "--btn-color": "#fff", "--btn-border-color": "#fff", "--btn-hover-bg": "#fff", "--btn-hover-text": "black", "--btn-hover-radius": "50%" } as React.CSSProperties}
      {...(props as any)}
    >
      {children}
    </AnimatedButton>
  );
};

// -------------------------------------------------------------
// Main Exported LMS Navbar Component
// -------------------------------------------------------------

export default function LMSNavbar() {
  const navItems = [
    { name: "Home", link: "/" },
    { name: "About", link: "/about" },
    { name: "Courses", link: "/courses" },
    { name: "Reviews", link: "/#testimonials" },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="relative w-full">
      <Navbar className="fixed top-4 left-0 right-0 z-50">
        {/* Desktop Navigation */}
        <NavBody>
          <div className="flex items-center space-x-2 cursor-pointer z-20">
            <div className="bg-blue-600 border border-white/20 p-2 rounded-lg text-white shadow-sm">
              <BookOpen className="h-5 w-5" />
            </div>
            <span className="text-xl font-black tracking-tight text-white uppercase">
              Eduverse
            </span>
          </div>
          
          <NavItems items={navItems} />
          
          <div className="flex items-center gap-4 z-20">
            <NavbarButton href="/login">
              Get Started
            </NavbarButton>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav className="bg-slate-950/80 backdrop-blur-md border border-slate-800 rounded-2xl mx-4">
          <MobileNavHeader className="px-4 py-2">
            <div className="flex items-center space-x-2 cursor-pointer">
              <div className="bg-blue-600 border border-white/20 p-1.5 rounded-lg text-white shadow-sm">
                <BookOpen className="h-4 w-4" />
              </div>
              <span className="text-lg font-black tracking-tight text-white uppercase">
                Eduverse
              </span>
            </div>
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
            className="bg-slate-950 border border-slate-800 rounded-xl"
          >
            <div className="flex flex-col space-y-4 px-2 py-4 w-full">
              {navItems.map((item, idx) => (
                <a
                  key={`mobile-link-${idx}`}
                  href={item.link}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-slate-300 hover:text-white transition-colors text-sm font-medium block w-full px-2 py-1 rounded hover:bg-slate-900"
                >
                  {item.name}
                </a>
              ))}
              <hr className="border-slate-850 my-2" />
              <div className="flex flex-col gap-2 w-full">
                <NavbarButton
                  href="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Get Started
                </NavbarButton>
              </div>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
}
