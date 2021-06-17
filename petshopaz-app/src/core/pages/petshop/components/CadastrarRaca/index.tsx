/* eslint-disable jsx-a11y/anchor-is-valid */
import { faPaw, faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useHistory, useParams } from "react-router-dom";
import { ReactComponent as DogHappy } from "../../../../assets/image/doghappy.svg";
import { RacaResponse } from "../../../../types/Pet";
import { makeRequest } from "../../../../util/request";
import Pagination from "@material-ui/lab/Pagination";
import "./styles.css";


type FormData = {
  tipoRaca: string;
};

type ParamsType = {
  idRaca: string;
};

const CadastrarRaca = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>();
  const history = useHistory();
  const { idRaca } = useParams<ParamsType>();
  const isEditing = idRaca !== "cadastrar";
  const [hasError, setHasError] = useState(false);
  const [deleteError, setDeleteError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [successDelete, setSuccessDelete] = useState(false);
  const [racaResponse, setRacaResponse] = useState<RacaResponse>();
  const [activePage, setActivePage] = useState(0);

  useEffect(() => {
    if (isEditing) {
      makeRequest({ url: `/racas/${idRaca}` }).then((response) => {
        setValue("tipoRaca", response.data.tipoRaca);
      });
    }
  }, [idRaca, isEditing, setValue]);

  const buscarRacas = useCallback(() => {
    const params = {
      page: activePage,
    };
    makeRequest({ url: "/racas", params }).then((response) => {
      setRacaResponse(response.data);
    });
  }, [activePage]);
  useEffect(() => {
    buscarRacas();
  }, [buscarRacas]);

  const onSubmit = (data: FormData) => {
    makeRequest({
      url: isEditing ? `/racas/${idRaca}` : "/racas",
      method: isEditing ? "PUT" : "POST",
      data,
    })
      .then(() => {
        setHasError(false);
        setSuccess(true);
        setTimeout(() => {
            if(isEditing){
                history.push('/racas/cadastrar')
                setSuccess(false)
                document.location.reload()
            }
            else{
                document.location.reload()
            }
        }, 100);
      })
      .catch(() => {
        setHasError(true);
      })
      .finally(() => {
        setValue("tipoRaca", "");
      });
  };

  const onRemove = (idRaca: number) => {
    makeRequest({ url: `/racas/${idRaca}`, method: "DELETE" })
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
    <div className="container " style={{ marginTop: "13rem" }}>
      <h3 className="text-white text-uppercase">{isEditing ? 'editar' : 'cadastrar'} raça</h3>

      <div className="row">
        <div className="col-md-6 order-md-first">
        {hasError && (
            <div className="alert alert-danger mt-3 rounded font-weight-bold">
                RAÇA JÁ CADASTRADA.
            </div>
          )}
        {deleteError && (
            <div className="alert alert-danger mt-3 rounded font-weight-bold">
                ESTA RAÇA NÃO PODE SER EXCLUÍDA
            </div>
          )}
          {success && (
            <div className="alert alert-info mt-3 rounded font-weight-bold">
                RAÇA {isEditing? 'EDITADA' : 'CADASTRADA'} COM SUCESSO.
            </div>
          )}
          {successDelete && (
            <div className="alert alert-info mt-3 rounded font-weight-bold">
                RAÇA EXCLUÍDA COM SUCESSO
            </div>
          )}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label
                htmlFor="tipoRaca"
                className="label-style text-primary mt-5"
              >
                Raça
              </label>
              <input
               type="text"
               className="form-control input-style rounded"
               {...register("tipoRaca", { required: true, minLength: 3 })}
               placeholder="Raça"
             />
             <div className="text-danger">
               {errors.tipoRaca?.type === "required" && "Campo é obrigatório"}
             </div>
             <div className="text-danger">
               {errors.tipoRaca?.type === "minLength" &&
                 "Raça deve ter pelo menos 3 caracteres"}
             </div>
              <div className="d-flex justify-content-between align-items-center mt-4">
                <button className="btn btn-primary btn-lg rounded ">
                  {isEditing ? 'SALVAR' : 'CADASTRAR'}
                  <FontAwesomeIcon icon={faPaw} className="ml-2" />
                </button>

                <Link to={isEditing ? '/racas/cadastrar': '/clientes'} className="btn btn-danger btn-lg rounded">
                  CANCELAR
                  <FontAwesomeIcon icon={faWindowClose} className="ml-2" />
                </Link>
              </div>
            </div>
          </form>
        </div>
        <div className="col-md-6 d-flex justify-content-center order-first">
          <DogHappy className="svg-dog-happy mb-3" />
        </div>
      </div>

      <div className="col-md-6 ">
        {!isEditing && (
          <>
            {racaResponse?.content.map((raca) => (
              <div
                className="row rounded py-2 mb-2 list-style"
                style={{ backgroundColor: "#Fff9" }}
                key={raca.id}
              >
                <div className="col-4 d-flex justify-content-center align-items-center">
                  <h5 className="text-primary">
                    {raca.tipoRaca}
                  </h5>
                </div>
                <div className="col-8 d-flex justify-content-around align-items-center">
                  <Link
                    to={`../racas/${raca.id}`}
                    className="btn btn-info btn-md rounded"
                  >
                    EDITAR
                  </Link>
                  <button type="button" className="btn btn-outline-danger btn-md rounded" onClick={ () => onRemove(raca.id)}>
                    EXCLUIR
                  </button>
                </div>
              </div>
            ))}
            {racaResponse && (
              <>
                <div className="pagination-cards-raca mb-4">
                  <Pagination
                    color="primary"
                    count={racaResponse.totalPages}
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
  );
};

export default CadastrarRaca;
