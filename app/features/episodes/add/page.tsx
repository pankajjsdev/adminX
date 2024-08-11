
'use client';
import React, { useEffect, useState } from 'react';
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
    SelectGroup
} from "@/components/ui/select";
import { FormField } from '@/components/_ui/common/FormField';
import { TypographyH3 } from '@/components/_ui/common/Typography';
import { Input } from '@/components/ui/input';
import apiFetch from '@/lib/Services';
import { END_POINTS } from '@/lib/Endpoints';
import { MultiSelect } from '@/components/_ui/common/Select';


import { Cat, Dog, Fish, Rabbit, Turtle } from "lucide-react";

const frameworksList = [
    { value: "react", label: "React", icon: Turtle },
    { value: "angular", label: "Angular", icon: Cat },
    { value: "vue", label: "Vue", icon: Dog },
    { value: "svelte", label: "Svelte", icon: Rabbit },
    { value: "ember", label: "Ember", icon: Fish },
];

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
    const [categories, setCategories] = useState([]);
    const [categoriesSelected, setCategoriesSelected] = useState<string[]>([]);
    const [tags, setTags] = useState([]);
    const [tagsSelected, setTagsSelected] = useState<string[]>([]);
    const [images, setImagesFromUploader] = useState<string[]>(); // Ensure images is an array of strings
    const [status, setStatus] = useState('draft');
    const [type, setType] = useState('free');
    const [coverImage, setCoverImage] = useState(); // For the cover image
    const [isLoading, setLoading] = useState(false)
    const router = useRouter();
    const [selectedFrameworks, setSelectedFrameworks] = useState<string[]>(["react", "angular"]);


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
            categories: categoriesSelected,
            tags: tagsSelected,
            status: status,
            type: type,
            amount: amount,
            currency: currency,
        };

        console.log("Payload:", payload);

        try {
            setLoading(true)
            const response: Response = await apiFetch(END_POINTS.EPISODES.CREATE, {
                method: 'POST',
                body: JSON.stringify(payload), // Use the payload here
            });

            // if (!response.ok) {
            //     throw new Error('Network response was not ok');
            // }


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

    useEffect(() => {
        initData()
    }, [])

    const initData = async () => {
        try {
            const responseCategory: any = await apiFetch(END_POINTS.CATEGORIES.LIST);
            const categories = responseCategory?.data.list
            setCategories(categories)

            const responseTags: any = await apiFetch(END_POINTS.TAGS.LIST);
            const tags = responseTags?.data.list
            setTags(tags)
        } catch (error) {
        }
    }

    const setCoverImageFrom = (image: any) => {
        setCoverImage(image);
    };

    const handleMutiSelectCategory = (values: any)=>{
        console.log("values", values)
        setCategoriesSelected(values)
    }
    const handleMutiSelectTags= (values: any)=>{
        console.log("values", values)
        setTagsSelected(values)
    }

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
                                    title={"Cover Image"}
                                    mode="single"
                                    setImageToparent={setCoverImageFrom}
                                />

                                <ImageUpload
                                    title={"Media"}
                                    mode="multiple"
                                    setImageToparent={setImages}
                                />

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
                            <MultiSelect
                                options={categories}
                                onValueChange={setSelectedFrameworks}
                                defaultValue={categoriesSelected}
                       
                                setSelectedOptions={handleMutiSelectCategory}
                                placeholder="Select"
                                variant="inverted"
                                animation={2}
                                maxCount={4}
                            />
                        </SelectCard>
                        <SelectCard title="Select Tags" description="Choose tags">
                        <MultiSelect
                                options={tags}
                                onValueChange={setSelectedFrameworks}
                                defaultValue={tagsSelected}
                                setSelectedOptions={handleMutiSelectTags}
                                placeholder="Select"
                                variant="inverted"
                                animation={2}
                                maxCount={4}
                            />
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