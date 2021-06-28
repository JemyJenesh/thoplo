import React from "react";
import { Container } from "@material-ui/core";
import NavBar from "./NavBar";

export default function Layout({ children }) {
  return (
    <div>
      <NavBar />
      <Container fixed>{children}</Container>
    </div>
  );
}
