import {BrowserRouter,Switch, Route} from 'react-router-dom';
import Navbar from './core/components/NavBar';
import Home from './core/pages/home';
import Petshop from './core/pages/petshop';
const Routes = () => (
<BrowserRouter>
<Navbar/>
    <Switch>
        <Route path="/" exact>
            <Home/>
        </Route>
        <Route path="/clientes">
            <Petshop/>
        </Route>
    </Switch>

</BrowserRouter>
);

export default Routes;