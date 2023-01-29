import { useEffect, useState } from "react"
import { Product } from "./Product"
import "./Products.css"

export const AllProducts = ({searchTermState}) => {
    const [products, setProducts] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])
    const [purchases, setPurchases] = useState([])
    const [topPriced, setTopPriced] = useState([false])
    
    const localKandyUser = localStorage.getItem("kandy_user")
    const kandyUser = JSON.parse(localKandyUser)

    useEffect(
        () => {
            const searchProducts = products.filter(product => {
                return product.name.toLowerCase().startsWith(searchTermState.toLowerCase())
            })
            setFilteredProducts(searchProducts)
        },
        [searchTermState]
    )

    useEffect(() => {
        fetch(`http://localhost:8088/products?_sort=name&_order=asc&_expand=productType`)
            .then(response => response.json())
            .then(productsArray => {
                setProducts(productsArray)
            })
        fetch(`http://localhost:8088/purchases`)
            .then(response => response.json())
            .then(purchasesArray => {
                setPurchases(purchasesArray)
            })
    }, [])

    useEffect(() => {
        if (kandyUser.staff) {
            setFilteredProducts(products)
        }
        else {
            setFilteredProducts(products)
        }
        
    }, [products])
    
    useEffect(() => {
        if (topPriced) {
            const topPricedArray = products.filter(product => { 
                return product.price >= 2.00
            })
            setFilteredProducts(topPricedArray)
        }
        else {
            
            setFilteredProducts(products)
        }
    }, [topPriced])


    return (
        <div>
            { kandyUser.staff
                ? <>
                    <button onClick={() => { setTopPriced(true) }}>Show Top Priced Products</button>
                    <button onClick={() => { setTopPriced(false) }}>Show All Products</button>
                </>
                : <>
                    
                </>

            }
            <article className="products">
                {filteredProducts.map(product => <Product key={`product--${product.id}`}
                productId={product.id}
                productName={product.name}
                productPrice={product.price}
                productType={product.productType?.type}
                currentUser={kandyUser} />
                )}
                </article> 
        </div>
    )
}
