import AddButton from "@/components/_ui/common/AddButton";
import Layout from "@/components/_ui/common/Layout";
import PageHeading from "@/components/_ui/common/PageHeading";
import { DataTableDemo } from "@/components/_ui/common/TableData";

import { END_POINTS } from "@/lib/Endpoints";
import apiFetch from "@/lib/Services";

const parentColumnTitles = [
    { title: "Title", accessorKey: "title", type:'text' },
    { title: "Created At",accessorKey: "createdAt",   type:'date' },
    { title: "Updated At",accessorKey: "updatedAt",  type:'date' },
    { title: "Status", accessorKey: "status",  type:'text' },
];


const Page = async () => {
    const response: any = await apiFetch(END_POINTS.CATEGORIES.LIST);
    const categories = response?.data.list
    return (
        <Layout>
            <div className="flex items-center justify-between">
                <PageHeading title="Categories" />
                <AddButton link="/features/categories/add" />
            </div>
            <DataTableDemo columnRows={parentColumnTitles} data={categories} />
        </Layout>
    );
};

export default Page;
