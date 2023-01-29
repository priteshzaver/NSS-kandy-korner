import { CustomerNav } from "./CustomerNav"
import { EmployeeNav } from "./EmployeeNav"
import "./NavBar.css"

export const NavBar = () => {
    const localKandyUser = localStorage.getItem("kandy_user")
    const kandyUser = JSON.parse(localKandyUser)

    if (kandyUser.staff) {
        return <EmployeeNav />
    }
    else {
        return <CustomerNav />
    }
}

