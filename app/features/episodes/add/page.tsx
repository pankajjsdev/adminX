'use client'
import React, { useState } from 'react';
import ImageUpload from "@/components/_ui/common/ImageUpload";
import Layout from "@/components/_ui/common/Layout";
import PageHeading from "@/components/_ui/common/PageHeading";
import { Button } from "@/components/ui/button";
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
import Link from 'next/link';

interface FieldInfo {
    name: string;
    type: number;
    isRequired: boolean;
    keyName: string;
}

const fieldsInfo: FieldInfo[] = [
    { name: 'Episode name', type: 1, isRequired: true, keyName: 'title' },
    { name: 'Short description', type: 2, isRequired: true, keyName: 'shortDescription' },
    { name: 'Listen Link', type: 1, isRequired: false, keyName: 'listenLink' },
    { name: 'Description', type: 2, isRequired: true, keyName: 'description' },
];

// Define the type for form values based on FieldInfo key names
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

    const handleChange = (key: string, value: string) => {
        setFormValues({ ...formValues, [key]: value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget)
        console.log('Form submitted:', {formValues, formData});
    };

    return (
        <Layout>
            <TypographyH3 title="Add New Episode" />

            <form className="relative" onSubmit={handleSubmit}>
                <div className='absolute right-0 -top-16 space-x-4'>
                    <Button type="submit" className='px-7'>Submit</Button>
                    <Link href={'/'} className='py-3 px-7 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90'>Cancel</Link>
                </div>
                <div className='grid grid-cols-1 lg:grid-cols-12 gap-8'>
                    <Card className="lg:col-span-8">
                        <CardHeader>
                            <CardTitle>Create Episode</CardTitle>
                            <CardDescription>fill below info.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <section className="space-y-6" >
                                {fieldsInfo.map((field, index) => (
                                    <FormField
                                        key={`form${index}`}
                                        field={field}
                                        value={formValues[field.keyName]}
                                        onChange={handleChange}
                                    />
                                ))}
                                <ImageUpload />

                            </section>
                        </CardContent>
                    </Card>
                    <div className="lg:col-span-4 space-y-6">
                        <SelectCard title="Select Category" description="Choose a category">
                            <SelectItem value="next">Next.js</SelectItem>
                            <SelectItem value="sveltekit">SvelteKit</SelectItem>
                            <SelectItem value="astro">Astro</SelectItem>
                            <SelectItem value="nuxt">Nuxt.js</SelectItem>
                        </SelectCard>
                        <SelectCard title="Select Tags" description="Choose tags">
                            <SelectItem value="next">Next.js</SelectItem>
                            <SelectItem value="sveltekit">SvelteKit</SelectItem>
                            <SelectItem value="astro">Astro</SelectItem>
                            <SelectItem value="nuxt">Nuxt.js</SelectItem>
                        </SelectCard>
                    </div>

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
            <Select required={true}>
                <SelectTrigger>
                    <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">{children}</SelectContent>
            </Select>
        </CardContent>
    </Card>
);

export default Page;
