import React, { useState } from "react";
import {
  Container,
  Grid,
  Box,
  Link,
  Typography,
  Breadcrumbs,
  TextField,
  Button,
  Divider,
} from "@material-ui/core";
import { NavLink } from "react-router-dom";
import { SketchPicker } from "react-color";
import DrawingBoard from "./components/DrawingBoard";
import Palette from "./components/Palette";

const cols = 32;
let initialBoard = [];
for (let i = 0; i < cols * cols; i++) {
  initialBoard.push("#fff");
}

export default function CreatePost() {
  const [brushColor, setBrushColor] = useState("#fff");
  const handleBrushColorChange = (color) => {
    setBrushColor(color.hex);
    let newColors;
    if (colorHistory.length > 9) {
      newColors = [...colorHistory.slice(1), color.hex];
      setColorHistory(newColors);
    } else {
      newColors = [...colorHistory, color.hex];
      setColorHistory(newColors);
    }
    localStorage.setItem("colors", JSON.stringify(newColors));
  };

  const [colorHistory, setColorHistory] = useState([]);

  const [pixels, setPixels] = useState(initialBoard);
  const handleBrushClick = (index, isEraser = false) => {
    setPixels((prev) =>
      prev.map((p, i) => (i === index ? (isEraser ? "#fff" : brushColor) : p))
    );
    saveDraft();
  };

  const saveDraft = () => {
    localStorage.setItem("draft", JSON.stringify(pixels));
  };

  const clearBoard = () => {
    setPixels(initialBoard);
    localStorage.setItem("draft", JSON.stringify(initialBoard));
  };

  const [body, setBody] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    axios
      .post("/posts", {
        body,
        board: pixels,
      })
      .then(() => {
        window.history.back();
      });
  };

  React.useEffect(() => {
    let draft = localStorage.getItem("draft");
    draft = draft ? JSON.parse(draft) : initialBoard;
    setPixels(draft);

    let colors = localStorage.getItem("colors");
    colors = colors ? JSON.parse(colors) : [];
    setColorHistory(colors);
  }, []);

  return (
    <>
      <Box py={2}>
        <Container>
          <Breadcrumbs aria-label="breadcrumb">
            <Link color="inherit" to="/" component={NavLink}>
              Home
            </Link>
            <Typography color="textPrimary">Create pixel art</Typography>
          </Breadcrumbs>
        </Container>
      </Box>
      <Divider />
      <Container>
        <Box py={1}>
          <Grid container justify="center" spacing={3}>
            <Grid item xs={12} lg={3}>
              <SketchPicker
                color={brushColor}
                onChangeComplete={handleBrushColorChange}
              />
              <Palette colors={colorHistory} setColor={setBrushColor} />
            </Grid>
            <Grid item xs={12} lg={6}>
              <DrawingBoard
                clearBoard={clearBoard}
                pixels={pixels}
                handleBrushClick={handleBrushClick}
              />
            </Grid>
            <Grid item xs={12} lg={3}>
              <form onSubmit={handleSubmit}>
                <TextField
                  required
                  margin="normal"
                  fullWidth
                  label="Description"
                  multiline
                  variant="outlined"
                  autoFocus
                  rows="4"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                />
                <Box display="flex" justifyContent="flex-end">
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting}
                  >
                    Post
                  </Button>
                </Box>
              </form>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}
