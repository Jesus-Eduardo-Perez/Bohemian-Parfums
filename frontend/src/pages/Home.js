import React from "react";
import FrontPage from '../Assets/FrontPage.jpg'
import Styles from '../css_components/Home.module.css'
function Home() {
    return(
        <div>
            <div className={Styles.image_container}>
                <img src={FrontPage} alt="Front Page"/>
            </div>
            
        </div>
    )
}
export default Home;