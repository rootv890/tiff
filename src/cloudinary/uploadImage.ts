import { QUERY_KEYS } from "@/queryKeys";
import { useMutation } from "@tanstack/react-query";

export const useImageUploadMutation = (
  onSuccess: (data: { cloudinaryUrl: string; publicId: string }) => void,
  onError: (error: unknown) => void,
) => {
  return useMutation({
    mutationKey: [QUERY_KEYS.IMAGE_UPLOAD],
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "tiff_secure_uploads");
      formData.append("filename", file.name);

      const res = await fetch("/api/image-upload", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Failed to upload image");
      const data = await res.json();
      console.table("DATA RECIVING", data);
      const cloudinaryUrl =
        `https://res.cloudinary.com/drhdaopqy/image/upload/${data.public_id}`;
      const publicId = data.public_id;
      return {
        cloudinaryUrl,
        publicId,
      };
    },
    onSuccess: (data) => {
      onSuccess(data);
    },
    onError: (error) => {
      onError(error);
    },
  });
};
