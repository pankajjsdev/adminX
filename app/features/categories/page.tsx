import AddButton from "@/components/_ui/common/AddButton";
import Layout from "@/components/_ui/common/Layout";
import PageHeading from "@/components/_ui/common/PageHeading";
import { DataTableDemo } from "@/components/_ui/features/EpisodeList";
import { END_POINTS } from "@/lib/Endpoints";
import apiFetch from "@/lib/Services";


const Page = async () => {
    const response: any = await apiFetch(END_POINTS.CATEGORIES.LIST);
    const categories = response?.data.list
    return (
        <Layout>
            <div className="flex items-center justify-between">
                <PageHeading title="Categories" />
                <AddButton link="/features/categories/add" />
            </div>
            <DataTableDemo data={categories} />
        </Layout>
    );
};

export default Page;
