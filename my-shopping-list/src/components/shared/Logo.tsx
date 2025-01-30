import Link from "next/link";

export default function Logo({ size = 120 }) {
  return (
    <Link href={"/dashboard"}>
      <div className="mt-4 mb-4">
        <img
          src="logo.png"
          alt="Logo"
          style={{ width: size * 2, height: size * 0.9 }}
        />
      </div>
    </Link>
  );
}
