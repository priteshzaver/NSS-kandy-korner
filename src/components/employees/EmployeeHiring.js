import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const EmployeeHiring = () => {
    const [userChoices, setUserChoices] = useState({
        fullName: "",
        email: "",
        isStaff: true
    })
    const [newEmployees, setNewEmployees] = useState({
        startDate: "",
        payRate: "",
        locationId: "",
        userId: 0
    })

    const [locations, setLocations] = useState([])
    const navigate = useNavigate()

    useEffect(
        () => {
            fetch(`http://localhost:8088/locations`)
                .then(response => response.json())
                .then((locationsArray) => {
                    setLocations(locationsArray)
                })
        },
        []
    )

    const handleNewHire = (event) => {
        event.preventDefault()
        const sendToUserApi = {
            fullName: userChoices.fullName,
            email: userChoices.email,
            isStaff: true
        }
        const sendToEmployeeApi = {
            startDate: newEmployees.startDate,
            payRate: newEmployees.payRate,
            locationId: newEmployees.locationId,
            userId: 0
        }
        if (userChoices.fullName && userChoices.email && userChoices.isStaff && newEmployees.startDate && newEmployees.payRate && newEmployees.locationId) {
            fetch(`http://localhost:8088/users`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(sendToUserApi)
            })
                .then(response => response.json())
                .then((createdUser) => {
                    sendToEmployeeApi.userId = createdUser.id

                    return fetch(`http://localhost:8088/employees`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(sendToEmployeeApi)
                    })
                })
                .then(() => {
                    navigate("/employees")
                })
        }
        else {
            alert("Please complete all necessary fields")
        }
    }

    return (
        <form className="employee-form">
            <h2 className="employee-form-title">Hire New Employee</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Name: </label>
                    <input
                        required autoFocus
                        id="name"
                        type="text"
                        className="form-control"
                        placeholder="New hire name"
                        value={userChoices.fullName}
                        onChange={(event) => {
                            const copy = { ...userChoices }
                            copy.fullName = event.target.value
                            setUserChoices(copy)
                        }} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="email">Email: </label>
                    <input
                        id="email"
                        type="text"
                        className="form-control"
                        placeholder="Email address"
                        value={userChoices.email}
                        onChange={(event) => {
                            const copy = { ...userChoices }
                            copy.email = event.target.value
                            setUserChoices(copy)
                        }} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="startDate">Start Date: </label>
                    <input
                        id="startDate"
                        type="date"
                        className="form-control"
                        value={newEmployees.startDate}
                        onChange={(event) => {
                            const copy = { ...newEmployees }
                            copy.startDate = event.target.value
                            setNewEmployees(copy)
                        }} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="payRate">PayRate:
                        <input
                            required
                            id="payRate"
                            type="number"
                            className="form-control"
                            placeholder="0.00"
                            min="0.01"
                            step="0.01"
                            value={newEmployees.payRate}
                            onChange={(event) => {
                                const copy = { ...newEmployees }
                                copy.payRate = parseFloat(event.target.value)
                                setNewEmployees(copy)
                            }} />
                    </label>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <div>Assigned Location: </div>
                    {locations.map(location => {
                        return (
                            <div key={location.id} className="radio">
                                <label>
                                    <input
                                        type="radio"
                                        value={location.id}
                                        checked={newEmployees.locationId === location.id}
                                        onChange={(event) => {
                                            const copy = { ...newEmployees }
                                            copy.locationId = parseInt(event.target.value)
                                            setNewEmployees(copy)
                                        }} />
                                    {location.storeName}
                                </label>
                            </div>
                        )
                    })}
                </div>
            </fieldset>
            <fieldset>
                <button
                    className="addNewHire"
                    onClick={(event) => {
                        handleNewHire(event)
                    }}>
                    Add New Hire
                </button>
            </fieldset>
        </form>
    )
}