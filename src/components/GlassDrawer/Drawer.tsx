import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import "./Drawer.css";
import "material-icons/iconfont/material-icons.css";

export default function Drawer({
  title,
  children,
  isOpen,
  setOpen,
  code,
  saveSnapshot,
  prevCode,
  restoreCode,
}: {
  title: string;
  children: ReactNode;
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  code: string;
  saveSnapshot: () => void;
  prevCode: string | undefined;
  restoreCode: () => void;
}) {
  const [isCopied, setCopied] = useState<boolean>(false);
  const closeDrawer = (): void => {
    setOpen(false);
  };

  const timer = useRef<number | undefined>();

  const debounceSave = () => {
    if (timer.current) {
      clearTimeout(timer.current);
    } else {
      setTimeout(() => {
        saveSnapshot();
      }, 1000);
    }
  };

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
  };

  useEffect(() => {
    setCopied(false);
  }, [code]);

  return (
    <>
      <section
        className={
          "drawer-content-container w-[25vw] max-w-lg right-0 top-12 fixed h-[calc(100%-3rem)] shadow-xl ease-in-out transition-all transform duration-500 z-10" +
          (isOpen ? " translate-x-0" : " translate-x-full")
        }
        style={{ transitionProperty: "transform" }}
        onClick={(e: React.MouseEvent) => {
          e.stopPropagation();
        }}
      >
        <div className="absolute -translate-x-28 mt-4">
          {prevCode === undefined ? (
            <span className="material-icons text-white hover:cursor-pointer invisible">
              restore
            </span>
          ) : (
            <span
              className="material-icons text-white hover:cursor-pointer"
              onClick={() => {
                restoreCode();
              }}
            >
              restore
            </span>
          )}
          {!isCopied ? (
            <span
              className="material-icons text-white ml-2 mr-2 cursor-pointer z-20"
              onClick={copyCode}
            >
              copy_all
            </span>
          ) : (
            <span
              className="material-icons-outlined text-green-400 mr-2 cursor-pointer z-20"
              onClick={copyCode}
            >
              check_circle
            </span>
          )}
          <span
            className="material-icons text-white cursor-pointer z-20"
            onClick={debounceSave}
          >
            save
          </span>
        </div>
        <article className="relative w-full pb-10 flex flex-col space-y-6 overflow-y-scroll h-full">
          <div className="flex justify-start p-6">
            <span className="material-icons text-white cursor-pointer">
              keyboard_double_arrow_right
            </span>
            <header className="font-bold text-white"> {title}</header>
          </div>
          <div className="flex justify-center h-[calc(100%-72px)]">{children}</div>
        </article>
      </section>
    </>
  );
}
