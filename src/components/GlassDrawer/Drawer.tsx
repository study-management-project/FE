import { Dispatch, ReactNode, SetStateAction } from "react";
import "./Drawer.css"

export default function Drawer({title, children, isOpen, setOpen}:{title:string, children:ReactNode, isOpen:boolean, setOpen:Dispatch<SetStateAction<boolean>>}) {
  return (
    <>
      <section
        className={
          "drawer-content-container w-[25vw] max-w-lg right-0 top-12 fixed h-full shadow-xl ease-in-out transition-all transform duration-500 z-10" +
          (isOpen ? " translate-x-0" : "delay-300 translate-x-full")
        }
        style={{transitionProperty: "transform"}}
      >
        <article className="relative w-full pb-10 flex flex-col space-y-6 overflow-y-scroll h-full">
          <header className="p-6 font-bold text-sm text-white text-opacity-75">{title}</header>
          <div className="flex justify-center">
            {children}
          </div>
        </article>
      </section>
    </>
  );
}