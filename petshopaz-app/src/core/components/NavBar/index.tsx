import {ReactComponent as Pet} from '../../assets/image/dog.svg'
import './styles.css'
const Navbar = () =>

<nav className = "row pl-md-5 bg-primary text-white py-2">
    <div className="col-lg-2 col-md-4 col-12 d-flex justify-content-center align-items-center">
        <h4 className="">PetShop AZ</h4>
        <div className="">
            <Pet/>
        </div>

    </div>
</nav>


export default Navbar;