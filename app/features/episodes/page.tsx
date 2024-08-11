import AddButton from "@/components/_ui/common/AddButton";
import Layout from "@/components/_ui/common/Layout";
import PageHeading from "@/components/_ui/common/PageHeading";
import { DataTableDemo } from "@/components/_ui/features/EpisodeList";
import { END_POINTS } from "@/lib/Endpoints";
import apiFetch from "@/lib/Services";


const Page = async () => {
    const response: any = await apiFetch(END_POINTS.EPISODES.LIST);
    const episodes = response?.data.list
    return (
        <Layout>
            <div className="flex items-center justify-between">
                <PageHeading title="Episodes" />
                <AddButton link="/features/episodes/add" />
            </div>
            <DataTableDemo data={episodes} />
        </Layout>
    );
};

export default Page;
