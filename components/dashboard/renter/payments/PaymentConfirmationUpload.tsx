"use client";

import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { DropzoneDropArea } from "./DropzoneDropArea";
import { DropzoneFilePreview } from "./DropzoneFilePreview";

interface Props {
  onFileSelect?: (file: File | null) => void;
}

export function PaymentConfirmationUpload({ onFileSelect }: Props) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles && acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        setSelectedFile(file);
        setPreviewUrl(URL.createObjectURL(file));
        if (onFileSelect) onFileSelect(file);
      }
    },
    [onFileSelect],
  );

  const removeFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    if (onFileSelect) onFileSelect(null);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".webp"],
      "application/pdf": [".pdf"],
    },
    maxFiles: 1,
  });

  return (
    <div className="space-y-2 mt-5">
      <label className="block text-xs font-bold uppercase tracking-wider text-faint">
        Payment Confirmation / Receipt Upload
      </label>

      {!selectedFile ? (
        <DropzoneDropArea
          getRootProps={getRootProps}
          getInputProps={getInputProps}
          isDragActive={isDragActive}
        />
      ) : (
        <DropzoneFilePreview
          file={selectedFile}
          previewUrl={previewUrl}
          onRemove={removeFile}
        />
      )}
    </div>
  );
}
