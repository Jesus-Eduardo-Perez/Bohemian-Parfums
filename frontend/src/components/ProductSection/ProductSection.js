import React from "react";
import ProductGrid from "../ProductGrid/ProductGrid";
import Styles from "./ProductSection.module.css";

function ProductSection({ subtitle, title, products }) {

    return (
        <section className={Styles.product_section}>

            <div className={Styles.section_header}>
                <p>{subtitle}</p>
                <h2>{title}</h2>
            </div>

            <ProductGrid products={products} />

        </section>
    );
}

export default ProductSection;