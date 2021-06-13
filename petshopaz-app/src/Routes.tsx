import {BrowserRouter,Switch, Route} from 'react-router-dom';
import Navbar from './core/components/NavBar';
import Home from './core/pages/home';
import Petshop from './core/pages/petshop';
import CadastrarRaca from './core/pages/petshop/components/CadastrarRaca';
import DetalheCliente from './core/pages/petshop/components/DetalheCliente';
const Routes = () => (
<BrowserRouter>
<Navbar/>
    <Switch>
        <Route path="/" exact>
            <Home/>
        </Route>
        <Route path="/clientes" exact>
            <Petshop/>
        </Route>
        <Route path="/clientes/cadastrar">
            <DetalheCliente/>
        </Route>
        <Route path="/clientes/raca/cadastrar">
            <CadastrarRaca/>
        </Route>
        
    </Switch>

</BrowserRouter>
);

export default Routes;