import Link from "next/link";

export default function NavbarItem({ children, href }) {
  return (
    <li>
      <Link href={href}>{children}</Link>
    </li>
  );
}
