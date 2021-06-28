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
} from "@material-ui/core";
import { Layout } from "../components";
import { NavLink } from "react-router-dom";
import { SketchPicker } from "react-color";
import DrawingBoard from "./components/DrawingBoard";

const cols = 32;
let initialBoard = [];
for (let i = 0; i < cols * cols; i++) {
  initialBoard.push("#fff");
}

export default function CreatePost() {
  const [brushColor, setBrushColor] = useState("#fff");
  const handleBrushColorChange = (color) => setBrushColor(color.hex);

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
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/api/v1/posts", {
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
  }, []);

  return (
    <Layout>
      <Box py={1}>
        <Container>
          <Breadcrumbs aria-label="breadcrumb">
            <Link color="inherit" to="/" component={NavLink}>
              Home
            </Link>
            <Typography color="textPrimary">Create pixel art</Typography>
          </Breadcrumbs>
        </Container>
      </Box>
      <Box py={1}>
        <Container>
          <Grid container justify="center" spacing={3}>
            <Grid item xs={3}>
              <SketchPicker
                color={brushColor}
                onChangeComplete={handleBrushColorChange}
              />
            </Grid>
            <Grid item xs={6}>
              <DrawingBoard
                brushColor={brushColor}
                clearBoard={clearBoard}
                pixels={pixels}
                handleBrushClick={handleBrushClick}
              />
            </Grid>
            <Grid item xs={3}>
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
                  <Button type="submit" variant="contained" color="primary">
                    Post
                  </Button>
                </Box>
              </form>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Layout>
  );
}
