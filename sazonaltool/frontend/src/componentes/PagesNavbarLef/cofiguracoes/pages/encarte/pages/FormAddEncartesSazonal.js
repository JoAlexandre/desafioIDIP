import { createRef, useContext, useLayoutEffect, useState } from "react";
import { Col, Container, Form, OverlayTrigger, Row, Spinner, Table, Tooltip } from "react-bootstrap";
import './FormAddEncartesSazonal.scss'
import './InfoEncartes.scss'
import { EncartesContext } from "../../../../../../Context/Context";
import { TableEncartes, TableListaProdutos } from "./navbarTipoEncartes/sazonal/Sazonal";
import $ from 'jquery';

const nomeSazonalidade = createRef(null)
const descricao = createRef(null)
const statusSazonalidade = createRef(null)

/* referencias para datas */
const dataInicio = createRef()
const dataFim = createRef()
const dataProxInicio = createRef()
const dataProxFim = createRef()

/* table */
const pdfRef = createRef()

const returnFilter = (arr, filterString) =>{
    return arr
        .map(item => item[filterString])
        .filter((item, index, self) => self.indexOf(item) === index)
        .map((item, index) => item.length > 0 ? <option key={index} value={item} id={filterString}>{item}</option> : '') 

}

export function Produtos() {
    const {tableList} = useContext(EncartesContext)

    const [tableFiltered, setTableFiltered] = useState([])

    const onClickTableRow = (e) => {
        const el = e.currentTarget
        $(el).addClass('tr-selected-3')
        $(el).siblings().removeClass('tr-selected-3')
    }

    const onChangeOptions = (e) => {
        const el = e.currentTarget
        const filter = $(el).find(':selected').prop('id')
        const val = $(el).val()
        
        setTableFiltered(tableList.tempListProduct.filter(item => item[filter] === val))
    } 
    
    const listRows = (array) => {
        return array
            .map((item, index) => 
                <tr key={index} onClick={onClickTableRow}>
                    <th>{index + 1}</th>
                    <td className="nomeProduto">{item.nomeProduto}</td>
                    <td>{item.nomeFamilia}</td>
                    <td>{item.marca}</td>
                    <td>{item.clase}</td>
                    <td>{item.emb}</td>
                    <td>{item.qtd}</td>
                    <td>{item.categoria}</td> 
                    <td>{item.semAcucar}</td>
                    <td>{item.semGlutem}</td>
                    <td>{item.semLactose}</td>
                    <td>{item.semSal}</td>
                    <td>{item.comSoja}</td>
                    <td>{item.comFenilanina}</td>
                </tr>
            )
    } 
   
  return (
    <>
        <div className='card-table-2' >
            <Table responsive  ref={pdfRef}>
                <thead className='theada'>
                <tr>
                    <th className="th-edited">
                        <span className='table-head-option'>
                            <Form.Label>ID</Form.Label>
                            <Form.Select className='form-control-table' disabled>
                            <option></option>
                            {
                                    tableList.tempListProduct.map((item, index) => <option key={index}>{index + 1}</option>) 
                            }
                            </Form.Select>
                        </span>
                    </th>
                    <th className="th-edited" style={{minWidth:'max-content'}}>
                        <span className='table-head-option'>
                            <Form.Label>NOME PRODUTO</Form.Label>
                            <Form.Select className='form-control-table' onChange={onChangeOptions}>
                            <option></option>
                                {
                                    returnFilter(tableList.tempListProduct, 'nomeProduto')
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
                                    returnFilter(tableList.tempListProduct, 'nomeFamilia')
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
                                    returnFilter(tableList.tempListProduct, 'marca')
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
                                    returnFilter(tableList.tempListProduct, 'classe')
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
                                    returnFilter(tableList.tempListProduct, 'emb')
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
                                    returnFilter(tableList.tempListProduct, 'qtd')
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
                                    returnFilter(tableList.tempListProduct, 'categoria')
                                }
                            </Form.Select>
                        </span>
                    </th>
                    <th className="th-edited">
                        <span className='table-head-option min-width-th' >
                            <Form.Label>S/ AÇUCAR</Form.Label>
                            <Form.Select className='form-control-table' onChange={onChangeOptions}>
                            <option></option>
                                {
                                    returnFilter(tableList.tempListProduct, 'semAcucar')
                                }
                            </Form.Select>
                        </span>
                    </th>
                    <th className="th-edited">
                        <span className='table-head-option min-width-th '>
                            <Form.Label>S/ GLUTEM</Form.Label>
                            <Form.Select className='form-control-table' onChange={onChangeOptions}>
                            <option></option>
                                {
                                    returnFilter(tableList.tempListProduct, 'semGlutem')
                                }
                            </Form.Select>
                        </span>
                    </th>
                    <th className="th-edited">
                        <span className='table-head-option min-width-th'>
                            <Form.Label>S/ LACTOSE</Form.Label>
                            <Form.Select className='form-control-table' onChange={onChangeOptions}>
                            <option></option>
                                {
                                    returnFilter(tableList.tempListProduct, 'semLactose')
                                }
                            </Form.Select>
                        </span>
                    </th>
                    <th className="th-edited">
                        <span className='table-head-option min-width-th'>
                            <Form.Label>S/ SAL</Form.Label>
                            <Form.Select className='form-control-table' onChange={onChangeOptions}>
                            <option></option>
                                {
                                    returnFilter(tableList.tempListProduct, 'semSal')
                                }
                            </Form.Select>
                        </span>
                    </th>
                    <th className="th-edited">
                        <span className='table-head-option min-width-th'>
                            <Form.Label>C/ SOJA</Form.Label>
                            <Form.Select className='form-control-table' onChange={onChangeOptions}>
                            <option></option>
                                {
                                    returnFilter(tableList.tempListProduct, 'comSoja')
                                }
                            </Form.Select>
                        </span>
                    </th>
                    <th className="th-edited">
                        <span className='table-head-option min-width-th'>
                            <Form.Label>C/ FENILANINA</Form.Label>
                            <Form.Select className='form-control-table' onChange={onChangeOptions}>
                            <option></option>
                                {
                                    returnFilter(tableList.tempListProduct, 'comFenilanina')
                                }
                            </Form.Select>
                        </span>
                    </th>
                </tr>
                </thead>
                <tbody className='text-center'>
                    {      
                        tableFiltered.length ? listRows(tableFiltered) : listRows(tableList.tempListProduct)
                    }
                </tbody>
            </Table>
        </div>    
    </>
  );
}

