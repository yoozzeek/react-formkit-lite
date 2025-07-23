import SelectField from "../src/components/Select";
import { CSSProperties, useState } from "react";

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
  const [selectedMultipleValue, setSelectedMultipleValue] = useState([]);
  const [requiredValue, setRequiredValue] = useState("");

  return (
    <section>
      <h2>Select field examples</h2>
      <div>
        <h3>Basic usage</h3>
        <div style={baseBlockStyle}>
          <SelectField
            id="select_field"
            name="select_field"
            label="Single select"
            options={optionsList}
            value={selectedValue}
            onChange={(value) => {
              setSelectedValue(value);
            }}
          />
          <div>
            <SelectField
              multiple
              min={1}
              max={3}
              id="multiple_select_field"
              name="multiple_select_field"
              label="Multiple select"
              options={optionsList}
              value={selectedMultipleValue}
              onChange={(_, value) => {
                setSelectedMultipleValue(Array.isArray(value) ? value : [value]);
              }}
            />

            {selectedMultipleValue.length > 0 && (
              <div style={{ marginTop: "1em" }}>
                <strong>Selected</strong>
                <ul>
                  {selectedMultipleValue.map((value) => (
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
            label="Select filed"
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
            label="Select filed"
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
            label="Required select"
            options={optionsList}
            value={selectedValue}
            onChange={() => {}}
          />
          <SelectField
            disabled
            id="disabled_dselect_field"
            name="disabled_select_field"
            label="Disabled single"
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
            label="Disabled multiple"
            options={optionsList}
            value={[]}
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
              label="Required select"
              options={optionsList}
              value={requiredValue}
              error={!requiredValue && "Required field"}
              onChange={(_, value) => setRequiredValue(value as string)}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
