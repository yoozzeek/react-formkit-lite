import "simplebar-react/dist/simplebar.min.css";
import "@yoozzeek/react-context-modal/dist/index.css";
import "./styles.css";

import React from "react";
import ReactDOM from "react-dom/client";
import SimpleBar from "simplebar-react";
import GitHubButton from "react-github-btn";
import BadgeExamples from "./BadgeExamples";
import ButtonExamples from "./ButtonExamples";
import TextFieldExamples from "./TextFieldExamples";
import SelectFieldExamples from "./SelectFieldExamples.tsx";
import DemoFormExample from "./DemoFormExample";
import LoaderExamples from "./LoaderExamples";
import HeaderExamples from "./HeaderExamples";
import UploadAreaExamples from "./UploadAreaExamples";
import DateFieldExamples from "./DateFieldExamples";
import RangeFieldExamples from "./RangeFieldExamples";
import CheckboxFieldExamples from "./CheckboxFieldExamples";
import SwitchFieldExamples from "./SwitchFieldExamples";
import RadioFieldExamples from "./RadioFieldExamples";
import UploadMultipleFilesExamples from "./UploadMultipleFilesExamples";

const ComponentsNavItemsList = () => {
  return (
    <>
      <a href="#text_field_examples">Text</a>
      <a href="#select_field_examples">Select</a>
      <a href="#upload_multiple_files_examples">MultipleFiles</a>
      <a href="#date_field_examples">Date</a>
      <a href="#range_field_examples">Range</a>
      <a href="#checkbox_field_examples">Checkbox</a>
      <a href="#radio_field_examples">Radio</a>
      <a href="#switch_field_examples">Switch</a>
      <a href="#upload_area_examples">UploadArea</a>
      <a href="#header_examples">Header</a>
      <a href="#loader_examples">Loader</a>
      <a href="#badge_examples">Badge</a>
      <a href="#button_examples">Button</a>
    </>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <header>
      <h1>react-formkit-lite demo</h1>
      {/*<a href="https://github.com/yoozzeek/react-formkit-lite" target="_blank">*/}
      {/*  Open on Github*/}
      {/*</a>*/}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.6em",
        }}
      >
        <GitHubButton
          href="https://github.com/yoozzeek/react-formkit-lite"
          data-color-scheme="no-preference: light; light: light; dark: light;"
          data-size="large"
          data-show-count="true"
          aria-label="Open yoozzeek/react-formkit-lite on GitHub"
        >
          Open
        </GitHubButton>
        <a href="https://www.npmjs.com/package/@yoozzeek/react-formkit-lite" target="_blank">
          <img
            alt="Open @yoozzeek/react-formkit-lite on npmjs"
            src="https://img.shields.io/npm/v/@yoozzeek/react-formkit-lite.svg"
          />
        </a>
      </div>
      <p>
        Lightweight form components for modern React apps. Build beautiful, mobile-first forms with
        just the parts you need. From smart selects to masked inputs, everything is
        approach-agnostic whether you're using raw React state, Formik, or anything else.
      </p>
    </header>

    <div style={{ marginTop: "2em" }}>
      <h2>Components</h2>
      <nav
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 21,
        }}
      >
        <ComponentsNavItemsList />
      </nav>
    </div>

    <div
      style={{
        marginTop: "3em",
      }}
    >
      <DemoFormExample />
    </div>

    <div
      style={{
        marginTop: "2em",
        position: "relative",
      }}
    >
      <div
        style={{
          backgroundColor: "#ffffff",
          paddingTop: "0.4em",
          paddingBottom: "0.4em",
          position: "sticky",
          zIndex: 10,
          top: 0,
        }}
      >
        <SimpleBar autoHide={false}>
          <nav
            style={{
              display: "flex",
              flexWrap: "nowrap",
              padding: "1em 0",
              fontSize: "1.2rem",
              fontWeight: 600,
              whiteSpace: "nowrap",
              gap: "1em",
            }}
          >
            <span>Go to:</span>
            <a href="https://github.com/yoozzeek/react-formkit-lite" target="_blank">
              GitHub
            </a>
            <ComponentsNavItemsList />
          </nav>
        </SimpleBar>
      </div>

      <div
        style={{
          marginTop: "2em",
          display: "flex",
          flexDirection: "column",
          gap: "3em",
        }}
      >
        <TextFieldExamples />
        <SelectFieldExamples />
        <UploadMultipleFilesExamples />
        <DateFieldExamples />
        <RangeFieldExamples />
        <CheckboxFieldExamples />
        <RadioFieldExamples />
        <SwitchFieldExamples />
        <UploadAreaExamples />
        <ButtonExamples />
        <BadgeExamples />
        <HeaderExamples />
        <LoaderExamples />
      </div>
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
            {"<"}inbox@bitkind.org{">"}
          </li>
          <li>
            <a href="https://github.com/yoozzeek" target="_blank">
              Andrew
            </a>{" "}
            {"<"}zeek@tuta.com{">"}
          </li>
        </ul>
      </div>
      <strong>License: MIT</strong>
    </footer>
  </React.StrictMode>,
);
