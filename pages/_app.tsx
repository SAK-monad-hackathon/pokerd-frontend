import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { PrivyProvider } from "@privy-io/react-auth";
import Layout from "../components/layout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createConfig } from "@privy-io/wagmi";
import { monadTestnet } from "viem/chains";
import { http } from "wagmi";
import { WagmiProvider } from "@privy-io/wagmi";

const wagmiConfig = createConfig({
  chains: [monadTestnet],
  transports: {
    [monadTestnet.id]: http(),
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  return (
    <>
      <Head>
        <link
          rel="preload"
          href="/fonts/AdelleSans-Regular.woff"
          as="font"
          crossOrigin=""
        />
        <link
          rel="preload"
          href="/fonts/AdelleSans-Regular.woff2"
          as="font"
          crossOrigin=""
        />
        <link
          rel="preload"
          href="/fonts/AdelleSans-Semibold.woff"
          as="font"
          crossOrigin=""
        />
        <link
          rel="preload"
          href="/fonts/AdelleSans-Semibold.woff2"
          as="font"
          crossOrigin=""
        />

        <link rel="icon" href="/favicons/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicons/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/favicons/apple-touch-icon.png" />
        <link rel="manifest" href="/favicons/manifest.json" />
      </Head>
      <PrivyProvider
        appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID || ""}
        config={{
          embeddedWallets: {
            createOnLogin: "all-users",
          },
        }}
      >
        <QueryClientProvider client={queryClient}>
          <WagmiProvider config={wagmiConfig}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </WagmiProvider>
        </QueryClientProvider>
      </PrivyProvider>
    </>
  );
}

export default MyApp;
