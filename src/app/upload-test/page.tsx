"use client";
import Button from "@/components/tiffui/Button";
import { Input } from "@/components/tiffui/Input";
import { QUERY_KEYS } from "@/queryKeys";
import { Flex } from "@radix-ui/themes";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { useState } from "react";

const page = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  /* Mutation */
  const mutation = useMutation({
    mutationKey: [QUERY_KEYS.IMAGE_UPLOAD],
    mutationFn: async (formData: FormData) => {
      return fetch("/api/image-upload", {
        method: "POST",
        body: formData,
      });
      // returns { public_id: string }
    },
    onSuccess: async (res) => {
      const data = await res.json();
      const cloudinaryUrl = `https://res.cloudinary.com/drhdaopqy/image/upload/${data.public_id}`;
      setImageUrl(cloudinaryUrl);
      setLoading(false);
    },
    onError: () => {
      setLoading(false);
    },
  });

  const uploadImageHandle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "tiff_secure_uploads");
    formData.append("filename", file.name);
    setLoading(true);
    mutation.mutate(formData);
  };

  return (
    <form
      onSubmit={uploadImageHandle}
      className="max-w-sm flex flex-col gap-4 my-auto justify-center items-center mx-auto h-screen"
    >
      <pre>
        {JSON.stringify(
          { size: file?.size, name: file?.name, loading, imageUrl },
          null,
          2,
        )}
      </pre>
      <h1 className="font-bold text-2xl">Upload Test</h1>
      <Flex direction="column" gap="4">
        <label htmlFor="file">Upload Image</label>
        <Input
          onChange={(e) => {
            const selected = e.target.files?.[0];
            if (selected) {
              setFile(selected);
            }
          }}
          className="w-full"
          type="file"
          id="file"
        />
      </Flex>
      <Button className="w-full" type="submit" disabled={loading}>
        {loading ? "Uploading..." : "Upload"}
      </Button>

      {imageUrl && (
        <Image
          width={500}
          height={500}
          src={imageUrl}
          alt="Uploaded"
          className="mt-4 rounded shadow-md max-w-full"
        />
      )}
    </form>
  );
};
export default page;
