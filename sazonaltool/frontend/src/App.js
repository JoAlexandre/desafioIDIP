// import PageTemplate from './componentes/Template/PageTemplate'
import { Routes, Route, Navigate } from 'react-router-dom' 
import {
    Home
  , Contact
  , About
  , NotFound404
  , Config
  , Graph } from './componentes/PagesNavbarLef/Pages'
import Encarte from './componentes/PagesNavbarLef/cofiguracoes/pages/encarte/EncarteMain'
import OrdemDoMenu from './componentes/PagesNavbarLef/cofiguracoes/pages/ordermDoMenu/OrdemDoMenu'
import PopUp from './componentes/PagesNavbarLef/cofiguracoes/pages/popUp/PopUp'
import Receitas from './componentes/PagesNavbarLef/cofiguracoes/pages/receitas/Receitas'
import Especiais from './componentes/PagesNavbarLef/cofiguracoes/pages/encarte/pages/navbarTipoEncartes/especiais/Especiais'
import NasLojas from './componentes/PagesNavbarLef/cofiguracoes/pages/encarte/pages/navbarTipoEncartes/nasLojas/NasLojas'
import Novidades from './componentes/PagesNavbarLef/cofiguracoes/pages/encarte/pages/navbarTipoEncartes/novidades/Novidades'
import ParaVoce from './componentes/PagesNavbarLef/cofiguracoes/pages/encarte/pages/navbarTipoEncartes/paraVoce/ParaVoce'
import ProdutosMaisVendidos from './componentes/PagesNavbarLef/cofiguracoes/pages/encarte/pages/navbarTipoEncartes/produtosMaisVendidos/ProdutosMaisVendidos'
import Sazonal from './componentes/PagesNavbarLef/cofiguracoes/pages/encarte/pages/navbarTipoEncartes/sazonal/Sazonal'
function App() {

  return (
    <>
      <Routes>
        <Route 
        index
          path="/" 
          element={<Home />} 
        />
        <Route
          path="about"
          element={<About />}
        />
        <Route
          path="contact"
          element={<Contact />}
        />
        <Route
          path="graph"
          element={<Graph />}
        />
        <Route path="config" element={<Config />}>
          <Route index element={<Navigate to={'/config/ordem_do_menu'}/>} />
          <Route path="ordem_do_menu" element={<OrdemDoMenu />} />
          <Route path="encartes" element={<Encarte />}>
            <Route path="" element={<Navigate to={'/config/encartes/sazonal'}/>} />
            <Route path="para_voce" element={<ParaVoce/>} />
            <Route path="produtos_mais_vendidos" element={<ProdutosMaisVendidos/>} />
            <Route path="sazonal" element={<Sazonal/>} />
            <Route path="nas_lojas" element={<NasLojas/>} />
            <Route path="especiais" element={<Especiais/>} />
            <Route path="novidades" element={<Novidades/>} />
          </Route>
          <Route path="receitas" element={<Receitas />} />
          <Route path="pop-up" element={<PopUp />} />
        </Route>
        <Route path="*" element={<NotFound404 />} />
      </Routes>
    </>
  );
}

export default App;
