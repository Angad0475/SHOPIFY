// import Allproducts from "@/components/homepage/product/AllProduct";
import DesktopProducts from "@/components/homepage/product/DesktopProducts";
import MobileProducts from "@/components/homepage/product/MobileProducts";
interface props {
    params: Promise<{slug: string}>;
}
const Page = async ({params}: props) => {

    const {slug} = await params
    return (
        <>
        <div className="hidden md:block">
        <DesktopProducts categorySlug={slug}/>
        </div>
        <div className="block md:hidden">
         <MobileProducts categorySlug={slug}/>
        </div>
        </>
    )
}
export default Page;