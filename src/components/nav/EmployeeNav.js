import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const EmployeeNav = () => {
    const navigate = useNavigate()

    return (
        <ul className="navbar">
            <li className="navbar__item navbar__store-locations">
                <Link className="navbar__link" to="stores">Locations</Link>
            </li>
            <li className="navbar__item navbar__products">
                <Link className="navbar__link" to="products">Products</Link>
            </li>
            <li className="navbar__item navbar__add-new-product">
                <Link className="navbar__link" to="newProducts">Add New Product</Link>
            </li>
            <li className="navbar__item navbar__add-new-product">
                <Link className="navbar__link" to="employees">Employees</Link>
            </li>
            <li className="navbar__item navbar__add-new-product">
                <Link className="navbar__link" to="newHire">Add New Hire</Link>
            </li>
            <li className="navbar__item navbar__add-new-product">
                <Link className="navbar__link" to="customers">Customers</Link>
            </li>
            <li className="navbar__item navbar__logout">
                <Link className="navbar__link" to="" onClick={() => {
                    localStorage.removeItem("kandy_user")
                    navigate("/", {replace: true})
                }}>Logout</Link>
            </li>
        </ul>
    )
}