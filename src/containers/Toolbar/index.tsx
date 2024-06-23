import React from "react";
import { Flex, Group, Select } from "@mantine/core";
import toast from "react-hot-toast";
import { AiOutlineFullscreen } from "react-icons/ai";
import { SearchInput } from "src/containers/Toolbar/SearchInput";
import { FileFormat } from "src/enums/file.enum";
import { JSONCrackLogo } from "src/layout/JsonCrackLogo";
import useFile from "src/store/useFile";
import { Logo } from "./Logo";
import { OptionsMenu } from "./OptionsMenu";
import { ToolsMenu } from "./ToolsMenu";
import { ViewMenu } from "./ViewMenu";
import { ZoomMenu } from "./ZoomMenu";
import * as Styles from "./styles";

function fullscreenBrowser() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(() => {
      toast.error("Unable to enter fullscreen mode.");
    });
  } else if (document.exitFullscreen) {
    document.exitFullscreen();
  }
}

interface ToolbarProps {
  isWidget?: boolean;
}

export const Toolbar = ({ isWidget = false }: ToolbarProps) => {
  const setFormat = useFile(state => state.setFormat);
  const format = useFile(state => state.format);

  return (
    <Styles.StyledTools>
      {isWidget && <Logo />}
      {!isWidget && (
        <Group gap="xs" justify="left" w="100%" style={{ flexWrap: "nowrap" }}>
          <Styles.StyledToolElement title="JSON Crack">
            <Flex gap="xs" align="center" justify="center">
              <JSONCrackLogo fontSize="1.2em" />
            </Flex>
          </Styles.StyledToolElement>

          <Select
            defaultValue="json"
            size="xs"
            value={format}
            onChange={e => setFormat(e as FileFormat)}
            miw={80}
            w={120}
            data={[
              { value: FileFormat.JSON, label: "JSON" },
              { value: FileFormat.YAML, label: "YAML" },
              { value: FileFormat.XML, label: "XML" },
              { value: FileFormat.TOML, label: "TOML" },
              { value: FileFormat.CSV, label: "CSV" },
            ]}
            allowDeselect={false}
          />

          <ViewMenu />
          <ToolsMenu />
        </Group>
      )}
      <Group gap="xs" justify="right" w="100%" style={{ flexWrap: "nowrap" }}>
        <SearchInput />
        {!isWidget && (
          <>
            <ZoomMenu />
            <OptionsMenu />
            <Styles.StyledToolElement
              title="Fullscreen"
              $hide={isWidget}
              onClick={fullscreenBrowser}
            >
              <AiOutlineFullscreen size="18" />
            </Styles.StyledToolElement>
          </>
        )}
      </Group>
    </Styles.StyledTools>
  );
};
