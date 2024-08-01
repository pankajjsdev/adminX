import AddButton from "@/components/_ui/common/AddButton"
import Layout from "@/components/_ui/common/Layout"
import PageHeading from "@/components/_ui/common/PageHeading"
import { DataTableDemo } from "@/components/_ui/features/EpisodeList"

function page() {
    return (
        <>
            <Layout>
                <div className="flex items-center justify-between">
                    <PageHeading title="Episodes" />
                    <AddButton link="/features/episodes/add" />
                </div>
                <DataTableDemo />
            </Layout>
        </>
    )
}

export default page