import LoginForm from "@/components/LoginForm";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <div className="h-screen flex justify-center items-center">
        <LoginForm></LoginForm>
      </div>
    </main>
  );
}
