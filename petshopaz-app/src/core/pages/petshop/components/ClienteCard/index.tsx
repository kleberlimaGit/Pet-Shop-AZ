import {
  faPhoneSquareAlt,
  faDog,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Cliente } from "../../../../types/Cliente";
import { Link } from "react-router-dom";
import "./styles.css";

type Props = {
  cliente: Cliente;
  onRemove: (idCliente:number) => void
};

const ClientCard = ({ cliente, onRemove }: Props) => {
  
  const handleAlert = () => {
    if(window.confirm("Deseja remover mesmo este usuário ?")){
      onRemove(cliente.id)
    }
  }

  return(
  <div className="mt-5 col-lg-4 col-md-6 d-flex justify-content-center ">
    <div className="card text-white bg-primary mb-3 card-container rounded shadow">
      <div className="card-header text-white h5 style-link d-flex justify-content-between">
        <Link to={`/clientes/${cliente.id}`} className="style-link text-decoration-none">{cliente.nome}</Link>
        <FontAwesomeIcon icon={faTrashAlt} className="pointer"onClick={handleAlert}/>
      </div>
      <div className="card-body ">
        <h5 className="card-title">Informações do cliente</h5>
        <div className="card-text">
          <h6>Endereço</h6>
          <div className="row">
            <div className="col-6">
            <p>Cidade: {cliente.cidade}</p>
            <p>UF: {cliente.uf}</p>
              <p>Bairro: {cliente.bairro}</p>
            </div>

            <div className="col-6">
            <p>CEP: {cliente.cep}</p>
              <p>Rua: {cliente.logradouro}</p>
              <p>Nº: {cliente.numero}</p>

            </div>

          </div>
        </div>
        <p className="card-text">
          <FontAwesomeIcon icon={faPhoneSquareAlt} className="mr-1" />
          {cliente.telefone}
        </p>
        <div className="container ">
          <p className="text-center h5">Meus Pets</p>
          <div className="row d-flex justify-content-between">
            {cliente.pets.map((pet) => (
              <div className="col-6  pb-2" key={pet.id}>
                <span className="text-center">
                  <FontAwesomeIcon icon={faDog} className="mr-1 " />
                  {pet.nome}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
)};

export default ClientCard;
