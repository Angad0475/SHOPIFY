import React from "react";
import { ShoppingBagIcon } from "lucide-react";
function ShopingCartButton(){
    return(
        <div className="relative">
           <ShoppingBagIcon className="cursor-pointer mt-[-10] text-black"/>
        </div>
    )
}
export default ShopingCartButton;