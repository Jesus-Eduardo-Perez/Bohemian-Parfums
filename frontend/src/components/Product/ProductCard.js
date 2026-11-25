import React from "react";
import Styles from "./ProductCard.module.css"
function ProductCard({product}) {
    return (
        <article className={Styles.product_card}>
            <div className={Styles.product_image}>
                <img src={product.image} alt={product.name}></img>
            </div>
            <div className={Styles.product_info}>
                <h3>{product.name}</h3>

                <p className={Styles.product_price}>
                    ${product.price.toFixed(2)}
                </p>
            </div>
        </article>
    )
}
export default ProductCard;