import { type CSSProperties, useState } from "react";
import SwitchField from "@/components/Switch";

const blockStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "1em",
};

export default function SwitchFieldExamples() {
  const [value, setValue] = useState(false);
  const [value2, setValue2] = useState(false);
  return (
    <section id="switch_field_examples">
      <header>
        <h2>Switch field examples</h2>
        <a
          href="https://github.com/yoozzeek/react-formkit-lite/blob/main/examples/SwitchFieldExamples.tsx"
          target="_blank"
        >
          Code example
        </a>
      </header>
      <div>
        <h3>Default</h3>
        <SwitchField
          id="switch_field_1"
          name="switch_field_1"
          label="Label"
          value={value}
          onChange={setValue}
        />
      </div>
      <div>
        <h3>Help text</h3>
        <SwitchField
          id="switch_field_2"
          name="switch_field_2"
          label="Label"
          helpText="Help text"
          value={value2}
          onChange={setValue2}
        />
      </div>
      <div>
        <h3>Flags</h3>
        <div style={blockStyle}>Soon...</div>
      </div>
    </section>
  );
}
