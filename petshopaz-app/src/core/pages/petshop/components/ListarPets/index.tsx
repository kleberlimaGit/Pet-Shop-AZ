import { Pet } from "../../../../types/Pet";
import { faDog } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Prop = {
  pet: Pet;
  onRemove: (idPet:number) => void
};

const ListarPets = ({ pet,onRemove }: Prop) => {
  return (
    <div
      className="row rounded py-2 mb-2 list-style"
      style={{ backgroundColor: "#Fff9" }}
      key={pet.id}
    >
      <div className="col-9 d-flex justify-content-center align-items-center">
      <FontAwesomeIcon icon={faDog} className="mr-2 text-primary text-center" style={{fontSize:"2rem"}}/>
      <div className="col-6">
      <p className="text-primary text-uppercase text-center mb-1"><strong>Nome:</strong> {pet.nome}</p>
      <p className="text-primary text-uppercase text-center"><strong>Cor do pelo:</strong> {pet.corDoPelo}</p>
      </div>
      <p className="text-primary text-uppercase text-center"><strong>Raça:</strong> {pet.raca.tipoRaca}</p>
      </div>
      <div className="col-3 d-flex justify-content-around align-items-center">
        <button
          type="button"
          className="btn btn-outline-danger btn-md rounded"
          onClick={() => onRemove(pet.id)}
        >
          EXCLUIR
        </button>
      </div>
    </div>
  );
};

export default ListarPets;
