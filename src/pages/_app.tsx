import "../styles/globals.css";

import { AppContext, AppProps } from "next/app";

interface AppPropTypes extends AppProps {}

export default function MyApp({ Component, pageProps }: AppPropTypes) {
  return <Component {...pageProps} />;
}
