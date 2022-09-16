import { useContext, useEffect, useState } from 'react'
import {Col, Row, Form, Container} from 'react-bootstrap'
import './Encarte.scss'
import FormAddEncartesSazonal from './pages/FormAddEncartesSazonal'
import InfoEncartes from './pages/NavbarTipoEncartes'
import { EncartesContext } from '../../../../../Context/Context'
import axios from 'axios'

export default function Encarte(){
    const [addVisible, setAddVisible] = useState(false)
    const {tableList, setTableList} = useContext(EncartesContext)

    const onClickHandlerAdd = () => {
        setTableList(last => ({
            ...last
            , sazonalSelected: ''
            }))
        setAddVisible(true)
    }

    const onClickHandlerCancelar = () => {
        window.location.reload()
    }

    const onClickHandlerSalvar = () => {
        if(!addVisible){
                /* atualizar apenas a tabela sazonal editada */
                axios.post('http://localhost:8080/update_table_sazonal', {table: tableList.encartes})
                .then(response => {
                    alert('Atualizado com Sucesso')
                })
                .catch(response => {
                    alert('Erro')
                })
        }else{
            const dados = {
                newEncarte: tableList.adicionarEncartes
                , listToNewEncarte: tableList.tempListProduct
            }
            if(!String(dados.newEncarte.nomeEncarte).length || !dados.listToNewEncarte.length){
                alert("Adicione um nome ao novo encarte e os produtos")
                return
            }

            /* para adicionar novos encartes */
            axios.post('http://localhost:8080/add_encarte', dados)
            .then(response => {
                alert('Encarte Criado com Sucesso')
                setTableList(last =>({...last, tempListProduct: []}))
                window.location.reload()
            })
            .catch(response => {
                alert('Erro')
            })
            
        }
    }

    useEffect(() => {
    }, [tableList, setTableList])

    return (
            <section className="main-menu">
                <h2>Encartes</h2>
                
                <Form className='mt-3'>
                    <Row>
                        <Col sm={7} >
                            <Form.Control placeholder='Pesquisar' type='text' className='form-control-input'/>
                        </Col>
                        <Col sm={2}>
                        <button type="button" className='form-control form-control-input btn-filtros'>
                            <span>
                                <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clipPath="url(#clip0_1_204)">
                                    <path d="M16.1789 20.5H3.82074C1.71389 20.5 0 18.7857 0 16.6789V4.32074C0 2.21389 1.71389 0.5 3.82074 0.5H16.1789C18.2857 0.5 19.9996 2.21389 19.9996 4.32074V16.6789C20 18.7857 18.2857 20.5 16.1789 20.5ZM3.82074 1.44974C2.23783 1.44974 0.949743 2.73783 0.949743 4.32074V16.6789C0.949743 18.2622 2.23783 19.5499 3.82074 19.5499H16.1789C17.7622 19.5499 19.0499 18.2618 19.0499 16.6789V4.32074C19.0499 2.73744 17.7618 1.44974 16.1789 1.44974H3.82074Z" fill="#454545"/>
                                    <path d="M6.19141 7.38789C5.13641 7.38789 4.27808 6.52956 4.27808 5.47455C4.27808 4.41955 5.13641 3.56122 6.19141 3.56122C7.24642 3.56122 8.10475 4.41955 8.10475 5.47455C8.10475 6.52956 7.24642 7.38789 6.19141 7.38789ZM6.19141 4.51096C5.65995 4.51096 5.22782 4.94309 5.22782 5.47455C5.22782 6.00601 5.65995 6.43815 6.19141 6.43815C6.72287 6.43815 7.15501 6.00601 7.15501 5.47455C7.15501 4.94309 6.72287 4.51096 6.19141 4.51096Z" fill="#454545"/>
                                    <path d="M13.7712 12.4774C12.7162 12.4774 11.8579 11.6191 11.8579 10.5641C11.8579 9.50909 12.7162 8.65076 13.7712 8.65076C14.8263 8.65076 15.6846 9.50909 15.6846 10.5641C15.6846 11.6191 14.8263 12.4774 13.7712 12.4774ZM13.7712 9.6005C13.2398 9.6005 12.8077 10.0326 12.8077 10.5641C12.8077 11.0956 13.2398 11.5277 13.7712 11.5277C14.3027 11.5277 14.7348 11.0956 14.7348 10.5641C14.7348 10.0326 14.3023 9.6005 13.7712 9.6005Z" fill="#454545"/>
                                    <path d="M8.68142 17.5122C7.65689 17.5122 6.82349 16.6788 6.82349 15.6543C6.82349 14.6297 7.65689 13.7963 8.68142 13.7963C9.70596 13.7963 10.5394 14.6297 10.5394 15.6543C10.5394 16.6788 9.70596 17.5122 8.68142 17.5122ZM8.68142 14.7461C8.18043 14.7461 7.77323 15.1537 7.77323 15.6543C7.77323 16.1549 8.18083 16.5624 8.68142 16.5624C9.18241 16.5624 9.58961 16.1549 9.58961 15.6543C9.58961 15.1537 9.18201 14.7461 8.68142 14.7461Z" fill="#454545"/>
                                    <path d="M17.2567 5.94956H7.6299C7.36753 5.94956 7.15503 5.73706 7.15503 5.47469C7.15503 5.21232 7.36753 4.99982 7.6299 4.99982H17.2567C17.5191 4.99982 17.7316 5.21232 17.7316 5.47469C17.7316 5.73706 17.5191 5.94956 17.2567 5.94956Z" fill="#454545"/>
                                    <path d="M4.75296 5.94956H2.54006C2.27769 5.94956 2.06519 5.73706 2.06519 5.47469C2.06519 5.21232 2.27769 4.99982 2.54006 4.99982H4.75296C5.01532 4.99982 5.22783 5.21232 5.22783 5.47469C5.22783 5.73706 5.01532 5.94956 4.75296 5.94956Z" fill="#454545"/>
                                    <path d="M17.2568 11.0945H15.2085C14.9461 11.0945 14.7336 10.882 14.7336 10.6196C14.7336 10.3573 14.9461 10.1448 15.2085 10.1448H17.2568C17.5192 10.1448 17.7317 10.3573 17.7317 10.6196C17.7317 10.882 17.5192 11.0945 17.2568 11.0945Z" fill="#454545"/>
                                    <path d="M12.3339 11.0945H2.54006C2.27769 11.0945 2.06519 10.882 2.06519 10.6196C2.06519 10.3573 2.27769 10.1448 2.54006 10.1448H12.3339C12.5963 10.1448 12.8088 10.3573 12.8088 10.6196C12.8088 10.882 12.5963 11.0945 12.3339 11.0945Z" fill="#454545"/>
                                    <path d="M17.2568 16.2399H10.0601C9.79771 16.2399 9.58521 16.0274 9.58521 15.765C9.58521 15.5027 9.79771 15.2902 10.0601 15.2902H17.2568C17.5191 15.2902 17.7316 15.5027 17.7316 15.765C17.7316 16.0274 17.5191 16.2399 17.2568 16.2399Z" fill="#454545"/>
                                    <path d="M7.30262 16.2399H2.54006C2.27769 16.2399 2.06519 16.0274 2.06519 15.765C2.06519 15.5027 2.27769 15.2902 2.54006 15.2902H7.30262C7.56499 15.2902 7.77749 15.5027 7.77749 15.765C7.77749 16.0274 7.56499 16.2399 7.30262 16.2399Z" fill="#454545"/>
                                    </g>
                                    <defs>
                                    <clipPath id="clip0_1_204">
                                    <rect width="20" height="20" fill="white" transform="translate(0 0.5)"/>
                                    </clipPath>
                                    </defs>
                                </svg>
                            </span>
                            <span>
                                Filtros
                            </span>
                        </button>   
                        </Col>
                        <Col sm={3}>
                            <button type="button" className='form-control form-control-input form-control-input-btn ' onClick={onClickHandlerAdd} hidden={addVisible}>+ Adicionar</button>   
                        </Col>
                    </Row>
                </Form>
                { addVisible ? <FormAddEncartesSazonal/> : <InfoEncartes/>}
                <Container className="mt-4">
                    <Row className='justify-content-between'>
                        <Col sm={3}>
                            <button type="button" className='form-control form-control-input form-control-input-btn ' onClick={onClickHandlerCancelar}>Cancelar</button>   
                        </Col>
                        <Col sm={3}>
                            {
                                tableList.saveBlocked ? 
                                <button 
                                    type="button" 
                                    className='form-control form-control-input form-control-input-btn ' 
                                    onClick={onClickHandlerSalvar} disabled>Salvar</button>   
                                :
                                    <button 
                                        type="button" 
                                        className='form-control form-control-input form-control-input-btn ' 
                                        onClick={onClickHandlerSalvar} >Salvar</button>   
                                
                            }
                            {/* <button 
                                type="button" 
                                className='form-control form-control-input form-control-input-btn ' 
                                onClick={onClickHandlerSalvar}
                                >Salvar</button>    */}
                        </Col>
                    </Row>
                </Container>
            </section>

    )
}