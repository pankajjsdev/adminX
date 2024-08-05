'use client';
import React, { useState } from 'react';
import ImageUpload from "@/components/_ui/common/ImageUpload";
import Layout from "@/components/_ui/common/Layout";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { FormField } from '@/components/_ui/common/FormField';
import { TypographyH3 } from '@/components/_ui/common/Typography';
import { Input } from '@/components/ui/input';
import apiFetch from '@/lib/Services';
import { END_POINTS } from '@/lib/Endpoints';

interface FieldInfo {
    name: string;
    type: number;
    isRequired: boolean;
    keyName: string;
    fieldType?: string;
}

interface ApiResponse {
    success: boolean;
    message?: string;
    data?: any; // Adjust this type based on your API response structure
}

const fieldsInfo: FieldInfo[] = [
    { name: 'Episode Name', fieldType: 'text', type: 1, isRequired: true, keyName: 'title' },
    { name: 'Short Description', fieldType: 'text', type: 2, isRequired: true, keyName: 'shortDescription' },
    { name: 'Listen Link', type: 1, fieldType: 'url', isRequired: false, keyName: 'listenLink' },
    { name: 'Description', type: 2, fieldType: 'text', isRequired: true, keyName: 'description' },
    { name: 'Ads Media URL', fieldType: 'url', type: 1, isRequired: false, keyName: 'adsMedia' },
    { name: 'Instagram', fieldType: 'url', type: 1, isRequired: false, keyName: 'instagram' },
    { name: 'Twitter', fieldType: 'url', type: 1, isRequired: false, keyName: 'twitter' },
    { name: 'Facebook', fieldType: 'url', type: 1, isRequired: false, keyName: 'facebook' },
    { name: 'Publication Date', fieldType: 'date', type: 1, isRequired: true, keyName: 'publicationDate' },
    { name: 'Guest Name', fieldType: 'text', type: 1, isRequired: false, keyName: 'guestName' },
    { name: 'Guest Profile', fieldType: 'url', type: 1, isRequired: false, keyName: 'guestProfile' },
    { name: 'Additional Notes', fieldType: 'textarea', type: 2, isRequired: false, keyName: 'notes' },
    { name: 'Cover Image', fieldType: 'url', type: 1, isRequired: false, keyName: 'coverImage' }, // New field
];

type FormValues = {
    [key: string]: string;
};

function Page() {
    const [formValues, setFormValues] = useState<FormValues>(
        fieldsInfo.reduce((acc, field) => {
            acc[field.keyName] = '';
            return acc;
        }, {} as FormValues)
    );
    const [amount, setAmount] = useState('');
    const [currency, setCurrency] = useState('USD');
    const [images, setImagesFromUploader] = useState<string[]>([]); // Ensure images is an array of strings
    const [status, setStatus] = useState('draft');
    const [type, setType] = useState('free');
    const [coverImage, setCoverImage] = useState(); // For the cover image
    const router = useRouter();

    const handleChange = (key: string, value: string) => {
        setFormValues({ ...formValues, [key]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Construct the payload as a plain object
        const payload = {
            ...formValues,
            images: images, // Assuming images is an array of strings
            coverImage: coverImage,
            status: status,
            type: type,
            amount: amount,
            currency: currency,
        };

        console.log("Payload:", payload);

        try {
            const response: Response = await apiFetch(END_POINTS.EPISODS, {
                method: 'POST',
                body: JSON.stringify(payload), // Use the payload here
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result: ApiResponse = await response.json();
            console.log('Success:', result);
            router.back();
        } catch (error) {
            console.error('Error:', error instanceof Error ? error.message : 'Unexpected error');
        }
    };

    const setImages = (images: string[]) => {
        setImagesFromUploader(images);
    };

    const setCoverImageFrom = (image: any) => {
        setCoverImage(image[0]);
    };

    return (
        <Layout>
            <TypographyH3 title="Add New Episode" />
            <form onSubmit={handleSubmit}>
                <div className='grid grid-cols-1 lg:grid-cols-12 gap-8'>
                    <Card className="lg:col-span-8">
                        <CardHeader>
                            <CardTitle>Create Episode</CardTitle>
                            <CardDescription>Fill out the form below.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <section className="space-y-6">
                                {fieldsInfo.map((field, index) => (
                                    <FormField
                                        key={`form${index}`}
                                        field={field}
                                        value={formValues[field.keyName]}
                                        onChange={handleChange}
                                    />
                                ))}
                                <ImageUpload 
                                setImageToparent={setImages}
                                 />
                                <ImageUpload setImageToparent={setCoverImageFrom} /> {/* For the cover image */}
                            </section>
                        </CardContent>
                    </Card>
                    <div className="lg:col-span-4 space-y-6">
                        <SelectCard title="Current Status" description="Manage episode status">
                            <Select value={status} onValueChange={setStatus} required>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent position="popper">
                                    <SelectItem value="draft">Draft</SelectItem>
                                    <SelectItem value="active">Active</SelectItem>
                                    <SelectItem value="inactive">Inactive</SelectItem>
                                    <SelectItem value="delete">Delete</SelectItem>
                                </SelectContent>
                            </Select>
                        </SelectCard>
                        <SelectCard title="Select Type" description="Choose free/paid">
                            <Select value={type} onValueChange={setType} required>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent position="popper">
                                    <SelectItem value="free">Free</SelectItem>
                                    <SelectItem value="paid">Paid</SelectItem>
                                </SelectContent>
                            </Select>
                            {type === 'paid' && (
                                <div className='my-7 space-y-4'>
                                    <label className="block">Currency</label>
                                    <Select value={currency} onValueChange={setCurrency} required>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select" />
                                        </SelectTrigger>
                                        <SelectContent position="popper">
                                            <SelectItem value="USD">USD</SelectItem>
                                            <SelectItem value="EUR">EUR</SelectItem>
                                            <SelectItem value="GBP">GBP</SelectItem>
                                            <SelectItem value="INR">INR</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <label className="block">Amount</label>
                                    <Input
                                        type="number"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                    />
                                </div>
                            )}
                        </SelectCard>
                        <SelectCard title="Select Category" description="Choose a category">
                            <Select required>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent position="popper">
                                    <SelectItem value="technology">Technology</SelectItem>
                                    <SelectItem value="lifestyle">Lifestyle</SelectItem>
                                    <SelectItem value="health">Health</SelectItem>
                                    <SelectItem value="business">Business</SelectItem>
                                </SelectContent>
                            </Select>
                        </SelectCard>

                        <SelectCard title="Select Tags" description="Choose tags">
                            <Select required>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent position="popper">
                                    <SelectItem value="technology">Technology</SelectItem>
                                    <SelectItem value="lifestyle">Lifestyle</SelectItem>
                                    <SelectItem value="education">Education</SelectItem>
                                    <SelectItem value="entertainment">Entertainment</SelectItem>
                                </SelectContent>
                            </Select>
                        </SelectCard>
                    </div>
                </div>
                <div className='my-7 flex justify-between space-x-4 lg:justify-end'>
                    <Button type="submit" className='py-3 px-7'>Submit</Button>
                    <Button type="button" onClick={() => router.back()}>
                        Cancel
                    </Button>
                </div>
            </form>
        </Layout>
    );
}

const SelectCard: React.FC<{ title: string; description: string; children: React.ReactNode }> = ({
    title,
    description,
    children,
}) => (
    <Card>
        <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
            {children}
        </CardContent>
    </Card>
);

export default Page;
