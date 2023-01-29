import { useEffect, useState } from "react"

export const StoreLocations = () => {
    const [stores, setStores] = useState([])

    useEffect(() => {
        fetch(`http://localhost:8088/locations`)
            .then(response => response.json())
            .then(storesArray => {
                setStores(storesArray)
            })
    }, [])

    return (
        <div>
            <ul>
                {stores.map(store => {
                    return <li>
                            Address - {store.address}
                            <ul>
                                <li>
                                    Square Footage {store.squareFootage} sq. ft.
                                </li>
                            </ul> 
                        </li>
                })}
            </ul>
        </div>
    )
}