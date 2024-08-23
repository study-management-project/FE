import { Dispatch, ReactNode, SetStateAction } from "react";
import "./Drawer.css"

export default function Drawer({title, children, isOpen, setOpen}:{title:string, children:ReactNode, isOpen:boolean, setOpen:Dispatch<SetStateAction<boolean>>}) {
  return (
    <>
      <section
        className={
          "drawer-content-container w-[26rem] max-w-lg right-0 top-12 fixed h-full shadow-xl ease-in-out transition-all transform duration-500 z-10" +
          (isOpen ? " translate-x-0" : "delay-300 translate-x-full")
        }
      >
        <article className="relative w-screen max-w-lg pb-10 flex flex-col space-y-6 overflow-y-scroll h-full">
          <header className="p-4 font-bold text-lg">{title}</header>
          <div className="p-4">
            {children}
          </div>
        </article>
      </section>
    </>
  );
}