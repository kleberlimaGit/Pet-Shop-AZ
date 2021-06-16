import {
  faUserPlus,
  faBone,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback } from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ClienteResponse } from "../../types/Cliente";
import { makeRequest } from "../../util/request";
import ClientCard from "./components/ClienteCard";
import Pagination from "@material-ui/lab/Pagination";
import "./styles.css";

const Petshop = () => {
  const [clienteResponse, setClienteResponse] = useState<ClienteResponse>();
  const initialPage = () =>
    Number(window.sessionStorage.getItem("page") || null);
  const [activePage, setActivePage] = useState(initialPage);
  const [filtro, setFiltro] = useState("");

  const buscarCards = useCallback(() => {
    const params = {
      page: activePage,
      filtro,
    };
    window.sessionStorage.setItem("page", String(activePage));
    makeRequest({ url: "/clientes", params })
      .then((response) => setClienteResponse(response.data))
      .finally(() => {
      });
  }, [activePage, filtro]);

  useEffect(() => {
    buscarCards();
  }, [buscarCards]);

  const handleChangeFilter = (filtro: string) => {
    setActivePage(0);
    setFiltro(filtro);
  };

  const onRemove = (idCliente: number) => {
    makeRequest({ url: `/clientes/${idCliente}`, method: "DELETE" })
      .then(() => {
        document.location.reload();
      })
      .catch(() => {});
  };

  const handleResetSession = () => window.sessionStorage.removeItem("page");

  return (
    <div className="container" style={{ marginTop: "8rem" }}>
      <div className="d-flex justify-content-center align-items-center mb-5 mt-2 flex-sm-row flex-column">
        <Link
          to="/clientes/cadastrar"
          className="text-decoration-none"
          onClick={handleResetSession}
        >
          <p className="mr-sm-5 mr-0 h4 text-center link-style">
            Cadastrar Cliente{" "}
            <FontAwesomeIcon icon={faUserPlus} className="ml-1" />
          </p>
        </Link>

        <Link to="racas/cadastrar" className="text-decoration-none">
          <p className=" h4 text-center mt-1 link-style">
            Cadastrar Raça{" "}
            <FontAwesomeIcon
              icon={faBone}
              className="ml-1"
              onClick={handleResetSession}
            />
          </p>
        </Link>
      </div>

      <h3 className="text-md-left text-center text-white text-uppercase">
        Lista de Clientes
      </h3>
      <div className="d-flex justify-content-md-end align-items-center justify-content-center mt-md-2 mt-5">
        <input
          className="input-filter"
          type="text"
          placeholder="Pesquisar cliente por nome, pet ou raça"
          onChange={(event) => handleChangeFilter(event.target.value)}
          value={filtro}
        />
        <FontAwesomeIcon icon={faSearch} className="ml-1 text-primary search" />
      </div>
      <div className="row">
        {clienteResponse?.content.map((cliente) => (
          <ClientCard cliente={cliente} key={cliente.id} onRemove={onRemove} />
        ))}
      </div>

      {clienteResponse && (
        <>
          <div className="pagination-cards mb-2">
            <Pagination
              color="primary"
              count={clienteResponse.totalPages}
              page={activePage + 1}
              onChange={(event, page) => {
                setActivePage(page - 1);
              }}
            />
          </div>
        </>
      )}


    </div>
  );
};

export default Petshop;
