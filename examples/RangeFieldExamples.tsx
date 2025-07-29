import RangeField from "@/components/Range";
import { useState } from "react";

export default function RangeFieldExamples() {
  const [value1, setValue1] = useState(50);
  const [value2, setValue2] = useState(500);
  return (
    <section id="range_field_examples">
      <header>
        <h2>Range field examples</h2>
        <a
          href="https://github.com/yoozzeek/react-formkit-lite/blob/main/examples/RangeFieldExamples.tsx"
          target="_blank"
        >
          Code example
        </a>
      </header>
      <div>
        <h3>Default</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1em" }}>
          <RangeField
            id="range_field_1"
            name="range_field_1"
            minPlaceholder="1"
            maxPlaceholder="100"
            label="Range"
            min={1}
            max={100}
            step={1}
            value={value1}
            onValueChange={setValue1}
          />
          <span>Value: {value1}</span>
        </div>
      </div>
      <div>
        <h3>Custom min/max</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1em" }}>
          <RangeField
            id="range_field_1"
            name="range_field_1"
            minPlaceholder="$100"
            maxPlaceholder="$8,300"
            label="Range"
            min={100}
            max={8300}
            step={1}
            value={value2}
            onValueChange={setValue2}
          />
          <span>Value: ${value2}</span>
        </div>
      </div>
      <div>
        <h3>Flags</h3>
        <div>
          <RangeField
            disabled
            id="range_field_2"
            name="range_field_2"
            label="Disabled"
            min={1}
            max={100}
            step={1}
            value={50}
            onValueChange={() => {}}
          />
        </div>
      </div>
    </section>
  );
}
