import { useState } from "react";
import UploadArea from "@/components/UploadArea";
import Button from "@/components/Button";
import type { Variant } from "@/types.ts";

export default function DemoUploadArea({
  title,
  areaTitle = "Upload image or PDF",
  areaDescription = "Try image or PDF formats to test this example.",
  accept = "*",
  variant = "light",
}: {
  title?: string;
  areaTitle?: string;
  areaDescription?: string;
  accept?: string;
  variant?: Variant;
}) {
  const [uploadedFile, setUploadedFile] = useState<{
    name: string;
    dataUrl: string;
    isImage: boolean;
  } | null>(null);

  function handleUploadFile(files: FileList | null) {
    if (files && files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        const isImage = files[0].type === "image/jpeg" || files[0].type === "image/png";
        setUploadedFile({
          isImage,
          name: files[0].name,
          dataUrl: reader?.result?.toString() || "",
        });
      });
      reader.readAsDataURL(files[0]);
    }
  }
  return (
    <div>
      {!!title && <h4>{title}</h4>}
      {!uploadedFile ? (
        <UploadArea
          accept={accept}
          variant={variant}
          title={areaTitle}
          description={areaDescription}
          onSelectFile={handleUploadFile}
        />
      ) : (
        <div>
          <div
            style={{
              marginBottom: "1em",
            }}
          >
            {uploadedFile.isImage ? (
              <img
                alt="Uploaded image"
                style={{
                  width: "100%",
                  height: "auto",
                  objectFit: "cover",
                }}
                src={uploadedFile.dataUrl}
              />
            ) : (
              <span>{uploadedFile.name}</span>
            )}
          </div>
          <Button variant="danger" onClick={() => setUploadedFile(null)}>
            Reset
          </Button>
        </div>
      )}
    </div>
  );
}
