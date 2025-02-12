import CardInput from "./CardInput"
import CardDisplay from "./CardDisplay"


export default function Card({ id, handleSubmit, input, isActive, ticker, price, dailyChange, editCard, deleteCard, stockData }) {

    

    if (isActive && stockData.loading === true) {
        return (
            <>
            <p>Loading</p>
            </>
        )
    }

    if (isActive) {
        return (
            <>
            <div className="card">
            <CardInput
                id={id}
                handleSubmit={handleSubmit}
                input={input}
                deleteCard={deleteCard}
            />
            </div>
            </>
        )
    }


    return (
        <>
        <div className="card">        
        <CardDisplay
        id={id}
        ticker={ticker}
        price={price}
        dailyChange={dailyChange}
        deleteCard={deleteCard}
        editCard={editCard}
        />
        </div>
        </>
    )
    


}