import { useState } from "react"
import trashIcon from '../assets/garbage.png'


export default function CardInput({ id, handleSubmit, input, deleteCard }) {

    const [ticker, setTicker] = useState(input || '')

    function onSubmit(e) {
        e.preventDefault();
        handleSubmit(id, ticker);
    }


    return (
        <form onSubmit={onSubmit}>
            <img src={trashIcon} className="trash--icon" onClick={() => deleteCard(id)}></img>
            
            <input 
                type="text"
                name="ticker"
                placeholder="Enter Ticker"
                value={ticker}
                onChange={(e) => setTicker(e.target.value)}
            />
            <button id="submit-btn">Submit</button>
        </form>
    )

}