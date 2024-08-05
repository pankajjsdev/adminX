'use client';

import { Trash2 } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

import { UploadDropzone } from "@/lib/utils/uploadthing";

type PageProps = {
    setImageToparent: (images: string[]) => void;
};

function ImageUpload({ setImageToparent }: PageProps) {
    const ref = useRef<HTMLInputElement | null>(null);
    const [images, setImages] = useState<string[]>([]);

    const handleDeleteImage = (index: number) => {
        setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    };

    useEffect(() => {
        setImageToparent(images);
    }, [images, setImageToparent]);

    return (
        <div>
            <label className="capitalize">Upload Media</label>
            <div className="flex flex-wrap mt-4">
                {images.map((image, index) => (
                    <div key={index} className="relative m-2">
                        <img
                            src={`${image}`}
                            alt={`preview-${index}`}
                            className="w-32 h-32 object-cover"
                        />
                        <button
                            type="button"
                            className="absolute top-1 shadow right-1 bg-white rounded-full p-1"
                            onClick={() => handleDeleteImage(index)}
                        >
                            <Trash2 size={16} className="text-red-500" />
                        </button>
                    </div>
                ))}
                <UploadDropzone
                    endpoint="imageUploader"
                    config={{ mode: 'auto' }}
                    className="w-full cursor-pointer"
                    onClientUploadComplete={(res) => {
                        console.log("Files: ", res);
                        setImages((prevImages) => [...prevImages, res[0].url]);
                    }}
                    onUploadProgress={(progress) => console.log(progress)}
                    onUploadError={(error: Error) => {
                        alert(`ERROR! ${error.message}`);
                    }}
                    onUploadBegin={(name) => {
                        console.log("Uploading: ", name);
                    }}
                    onDrop={(acceptedFiles) => {
                        console.log("Accepted files: ", acceptedFiles);
                    }}
                />
            </div>
        </div>
    );
}

export default ImageUpload;
