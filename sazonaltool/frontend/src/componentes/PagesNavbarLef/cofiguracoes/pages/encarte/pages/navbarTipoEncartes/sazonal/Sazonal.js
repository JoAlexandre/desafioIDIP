import './Sazonal.scss'
import { Container, Nav, Form, Spinner } from "react-bootstrap"
import Table from 'react-bootstrap/Table';
import { createContext,    createRef,    useContext, useEffect, useLayoutEffect, useRef, useState } from 'react';
import axios from 'axios'
import { CSVLink } from 'react-csv'
import { jsPDF } from 'jspdf';
import { EncartesContext } from '../../../Context/Context';
import $ from 'jquery';

const pdfRef = createRef()
const pdfRef2 = createRef()


const returnFilter = (arr, filterString) =>{
    return arr
        .map(item => item[filterString])
        .filter((item, index, self) => self.indexOf(item) === index)
        .map((item, index) => item.length > 0 ? <option key={index} value={item} id={filterString}>{item}</option> : '') 

}

function TableListaProdutos({sazonalName = ''}) {
    const {tableList, setTableList} = useContext(EncartesContext)
    // const [tableList, setTableList] = useState({
    //     loading: false,
    //     data: []
    // })
    const [tableFiltered, setTableFiltered] = useState([])

    const onClickTableRow = (e) => {
        const el = e.currentTarget
        $(el).addClass('tr-selected')
        $(el).siblings().removeClass('tr-selected')
    }

    const onChangeOptions = (e) => {
        const el = e.currentTarget
        const filter = $(el).find(':selected').prop('id')
        const val = $(el).val()
        
        setTableFiltered(tableList.productsList.data.filter(item => item[filter] === val))
    } 
    
    const listRows = (array) => {
        return array
            .map((item, index) => 
                <tr key={index} onClick={onClickTableRow}>
                    <th>{index + 1}</th>
                    <td>{item.nomeProduto}</td>
                    <td>{item.nomeFamilia}</td>
                    <td>{item.marca}</td>
                    <td>{item.clase}</td>
                    <td>{item.emb}</td>
                    <td>{item.qtd}</td>
                    <td>{item.categoria}</td>
                </tr>
            )
    } 

    const headers = [
        {label: 'Nome Produto', key: 'nomeProduto'},
        {label: 'Familia', key: 'nomeFamilia'},
        {label: 'Marca', key: 'marca'},
        {label: 'Classe', key: 'classe'},
        {label: 'Embalagem', key: 'emb'},
        {label: 'Quantidade', key: 'qtd'},
        {label: 'Categoria', key: 'categoria'}
    ]

    const optionsCSV = {
        filename : 'lista_de_produtos.csv',
        headers: headers,
        data: tableList.productsList.data
    }

    const handlerPDF = (e) => {
        const content = pdfRef2.current;

        const doc = new jsPDF();
        doc.html(content, {
            callback: function (doc) {
                doc.save('sample.pdf');
            },
            html2canvas: { scale: 0.16 }
        });
    }
    
    useEffect(()=>{
        setTableList(items => ({...items, productsList: {loading: true, data: []}}))
        axios.post('http://localhost:8080/get_list_produtos',{sazonalName})
            .then(response => {
                setTableList(items => ({...items, productsList: {loading: false, data: response.data.response}}))
            })
            .catch(err => {
                console.log(err)
            })
        
    },[sazonalName, setTableList])
    
  return (
    <>
    <h3>LISTA DE PRODUTOS 
            {
                tableList.productsList.loading ? 
                    <Spinner animation="border" role="status" size="sm" className='ms-2' >
                    <span className="visually-hidden">Loading...</span>
                    </Spinner> 
                : 
                    ''
            }

    </h3>
    {sazonalName ? <h3>SAZONAL - {String(sazonalName).toUpperCase()} </h3> : '' }
        
        <Nav>
            <Nav.Item>
                <CSVLink {...optionsCSV}>
                    <button className='encartes-sazonais-btn'>
                        <span className='d-flex align-items-center span-button-list'>
                            <svg width="12" height="17" viewBox="0 0 12 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M-3.3773e-08 15.7273C-4.27306e-08 15.5224 0.0758568 15.3259 0.210883 15.181C0.345909 15.0361 0.529044 14.9546 0.72 14.9546L11.28 14.9546C11.471 14.9546 11.6541 15.0361 11.7891 15.181C11.9241 15.3259 12 15.5224 12 15.7273C12 15.9322 11.9241 16.1288 11.7891 16.2737C11.6541 16.4186 11.471 16.5 11.28 16.5L0.72 16.5C0.529044 16.5 0.345909 16.4186 0.210883 16.2737C0.0758568 16.1288 -2.48153e-08 15.9322 -3.3773e-08 15.7273ZM6 13.2263C5.80904 13.2263 5.62591 13.1449 5.49088 13C5.35586 12.8551 5.28 12.6586 5.28 12.4536L5.28 2.63851L2.6688 5.44075C2.53231 5.57724 2.35179 5.65154 2.16526 5.64801C1.97873 5.64448 1.80076 5.56339 1.66884 5.42182C1.53693 5.28025 1.46136 5.08926 1.45807 4.88908C1.45478 4.68891 1.52402 4.49518 1.6512 4.3487L5.48736 0.23085C5.54933 0.164146 5.6218 0.109735 5.70144 0.070133C5.83562 0.00405095 5.98554 -0.0159762 6.13073 0.0127885C6.27591 0.0415532 6.40929 0.117706 6.51264 0.23085L10.3488 4.3487C10.4195 4.41944 10.4763 4.50475 10.5156 4.59953C10.555 4.69431 10.5761 4.79662 10.5778 4.90037C10.5796 5.00412 10.5618 5.10717 10.5256 5.20338C10.4893 5.2996 10.4354 5.38699 10.3671 5.46037C10.2987 5.53374 10.2173 5.59158 10.1276 5.63044C10.038 5.6693 9.94193 5.68839 9.84526 5.68656C9.74858 5.68473 9.65324 5.66202 9.56492 5.61979C9.4766 5.57756 9.39712 5.51667 9.3312 5.44075L6.72 2.63851L6.72 12.4536C6.72 12.6586 6.64414 12.8551 6.50912 13C6.37409 13.1449 6.19096 13.2263 6 13.2263Z" fill="#C4C4C4"/>
                            </svg>  
                            exportar em .csv
                        </span>      
                    </button>
                </CSVLink>
            </Nav.Item>
            <Nav.Item>
                <button className='encartes-sazonais-btn' onClick={handlerPDF}>
                    <span className='d-flex align-items-center span-button-list'>
                        <svg width="12" height="17" viewBox="0 0 12 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M-3.3773e-08 15.7273C-4.27306e-08 15.5224 0.0758568 15.3259 0.210883 15.181C0.345909 15.0361 0.529044 14.9546 0.72 14.9546L11.28 14.9546C11.471 14.9546 11.6541 15.0361 11.7891 15.181C11.9241 15.3259 12 15.5224 12 15.7273C12 15.9322 11.9241 16.1288 11.7891 16.2737C11.6541 16.4186 11.471 16.5 11.28 16.5L0.72 16.5C0.529044 16.5 0.345909 16.4186 0.210883 16.2737C0.0758568 16.1288 -2.48153e-08 15.9322 -3.3773e-08 15.7273ZM6 13.2263C5.80904 13.2263 5.62591 13.1449 5.49088 13C5.35586 12.8551 5.28 12.6586 5.28 12.4536L5.28 2.63851L2.6688 5.44075C2.53231 5.57724 2.35179 5.65154 2.16526 5.64801C1.97873 5.64448 1.80076 5.56339 1.66884 5.42182C1.53693 5.28025 1.46136 5.08926 1.45807 4.88908C1.45478 4.68891 1.52402 4.49518 1.6512 4.3487L5.48736 0.23085C5.54933 0.164146 5.6218 0.109735 5.70144 0.070133C5.83562 0.00405095 5.98554 -0.0159762 6.13073 0.0127885C6.27591 0.0415532 6.40929 0.117706 6.51264 0.23085L10.3488 4.3487C10.4195 4.41944 10.4763 4.50475 10.5156 4.59953C10.555 4.69431 10.5761 4.79662 10.5778 4.90037C10.5796 5.00412 10.5618 5.10717 10.5256 5.20338C10.4893 5.2996 10.4354 5.38699 10.3671 5.46037C10.2987 5.53374 10.2173 5.59158 10.1276 5.63044C10.038 5.6693 9.94193 5.68839 9.84526 5.68656C9.74858 5.68473 9.65324 5.66202 9.56492 5.61979C9.4766 5.57756 9.39712 5.51667 9.3312 5.44075L6.72 2.63851L6.72 12.4536C6.72 12.6586 6.64414 12.8551 6.50912 13C6.37409 13.1449 6.19096 13.2263 6 13.2263Z" fill="#C4C4C4"/>
                        </svg>
                            exportar em .pdf
                    </span> 
                </button>

            </Nav.Item>
        </Nav>
        <div className='card-table-2' ref={pdfRef2}>
            <Table responsive>
                <thead className='theada'>
                <tr>
                    <th className="th-edited">
                        <span className='table-head-option'>
                            <Form.Label>ID</Form.Label>
                            <Form.Select className='form-control-table' disabled>
                            <option></option>
                            {
                                    tableList.productsList.data.map((item, index) => <option key={index}>{index + 1}</option>) 
                            }
                            </Form.Select>
                        </span>
                    </th>
                    <th className="th-edited">
                        <span className='table-head-option'>
                            <Form.Label>NOME PRODUTO</Form.Label>
                            <Form.Select className='form-control-table' onChange={onChangeOptions}>
                            <option></option>
                                {
                                    returnFilter(tableList.productsList.data, 'nomeProduto')
                                }
                            </Form.Select>
                        </span>
                    </th>
                    <th className="th-edited">
                        <span className='table-head-option'>
                            <Form.Label>NOME FAMILIA</Form.Label>
                            <Form.Select className='form-control-table' onChange={onChangeOptions} style={{width:'250px'}}>
                            <option></option>
                                {
                                    returnFilter(tableList.productsList.data, 'nomeFamilia')
                                }
                            </Form.Select>
                        </span>
                    </th>
                    <th className="th-edited">
                        <span className='table-head-option'>
                            <Form.Label>MARCA</Form.Label>
                            <Form.Select className='form-control-table' onChange={onChangeOptions}>
                            <option></option>
                                {
                                    returnFilter(tableList.productsList.data, 'marca')
                                }
                            </Form.Select>
                        </span>
                    </th>
                    <th className="th-edited">
                        <span className='table-head-option'>
                            <Form.Label>CLASSE</Form.Label>
                            <Form.Select className='form-control-table' onChange={onChangeOptions}>
                            <option></option>
                                {
                                    returnFilter(tableList.productsList.data, 'classe')
                                }
                            </Form.Select>
                        </span>
                    </th>
                    <th className="th-edited">
                        <span className='table-head-option'>
                            <Form.Label>EMB</Form.Label>
                            <Form.Select className='form-control-table' onChange={onChangeOptions}>
                            <option></option>
                                {
                                    returnFilter(tableList.productsList.data, 'emb')
                                }
                            </Form.Select>
                        </span>
                    </th>
                    <th className="th-edited">
                        <span className='table-head-option'>
                            <Form.Label>QTD</Form.Label>
                            <Form.Select className='form-control-table' onChange={onChangeOptions}>
                            <option></option>
                                {
                                    returnFilter(tableList.productsList.data, 'qtd')
                                }
                            </Form.Select>
                        </span>
                    </th>
                    <th className="th-edited">
                        <span className='table-head-option'>
                            <Form.Label>CATEGORIA</Form.Label>
                            <Form.Select className='form-control-table' onChange={onChangeOptions}>
                            <option></option>
                                {
                                    returnFilter(tableList.productsList.data, 'categoria')
                                }
                            </Form.Select>
                        </span>
                    </th>
                </tr>
                </thead>
                <tbody className='text-center'>
                    {      
                        tableFiltered.length ? listRows(tableFiltered) : listRows(tableList.productsList.data)
                    }
                </tbody>
            </Table>
        </div>    
    </>
  );
}

