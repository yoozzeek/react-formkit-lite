import type { CSSProperties } from "react";
import Button from "../src/components/Button";

const baseBlockStyle: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: 4,
};

export default function ButtonExamples() {
  return (
    <section id="button_examples">
      <header>
        <h2>Button examples</h2>
        <a
          href="https://github.com/yoozzeek/react-formkit-lite/blob/main/examples/ButtonFieldExamples.tsx"
          target="_blank"
        >
          Code example
        </a>
      </header>
      <div>
        <h3>Variant</h3>
        <div style={baseBlockStyle}>
          <Button>Default</Button>
          <Button variant="success">Success</Button>
          <Button variant="danger">Danger</Button>
          <Button variant="warning">Warning</Button>
        </div>
      </div>
      <div>
        <h3>Full width</h3>
        <div style={baseBlockStyle}>
          <Button fullWidth>Button</Button>
        </div>
      </div>
      <div>
        <h3>States</h3>
        <div style={baseBlockStyle}>
          <Button disabled>Disabled</Button>
          <Button loading loadingText="Loading...">
            Loading
          </Button>
        </div>
      </div>
      <div>
        <h3>Size</h3>
        <div style={baseBlockStyle}>
          <Button size="sm">Small</Button>
          <Button size="md">Default</Button>
          <Button size="lg">Large</Button>
          <Button size="xl">Extra large</Button>
        </div>
      </div>
    </section>
  );
}
