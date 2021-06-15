import {ReactComponent as Welcome} from '../../assets/image/welcome.svg';
import { faPaw } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Link} from 'react-router-dom';
import './styles.css';

const Home = () => (
    <div className=" bg-container vw-100">
        <div className="d-flex justify-content-center align-items-center flex-column">
                <Welcome className="imagem-svg"/>
                
                <Link to="/clientes">
                <button className="btn btn-primary btn-lg rounded-lg text-white btn-color" 
                 >
                    <strong>Acessar Lista de Clientes</strong>
                    <FontAwesomeIcon icon={faPaw} className="ml-2" />
                </button>
                </Link>
        </div>

        
    </div>
)

export default Home;