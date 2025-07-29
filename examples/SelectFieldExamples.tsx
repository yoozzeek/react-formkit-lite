import SelectField from "../src/components/Select";
import { type CSSProperties, useState } from "react";

const optionsList = [
  {
    label: "Label 1",
    value: "value1",
  },
  {
    label: "Label 2",
    value: "value2",
  },
  {
    label: "Label 3",
    value: "value3",
  },
  {
    label: "Label 4",
    value: "value4",
  },
  {
    label: "Label 5",
    value: "value5",
  },
  {
    label: "Label 6",
    value: "value6",
  },
];

const baseBlockStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 12,
};

export default function SelectFieldExamples() {
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedMultipleValues, setSelectedMultipleValues] = useState<Array<string>>([]);
  const [requiredValue, setRequiredValue] = useState("");

  return (
    <section id="select_field_examples">
      <header>
        <h2>Select field examples</h2>
        <a
          href="https://github.com/yoozzeek/react-formkit-lite/blob/main/examples/SelectFieldExamples.tsx"
          target="_blank"
        >
          Code example
        </a>
      </header>
      <div>
        <h3>Basic usage</h3>
        <div style={baseBlockStyle}>
          <SelectField
            id="select_field"
            name="select_field"
            label="Single"
            options={optionsList}
            value={selectedValue}
            onChange={(value) => {
              setSelectedValue(value as string);
            }}
          />
          <div>
            <SelectField<never, string>
              multiple
              min={1}
              max={3}
              id="multiple_select_field"
              name="multiple_select_field"
              label="Multiple"
              options={optionsList}
              value={selectedMultipleValues}
              onChange={setSelectedMultipleValues}
            />

            {selectedMultipleValues.length > 0 && (
              <div style={{ marginTop: "1em" }}>
                <strong>Selected</strong>
                <ul>
                  {selectedMultipleValues.map((value) => (
                    <li key={value}>{value}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
      <div>
        <h3>Initial values</h3>
        <div style={baseBlockStyle}>
          <SelectField
            id="dselect_field"
            name="select_field"
            label="Select"
            options={optionsList}
            value="value3"
            onChange={() => {}}
          />
          <SelectField
            multiple
            min={1}
            max={3}
            id="multiple_select_field"
            name="multiple_select_field"
            label="Multiple"
            options={optionsList}
            value={["value1", "value3"]}
            onChange={() => {}}
          />
        </div>
      </div>
      <div>
        <h3>Flags</h3>
        <div style={baseBlockStyle}>
          <SelectField
            required
            id="required_dselect_field"
            name="required_select_field"
            label="Required"
            options={optionsList}
            value={selectedValue}
            onChange={() => {}}
          />
          <SelectField
            disabled
            id="disabled_dselect_field"
            name="disabled_select_field"
            label="Disabled"
            options={optionsList}
            value={selectedValue}
            onChange={() => {}}
          />
          <SelectField
            disabled
            multiple
            min={1}
            max={3}
            id="disabled_multiple_select_field"
            name="disabled_multiple_select_field"
            label="Disabled (multiple)"
            options={optionsList}
            value={["value1", "value3"]}
            onChange={() => {}}
          />
        </div>
      </div>
      <div>
        <h3>Error</h3>
        <div style={baseBlockStyle}>
          <div>
            <SelectField
              required
              id="required_dselect_field"
              name="required_select_field"
              label="Required"
              options={optionsList}
              value={requiredValue}
              error={!requiredValue && "Required field"}
              onChange={(value) => setRequiredValue(value as string)}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
