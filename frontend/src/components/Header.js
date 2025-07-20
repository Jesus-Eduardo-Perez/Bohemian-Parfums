import React from "react";
import Styles from '../css_components/Header.module.css'
import { CiSearch, CiUser, CiShoppingCart } from "react-icons/ci";
function Header(){
    
    return (
        <div className = {Styles.main_container}>
             <div className={Styles.logo}>
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
             <div className = {Styles.icons}>
                <CiSearch className = {Styles.icon}/>
                <CiUser className = {Styles.icon}/>
                <CiShoppingCart className = {Styles.icon}/>
             </div>
        </div>
    )
}
export default Header;