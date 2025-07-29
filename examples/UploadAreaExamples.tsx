import DemoUploadArea from "./components/DemoUploadArea.tsx";

export default function UploadAreaExamples() {
  return (
    <section id="upload_area_examples">
      <header>
        <h2>Upload area examples</h2>
        <a
          href="https://github.com/yoozzeek/react-formkit-lite/blob/main/examples/SwitchFieldExamples.tsx"
          target="_blank"
        >
          Code example
        </a>
      </header>
      <div>
        <h3>Basic</h3>
        <DemoUploadArea />
      </div>
      <div>
        <h3>Only images</h3>
        <DemoUploadArea
          accept="image/*"
          areaTitle="Upload image"
          areaDescription="Upload image in jpg or png format."
        />
      </div>
    </section>
  );
}
