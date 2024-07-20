import Link from "next/link";
import NavbarItem from "./NavbarItem";

export default function Navbar() {
  return (
    <>
      <ul>
        <NavbarItem href="/">Ínicio</NavbarItem>
        <NavbarItem href="/login">Login</NavbarItem>
        <NavbarItem href="/register">Cadastro</NavbarItem>
      </ul>
    </>
  );
}
