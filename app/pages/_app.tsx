import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AuthProvider } from "../context/AuthContext";
import { AlertProvider } from "../context/alertProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <AlertProvider>
        <Component {...pageProps} />
      </AlertProvider>
    </AuthProvider>
  );
}

export default MyApp;
