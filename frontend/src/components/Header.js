import React from "react";
import Styles from '../css_components/Header.module.css'
function Header(){
    
    return (
        <div className = {Styles.main_container}>
             <div>
                 <h1>Bohemian <br/> Parfums</h1>
             </div>
             <div className= {Styles.nav_container}>
                 <nav className= {Styles.nav}>
                    <a href="/#">TODOS</a>
                    <a href="/#">DISEÑADOR</a>
                    <a href="/#">ARABES</a>
                    <a href="/#">HOMBRE</a>
                    <a href="/#">MUJER</a>
                 </nav>
             </div>
             <div>
                <h1>ICONOS</h1>
             </div>
        </div>
    )
}
export default Header;