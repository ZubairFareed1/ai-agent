import React, { useRef } from "react";
import { Toast } from "primereact/toast";
import { FileUpload } from "primereact/fileupload";
import '../../global.css'

export default function FileUploadComponent() {
  const toast = useRef(null);

  const onUpload = () => {
    toast.current.show({
      severity: "success",
      summary: "Success",
      detail: "File Uploaded",
    });
  };

  return (
    <div className="card flex justify-content-center">
      <Toast ref={toast}></Toast>
      <FileUpload
        mode="basic"
        name="file"
        url="http://localhost:3000/api/admin/fileupload"
        accept=".doc, .docx, .pdf"
        auto
        maxFileSize={10000000}
        onUpload={onUpload}
         />
    </div>
  );
}
