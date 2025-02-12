import trashIcon from '../assets/garbage.png'
import editIcon from '../assets/edit.png'

export default function CardDisplay({ id, ticker, price, dailyChange, deleteCard, editCard }) {

    return (
            <>
                <div className="card--container">
        
                    <img src={trashIcon} className="trash--icon" onClick={() => deleteCard(id)}></img>
                    <img src={editIcon} className="edit--icon" onClick={() => editCard(id)}></img>
                    <h1 className="card--ticker">{ticker}</h1>
                    <h2 className="card--price">${price}</h2>
                    <p className="card--dailyChange">{dailyChange}</p>
                </div>
            </>
            )
}