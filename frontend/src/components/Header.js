import React from "react";
import Styles from '../css_components/Header.module.css'
import { CiSearch, CiUser } from "react-icons/ci";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { IoIosMenu } from "react-icons/io";
function Header(){
    
    return (
        <div className = {Styles.main_container}>
             <div className= {Styles.nav_container}>
                 <nav className= {Styles.nav}>
                    <IoIosMenu className={Styles.icon} />
                    <p>Menú</p>
                 </nav>
             </div>
             <div className={Styles.logo}>
                 <h1>Bohemian Parfums</h1>
             </div>
             <div className = {Styles.icons}>
                <CiSearch className = {Styles.icon}/>
                <CiUser className = {Styles.icon}/>
                <HiOutlineShoppingBag className = {Styles.icon}/>
             </div>
        </div>
    )
}
export default Header;