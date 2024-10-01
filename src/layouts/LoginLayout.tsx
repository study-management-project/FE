import {ReactNode, PropsWithChildren } from 'react';
import logo from "../../public/images/logo.png";

type LoginComponentProps = {
    children: ReactNode;
}

const LoginLayout = ({ children} : PropsWithChildren<LoginComponentProps>) => {
  return (
    <div className='flex w-full h-full justify-center items-center bg-[url("images/loginBG.png")] bg-cover'>
      <div className="w-[32rem] bg-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] backdrop-blur-[5.5px] rounded-lg border-none">
        <img src={logo} alt='로고' className='w-10 h-10 m-auto mt-4'/>
        <div className="max-w-xl">
            { children }
        </div>
      </div>
    </div>
  )
}

export default LoginLayout