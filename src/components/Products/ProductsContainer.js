import { useState } from "react"
import { AllProducts } from "./AllProducts"
import { FindProduct } from "./FindProduct"

export const ProductsContainer = () => {
    const [searchTerms, setSearchTerms] = useState("")

    return <>
            <FindProduct setterFunction={setSearchTerms}/>
            <AllProducts searchTermState={searchTerms} />
        </>
}