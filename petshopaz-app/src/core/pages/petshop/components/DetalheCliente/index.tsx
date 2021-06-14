import { faPaw } from '@fortawesome/free-solid-svg-icons';
import {ReactComponent as HomemDog} from '../../../../assets/image/mandog.svg'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './styles.css'
const DetalheCliente = () => (
    <div className="container " style={{ marginTop: "15rem" }}>
        <div className="row">
            <div className="col-md-6" style={{marginTop: "2rem"}}>
                <form action="">
                    <div className="form-group">
                        <label htmlFor="nome" className="col-sm-2 col-form-label text-primary label-style pl-0">Nome</label>
                        <input type="text" className="form-control input-style rounded" required id="nome"/>

                    </div>
                    <div className="form-group">
                        <label htmlFor="cpf" className="col-sm-2 col-form-label text-primary label-style pl-0">CPF</label>
                        <input type="text" className="form-control input-style rounded" required id="cpf"/>

                    </div>
                    <div className="form-group">
                        <label htmlFor="telefone" className="col-sm-2 col-form-label text-primary label-style pl-0">Telefone</label>
                        <input type="text" className="form-control input-style rounded" required id="telefone"/>

                    </div>
                    <button className="btn btn-primary btn-lg rounded mt-4">CADASTRAR <FontAwesomeIcon icon={faPaw} className="ml-2" /></button>
                </form>
            </div>
            <div className="col-md-6 d-flex justify-content-center">
                <HomemDog className="cad-svg"/>
            </div>
        </div>

    </div>
)

export default DetalheCliente;