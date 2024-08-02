'use client';

import { Trash2, Upload } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

type PageProps = {
    setImageToparent: (images: File[]) => void;
};

function ImageUpload({ setImageToparent }: PageProps) {
    const ref = useRef<HTMLInputElement | null>(null);
    const [images, setImages] = useState<File[]>([]);

    const openFileBox = () => {
        ref.current?.click();
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            setImages((prevImages) => [...prevImages, ...Array.from(files)]);
        }
    };

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
                            src={URL.createObjectURL(image)}
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
                <div
                    className="w-32 h-32 m-2 border-2 border-dashed flex items-center justify-center cursor-pointer"
                    onClick={openFileBox}
                >
                    <Upload size={40} />
                    <input
                        type="file"
                        className="hidden"
                        ref={ref}
                        onChange={handleFileUpload}
                        multiple
                    />
                </div>
            </div>
        </div>
    );
}

export default ImageUpload;
