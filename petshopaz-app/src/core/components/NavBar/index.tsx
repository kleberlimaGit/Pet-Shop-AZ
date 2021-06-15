import {ReactComponent as Pet} from '../../assets/image/dog.svg'
import {Link} from 'react-router-dom';
import './styles.css'

const handleResetSession = () => window.sessionStorage.removeItem("page")
const Navbar = () =>

<nav className = "pl-md-5 bg-primary  py-2 navbar fixed-top shadow">
    <div className="col-lg-2 col-md-4 col-12  ">
            <Link to="/" className="d-flex justify-content-center align-items-center"  onClick={handleResetSession}>
                <h4 className="text-white">PetShop AZ</h4>
                <Pet/>
            </Link>
    </div>
</nav>


export default Navbar;