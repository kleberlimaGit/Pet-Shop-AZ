import {ReactComponent as Welcome} from '../../assets/image/welcome.svg';
import { faPaw } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './styles.css';

const Home = () => 
    <div className=" bg-container vw-100">
        <div className="d-flex justify-content-center align-items-center flex-column">
                <Welcome className="imagem-svg"/>
                <button className="btn btn-primary btn-lg rounded-lg btn-color" style={{color: "#fef6c9"}} ><strong>Acessar Lista de Cliente</strong><FontAwesomeIcon icon={faPaw} className="ml-2" /></button>
        </div>

        
    </div>


export default Home;