import DemoUploadArea from "./components/DemoUploadArea.tsx";

export default function UploadAreaExamples() {
  return (
    <div>
      <h2>Upload area examples</h2>
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
    </div>
  );
}
