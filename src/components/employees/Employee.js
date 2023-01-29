export const Employee = ({fullName, storeName, storeAddress, startDate}) => {
    return <section className="employee">
            <div>Name: {fullName}</div>
            <div>Store Name: {storeName} </div>
            <div>Store Address: {storeAddress}</div>
            <div>Start Date: {startDate}</div>
    </section>
}