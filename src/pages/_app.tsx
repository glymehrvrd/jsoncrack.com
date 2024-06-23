import React from "react";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import { DM_Sans } from "next/font/google";
import Head from "next/head";
import { MantineProvider, createTheme } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/code-highlight/styles.css";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "src/constants/globalStyle";
import { lightTheme } from "src/constants/theme";
import { Loading } from "src/layout/Loading";

const dmSans = DM_Sans({
  subsets: ["latin-ext"],
});

const theme = createTheme({
  autoContrast: true,
  fontSmoothing: false,
  respectReducedMotion: true,
  cursorType: "pointer",
  fontFamily: dmSans.style.fontFamily,
  defaultGradient: {
    from: "#625BF6",
    to: "#362EF3",
    deg: 180,
  },
  primaryShade: 8,
  radius: {
    lg: "12px",
  },
  components: {
    Button: {
      defaultProps: {
        fw: 500,
      },
    },
  },
});

const Toaster = dynamic(() => import("react-hot-toast").then(c => c.Toaster));

function JsonCrack({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>JSON Crack | Best JSON Viewer, Formatter and Visualizer for everyone</title>
      </Head>
      <ThemeProvider theme={lightTheme}>
        <Toaster
          position="bottom-right"
          containerStyle={{
            bottom: 34,
            right: 8,
            fontSize: 14,
          }}
          toastOptions={{
            style: {
              background: "#4D4D4D",
              color: "#B9BBBE",
              borderRadius: 4,
            },
          }}
        />
        <GlobalStyle />
        <MantineProvider defaultColorScheme="light" theme={theme}>
          <Loading />
          <Component {...pageProps} />
        </MantineProvider>
      </ThemeProvider>
    </>
  );
}

export default JsonCrack;
