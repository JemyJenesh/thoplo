import { Box, Typography } from "@material-ui/core";
import React from "react";

export default function Palette({ colors, setColor }) {
  return (
    <Box mt={3}>
      <Typography>Color history</Typography>
      <Box display="flex" style={{ gap: 5 }}>
        {colors.map((color, i) => (
          <div
            key={i}
            onClick={() => setColor(color)}
            style={{
              borderRadius: 4,
              height: 20,
              width: 20,
              backgroundColor: color,
              cursor: "pointer",
              border: "1px solid lightgray",
            }}
          />
        ))}
      </Box>
    </Box>
  );
}
