import { Container } from 'react-bootstrap'
import './MainSection.scss'
export default function MainSection({children}){
    return(
        <Container className="mainSection">
                {children}
        </Container>
    )
}