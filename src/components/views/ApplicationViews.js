import { CustomerViews } from "./CustomerViews"
import { EmployeeViews } from "./EmployeeViews"

export const ApplicationViews = () => {
	const localKandyUser = localStorage.getItem("kandy_user")
    const kandyUser = JSON.parse(localKandyUser)

    if (kandyUser.staff) {
        return <EmployeeViews />
    }
    else {
        return <CustomerViews />
    }
}

