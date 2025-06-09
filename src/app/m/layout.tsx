import Sidemenu from "@/components/sidemenu";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

async function Layout({ children }: Readonly<Props>) {
  return (
    <div className="grid grid-rows-1 grid-cols-1 md:grid-cols-[auto_1fr]">
      <Sidemenu />
      <>{children}</>
    </div>
  );
}

export default Layout;
