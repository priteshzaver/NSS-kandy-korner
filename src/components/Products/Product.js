import { useEffect, useState } from "react"

export const Product = ({ productId, productName, productPrice, productType, currentUser }) => {
    const [purchases, updatePurchases] = useState({
        customerId: "",
        productId: "",
        quantity: ""
    })

    const purchaseButton = () => {
        return <button
            onClick={() => {
                fetch(`http://localhost:8088/purchases`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        customerId: currentUser.id,
                        productId: productId,
                        quantity: 1,
                    })
                })
                .then(response => response.json())
                .then(() => {
                    alert(`Your purchase was successful`)
                })
            }}>
            Purchase
            </button>
            
        }

return (
    <section className="product" key={`product--${productId}`}>
        <header className="product__header">{productName}</header>
        <div>Price: ${productPrice}</div>
        <footer>
            {
                currentUser.staff
                    ? `Type: ${productType}`
                    : purchaseButton()
            }
        </footer>
    </section>
)
}