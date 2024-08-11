'use client';
import React, { useState } from 'react';
import ImageUpload from "@/components/_ui/common/ImageUpload";
import Layout from "@/components/_ui/common/Layout";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react"
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
    { name: 'Title', fieldType: 'text', type: 1, isRequired: true, keyName: 'title' },
    { name: 'Description', type: 2, fieldType: 'text', isRequired: false, keyName: 'description' },
]

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
    const [images, setImagesFromUploader] = useState<string[]>(); // Ensure images is an array of strings
    const [status, setStatus] = useState('draft');
    const [type, setType] = useState('free');
    const [coverImage, setCoverImage] = useState(); // For the cover image
    const [isLoading, setLoading] = useState(false)
    const router = useRouter();

    const handleChange = (key: string, value: string) => {
        setFormValues({ ...formValues, [key]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Construct the payload as a plain object
        const payload = {
            ...formValues,
            status: status,
        };

        console.log("Payload:", payload);

        try {
            setLoading(true)
            const response: Response = await apiFetch(END_POINTS.CATEGORIES.CREATE, {
                method: 'POST',
                body: JSON.stringify(payload), // Use the payload here
            });
            console.log('Success:', response);
            router.back();
        } catch (error) {
            console.error('Error:', error instanceof Error ? error.message : 'Unexpected error');
        }
        finally {
            setLoading(false)
        }
    };

    const setImages = (images: string[]) => {
        setImagesFromUploader(images);
    };

    const setCoverImageFrom = (image: any) => {
        setCoverImage(image);
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
                                </SelectContent>
                            </Select>
                        </SelectCard>

                    </div>
                </div>
                <div className='my-7 flex justify-between space-x-4 lg:justify-end'>
                    <Button disabled={isLoading} type="submit" className='py-3 px-7'>
                        {isLoading ? <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Please wait
                        </>
                            :
                            'Submit'
                        }
                    </Button>
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
