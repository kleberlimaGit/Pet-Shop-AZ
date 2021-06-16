import { Pet } from "../../../../types/Pet";
import { Link } from "react-router-dom";

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
      <div className="col-4 d-flex justify-content-center align-items-center">
        <h5 className="text-primary">{pet.nome}</h5>
      </div>
      <div className="col-8 d-flex justify-content-around align-items-center">
        <Link
          to={`../pets/${pet.id}`}
          className="btn btn-info btn-md rounded"
        >
          EDITAR
        </Link>
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
