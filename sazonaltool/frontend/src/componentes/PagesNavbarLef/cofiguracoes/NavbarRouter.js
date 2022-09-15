import { Outlet,  NavLink } from "react-router-dom";
import "./Homepage.scss"

export default function Configuracoes(){
    
    return(
        <>
            <h1>Configurar Homepage</h1>
            <nav className="nav nav-homepage">
                <NavLink to='ordem_do_menu' className={({ isActive }) => isActive ? 'active nav-item-home' : 'nav-item-home'}>Orderm do Menu</NavLink>
                <NavLink to='encartes' className={({ isActive }) => isActive ? 'active nav-item-home' : 'nav-item-home'}>Encartes</NavLink>
                <NavLink to='receitas' className={({ isActive }) => isActive ? 'active nav-item-home' : 'nav-item-home'}>Receitas</NavLink>
                <NavLink to='pop-up' className={({ isActive }) => isActive ? 'active nav-item-home' : 'nav-item-home'}>Pop-Up</NavLink>
            </nav>
            <Outlet/>
        </>
    )
}