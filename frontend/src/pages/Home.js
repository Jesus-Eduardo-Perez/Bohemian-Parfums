import React from "react";
import FrontPage from '../Assets/FrontPage.jpg'
import Styles from '../css_components/Home.module.css'
function Home() {
    return(
        <div>
            <section className={Styles.front_container}>
                <img src={FrontPage} alt="Front Page"/>
                <div className={Styles.front_text}>
                    <h1>Poza Rica</h1>
                    <p>Descubre nuestro catálogo</p>
                    <p>de perfumes Árabes y de</p>
                    <p>Diseñador 100% Originales.</p>
                </div>                
            </section> 
            <div>
                <h1>Perumes más vendidos</h1>
            </div>          
        </div>
    )
}
export default Home;