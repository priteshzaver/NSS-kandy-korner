import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

export const CustomerLoyalty = () => {
    const [loyalty, updateLoyalty] = useState({
        loyaltyNumber: "",
        userId: 0
    })
    const {customerId} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        fetch(`http://localhost:8088/customers?userId=${customerId}`)
        .then(response => response.json())
        .then((data) => {
            const customerLoyalty = data[0]
            updateLoyalty(customerLoyalty)
        })
    }, [customerId])

    const updateButton = (event) => {
        event.preventDefault()

        return fetch(`http://localhost:8088/customers/${loyalty.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(loyalty)
        })
            .then(response => response.json())
            .then(() => {
                navigate("/customers")
        })
    }
    
    
    return (
        <form>
            <fieldset>
                    <div className="form-group">
                        <label htmlFor="name">Loyalty Number</label>
                        <input type="number"
                            className="form-control"
                            value={loyalty.loyaltyNumber}
                            onChange={
                                (event) => {
                                    const copy = { ...loyalty }
                                    copy.loyaltyNumber = parseFloat(event.target.value)
                                    updateLoyalty(copy)
                                }
                            } />
                    </div>
                </fieldset>
                <button
                    onClick={(clickEvent) => updateButton(clickEvent)}
                    className="btn btn-primary">
                    Update
                </button>
        </form>
    )
}