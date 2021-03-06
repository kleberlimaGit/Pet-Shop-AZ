import { faPaw, faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import { Link, useHistory, useParams } from "react-router-dom";
import { ReactComponent as WomanDog } from "../../../../assets/image/woman-dog.svg";
import { Raca } from "../../../../types/Pet";
import { makeRequest } from "../../../../util/request";

import "./styles.css";

type FormData = {
  nome: string;
  corDoPelo:string;
  raca: Raca[];
};

type ParamsType = {
  idCliente: string;
};

const Pets = () => {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<FormData>();
  const history = useHistory();
  const { idCliente } = useParams<ParamsType>();
  const [success, setSuccess] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [racas, setRacas] = useState<Raca[]>();

  useEffect(() => {
    makeRequest({ url: "/racas" })
      .then((response) => {
        setRacas(response.data.content);
      })
      .finally(() => {});
  }, []);

  const onSubmit = (data: FormData) => {
    setHasError(false);
    makeRequest({
      url: `/pets/${Number(idCliente)}`,
      method: "POST",
      data,
    })
      .then(() => {
        setSuccess(true);
        setTimeout(() => {
          history.push(`/clientes/${idCliente}`);
          setSuccess(false);

          document.location.reload();
        }, 500);
      })
      .catch(() => {
        setHasError(true);
        
      })
      .finally(() => {
        setValue("nome", "");
        setValue("corDoPelo", "");
      });
  };

  return (
    <div className="container" style={{ marginTop: "15rem" }}>
      <h3 className="text-white text-uppercase">cadastrar pets</h3>
      <div className="row">
        <div className="col-md-6 order-md-first">
          {success && (
            <div className="alert alert-info mt-3 rounded font-weight-bold">
              PET CADASTRADA COM SUCESSO.
            </div>
          )}
          {hasError && (
            <div className="alert alert-danger mt-3 rounded font-weight-bold">
              PET N??O FOI CADASTRADO VERIFIQUE SE TODOS OS CAMPOS FORAM PREENCHIDOS CORRETAMENTE.
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label htmlFor="nome" className="label-style text-primary mt-5">
                Nome
              </label>
              <input
                type="text"
                className="form-control input-style rounded"
                {...register("nome", { required: true, minLength: 3 })}
                placeholder="Nome"
              />
              <div className="text-danger">
                {errors.nome?.type === "required" && "Campo ?? obrigat??rio"}
              </div>
              <div className="text-danger">
                {errors.nome?.type === "minLength" &&
                  "Ra??a deve ter pelo menos 3 caracteres"}
              </div>
              <label
                htmlFor="tipoRaca"
                className="label-style text-primary mt-3"
              >
                Ra??a
              </label>
              <Controller
                name="raca"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={racas}
                    getOptionLabel={(option: Raca) => option.tipoRaca}
                    getOptionValue={(option: Raca) => String(option.id)}
                    rules={{ required: true }}
                    placeholder="Selecione uma Ra??a"
                    defaultInputValue=""
                    classNamePrefix="racas-select"
                    theme={(theme) => ({
                      ...theme,
                      borderRadius: 0,
                      colors: {
                        ...theme.colors,
                        primary25: "#7faff2",
                        primary: "#593196",
                      },
                    })}
                  />
                )}
              />

<label htmlFor="nome" className="label-style text-primary mt-3">
                Cor do pelo
              </label>
              <input
                type="text"
                className="form-control input-style rounded"
                {...register("corDoPelo", { required: true, minLength: 4 })}
                placeholder="Cor do pelo do pet"
              />
              <div className="text-danger">
                {errors.nome?.type === "required" && "Campo ?? obrigat??rio"}
              </div>
              <div className="text-danger">
                {errors.nome?.type === "minLength" &&
                  "Campo deve ter no minimo 4 caracteres"}
              </div>
              

              <div className="d-flex justify-content-between align-items-center mt-4">
                <button className="btn btn-primary btn-lg rounded ">
                  CADASTRAR
                  <FontAwesomeIcon icon={faPaw} className="ml-2" />
                </button>

                <Link
                  to={`/clientes/${idCliente}`}
                  className="btn btn-danger btn-lg rounded"
                >
                  CANCELAR
                  <FontAwesomeIcon icon={faWindowClose} className="ml-2" />
                </Link>
              </div>
            </div>
          </form>
        </div>
        <div className="col-md-6 d-flex justify-content-center order-first">
          <WomanDog className="svg-woman-dog mb-3" />
        </div>
      </div>
    </div>
  );
};

export default Pets;
