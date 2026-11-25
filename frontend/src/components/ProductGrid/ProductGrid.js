import React from "react";
import ProductCard from "../Product/ProductCard"
import Styles from "../ProductGrid/ProductGrid.module.css"
function ProductGrid ({products}) {
    return (
        <div className={Styles.product_grid}>

            {products.map((product) => (
                <ProductCard 
                   key={product.id}
                   product={product}
                />
            ))}

        </div>
    )
}
export default ProductGrid;