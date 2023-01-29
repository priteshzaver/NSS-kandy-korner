export const FindProduct = ({setterFunction}) => {
    
    return (
        <div>
            <label htmlFor="findProduct">What candy are you looking for?</label>
            <input
            onChange={(changeEvent) => {
                setterFunction(changeEvent.target.value)
            }}
            type="text" placeholder="Candy Name" />
        </div>
    )
}