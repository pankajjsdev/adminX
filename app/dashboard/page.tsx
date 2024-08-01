import Layout from "@/components/_ui/common/Layout"
import PageHeading from "@/components/_ui/common/PageHeading"
import { Chart } from "@/components/_ui/dashboard/Chart"

function page() {
    return (
        <>
            <Layout>
                <PageHeading title="Dashboard"/>
                <Chart />
            </Layout>
        </>
    )
}

export default page