import Loader from "@/components/Loader";

export default function LoaderExamples() {
  return (
    <section id="loader_examples">
      <header>
        <h2>Loader examples</h2>
        <a
          href="https://github.com/yoozzeek/react-formkit-lite/blob/main/examples/SwitchFieldExamples.tsx"
          target="_blank"
        >
          Code example
        </a>
      </header>
      <div>
        <h3>Size</h3>
        <div
          style={{
            display: "flex",
            gap: "1em",
          }}
        >
          <Loader size="sm" />
          <Loader size="md" />
          <Loader size="lg" />
        </div>
      </div>
      <div style={{ marginTop: "1em" }}>
        <h3>Text</h3>
        <div
          style={{
            display: "flex",
            gap: "1em",
          }}
        >
          <Loader text="Loading data..." />
        </div>
      </div>
    </section>
  );
}
