import React from "react";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import { useMantineColorScheme } from "@mantine/core";
import styled, { ThemeProvider } from "styled-components";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { darkTheme, lightTheme } from "src/constants/theme";
import { Editor } from "src/containers/Editor";
import { BottomBar } from "src/containers/Editor/BottomBar";
import { Toolbar } from "src/containers/Toolbar";
import useGraph from "src/modules/GraphView/stores/useGraph";
import useConfig from "src/store/useConfig";
import useFile from "src/store/useFile";

const ModalController = dynamic(() => import("src/layout/ModalController"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

export const StyledPageWrapper = styled.div`
  height: calc(100vh - 27px);
  width: 100%;

  @media only screen and (max-width: 320px) {
    height: 100vh;
  }
`;

export const StyledEditorWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const EditorPage = () => {
  const { query, isReady } = useRouter();
  const { setColorScheme } = useMantineColorScheme();
  const checkEditorSession = useFile(state => state.checkEditorSession);
  const setContents = useFile(state => state.setContents);
  const darkmodeEnabled = useConfig(state => state.darkmodeEnabled);
  const toggleFullscreen = useGraph(state => state.toggleFullscreen);

  React.useEffect(() => {
    if (isReady) checkEditorSession(query?.json);
  }, [checkEditorSession, isReady, query]);

  React.useEffect(() => {
    setColorScheme(darkmodeEnabled ? "dark" : "light");
  }, [darkmodeEnabled, setColorScheme]);

  React.useEffect(() => {
    window.utools?.onPluginEnter(({ code, payload }) => {
      const code_items = code.split("-");
      if (code_items[0] !== "input") {
        return;
      }
      if (!payload) {
        return;
      }
      setContents({ contents: payload });
      toggleFullscreen(true);
    });
  });

  return (
    <>
      <Head>
        <title>Editor | JSON Crack</title>
        <link rel="canonical" href="https://jsoncrack.com/editor" />
      </Head>
      <ThemeProvider theme={darkmodeEnabled ? darkTheme : lightTheme}>
        <QueryClientProvider client={queryClient}>
          <ModalController />
          <StyledEditorWrapper>
            <StyledPageWrapper>
              <Toolbar />
              <StyledEditorWrapper>
                <Editor />
              </StyledEditorWrapper>
            </StyledPageWrapper>
            <BottomBar />
          </StyledEditorWrapper>
        </QueryClientProvider>
      </ThemeProvider>
    </>
  );
};

export default EditorPage;
