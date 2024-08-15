import AddButton from "@/components/_ui/common/AddButton";
import Layout from "@/components/_ui/common/Layout";
import PageHeading from "@/components/_ui/common/PageHeading";
import { DataTableDemo } from "@/components/_ui/common/TableData";
import { END_POINTS } from "@/lib/Endpoints";
import apiFetch from "@/lib/Services";


const parentColumnTitles = [
    { title: "Title", accessorKey: "title", type:'text' },
    { title: "Type", accessorKey: "type",  type:'text' },
    { title: "Amount", accessorKey: "amount",  type:'text' },
    { title: "Created At",accessorKey: "createdAt",   type:'date' },
    { title: "Updated At",accessorKey: "updatedAt",  type:'date' },
    { title: "Status", accessorKey: "status",  type:'text' },
];

const Page = async () => {
    const response: any = await apiFetch(END_POINTS.EPISODES.LIST);
    const data = response?.data.list
    return (
        <Layout>
            <div className="flex items-center justify-between">
                <PageHeading title="Episodes" />
                <AddButton link="/features/episodes/add" />
            </div>
            <DataTableDemo columnRows={parentColumnTitles} data={data} />
        </Layout>
    );
};

export default Page;