function TableEncartes() {

    const {tableList, setTableList} = useContext(EncartesContext)
    const [tableFiltered, setTableFiltered] = useState([])
    const [sazonalSelected, setSazonalSeleted] = useState(null)

    const onClickTableRow = (e) => {
        const el = e.currentTarget
        setSazonalSeleted($(el).children('td').eq(0).text())
        $(el).addClass('tr-selected')
        $(el).siblings().removeClass('tr-selected')

    }

    const onChangeOptions = (e) => {
        const el = e.currentTarget
        const filter = $(el).find(':selected').prop('id')
        const val = $(el).val()
        
        setTableFiltered(tableList.encartes.filter(item => item[filter] === val))
    } 
    
    const listRows = (array) => {
        return array.map((item, index) => 
            <tr key={index} onClick={onClickTableRow}>
                <th>{index + 1}</th>
                <td className='nomeSazonalidade'>{item.nomeSazonalidade}</td>
                <td className='descricao'>{item.descricao}</td>
                <td className='dataInicio'>{item.dataInicio}</td>
                <td className='dataFim'>{item.dataFim}</td>
                <td className='dataProxInicio'>{item.dataProxInicio}</td>
                {String(item.statusSazonalidade).toUpperCase() === 'ATIVO' ? 
                    <td className='statusSazonalidade'><span className='status-ativado'>Ativado</span></td>
                    : 
                    <td className='statusSazonalidade'><span className='status-desativado'>Desativado</span></td>
                    }
                <td className='dataCad'>{item.dataCad}</td>
                <td className='usuarioCad'>{item.usuarioCad}</td>
            </tr>
    )
    } 
       
    useLayoutEffect(()=>{
        axios.get('http://localhost:8080/get_encartes')
            .then(response => {
                setTableList(items => ({...items, encartes: response.data.response}))
            })
            .catch(err => {
                console.log(err)
            })

    },[setTableList])

  return (
    <>
    <div className='card-table' id='table' ref={pdfRef}>
        <Table responsive >
            <thead className='theada' >
            <tr>
                <th className="th-edited">
                    <span className='table-head-option'>
                        <Form.Label>ID</Form.Label>
                        <Form.Select className='form-control-table' disabled>
                        <option></option>
                            {
                                    tableList.encartes.map((item, index) => <option key={index}>{index + 1}</option>) 
                            }
                        </Form.Select>
                    </span>
                </th>
                <th className="th-edited">
                    <span className='table-head-option' >
                        <Form.Label>NOME SAZONALIDADE</Form.Label>
                        <Form.Select className='form-control-table' onChange={onChangeOptions}>
                        <option></option>
                            {/* remove duplicate data */}
                            {
                                returnFilter(tableList.encartes, 'nomeSazonalidade')
                            }
                        </Form.Select>
                    </span>
                </th>
                <th className="th-edited">
                    <span className='table-head-option'>
                        <Form.Label>DESCRIÇÃO</Form.Label>
                        <Form.Select className='form-control-table' style={{width:'250px'}} onChange={onChangeOptions}>
                        <option></option>
                            {
                                returnFilter(tableList.encartes, 'descricao')
                            }
                        </Form.Select>
                    </span>
                </th>
                <th className="th-edited">
                    <span className='table-head-option'>
                        <Form.Label>DATA INÍCIO</Form.Label>
                        <Form.Select className='form-control-table' onChange={onChangeOptions}>
                        <option></option>
                            {
                                returnFilter(tableList.encartes, 'dataInicio')
                            }
                        </Form.Select>
                    </span>
                </th>
                <th className="th-edited">
                    <span className='table-head-option'>
                        <Form.Label>DATA FIM</Form.Label>
                        <Form.Select className='form-control-table' onChange={onChangeOptions}>
                        <option></option>
                            {      
                                returnFilter(tableList.encartes, 'dataFim')
                            }
                        </Form.Select>
                    </span>
                </th>
                <th className="th-edited">
                    <span className='table-head-option'>
                        <Form.Label>DATA PRÓX. INÍCIO</Form.Label>
                        <Form.Select className='form-control-table' onChange={onChangeOptions}>
                            <option></option>
                            {
                                returnFilter(tableList.encartes, 'dataProxInicio')
                            }
                        </Form.Select>
                    </span>
                </th>
                <th className="th-edited">
                    <span className='table-head-option'>
                        <Form.Label>STATUS</Form.Label>
                        <Form.Select className='form-control-table' onChange={onChangeOptions}>
                            <option></option>
                                {
                                    returnFilter(tableList.encartes, 'statusSazonalidade')
                                }
                        </Form.Select>
                    </span>
                </th>
                <th className="th-edited">
                    <span className='table-head-option'>
                        <Form.Label>DATA CAD.</Form.Label> 
                        <Form.Select className='form-control-table' onChange={onChangeOptions}>
                        <option></option>
                                {
                                    returnFilter(tableList.encartes, 'dataCad')
                                }
                        </Form.Select>
                    </span>
                </th>
                <th className="th-edited">
                    <span className='table-head-option'>
                        <Form.Label>USUÁRIO CAD.</Form.Label>
                        <Form.Select className='form-control-table' onChange={onChangeOptions}>
                        <option></option>
                                {
                                    returnFilter(tableList.encartes, 'usuarioCad')
                                }
                        </Form.Select>
                    </span>
                </th>
            </tr>
            </thead>
            <tbody className='text-center'>
                {      
                    tableFiltered.length ? listRows(tableFiltered) : listRows(tableList.encartes)
                }
            </tbody>
        </Table>
    </div>
    <div>
        <TableListaProdutos sazonalName={sazonalSelected} />
        <hr style={{borderColor:'black'}}></hr>
    </div>
    </>    
  );
}


