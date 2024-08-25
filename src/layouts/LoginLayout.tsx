import {ReactNode, PropsWithChildren } from 'react';

type LoginComponentProps = {
    children: ReactNode;
}

const LoginLayout = ({ children} : PropsWithChildren<LoginComponentProps>) => {
  return (
    <div className="w-full h-full overflow-y-scroll bg-slate-500">
      <div className="max-w-xl mx-auto min-w-[20rem] align-middle mt-48">
          { children }
      </div>
    </div>
  )
}

export default LoginLayout