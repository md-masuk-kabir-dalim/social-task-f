"use client";
import { imageRoutes } from "@/constants/end-point";
import { useCreateResourceMutation } from "@/redux/api/commonApi";
import { useState } from "react";
import { toast } from "sonner";

export const useUploadFile = () => {
  const [uploading, setUploading] = useState(false);
  const [uploadImage] = useCreateResourceMutation();

  const uploadFile = async (file: File) => {
    try {
      setUploading(true);

      const formDataObj = new FormData();
      formDataObj.append("file", file);

      const res: any = await uploadImage({
        url: imageRoutes.upload,
        payload: formDataObj,
      }).unwrap();

      setUploading(false);

      if (res.success) {
        return res.data;
      }

      toast.error("Upload failed");
      return null;
    } catch (err) {
      setUploading(false);
      toast.error("Upload failed");
      return null;
    }
  };

  return {
    uploading,
    uploadFile,
  };
};