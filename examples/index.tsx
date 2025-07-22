import React from "react";
import ReactDOM from "react-dom/client";
import BadgeExamplesPage from "./BadgeExamples";
import ButtonExamplesPage from "./ButtonExamples";
import TextFieldExamples from "./TextFieldExamples";
import SelectFieldExamples from "./SelectFieldExample";

import "simplebar-react/dist/simplebar.min.css";
import "react-context-modal/dist/index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <header>
      <h1>react-formkit-lite demo</h1>
      <a href="https://github.com/yoozzeek/react-formkit-lite" target="_blank">
        Open on Github
      </a>
      <p>
        A lightweight collection of React components for building forms. Works with your own form
        state or integrates smoothly with Formik.
      </p>
    </header>

    <div>
      <h2>Components</h2>
      <nav
        style={{
          marginTop: "1em",
          display: "flex",
          flexWrap: "wrap",
          gap: 21,
        }}
      >
        <a href="#">Text</a>
        <a href="#">Select</a>
        <a href="#">Date</a>
        <a href="#">Range</a>
        <a href="#">Checkbox</a>
        <a href="#">Radio</a>
        <a href="#">Switch</a>
        <a href="#">MultipleFiles</a>
        <a href="#">UploadArea</a>
        <a href="#">Header</a>
        <a href="#">Loader</a>
        <a href="#">Badge</a>
        <a href="#">Button</a>
      </nav>
    </div>

    <div
      style={{
        marginTop: "1em",
        display: "flex",
        flexDirection: "column",
        gap: "2em",
      }}
    >
      <TextFieldExamples />
      <SelectFieldExamples />
      <BadgeExamplesPage />
      <ButtonExamplesPage />
    </div>

    <footer>
      <p>Feel free to add more examples and contribute.</p>
      <div>
        <strong>Authors:</strong>
        <ul>
          <li>
            <a href="https://bitkind.org/about" target="_blank">
              Bitkind.org
            </a>{" "}
            [inbox@bitkind.org]
          </li>
          <li>
            <a href="https://github.com/yoozzeek" target="_blank">
              Andrew
            </a>{" "}
            [zeek@tuta.com]
          </li>
        </ul>
      </div>
      <strong>License: MIT</strong>
    </footer>
  </React.StrictMode>,
);
