import React, { useState } from "react";
import Image from "next/image";

interface ImageProps {
  setImages: (files: File[]) => void;
  images: File[];
  uploadImage: () => void;
}

export default function FileUpload({
  setImages,
  images,
  uploadImage,
}: ImageProps) {
  const [imagePreview, setImagePreview] = useState<string[]>([]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const _files = Array.from(files);
      setImages(_files);
      const previews = _files.map((file) => URL.createObjectURL(file));
      setImagePreview((prev) => [...prev, ...previews]);
    }
  };

  const handleRemoveImage = (index: number) => {
    const newImages = [...images];
    const newPreviews = [...imagePreview];

    newImages.splice(index, 1); // Remove the file from images
    newPreviews.splice(index, 1); // Remove the preview

    setImages(newImages);
    setImagePreview(newPreviews);
  };

  return (
    <div>
      <div className="mt-2 flex items-center justify-center w-full">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full
           h-30 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              SVG, PNG, JPG or GIF (MAX. 800x400px)
            </p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            multiple
            className="hidden"
            onChange={handleFileUpload}
            accept="image/png, image/gif, image/jpeg"
          />
        </label>
      </div>
      <div className="mt-5 md:mt-10 flex space-x-2 ">
        {imagePreview.map((image, index) => (
          <div key={index} className="relative bg-white px-3 py-3">
            <Image
              src={image}
              width={100}
              height={100}
              className=" rounded-md  object-cover h-[150px] w-[200px]"
              alt={`image-${index}`}
            />
            <div
              className="flex-col justify-center space-y-1 mt-2 
             rounded-md  w-full"
            >
              <button
                className="text-white hover:underline  bg-red-400 px-1 py-1
                rounded-sm w-full"
                onClick={() => handleRemoveImage(index)}
              >
                Remove
              </button>
              <button
                className="text-white hover:underline 
                bg-blue-400 px-1 py-1 w-full rounded-sm"
                onClick={() => uploadImage()}
              >
                Upload
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
