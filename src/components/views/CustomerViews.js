import { Outlet, Route, Routes } from "react-router-dom"
import { ProductsContainer } from "../Products/ProductsContainer"
import { StoreLocations } from "../Stores/StoreLocations"

export const CustomerViews = () => {
	return (
		<Routes>
			<Route path="/" element={
				<>
					<h1>Kandy Korner</h1>

					<Outlet/>
				</>
			}>
				<Route path="stores" element={ <StoreLocations/>}/>
				<Route path="findProduct" element={<ProductsContainer />}/>
			</Route>
		</Routes>
	)
}
