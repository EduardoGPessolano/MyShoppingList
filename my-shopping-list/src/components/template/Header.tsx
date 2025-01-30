import Link from "next/link";
import Logo from "../shared/Logo";
import LogoutButton from "../LogoutButton";

export default function Header() {
  return (
    <div
      className="flex flex-col h-35 mb-5"
      style={{
        background: "transparent",
        backdropFilter: "blur(110px)",
      }}
    >
      <div className="container flex justify-between items-center h-full px-5">
        <Logo size={85} />

        <LogoutButton />
      </div>
      <div className="h-px bg-gradient-to-r from-blue-600/20 via-blue-600/80 to-blue-600/20"></div>
    </div>
  );
}
