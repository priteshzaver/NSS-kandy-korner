import { useEffect, useState } from "react"
import { Customer } from "./Customer"

export const CustomerList = () => {
    const [customers, setCustomers] = useState([])

    useEffect(
        () => {
            fetch(`http://localhost:8088/customers?_expand=user`)
                .then(response => response.json())
                .then((customersArray) => {
                    setCustomers(customersArray)
                })
        },
        []
    )

    return (
        <div>
            <h2>All Customers</h2>
            <article>
                {customers.map(customer => <Customer key={`customer--${customer.id}`}
                    id={customer.id}
                    fullName={customer.user?.fullName}
                    email={customer.user?.email}/>)
                }
            </article>
        </div>
    )
}