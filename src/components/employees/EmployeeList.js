import { useEffect, useState } from "react"
import { Employee } from "./Employee"

export const EmployeeList = () => {
    const [employees, setEmployees] = useState([])

    useEffect(
        () => {
            fetch (`http://localhost:8088/employees?_expand=user&_expand=location`)
                .then(response => response.json())
                .then((employeesArray) => {
                    setEmployees(employeesArray)
                })
        },
        []
    )
    
    return (
        <div>
            <h2>All Employees</h2>
            <article>
                {employees.map(employee => <Employee key={`employee--${employee.id}`}
                    fullName={employee.user.fullName}
                    storeName={employee.location.storeName}
                    storeAddress={employee.location.address}
                    startDate={employee.startDate}
                />)
                }
            </article>
        </div>
    )

}