import { type CSSProperties, useState } from "react";
import CheckboxField from "@/components/Checkbox/CheckboxField.tsx";
import CheckboxGroup from "@/components/Checkbox/CheckboxGroup.tsx";

const blockStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "1em",
};

export default function CheckboxFieldExamples() {
  const [value, setValue] = useState(false);
  const [value2, setValue2] = useState(false);
  const [value3, setValue3] = useState(false);
  const [value4, setValue4] = useState(false);
  const [value5, setValue5] = useState(false);
  return (
    <section id="checkbox_field_examples">
      <h2>Checkbox field examples</h2>
      <div>
        <h3>Default</h3>
        <CheckboxField
          id="checkbox_field_1"
          name="checkbox_field_1"
          label="Label"
          value={value}
          onClick={setValue}
        />
      </div>
      <div>
        <h3>Group</h3>
        <CheckboxGroup label="Group title">
          <CheckboxField
            isGroup
            id="checkbox_field_2"
            name="checkbox_field_2"
            label="Label"
            value={value2}
            onClick={setValue2}
          />
          <CheckboxField
            isGroup
            id="checkbox_field_3"
            name="checkbox_field_3"
            label="Label"
            value={value3}
            onClick={setValue3}
          />
        </CheckboxGroup>
      </div>
      <div>
        <h3>Right label</h3>
        <CheckboxField
          leftLabel={false}
          id="checkbox_field_4"
          name="checkbox_field_4"
          label="Right label"
          value={value4}
          onClick={setValue4}
        />
      </div>
      <div>
        <h3>Flags</h3>
        <div style={blockStyle}>
          <CheckboxField
            required
            id="checkbox_field_5"
            name="checkbox_field_5"
            label="Right label"
            value={false}
            onClick={() => {}}
          />
          <CheckboxField
            disabled
            id="checkbox_field_6"
            name="checkbox_field_6"
            label="Disabled"
            value={false}
            onClick={() => {}}
          />
        </div>
      </div>
      <div>
        <h3>Error</h3>
        <CheckboxGroup label="" error={!value5 ? "Required field" : undefined}>
          <CheckboxField
            id="checkbox_field_7"
            name="checkbox_field_7"
            label="Required"
            value={value5}
            onClick={setValue5}
          />
        </CheckboxGroup>
      </div>
    </section>
  );
}
