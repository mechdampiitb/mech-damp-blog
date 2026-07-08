"use client";
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

  return (
    <nav className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      <Link href="/" className="font-bold text-lg">
        Mech DAMP
      </Link>
      <ul className="flex gap-6">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={`hover:text-blue-600 transition-colors ${
                pathname === link.href
                  ? "text-blue-600 font-medium"
                  : "text-gray-700"
              }`}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}