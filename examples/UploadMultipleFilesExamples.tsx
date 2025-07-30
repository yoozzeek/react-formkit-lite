import UploadMultipleFiles from "@/components/UploadMultipleFiles";

export default function UploadMultipleFilesExamples() {
  return (
    <section id="upload_multiple_files_examples">
      <header>
        <h2>Multiple files upload examples</h2>
        <a
          href="https://github.com/yoozzeek/react-formkit-lite/blob/main/examples/UploadMultipleFilesExamples.tsx"
          target="_blank"
        >
          Code example
        </a>
      </header>
      <div>
        <h3>Default</h3>
        <UploadMultipleFiles
          label="Images, videos and PDFs"
          files={[]}
          onFilesAdded={() => {}}
          onFilesRemoved={() => {}}
        />
      </div>
    </section>
  );
}
