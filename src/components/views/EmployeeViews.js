import { Outlet, Route, Routes } from "react-router-dom"
import { CustomerDetails } from "../customers/CustomerDetails"
import { CustomerList } from "../customers/CustomerList"
import { EmployeeHiring } from "../employees/EmployeeHiring"
import { EmployeeList } from "../employees/EmployeeList"
import { AllProducts } from "../Products/AllProducts"
import { NewProduct } from "../Products/NewProduct"
import { StoreLocations } from "../Stores/StoreLocations"

export const EmployeeViews = () => {
	return (
		<Routes>
			<Route path="/" element={
				<>
					<h1>Kandy Korner</h1>

					<Outlet/>
				</>
			}>
				<Route path="stores" element={ <StoreLocations/>}/>
				<Route path="products" element={ <AllProducts/>}/>
				<Route path="newProducts" element={ <NewProduct/>}/>
				<Route path="employees" element={ <EmployeeList/>}/>
				<Route path="newHire" element={ <EmployeeHiring/>}/>
				<Route path="customers" element={ <CustomerList/>}/>
				<Route path="customers/:customerId" element={ <CustomerDetails/>}/>
			</Route>
		</Routes>
	)
}