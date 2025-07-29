import MultipleFilesField from "@/components/MultipleFiles";

export default function UploadMultipleFilesExamples() {
  return (
    <section id="upload_multiple_files_examples">
      <h2>Multiple files upload examples</h2>
      <div>
        <h3>Default</h3>
        <MultipleFilesField
          label="Images, videos and PDFs"
          files={[]}
          onFilesAdded={() => {}}
          onFilesRemoved={() => {}}
        />
      </div>
    </section>
  );
}
