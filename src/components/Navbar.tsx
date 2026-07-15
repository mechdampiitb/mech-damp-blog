"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/courses", label: "Courses" },
  { href: "/experiences", label: "Experiences" },
  { href: "/team", label: "Team" },
  { href: "/contribute", label: "Contribute" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        /* ── Top Navigation Bar ──────────────────────────── */
        .top-bar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 clamp(1.5rem, 4vw, 3rem);
          height: 72px;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          transform: translateY(-100%);
          transition: transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .top-bar.visible {
          transform: translateY(0);
        }

        .logo {
          font-size: 1.25rem;
          font-weight: 800;
          color: #ffffff;
          letter-spacing: -0.03em;
          cursor: pointer;
          user-select: none;
          position: relative;
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
        }

        .logo-icon {
          width: 24px;
          height: 24px;
          object-fit: contain;
          filter: invert(1);
          transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .logo:hover .logo-icon {
          transform: rotate(15deg) scale(1.1);
        }

        .nav-tabs {
          display: flex;
          align-items: center;
          gap: 32px;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .nav-tab {
          font-family: 'Inter', sans-serif;
          font-size: 0.85rem;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.65);
          text-decoration: none;
          transition: color 0.3s ease, opacity 0.3s ease;
          position: relative;
          padding: 6px 0;
          background: transparent !important;
          border: none !important;
          outline: none !important;
          box-shadow: none !important;
        }

        .nav-tab::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background: #ffffff;
          transition: width 0.3s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .nav-tab:hover {
          color: #ffffff;
        }

        .nav-tab:hover::after {
          width: 100%;
        }

        .nav-tab.active {
          color: #ffffff;
          font-weight: 600;
        }

        .nav-tab.active::after {
          width: 100%;
        }

        /* Hover style using :has() and :not() - dims other tabs when one is hovered */
        .nav-tabs:has(.nav-tab:hover) .nav-tab:not(:hover) {
          opacity: 0.35;
        }
      `}} />

      <nav className={`top-bar ${isVisible ? "visible" : ""}`}>
        <Link href="/" className="logo">
          <svg
            className="logo-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#000000"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>
          <span>Mech DAMP</span>
        </Link>

        <ul className="nav-tabs">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`nav-tab ${isActive ? "active" : ""}`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}