"use client";

import { useState, useRef } from "react";
import { customAxios } from "@/app/api/createAPI";

export default function UploadImage() {
  const [image, setImage] = useState<string>("/potato.jpeg");

  const fileInput = useRef<HTMLInputElement | null>(null);

  const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e: ProgressEvent<FileReader>) => {
      if (reader.readyState === 2) {
        setImage(e.target?.result as string);
      }
    };
    const formData = new FormData();
    formData.append("file", file);
    try {
      const imageRes = await customAxios.post("/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const image_URL: string = imageRes.data.imageURL;
    } catch (error) {
      let message;
      if (error instanceof Error) message = error.message;
      else message = String(error);
      reportError({ message });
    }
  };

  return (
    <>
      <a href="#" onClick={() => fileInput.current?.click()}>
        <img src={image} width={150} height={150} alt="Profile image" />
      </a>
      <label htmlFor="input-file">Select image</label>
      <input
        type="file"
        name="image_URL"
        id="input-file"
        accept="image/*"
        style={{ display: "none" }}
        ref={fileInput}
        onChange={handleImage}
      />
    </>
  );
}
