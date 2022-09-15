import NavbarLeft from "../navbarLeft/NavbarLeft"
import NavbarTop from "../narvbarTop/NavbarTop"
import { useLocation } from "react-router";
import MainSection from "../mainSection/MainSection";
import Configuracoes from './cofiguracoes/NavbarRouter'


function PageTemplate({children}){
    return(
        <>
            <NavbarTop userName="José"/>
            <NavbarLeft/>
            <MainSection>
                {children}
            </MainSection>
        </>
    )
}

export function NotFound404() {
    let location = useLocation();
    return (
        <div>
            <h1>
                Não Encontrado {location.pathname}
            </h1>
        </div>
    );
}

export function Home(){
    return(
        <PageTemplate>
            <section className="events">
                <h1>[Home]</h1>
            </section>
        </PageTemplate>
    )
}
export function Contact(){
    return(
        <PageTemplate>
            <section className="events">
                <h1>[Contact]</h1>
            </section>
        </PageTemplate>
    )
}
export function About(){
    return(
        <PageTemplate>
            <section className="about">
                <h1>[About]</h1>
            </section>
        </PageTemplate>
    )
}
export function Graph(){
    return(
        <PageTemplate>
            <section className="about">
                <h1>[Graphs]</h1>
            </section>
        </PageTemplate>
    )
}
export function Config(){
    return(
        <PageTemplate>
            <Configuracoes/>
        </PageTemplate>
    )
}