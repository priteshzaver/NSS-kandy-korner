import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"

export const NewProduct = () => {
    const [userChoices, setUserChoices] = useState({
        name:"",
        productTypeId: "",
        price: "",
    })
    const [productTypes, setProductTypes] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        fetch(`http://localhost:8088/productTypes`)
            .then(response => response.json())
            .then(productTypeArray => {
                setProductTypes(productTypeArray)
            })
    }, [])

    const handleSaveProduct = (event) => {
        event.preventDefault()
        const sendToApi = {
            name: userChoices.name,
            productTypeId: userChoices.productTypeId,
            price: parseFloat(userChoices.price).toFixed(2)
        }
        if (userChoices.name && userChoices.productTypeId && userChoices.price) {
            fetch(`http://localhost:8088/products`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(sendToApi),
            }).then(() => {
                navigate("/products")
            })
        }
        else {
            alert("Please complete all necessary fields.")
        }
    }

    return (
        <form className="product-form">
            <h2 className="product-form-title">Add a new product</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Name: </label>
                    <input
                        required
                        id="name"
                        type="text"
                        className="form-control"
                        placeholder="Candy Name"
                        value={userChoices.name}
                        onChange={(event) => {
                            const copy = {...userChoices}
                            copy.name = event.target.value
                            setUserChoices(copy)
                        }}/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <div>Product Type: </div>
                    {productTypes.map(productType => {
                        return (
                            <div key={productType.id} className="radio">
                                <label>
                                    <input
                                        type="radio"
                                        value={productType.id}
                                        checked={userChoices.productTypeId === productType.id}
                                        onChange={(event) => {
                                            const copy = {...userChoices}
                                            copy.productTypeId = parseInt(event.target.value)
                                            setUserChoices(copy)
                                        }}/>
                                        {productType.type}
                                </label>
                            </div>
                        )
                    })}
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="price">Price: 
                    <input
                        required
                        id="price"
                        type="number"
                        className="form-control"
                        placeholder="0.00"
                        min="0.01"
                        step="0.01"
                        value={userChoices.price}
                        onChange={(event) => {
                            const copy = {...userChoices}
                            copy.price = parseFloat(event.target.value)
                            setUserChoices(copy)
                        }}/>
                    </label>
                </div>
            </fieldset>
            <fieldset>
                <button
                    className="addProduct"
                    onClick={(event) => {
                        handleSaveProduct(event)
                    }}>
                    Add New Product
                </button>
            </fieldset>
        </form>
    )
}