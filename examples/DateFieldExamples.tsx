import DateField from "@/components/Date/DateField.tsx";
import type { CSSProperties } from "react";

const blockStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "1em",
};

export default function DateFieldExamples() {
  return (
    <section id="date_field_examples">
      <header>
        <h2>Date field examples</h2>
        <a
          href="https://github.com/yoozzeek/react-formkit-lite/blob/main/examples/DateFieldExamples.tsx"
          target="_blank"
        >
          Code example
        </a>
      </header>
      <div>
        <h3>Default</h3>
        <div>
          <DateField
            id="date_field_1"
            name="date_field_1"
            label="Date"
            value=""
            onChange={() => {}}
          />
        </div>
      </div>
      <div>
        <h3>Alternate format</h3>
        <div>
          <DateField
            id="date_field_2"
            name="date_field_2"
            label="Date"
            value=""
            placeholder="MM-DD-YYYY"
            onChange={() => {}}
          />
        </div>
      </div>
      <div>
        <h3>Flags</h3>
        <div style={blockStyle}>
          <DateField
            required
            id="date_field_3"
            name="date_field_3"
            label="Required"
            value=""
            onChange={() => {}}
          />
          <DateField
            disabled
            id="date_field_4"
            name="date_field_4"
            label="Disabled"
            value=""
            onChange={() => {}}
          />
        </div>
      </div>
      <div>
        <h3>Error</h3>
        <div>
          <DateField
            required
            id="date_field_5"
            name="date_field_5"
            label="Date"
            value=""
            error="Required field"
            onChange={() => {}}
          />
        </div>
      </div>
    </section>
  );
}
