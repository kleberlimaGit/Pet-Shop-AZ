import { faPaw, faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { ReactComponent as HomemDog } from "../../../../assets/image/mandog.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import InputMask from "react-input-mask";
import { useHistory, useParams } from "react-router-dom";
import "./styles.css";
import { useEffect, useState } from "react";
import { makeRequest } from "../../../../util/request";

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

  useEffect(() => {
    if (isEditing) {
      makeRequest({ url: `/clientes/${idCliente}` }).then((response) => {
        setValue("nome", response.data.nome);
        setValue("cpf", response.data.cpf);
        setValue("telefone", response.data.telefone);
      });
    }
  }, [idCliente, isEditing, setValue]);

  const onSubmit = (data: FormData) => {
    makeRequest({
      url: isEditing ? `/clientes/${idCliente}` : "/clientes",
      method: isEditing ? "PUT" : "POST",
      data,
    })
      .then(() => {
        setHasError(false);
        history.push("/clientes");
      })
      .catch(() => {
        setHasError(true);
      });
  };

  return (
    <div className="container " style={{ marginTop: "15rem" }}>
      <h3 className="text-white text-uppercase">
        {isEditing ? "EDITAR" : "Cadastrar"} Cliente
      </h3>
      <div className="row">
        <div className="col-md-6" style={{ marginTop: "2rem" }}>
          {hasError && (
            <div className="alert alert-danger mt-3 rounded font-weight-bold">
              Cpf ou número de celular já cadastrado.
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
                {isEditing ? "SALVAR" : "CADASTRAR"}{" "}
                <FontAwesomeIcon icon={faPaw} className="ml-2" />
              </button>

              <Link
                to="/clientes"
                className="btn btn-danger btn-lg rounded"
              >CANCELAR <FontAwesomeIcon icon={faWindowClose} className="ml-2" /></Link>
            </div>
          </form>
        </div>

        <div className="col-md-6 d-flex justify-content-center">
          <HomemDog className="cad-svg" />
        </div>
      </div>
    </div>
  );
};

export default DetalheCliente;
