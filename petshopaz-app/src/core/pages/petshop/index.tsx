import { faUserPlus, faBone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ClienteResponse } from "../../types/Cliente";
import { makeRequest } from "../../util/request";
import ClientCard from "./components/ClienteCard";
import "./styles.css";
const Petshop = () => {
  const [clienteResponse, setClienteResponse] = useState<ClienteResponse>();

  useEffect(() => {
    const params = {
      page: 0,
      fitro: "",
    };
    makeRequest({ url: "/clientes", params }).then((response) =>
      setClienteResponse(response.data)
    );
  }, []);

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-center align-items-center mb-5 mt-2 flex-sm-row flex-column">
        <Link to="/clientes/cadastrar" className="text-decoration-none">
          <p className="mr-sm-5 mr-0 h4 text-center link-style">
            Cadastrar Cliente{" "}
            <FontAwesomeIcon icon={faUserPlus} className="ml-1" />
          </p>
        </Link>

        <Link to="/clientes/raca/cadastrar" className="text-decoration-none">
          <p className=" h4 text-center mt-1 link-style">
            Cadastrar Raça <FontAwesomeIcon icon={faBone} className="ml-1" />
          </p>
        </Link>
      </div>

      <h3 className="text-md-left text-center text-white text-uppercase">
        Lista de Clientes
      </h3>
        <div className="row">
        {clienteResponse?.content.map(cliente => (
          
            <ClientCard cliente={cliente} key={cliente.id}/>
          
        ))}
        </div>

    </div>
  );
};

export default Petshop;
