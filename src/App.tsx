import Quill from "quill";
import React, { useCallback, useState } from "react";
import "./App.css";
import "../node_modules/quill/dist/quill.js";
// import "../node_modules/quill/dist/quill.snow.css";
import {
  background,
  Box,
  Button,
  Flex,
  Icon,
  IconButton,
  Stack,
} from "@chakra-ui/react";
import {
  AiOutlineBold,
  AiOutlineFileImage,
  AiOutlineItalic,
  AiOutlineUnderline,
  AiOutlineStrikethrough,
  AiOutlineBgColors,
} from "react-icons/ai";
import { IconType } from "react-icons";

type IFormatType = "bold" | "italic" | "underline" | "strike";

const formatButtonList: { formatType: IFormatType; icon: IconType }[] = [
  { formatType: "bold", icon: AiOutlineBold },
  { formatType: "italic", icon: AiOutlineItalic },
  { formatType: "underline", icon: AiOutlineUnderline },
  { formatType: "strike", icon: AiOutlineStrikethrough },
];

function App() {
  const [quill, setQuill] = useState<Quill | null>(null);

  const editorCallbackRef = useCallback((node: HTMLDivElement | null) => {
    if (!node) {
      return;
    }

    const edtior = new Quill(node, {});
    setQuill(edtior);
  }, []);

  const onClickFormat = useCallback(
    (formatType: string) => {
      if (!quill) return;
      const currentFormat = quill?.getFormat();
      console.log({ currentFormat });
      quill?.format(formatType, !currentFormat[formatType]);
    },
    [quill]
  );

  const formatBgColor = useCallback(
    (color: string) => {
      if (!quill) return;
      const currentColor = quill?.getFormat().background;

      quill.format("background", color);
    },
    [quill]
  );

  return (
    <div className="wrapper">
      <Stack
        direction={"row"}
        spacing={4}
        sx={{
          p: 2,
        }}
      >
        {" "}
        <Stack direction={"row"} spacing={1} id="toolbar">
          {formatButtonList.map(({ formatType, icon }) => (
            <IconButton
              key={formatType}
              onClick={() => {
                onClickFormat(formatType);
              }}
              aria-label={`format-${formatType}`}
              icon={<Icon as={icon} />}
              className="ql-bold"
            ></IconButton>
          ))}
        </Stack>
        <Stack direction={"row"}>
          <Button aria-label="set-background-color" as={"label"}>
            <Icon as={AiOutlineBgColors} />
            <input
              type="color"
              name="color"
              id="color"
              style={{ display: "none" }}
              onChange={(e) => {
                const newVal = e.target.value;
                console.log(newVal);
                formatBgColor(newVal);
              }}
            />
          </Button>
        </Stack>
      </Stack>
      <Box
        sx={{
          ".ql-editor": {
            outline: "none",
            border: `1px solid`,
            borderColor: "gray.400",
            borderRadius: 4,
            px: 2,
            py: 2,
            fontSize: 14,
          },
          ".ql-clipboard": {
            display: "none",
          },
        }}
        ref={editorCallbackRef}
      ></Box>
    </div>
  );
}

export default App;
