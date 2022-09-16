import { Container, Nav } from "react-bootstrap";
import { NavLink, Outlet } from "react-router-dom";
import './InfoEncartes.scss'
export default function InfoEncartes(){
    return(
        <section>
            <Container className="my-4"> 
                <h3>TIPO DE ENCARTE</h3>
                    <Nav className="container-tipos-encartes">
                        <NavLink to='para_voce' className={({ isActive }) => isActive ? 'active nav-item-encartes' : 'nav-item-encartes'}>
                            <Nav.Item className="nav-item-encartes-item">
                                    PARA VOCÊ
                            </Nav.Item>
                        </NavLink>
                        <NavLink to='produtos_mais_vendidos' className={({ isActive }) => isActive ? 'active nav-item-encartes' : 'nav-item-encartes'}>
                            <Nav.Item className="nav-item-encartes-item">
                                PRODUTOS MAIS VENDIDOS
                            </Nav.Item>
                        </NavLink>
                        <NavLink to='sazonal' className={({ isActive }) => isActive ? 'active nav-item-encartes' : 'nav-item-encartes'}>
                            <Nav.Item className="nav-item-encartes-item">
                                SAZONAL
                            </Nav.Item>
                        </NavLink>
                        <NavLink to='nas_lojas' className={({ isActive }) => isActive ? 'active nav-item-encartes' : 'nav-item-encartes'}>
                            <Nav.Item className="nav-item-encartes-item">
                                NAS LOJAS
                            </Nav.Item>
                        </NavLink>
                        <NavLink to='especiais' className={({ isActive }) => isActive ? 'active nav-item-encartes' : 'nav-item-encartes'}>
                            <Nav.Item className="nav-item-encartes-item">
                                ESPECIAIS
                            </Nav.Item>
                        </NavLink>
                        <NavLink to='novidades' className={({ isActive }) => isActive ? 'active nav-item-encartes' : 'nav-item-encartes'}>
                            <Nav.Item className="nav-item-encartes-item">
                                NOVIDADES
                            </Nav.Item>
                        </NavLink>
                    </Nav>
            </Container>
            <Outlet/>
        </section>
    )
}