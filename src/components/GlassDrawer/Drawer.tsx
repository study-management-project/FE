import { Dispatch, ReactNode, SetStateAction } from "react";
import "./Drawer.css"

export default function Drawer({title, children, isOpen, setOpen}:{title:string, children:ReactNode, isOpen:boolean, setOpen:Dispatch<SetStateAction<boolean>>}) {
  const closeDrawer = ():void => {
    setOpen(false);
  }

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
          <div className="flex justify-start p-6">
            <img className="p-1 w-6 h-6 mr-2" src="/icons/doubleArrow.png" alt="drawer 닫음 버튼" onClick={closeDrawer}/>
            <header className="font-bold text-white text-opacity-75"> {title}</header>
          </div>
          <div className="flex justify-center">
            {children}
          </div>
        </article>
      </section>
    </>
  );
}