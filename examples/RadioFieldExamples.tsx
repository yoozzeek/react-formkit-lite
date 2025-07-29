import { type CSSProperties, useState } from "react";
import RadioField from "@/components/Radio/RadioField.tsx";
import RadioGroup from "../src/components/Radio/RadioGroup.tsx";

const blockStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "1em",
};

export default function RadioFieldExamples() {
  const [value, setValue] = useState<string>();
  const [value2, setValue2] = useState<string>();
  const [value3, setValue3] = useState<string>();
  const [groupValue, setGroupValue] = useState<string>();
  return (
    <section id="radio_field_examples">
      <header>
        <h2>Radio field examples</h2>
        <a
          href="https://github.com/yoozzeek/react-formkit-lite/blob/main/examples/RadioFieldExamples.tsx"
          target="_blank"
        >
          Code example
        </a>
      </header>
      <div>
        <h3>Default</h3>
        <RadioField
          name="radio_field_1"
          label="Option"
          value="value"
          checkedValue={value}
          onChange={() => setValue("value")}
        />
      </div>
      <div>
        <h3>Group</h3>
        <RadioGroup label="Group title">
          <RadioField
            name="radio_field_2"
            label="Option 1"
            value="one"
            checkedValue={groupValue}
            onChange={() => setGroupValue("one")}
          />
          <RadioField
            name="radio_field_2"
            label="Option 2"
            value="two"
            checkedValue={groupValue}
            onChange={() => setGroupValue("two")}
          />
        </RadioGroup>
      </div>
      <div>
        <h3>Flags</h3>
        <div style={blockStyle}>
          <RadioField
            lightVariant
            name="radio_field_3"
            label="Light variant"
            value="value2"
            checkedValue={value2}
            onChange={() => setValue2("value2")}
          />
          <RadioField
            disabled
            name="radio_field_4"
            label="Disabled"
            value="value"
            checkedValue={groupValue}
            onChange={() => setGroupValue("two")}
          />
        </div>
      </div>
      <div>
        <h3>Error</h3>
        <RadioGroup label="" error={!value3 ? "Required field" : undefined}>
          <RadioField
            name="radio_field_5"
            label="Option"
            value="value"
            checkedValue={value3}
            onChange={() => setValue3("value")}
          />
        </RadioGroup>
      </div>
    </section>
  );
}
