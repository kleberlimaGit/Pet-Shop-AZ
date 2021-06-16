import { faPaw, faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { ReactComponent as HomemDog } from "../../../../assets/image/mandog.svg";
import { ReactComponent as AddPet } from "../../../../assets/image/add-pet.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import InputMask from "react-input-mask";
import { useHistory, useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import Pagination from "@material-ui/lab/Pagination";
import { makeRequest } from "../../../../util/request";
import ListarPet from '../ListarPets'
import "./styles.css";
import { PetResponse } from "../../../../types/Pet";

type FormData = {
  nome: string;
  cpf: string;
  telefone: string;
};

type ParamsType = {
  idCliente: string;
};

const DetalheCliente = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>();
  const history = useHistory();
  const { idCliente } = useParams<ParamsType>();
  const isEditing = idCliente !== "cadastrar";
  const [hasError, setHasError] = useState(false);
  const [deleteError, setDeleteError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [successDelete, setSuccessDelete] = useState(false);
  const [petResponse, setPetResponse] = useState<PetResponse>();
  const [activePage, setActivePage] = useState(0);

  useEffect(() => {
    if (isEditing) {
      makeRequest({ url: `/clientes/${idCliente}` }).then((response) => {
        setValue("nome", response.data.nome);
        setValue("cpf", response.data.cpf);
        setValue("telefone", response.data.telefone);
      });
    }
  }, [idCliente, isEditing, setValue]);


  const buscarPets = useCallback(() => {
    const params = {
      page: activePage,
    };
    makeRequest({ url: `/pets/clientes/${idCliente}`, params }).then((response) => {
      console.log(response.data)
      setPetResponse(response.data);
    });
  }, [activePage,idCliente]);
  useEffect(() => {
    buscarPets();
  }, [buscarPets]);



  const onSubmit = (data: FormData) => {
    makeRequest({
      url: isEditing ? `/clientes/${idCliente}` : "/clientes",
      method: isEditing ? "PUT" : "POST",
      data,
    })
      .then(() => {
        setHasError(false);
        setSuccess(true);
        setTimeout(() => {
          history.push("/clientes");
        }, 1000);
      })
      .catch(() => {
        setHasError(true);
      })
      .finally(() => {
        setValue("nome", "");
        setValue("cpf", "");
        setValue("telefone", "");
      });
  };

  const onRemove = (idPet: number) => {
    makeRequest({ url: `/pets/${idPet}`, method: "DELETE" })
        .then(() => {
            setSuccessDelete(true)
            document.location.reload()
            setTimeout(() => {
                setSuccessDelete(false)
            },1000) 
        })
        .catch(() => {
            setDeleteError(true)
            setTimeout(() => {
                setDeleteError(false)
            },1000) 
            
        })
}

  return (
    <div className="container " style={{ marginTop: "15rem" }}>
      <h3 className="text-white text-uppercase">
        {isEditing ? "EDITAR" : "Cadastrar"} Cliente
      </h3>
      <div className="row">
        <div
          className="col-md-6 order-md-first mb-5"
          style={{ marginTop: "2rem" }}
        >
          {hasError && (
            <div className="alert alert-danger mt-3 rounded font-weight-bold">
              Cpf ou número de celular já cadastrado.
            </div>
          )}
          {success && (
            <div className="alert alert-info mt-3 rounded font-weight-bold">
              CLIENTE {isEditing ? "EDITADO" : "CADASTRADO"} COM SUCESSO.
            </div>
          )}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label className="col-sm-2 col-form-label text-primary label-style pl-0">
                Nome
              </label>

              <input
                type="text"
                className="form-control input-style rounded"
                {...register("nome", { required: true, minLength: 3 })}
                placeholder="Nome do cliente"
              />
              <div className="text-danger">
                {errors.nome?.type === "required" && "Nome é obrigatório"}
              </div>
              <div className="text-danger">
                {errors.nome?.type === "minLength" &&
                  "Nome deve ter pelo menos 3 caracteres"}
              </div>

              <label
                htmlFor="cpf"
                className="col-sm-2 col-form-label text-primary label-style pl-0 form-label"
              >
                CPF
              </label>

              {isEditing ? (
                <input
                  placeholder="CPF"
                  maxLength={14}
                  type="text"
                  {...register("cpf", {
                    required: true,
                    pattern: {
                      // eslint-disable-next-line no-useless-escape
                      value: /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/,
                      message: "CPF não esta num formato válido",
                    },
                  })}
                  className="form-control input-style rounded"
                  id="cpf"
                />
              ) : (
                <InputMask
                  mask="999.999.999-99"
                  placeholder="CPF"
                  type="text"
                  {...register("cpf", {
                    required: true,
                    pattern: {
                      // eslint-disable-next-line no-useless-escape
                      value: /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/,
                      message: "CPF não esta num formato válido",
                    },
                  })}
                  className="form-control input-style rounded"
                  id="cpf"
                />
              )}

              <div className="text-danger">
                {errors.cpf?.type === "required" && "Cpf é obrigatório"}
              </div>
              <div className="text-danger">
                {errors.cpf?.type === "pattern" &&
                  "Cpf está num formato inválido (xxx.xxx.xxx-xx)"}
              </div>

              <label
                htmlFor="telefone"
                className="col-sm-2 col-form-label text-primary label-style pl-0"
              >
                Celular
              </label>

              {isEditing ? (
                <input
                  placeholder="Número de telefone"
                  type="text"
                  {...register("telefone", {
                    required: true,
                    minLength: 15,
                    maxLength: 15,
                    pattern: {
                      value:
                        /^(?:(?:\+|00)?(55)\s?)?(?:(?:\(?[1-9][0-9]\)?)?\s?)?(?:((?:9\d|[2-9])\d{3})-?(\d{4}))$/,
                      message: "Telefone deve ser no formato (DDD) xxxxx-xxxx",
                    },
                  })}
                  className="form-control input-style rounded"
                  id="telefone"
                />
              ) : (
                <InputMask
                  mask="(99) 99999-9999"
                  placeholder="Número de telefone"
                  type="text"
                  {...register("telefone", { required: true })}
                  className="form-control input-style rounded"
                  id="telefone"
                />
              )}

              <div className="text-danger">
                {errors.telefone?.type === "required" &&
                  "Telefone é obrigatório"}
              </div>
              <div className="text-danger">
                {errors.telefone?.type === "pattern" && errors.telefone.message}
              </div>
              <div className="text-danger">
                {errors.telefone?.type === "minLength" &&
                  "Telefone deve ser no formato (DDD) xxxxx-xxxx"}
              </div>
            </div>

            <div className="d-flex justify-content-between align-items-center mt-4">
              <button className="btn btn-primary btn-lg rounded ">
                {isEditing ? "SALVAR" : "CADASTRAR"}
                <FontAwesomeIcon icon={faPaw} className="ml-2" />
              </button>

              <Link to="/clientes" className="btn btn-danger btn-lg rounded">
                CANCELAR
                <FontAwesomeIcon icon={faWindowClose} className="ml-2" />
              </Link>
            </div>
          </form>
          <div className="col-md-12 mt-5">
          {isEditing && (
          <>
            {petResponse?.content.map((pet) => (
                <ListarPet pet={pet} onRemove={onRemove} key={pet.id}/>
            ))}
            {petResponse && (
              <>
                <div className="pagination-cards-raca mb-4">
                  <Pagination
                    color="primary"
                    count={petResponse.totalPages}
                    page={activePage + 1}
                    onChange={(event, page) => {
                      setActivePage(page - 1);
                    }}
                  />
                </div>
              </>
            )}
          </>
        )}
            
          </div>
        </div>

        <div className="col-md-6 d-flex justify-content-center order-first control-add-pet">
          <HomemDog className="cad-svg" />
          <Link to={`/clientes/${idCliente}/pets`}>
            <AddPet className="add-pet-svg" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DetalheCliente;