export default function Sazonal(){

    const {tableList, setTableList} = useContext(EncartesContext)

    const edit = (e) => {
        const rowSelected = $('.tr-selected').eq(0).children('td')
        const itemRow2Remove = $('.tr-selected').eq(0).children('td').get(0).textContent
        const rowEdited = {}

        rowSelected.map((item, index) => {
            const originalText = $('.tr-selected').eq(0).children('td').get(item).textContent
            const itemRow = $('.tr-selected').eq(0).children('td').get(item).className
            const editado = prompt(`Editar '${itemRow}': ${originalText}`)
            if(editado === null){
                rowEdited[itemRow] = originalText
                return
            }
            rowEdited[itemRow] = editado
        })
        const arrayEdited = tableList.encartes.filter(item => item.nomeSazonalidade !== itemRow2Remove)
        arrayEdited.push(rowEdited)
        console.log(arrayEdited)
        setTableList(items => ({...items, encartes: arrayEdited}))
    }

    const deleteHandler = (e) => {
        if(!$('.tr-selected').eq(0).children('td').get(0)){
            alert('Selecione alguma linha da tabela abaixo!!')
            return
        }

        const itemRow2Remove = $('.tr-selected').eq(0).children('td').get(0).textContent

        const arrayEdited = tableList.encartes.filter(item => item.nomeSazonalidade !== itemRow2Remove)
        setTableList(items => ({...items, encartes: arrayEdited}))
    }

    const headers = [
        {label: 'Nome Sazonalidade', key: 'nomeSazonalidade'},
        {label: 'Descrição', key: 'descricao'},
        {label: 'Data Início', key: 'dataInicio'},
        {label: 'Data Fim', key: 'dataFim'},
        {label: 'Data Próximo Início', key: 'dataProxInicio'},
        {label: 'Status', key: 'statusSazonalidade'},
        {label: 'Data do Cadastro', key: 'dataCad'},
        {label: 'Usuário de Cadastro', key: 'usuarioCad'}
    ]

    const optionsCSV = {
        filename : 'Encartes_por_Sazonalidade.csv',
        headers: headers,
        data: tableList.encartes
    }

    const handlerPDF = (e) => {
        const content = pdfRef.current;

        const doc = new jsPDF();
        doc.html(content, {
            callback: function (doc) {
                doc.save('sample.pdf');
            },
            html2canvas: { scale: 0.16 }
        });
    }

    return(
        // <EncartesContext.Provider value={{tableList, setTableList}}>
            <Container>
                <h3>ENCARTES POR SAZONALIDADE</h3>
                <Nav>
                    <Nav.Item>
                        <button className='encartes-sazonais-btn' type='button' onClick={edit}>
                            <span className='d-flex align-items-center span-button-list-0'>
                                <i className="bi bi-square bi-edited">
                                </i>
                            </span>
                        </button>
                    </Nav.Item>
                    <Nav.Item>
                        <button className='encartes-sazonais-btn' type='button' onClick={edit}>
                            <span className='d-flex align-items-center span-button-list-1'>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10.8756 2.9062L12.5523 4.58215L10.8756 2.9062ZM11.9538 1.42974L7.41995 5.96361C7.18569 6.19755 7.02592 6.4956 6.96078 6.8202L6.54199 8.91653L8.63833 8.49695C8.96291 8.43203 9.26058 8.2729 9.49491 8.03857L14.0288 3.5047C14.165 3.36845 14.2731 3.20671 14.3468 3.0287C14.4206 2.85069 14.4585 2.65989 14.4585 2.46722C14.4585 2.27454 14.4206 2.08375 14.3468 1.90574C14.2731 1.72773 14.165 1.56598 14.0288 1.42974C13.8925 1.29349 13.7308 1.18542 13.5528 1.11169C13.3748 1.03795 13.184 1 12.9913 1C12.7986 1 12.6078 1.03795 12.4298 1.11169C12.2518 1.18542 12.0901 1.29349 11.9538 1.42974V1.42974Z" stroke="#C4C4C4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M12.875 10.4997V12.8747C12.875 13.2946 12.7082 13.6973 12.4113 13.9943C12.1143 14.2912 11.7116 14.458 11.2917 14.458H2.58333C2.16341 14.458 1.76068 14.2912 1.46375 13.9943C1.16681 13.6973 1 13.2946 1 12.8747V4.16634C1 3.74641 1.16681 3.34369 1.46375 3.04676C1.76068 2.74982 2.16341 2.58301 2.58333 2.58301H4.95833" stroke="#C4C4C4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                editar
                            </span>
                        </button>   
                    </Nav.Item>
                    <Nav.Item>
                        <button className='encartes-sazonais-btn' onClick={deleteHandler}>
                            <span className='d-flex align-items-center span-button-list-1'>
                                <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10 7.75V11.5M2.5 4H14.5L13.315 14.665C13.2744 15.032 13.0998 15.3712 12.8247 15.6175C12.5496 15.8638 12.1933 16 11.824 16H5.176C4.80673 16 4.45042 15.8638 4.17531 15.6175C3.9002 15.3712 3.72562 15.032 3.685 14.665L2.5 4ZM5.00875 1.86025C5.13006 1.60298 5.32203 1.3855 5.56225 1.23318C5.80248 1.08087 6.08106 0.999997 6.3655 1H10.6345C10.9191 0.999854 11.1978 1.08066 11.4382 1.23298C11.6785 1.38531 11.8706 1.60286 11.992 1.86025L13 4H4L5.00875 1.86025V1.86025ZM1 4H16H1ZM7 7.75V11.5V7.75Z" stroke="#C4C4C4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                    excluir
                            </span>                    
                        </button>
                    </Nav.Item>
                    <Nav.Item>
                        <CSVLink {...optionsCSV}>
                            <button className='encartes-sazonais-btn'>
                                <span className='d-flex align-items-center span-button-list'>
                                    <svg width="12" height="17" viewBox="0 0 12 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M-3.3773e-08 15.7273C-4.27306e-08 15.5224 0.0758568 15.3259 0.210883 15.181C0.345909 15.0361 0.529044 14.9546 0.72 14.9546L11.28 14.9546C11.471 14.9546 11.6541 15.0361 11.7891 15.181C11.9241 15.3259 12 15.5224 12 15.7273C12 15.9322 11.9241 16.1288 11.7891 16.2737C11.6541 16.4186 11.471 16.5 11.28 16.5L0.72 16.5C0.529044 16.5 0.345909 16.4186 0.210883 16.2737C0.0758568 16.1288 -2.48153e-08 15.9322 -3.3773e-08 15.7273ZM6 13.2263C5.80904 13.2263 5.62591 13.1449 5.49088 13C5.35586 12.8551 5.28 12.6586 5.28 12.4536L5.28 2.63851L2.6688 5.44075C2.53231 5.57724 2.35179 5.65154 2.16526 5.64801C1.97873 5.64448 1.80076 5.56339 1.66884 5.42182C1.53693 5.28025 1.46136 5.08926 1.45807 4.88908C1.45478 4.68891 1.52402 4.49518 1.6512 4.3487L5.48736 0.23085C5.54933 0.164146 5.6218 0.109735 5.70144 0.070133C5.83562 0.00405095 5.98554 -0.0159762 6.13073 0.0127885C6.27591 0.0415532 6.40929 0.117706 6.51264 0.23085L10.3488 4.3487C10.4195 4.41944 10.4763 4.50475 10.5156 4.59953C10.555 4.69431 10.5761 4.79662 10.5778 4.90037C10.5796 5.00412 10.5618 5.10717 10.5256 5.20338C10.4893 5.2996 10.4354 5.38699 10.3671 5.46037C10.2987 5.53374 10.2173 5.59158 10.1276 5.63044C10.038 5.6693 9.94193 5.68839 9.84526 5.68656C9.74858 5.68473 9.65324 5.66202 9.56492 5.61979C9.4766 5.57756 9.39712 5.51667 9.3312 5.44075L6.72 2.63851L6.72 12.4536C6.72 12.6586 6.64414 12.8551 6.50912 13C6.37409 13.1449 6.19096 13.2263 6 13.2263Z" fill="#C4C4C4"/>
                                    </svg>  
                                    exportar em .csv
                                </span>      
                            </button>
                        </CSVLink>
                    </Nav.Item>
                    <Nav.Item>
                        <button className='encartes-sazonais-btn' onClick={handlerPDF}>
                            <span className='d-flex align-items-center span-button-list'>
                                <svg width="12" height="17" viewBox="0 0 12 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M-3.3773e-08 15.7273C-4.27306e-08 15.5224 0.0758568 15.3259 0.210883 15.181C0.345909 15.0361 0.529044 14.9546 0.72 14.9546L11.28 14.9546C11.471 14.9546 11.6541 15.0361 11.7891 15.181C11.9241 15.3259 12 15.5224 12 15.7273C12 15.9322 11.9241 16.1288 11.7891 16.2737C11.6541 16.4186 11.471 16.5 11.28 16.5L0.72 16.5C0.529044 16.5 0.345909 16.4186 0.210883 16.2737C0.0758568 16.1288 -2.48153e-08 15.9322 -3.3773e-08 15.7273ZM6 13.2263C5.80904 13.2263 5.62591 13.1449 5.49088 13C5.35586 12.8551 5.28 12.6586 5.28 12.4536L5.28 2.63851L2.6688 5.44075C2.53231 5.57724 2.35179 5.65154 2.16526 5.64801C1.97873 5.64448 1.80076 5.56339 1.66884 5.42182C1.53693 5.28025 1.46136 5.08926 1.45807 4.88908C1.45478 4.68891 1.52402 4.49518 1.6512 4.3487L5.48736 0.23085C5.54933 0.164146 5.6218 0.109735 5.70144 0.070133C5.83562 0.00405095 5.98554 -0.0159762 6.13073 0.0127885C6.27591 0.0415532 6.40929 0.117706 6.51264 0.23085L10.3488 4.3487C10.4195 4.41944 10.4763 4.50475 10.5156 4.59953C10.555 4.69431 10.5761 4.79662 10.5778 4.90037C10.5796 5.00412 10.5618 5.10717 10.5256 5.20338C10.4893 5.2996 10.4354 5.38699 10.3671 5.46037C10.2987 5.53374 10.2173 5.59158 10.1276 5.63044C10.038 5.6693 9.94193 5.68839 9.84526 5.68656C9.74858 5.68473 9.65324 5.66202 9.56492 5.61979C9.4766 5.57756 9.39712 5.51667 9.3312 5.44075L6.72 2.63851L6.72 12.4536C6.72 12.6586 6.64414 12.8551 6.50912 13C6.37409 13.1449 6.19096 13.2263 6 13.2263Z" fill="#C4C4C4"/>
                                </svg>
                                    exportar em .pdf
                            </span> 
                        </button>

                    </Nav.Item>
                </Nav>
                <TableEncartes/>
            </Container>
        // </EncartesContext.Provider>
    )
}