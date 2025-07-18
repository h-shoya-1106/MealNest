"use client";

import { usePathname } from "next/navigation";
import { Toaster } from "react-hot-toast";
import FooterNav from "../../../features/calendar/components/Common/FotterNav";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hideFooterPaths = ["/login", "/register"];
  const shouldShowFooter = !hideFooterPaths.includes(pathname);

  return (
    <>
      <Toaster position="top-center" />
      {children}
      {shouldShowFooter && <FooterNav />}
    </>
  );
}
