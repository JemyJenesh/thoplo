import React, { useState, useRef } from "react";
import { exportComponentAsPNG } from "react-component-export-image";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { Box, CircularProgress, Button, useTheme } from "@material-ui/core";
import GetAppIcon from "@material-ui/icons/GetApp";

import Pixel from "./Pixel";

const cols = 32;

function DrawingBoard({ clearBoard, pixels, handleBrushClick }) {
  const theme = useTheme();
  const lgScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const boxSize = lgScreen ? 15 : 10;
  const imageRef = useRef();
  const [showGrid, setShowGrid] = useState(true);
  const toggleGrid = () => setShowGrid((prev) => !prev);

  const [isExporting, setIsExporting] = useState(false);
  const exportImage = () => {
    setIsExporting(false);
    exportComponentAsPNG(imageRef).finally(() => {
      setIsExporting(false);
    });
  };

  return (
    <div>
      <Box display="flex" justifyContent="center">
        <div
          ref={imageRef}
          style={{
            border: "1px solid lightgrey",
            display: "grid",
            gap: showGrid ? 1 : 0,
            background: "lightgrey",
            gridTemplateColumns: `repeat(${cols}, ${boxSize}px)`,
            gridTemplateRows: `repeat(${cols}, ${boxSize}px)`,
          }}
        >
          {pixels.map((color, i) => (
            <Pixel
              key={i}
              index={i}
              bgColor={color}
              handleClick={handleBrushClick}
            />
          ))}
        </div>
      </Box>
      <Box display="flex" mt={2}>
        <Button
          size="small"
          variant="contained"
          color="default"
          startIcon={<GetAppIcon />}
          onClick={exportImage}
          disabled={isExporting}
        >
          Download
          {isExporting && <CircularProgress />}
        </Button>
        <Box ml="auto" mr={3}>
          <Button
            size="small"
            variant="contained"
            color="secondary"
            onClick={clearBoard}
          >
            Clear
          </Button>
        </Box>
        <Button
          size="small"
          variant="contained"
          color="primary"
          onClick={toggleGrid}
        >
          {showGrid ? "Hide" : "Show"} grid
        </Button>
      </Box>
    </div>
  );
}

export default DrawingBoard;
