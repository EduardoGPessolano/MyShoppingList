import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandWhatsapp,
  IconBrandYoutube,
} from "@tabler/icons-react";
import Logo from "../shared/Logo";

export default function Footer() {
  return (
    <footer className="flex flex-col bg-black/20 text-zinc-400 mt-10">
      <div className="container flex flex-col py-10 gap-10">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between text-center md:text-left gap-5 md:gap-0">
          <Logo />
          <div className="flex flex-col gap-1">
            <span className="text-2xl font-bold text-zinc-200 pb-2">About</span>
            <span className="text-sm">Privacy Policy</span>
            <span className="text-sm">Our Terms</span>
            <span className="text-sm">Meet the Team</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-2xl font-bold text-zinc-200 pb-2">
              Contact
            </span>
            <span className="text-sm">suport@myshoppinglist.com</span>
            <div className=" text-sm flex items-center gap-2 justify-center md:justify-start">
              <IconBrandWhatsapp size={20} className="text-green-500" />
              <span>WhatsApp</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-1.5 justify-between">
          <div className="flex gap-2">
            <IconBrandYoutube size={28} stroke={1} />
            <IconBrandInstagram size={28} stroke={1} />
            <IconBrandFacebook size={28} stroke={1} />
            <IconBrandLinkedin size={28} stroke={1} />
          </div>
          <div className="flex flex-col md:flex-row items-center gap-1.5 text-sm text-zinc-500">
            <div className="flex gap-1.5">
              <span>Programação Web e Mobile - Grupo II</span>
              <span> - {new Date().getFullYear()}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
