'use client';

import { Trash2 } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

import { UploadDropzone } from "@/lib/utils/uploadthing";
import Image from "next/image";

type PageProps = {
    setImageToparent: (images: any) => void;
    title: string;
    mode: string;
};

function ImageUpload({ setImageToparent, title, mode }: PageProps) {
    const ref = useRef<HTMLInputElement | null>(null);
    const [images, setImages] = useState<string[]>([]);

    const handleDeleteImage = (index: number) => {
        setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    };

    useEffect(() => {
        // Adjust setImageToparent based on mode
        if (mode === 'single') {
            setImageToparent(images[0] || '');
        } else {
            setImageToparent(images);
        }
    }, [images, mode, setImageToparent]);

    return (
        <div>
            <label className="capitalize">{title}</label>
            <div className="flex flex-wrap mt-4">
                {images.map((image, index) => (
                    <div key={index} className="relative m-2">
                        <Image
                        width={40}
                        height={40}
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

                        // Update images based on mode
                        if (mode === 'single' && res.length > 0) {
                            setImages([res[0].url]);
                        } else {
                            setImages((prevImages) => [
                                ...prevImages,
                                ...res.map((file) => file.url),
                            ]);
                        }
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