export default function FormAddEncartesSazonal(){
    
    const {tableList, setTableList} = useContext(EncartesContext)

    const onChangeHandler = (e) => {
        if(tableList.encartes.findIndex(obj => obj.nomeSazonalidade === nomeSazonalidade.current.value) >= 0){
            nomeSazonalidade.current.style.boxShadow = 'red 4px 5px 4px'
            const el = nomeSazonalidade.current
            $(el)
            .parent('span')
            .append("<span class='has-encarte'>Nome de Encarte ja Existente</span>");
            setTableList(last => ({...last, saveBlocked: true}))
        }else{
            const el = nomeSazonalidade.current
            $(el)
            .parent('span').children('.has-encarte').remove()
            setTableList(last => ({...last, saveBlocked: false}))
            nomeSazonalidade.current.style.boxShadow = 'none'


        }

        setTableList(lasItens => ({...lasItens, adicionarEncartes: {
            nomeSazonalidade : nomeSazonalidade.current.value
            , descricao: descricao.current.value
            , dataInicio: dataInicio.current.value
            , dataFim: dataFim.current.value
            , dataProxInicio: dataProxInicio.current.value
            , dataProxFim: dataProxFim.current.value
            , statusSazonalidade: statusSazonalidade.current.checked ? 'Ativo' : 'Desativado'
            , usuarioCad: tableList.userName
            , dataCad: new Date().toLocaleDateString()
            , usuarioAlt: tableList.userName
            , dataAlt: new Date().toLocaleDateString()
        }}))
    }

    const onClickAddProduct = () => {
        const itemRowPropertie = $('.tr-selected-2').eq(0).children('td').get(0).className
        const itemRowContent = $('.tr-selected-2').eq(0).children('td').get(0).textContent
        const alreadyHas = tableList.tempListProduct.findIndex(obj => obj[itemRowPropertie] === itemRowContent)

        /* impedir duplicações na nova tabela */
                if(alreadyHas >= 0){
                    alert('Este produto ja foi adicionado')
                    return
                }

        tableList
            .productsList
            .data
                .filter(item => {      
                    if(item[itemRowPropertie] === itemRowContent){
                        item.nomeSazonalidade +=  `,[${nomeSazonalidade.current.value}]`
                        
                        setTableList(itens => ({
                            ...itens
                            , tempListProduct : [...tableList.tempListProduct, item]
                        })) 
                    } 
                 
                return true
                })

                alert('Produto Adicionado')
        
    }

    const onClickRemoveProduct = () => {
        const itemRowPropertie = $('.tr-selected-3').eq(0).children('td').get(0).className
        const itemRowContent = $('.tr-selected-3').eq(0).children('td').get(0).textContent

        setTableList(itens => ({
            ...itens
            , tempListProduct : tableList.tempListProduct.filter(item => item[itemRowPropertie] !== itemRowContent)
        }))       
        
    }

    useLayoutEffect(()=>{

    /* set min value for dates */
        const date1 = new Date().toLocaleDateString()
        const date2 = date1.split('/')
        const dataF = `${date2[2]}-${date2[1]}-${date2[0]}`
        dataInicio.current.min = dataF
        dataFim.current.min = dataF
        dataProxInicio.current.min = dataF
        dataProxFim.current.min = dataF

    },[tableList, setTableList])


    return(
        <section>
            <Container className="my-4"> 
            <Form>
                <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                    <Form.Label column sm="2" className='form-label-title'>ID</Form.Label>
                    <Col sm="4">
                        <Form.Label column sm="2" className='form-label-title'>{tableList.encartes.length + 1}</Form.Label>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2"  className='form-label-title'>TIPO DE ENCARTE</Form.Label>
                    <Col sm="4" >
                        <Form.Label column sm="2" className='form-label-title'>ENCARTE SAZONAL</Form.Label>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2" className='form-label-title'>NOME SAZONALIDADE</Form.Label>
                    <Col sm="2">
                        <span className="tooltip-overlay">
                            <OverlayTrigger
                                key={'top'}
                                placement={'top'}
                                trigger="onError"
                                overlay={
                                    <Tooltip id={`tooltip-${'top'}`}>
                                    Tooltip on <strong>{'top'}</strong>.
                                    </Tooltip>
                                }
                                >
                                <Form.Control 
                                    type="text" 
                                    ref={nomeSazonalidade} 
                                    onChange={onChangeHandler}
                                />
                                </OverlayTrigger>
                        </span>
                    </Col>

                    <Form.Label column sm="4" className='text-center form-label-title'  >ATIVO</Form.Label>
                    <Col sm="2">
                        <Form.Check 
                            type="switch"
                            id="custom-switch"
                            ref={statusSazonalidade}
                            onChange={onChangeHandler}
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2" className='form-label-title'> DESCRIÇÃO</Form.Label>
                    <Col sm="4">
                        <Form.Control 
                            type="text" 
                            ref={descricao} 
                            onChange={onChangeHandler}
                        />
                    </Col>
                </Form.Group>
            </Form>
            <section className='section-info-user' >
                <div className='div-info-user'>
                    <span className='form-label-title text-center'>STATUS</span>
                    {
                        String(tableList.adicionarEncartes.statusSazonalidade).toUpperCase() === 'ATIVO' ? 
                            <span className="encarte-ativo">{tableList.adicionarEncartes.statusSazonalidade}</span>
                        :
                            <span>{tableList.adicionarEncartes.statusSazonalidade}</span>
                    }
                </div>
                <div className='div-info-user'>
                    <span className='form-label-title'>USUÁRIO CADASTRO</span>
                    <span>{tableList.adicionarEncartes.usuarioCad}</span>
                </div>
                <div className='div-info-user'>
                    <span className='form-label-title'>DATA CADASTRO</span>
                    <span>{tableList.adicionarEncartes.dataCad}</span>
                </div>
                {
                    tableList.adicionarEncartes.usuarioAlt ? 
                    <div className='div-info-user'>
                        <span className='form-label-title'>USUÁRIO ALTERAÇÃO</span>
                        <span>{tableList.adicionarEncartes.usuarioAlt}</span>
                    </div> : ''
                }
                {
                    tableList.adicionarEncartes.dataAlt ? 
                    <div className='div-info-user'>
                        <span className='form-label-title'>DATA ALTERAÇÃO</span>
                        <span>{tableList.adicionarEncartes.dataAlt}</span>
                    </div> : ''
                }
                
            </section>

            <section className='section-data-execucao' >
                <h2>DATA DA EXECUÇÃO</h2>
                <br/>
                <Form>
                    <Form.Group as={Row} className="mb-3">
                        <Col sm="3">
                            <Form.Label className='form-label-title'>DATA INÍCIO</Form.Label>
                            <Form.Control 
                                type="date" 
                                ref={dataInicio} 
                                onChange={onChangeHandler}
                                min={'2022-10-10'}
                                />
                        </Col>
                        <Col sm="3">
                            <Form.Label className='form-label-title'>DATA FIM</Form.Label>
                            <Form.Control 
                                type="date" 
                                ref={dataFim} 
                                onChange={onChangeHandler}
                                />
                        </Col>
                        <Col sm="3">
                            <Form.Label className='form-label-title'>DATA PRÓX. INICIO</Form.Label>
                            <Form.Control 
                                type="date" 
                                ref={dataProxInicio} 
                                onChange={onChangeHandler}
                                />
                        </Col>
                        <Col sm="3" >
                            <Form.Label className='form-label-title' >DATA PRÓX. FIM</Form.Label>
                            <Form.Control 
                                type="date" 
                                ref={dataProxFim} 
                                onChange={onChangeHandler}
                                />
                        </Col>
                    </Form.Group>
                </Form>
            </section>

            <section className='section-data-execucao' >
                <h2 className="mb-4">PESQUISAR PRODUTOS</h2>
                <TableEncartes/>
            </section>

            <section className='section-data-execucao' >
                <h2 className="mb-4">
                    RESULTADO
                    {
                        tableList.productsList.loading ? 
                            <Spinner animation="border" role="status" size="sm" className='ms-2' >
                                <span className="visually-hidden">Loading...</span>
                            </Spinner> 
                        : 
                            ''
                    }
                </h2>
                <TableListaProdutos sazonalName={tableList.sazonalSelected} />
                <Container>
                    <Row className='justify-content-end'>
                        <Col sm={3}>
                        <button 
                            type="button" 
                            className='form-control form-control-input form-control-input-btn btn-adcionar'
                            onClick={onClickAddProduct}
                        >
                            <span>
                                <i className="bi bi-caret-down-fill"></i>
                                Adcionar Produto
                            </span>
                         </button>   
                        </Col>
                    </Row>
                </Container>
                <hr style={{borderColor:'black'}}></hr>
            </section>

            <section className='section-data-execucao' >
                <h2 className="mb-4">PRODUTOS</h2>
                <Container>
                    <Row className='justify-content-end'>
                        <Col sm={3}>
                        <button 
                            type="button" 
                            className='form-control form-control-input form-control-input-btn btn-adcionar-remover'
                            onClick={onClickRemoveProduct}
                        >
                            <span>
                                <i className="bi bi-caret-up-fill"></i>
                                Retirar Produto
                            </span>
                         </button>   
                        </Col>
                    </Row>
                </Container>
                <Produtos/>
            </section>

        </Container>
        </section>
    )
}