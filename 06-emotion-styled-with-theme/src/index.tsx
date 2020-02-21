import React from "react";
import { render } from "react-dom";
import { ThemeProvider } from "emotion-theming";

import App from "./App";
import { Theme } from "./lib/styled";

const theme: Theme = {
  color: {
    primary: "hotpink",
    secondary: "black"
  },
  border: {
    radius: "4px"
  }
};

const rootElement = document.getElementById("root");
render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  rootElement
);
