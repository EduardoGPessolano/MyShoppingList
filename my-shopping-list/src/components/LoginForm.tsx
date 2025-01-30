"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useRef, useState } from "react";
import Logo from "./shared/Logo";
import { useRegisterUser } from "@/hooks/useRegisterUser";

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  const modalRef = useRef<HTMLDialogElement>(null);
  const {
    registerUser,
    loading: loadingRegister,
    error: registerError,
  } = useRegisterUser();

  async function login(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    setLoading(true);

    await signIn("credentials", {
      ...data,
      callbackUrl: "/dashboard",
      redirect: true,
    });

    setLoading(false);
  }

  async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    await registerUser(name, email, password);
    closeModal(); // Fechar o modal após o registro
  }

  function openModal() {
    modalRef.current?.showModal();
  }

  function closeModal() {
    modalRef.current?.close();
  }

  return (
    <div className="bg-login-gradient w-full h-full flex items-center justify-center">
      <div className="flex items-center justify-between w-full max-w-5xl px-8">
        <div className="mr-8">
          <Logo />
        </div>
        <form
          onSubmit={login}
          method="POST" 
          className="bg-base-100 p-8 rounded-lg w-96 max-w-full flex flex-col gap-4 shadow-lg"
        >
          <div className="flex items-center justify-between mb-5">
            <span className="font-bold text-xl text-blueish">Fazer Login</span>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                openModal();
              }}
              className="text-sm text-blueish underline"
            >
              Register
            </a>
          </div>

          <input
            name="email"
            type="email"
            className="input input-bordered border-blueish input-primary w-full focus:border-blueish focus:outline-blueish"
            placeholder="Email"
          />
          <input
            name="password"
            type="password"
            className="input input-bordered border-blueish input-primary w-full focus:border-blueish focus:outline-blueish"
            placeholder="Password"
          />
          <button
            className="btn btn-primary w-full border-blueish bg-blueish hover:bg-blueish/80 hover:border-blueish"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <span className="loading loading-spinner loading-xs"></span>
            ) : (
              "Login"
            )}
          </button>
          {error === "CredentialsSignin" && (
            <div className="text-error">Credenciais incorretas!</div>
          )}
        </form>
      </div>

      <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Register</h3>
          <form onSubmit={handleRegister}      method="POST" >
       
            <div className="mb-4">
              <label htmlFor="name" className="block mb-1">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                className="input input-bordered border-blueish input-primary w-full focus:border-blueish focus:outline-blueish"
                placeholder="Enter your name"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="register-email" className="block mb-1">
                Email
              </label>
              <input
                id="register-email"
                name="email"
                type="email"
                className="input input-bordered border-blueish input-primary w-full focus:border-blueish focus:outline-blueish"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="register-password" className="block mb-1">
                Password
              </label>
              <input
                id="register-password"
                name="password"
                type="password"
                className="input input-bordered border-blueish input-primary w-full focus:border-blueish focus:outline-blueish"
                placeholder="Enter your password"
                required
              />
            </div>
            {registerError && <div className="text-error">{registerError}</div>}
            <div className="modal-action">
              <button
                type="button"
                onClick={closeModal}
                className="btn btn-outline btn-error"
              >
                Close
              </button>
              <button
                type="submit"
                className="btn btn-primary border-blueish bg-blueish hover:bg-blueish/80 hover:border-blueish"
                disabled={loadingRegister}
              >
                {loadingRegister ? (
                  <span className="loading loading-spinner loading-xs"></span>
                ) : (
                  "Register"
                )}
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
}
