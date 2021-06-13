import {
    faAddressCard,
    faPhoneSquareAlt,
    faDog
  } from "@fortawesome/free-solid-svg-icons";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const ClientCard = () => (

    <div className="mt-5 col-lg-4 col-md-6 d-flex justify-content-center ">
    <div className="card text-white bg-primary mb-3 card-container rounded shadow">
      <div className="card-header h5">Kleber Ricardo da Paixão Lima</div>
      <div className="card-body">
        <h5 className="card-title">Informações do cliente</h5>
        <p className="card-text">
          <FontAwesomeIcon icon={faAddressCard} className="mr-1" />{" "}
          051.232.875-74
        </p>
        <p className="card-text">
          <FontAwesomeIcon icon={faPhoneSquareAlt} className="mr-1" />{" "}
          71-988262361
        </p>
        <div className="container ">
            <p className="text-center h5">Meus Pets</p>
          <div className="row d-flex justify-content-between">
            <div className="col-6  pb-2">
              <span className="text-center">
                <FontAwesomeIcon icon={faDog} className="mr-1" />
                Bandido
              </span>
            </div>
            <div className="col-6 pb-2">
              <span className="text-center">
                <FontAwesomeIcon icon={faDog} className="mr-1" />
                Marvin
              </span>
            </div>
            <div className="col-6 pb-2">
              <span className="text-center">
                <FontAwesomeIcon icon={faDog} className="mr-1" />
                Marvin
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)


export default ClientCard;