import Allproducts from "@/components/homepage/product/AllProduct";

interface props {
    params: Promise<{slug: string}>;
}
const Page = async ({params}: props) => {

    const {slug} = await params
    return (
        <>
        <Allproducts categorySlug={slug}/>
        </>
    )
}
export default Page;