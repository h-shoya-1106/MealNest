"use client";

import { usePathname } from "next/navigation";
import { Toaster } from "react-hot-toast";
import FooterNav from "../../../features/calendar/components/Common/FotterNav";
import Header from "../../../features/calendar/components/Common/Header";
import { PATHS } from "@/constants/paths";


export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hidePaths = [PATHS.LOGIN, PATHS.REGISTER];
  const shouldShow = !hidePaths.includes(pathname);

  return (
    <>
      {shouldShow && <Header />}
      <main className={shouldShow ? "pt-14 pb-16" : ""}>
        <Toaster position="top-center" />
        {children}
      </main>
      {shouldShow && <FooterNav />}
    </>
  );
}
