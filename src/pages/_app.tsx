import Meta from "@/components/Meta";
import "@/styles/globals.scss";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import { ClerkProvider } from "@clerk/nextjs";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const queryClient = new QueryClient();
import { Manrope } from "next/font/google";
const manrope = Manrope({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});
export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <div className={manrope.className}>
        <Meta />
        <ClerkProvider {...pageProps}>
          <Component {...pageProps} />
        </ClerkProvider>
        <ToastContainer />
      </div>
    </QueryClientProvider>
  );
}
