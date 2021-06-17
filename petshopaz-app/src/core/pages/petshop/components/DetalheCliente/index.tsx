import { faPaw, faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { ReactComponent as HomemDog } from "../../../../assets/image/mandog.svg";
import { ReactComponent as AddPet } from "../../../../assets/image/add-pet.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import Pagination from "@material-ui/lab/Pagination";
import { makeRequest, makeRequestUF } from "../../../../util/request";
import ListarPet from "../ListarPets";
import "./styles.css";
import { PetResponse } from "../../../../types/Pet";
import { Uf } from "../../../../types/Uf";

type FormData = {
  nome: string;
  logradouro: string;
  bairro: string;
  cep: string;
  numero: number;
  uf: Uf[];
  cidade: string;
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
  const [success, setSuccess] = useState(false);
  const [successDelete, setSuccessDelete] = useState(false);
  const [petResponse, setPetResponse] = useState<PetResponse>();
  const [ufResponse, setUfResponse] = useState<Uf[]>();
  const [activePage, setActivePage] = useState(0);

  useEffect(() => {
    if (isEditing) {
      makeRequest({ url: `/clientes/${idCliente}` }).then((response) => {
        setValue("nome", response.data.nome);
        setValue("telefone", response.data.telefone);
        setValue("bairro", response.data.bairro);
        setValue("cep", response.data.cep);
        setValue("cidade", response.data.cidade);
        setValue("numero", response.data.numero);
        setValue("logradouro", response.data.logradouro);
        setValue("uf", response.data.uf);
      });
    }
  }, [idCliente, isEditing, setValue]);

  const buscarPets = useCallback(() => {
    const params = {
      page: activePage,
    };
    if (isEditing) {
      makeRequest({ url: `/pets/clientes/${idCliente}`, params }).then(
        (response) => {
          setPetResponse(response.data);
        }
      );
    }
  }, [activePage, idCliente, isEditing]);
  useEffect(() => {
    buscarPets();
  }, [buscarPets]);

  useEffect(() => {
    makeRequestUF({ url: "/api/v1/localidades/estados" })
      .then((response) => {
        setUfResponse(response.data);
      })
      .finally(() => {});
  }, []);

  console.log();
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
        setValue("telefone", "");
        setValue("bairro", "");
        setValue("cep", "");
        setValue("cidade", "");
        setValue("numero", 0);
        setValue("logradouro", "");
      });
  };

  const onRemove = (idPet: number) => {
    makeRequest({ url: `/pets/${idPet}`, method: "DELETE" })
      .then(() => {
        setSuccessDelete(true);
        document.location.reload();
        setTimeout(() => {
          setSuccessDelete(false);
        }, 1000);
      })
      .catch(() => {});
  };

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
              Cliente não pode ser cadastrado, verifique se os campos estão
              corretos.
            </div>
          )}
          {success && (
            <div className="alert alert-info mt-3 rounded font-weight-bold">
              CLIENTE {isEditing ? "EDITADO" : "CADASTRADO"} COM SUCESSO.
            </div>
          )}
          {successDelete && (
            <div className="alert alert-info mt-3 rounded font-weight-bold">
              PET DELETADO COM SUCESSO
            </div>
          )}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label className="col-sm-2 col-form-label text-primary label-styles pl-0">
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

              <label className="col-sm-2 col-form-label text-primary label-styles pl-0">
                Rua
              </label>

              <input
                type="text"
                className="form-control input-style rounded"
                {...register("logradouro", { required: true, minLength: 5 })}
                placeholder="Logradouro"
              />
              <div className="text-danger">
                {errors.logradouro?.type === "required" &&
                  "Logradouro é obrigatório"}
              </div>
              <div className="text-danger">
                {errors.logradouro?.type === "minLength" &&
                  "campo deve ter pelo menos 5 caracteres"}
              </div>

              <div className="d-flex justify-content-between">
                <div className="col-6 pl-0">
                  <label className="col-sm-2 col-form-label text-primary label-styles pl-0">
                    Cidade
                  </label>

                  <input
                    type="text"
                    className="form-control input-style rounded"
                    {...register("cidade", { required: true, minLength: 5 })}
                    placeholder="Cidade"
                  />
                  <div className="text-danger">
                    {errors.cidade?.type === "required" &&
                      "Cidade é obrigatória"}
                  </div>
                  <div className="text-danger">
                    {errors.cidade?.type === "minLength" &&
                      "campo deve ter no máximo 5 caracteres"}
                  </div>
                </div>

                <div className="col-6 pr-0">
                  <label className="col-sm-2 col-form-label text-primary label-styles pl-0">
                    Bairro
                  </label>

                  <input
                    type="text"
                    className="form-control input-style rounded"
                    {...register("bairro", { required: true, minLength: 5 })}
                    placeholder="Bairro"
                  />
                  <div className="text-danger">
                    {errors.bairro?.type === "required" &&
                      "Bairro é obrigatório"}
                  </div>
                  <div className="text-danger">
                    {errors.bairro?.type === "minLength" &&
                      "campo deve ter pelo menos 5 caracteres"}
                  </div>
                </div>
              </div>

              <div className="d-flex justify-content-between">
                <div className="col-4 pl-0">
                  <label className="col-sm-2 col-form-label text-primary label-styles pl-0 form-label">
                    CEP
                  </label>

                  <input
                    placeholder="CEP"
                    maxLength={9}
                    type="text"
                    {...register("cep", {
                      required: true,
                      pattern: {
                        // eslint-disable-next-line no-useless-escape
                        value: /^\d{5}-\d{3}$/,
                        message: "CEP não esta num formato válido",
                      },
                    })}
                    className="form-control input-style rounded"
                  />

                  <div className="text-danger">
                    {errors.cep?.type === "required" && "CEP é obrigatório"}
                  </div>
                  <div className="text-danger">
                    {errors.cep?.type === "pattern" &&
                      "CEP deve ser nesse formato xxxxx-xxx"}
                  </div>
                </div>

                <div className="col-4 px-0">
                  <label className="col-sm-2 col-form-label text-primary label-styles pl-0">
                    Número
                  </label>

                  <input
                    type="number"
                    className="form-control input-style rounded"
                    {...register("numero", { required: true, maxLength: 5 })}
                    placeholder="Número de endereço"
                  />
                  <div className="text-danger">
                    {errors.numero?.type === "required" &&
                      "Número é obrigatório"}
                  </div>
                  <div className="text-danger">
                    {errors.numero?.type === "maxLength" &&
                      "campo deve ter no máximo 5 caracteres"}
                  </div>
                </div>

                <div className="col-4 pr-0">
                  <label className="col-sm-2 col-form-label text-primary label-styles pl-0">
                    UF
                  </label>
                  <select
                    {...register("uf", { required: true })}
                    className="form-control input-style rounded"
                  >
                    {ufResponse
                      ?.sort((a, b) =>
                        a.sigla > b.sigla ? 1 : a.sigla < b.sigla ? -1 : 0
                      )
                      .map((uf) => (
                        <option value={uf.sigla} key={uf.id}>
                          {uf.sigla}
                        </option>
                      ))}
                  </select>
                  <div className="text-danger">
                    {errors.uf && <span>campo obrigatório</span>}
                  </div>
                  <div className="text-danger">
                    {errors.numero?.type === "maxLength" &&
                      "campo deve ter no máximo 5 caracteres"}
                  </div>
                </div>
              </div>

              <label
                htmlFor="telefone"
                className="col-sm-2 col-form-label text-primary label-styles pl-0"
              >
                Celular
              </label>

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
                  <ListarPet pet={pet} onRemove={onRemove} key={pet.id} />
                ))}
                {petResponse && petResponse.content.length > 0 && (
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
          {isEditing && (
            <Link to={`/clientes/${idCliente}/pets`}>
              <AddPet className="add-pet-svg" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetalheCliente;
