import { useCallback, useEffect, useState } from 'react'
import uuid from 'react-uuid'
import Card from './Card'



export default function Dashboard() {
    
    //stored cards can be fed into cards
    const [cards, setCards] = useState([])
    const [stockData, setStockData] = useState([])
    const [active, setActive] = useState(false)


    const URL = 'https://www.alphavantage.co/query?'
    const API_KEY = import.meta.env.VITE_APP_API_KEY

    
    //functions
    const fetchData = useCallback(async (id, ticker) => {
        // this will actually fetch data from the API


            const params = new URLSearchParams({
                function: 'GLOBAL_QUOTE',
                symbol: ticker,
                apikey: API_KEY
            }).toString()

            try {
                const res = await fetch(`${URL}${params}`);
       
                if (!res.ok) {
                    throw new Error(`'Error fetching data' ${res.status}`);
                }
    
                const data = await res.json();
                console.log('API CALL')

                const price = data['Global Quote']['05. price'];
                const dailyChange = data['Global Quote']['10. change percent'];
  
    
                if (price && dailyChange) {
                    const newCardData = {
                        id: id,
                        ticker,
                        price,
                        dailyChange,
                        loading: false,
                        active: false
                    };

                
                setCards(prev => 
                    prev.map(card => 
                        card.id === id ? { ...card, ...newCardData} : card
                    )
                )

                localStorage.setItem(id, JSON.stringify(newCardData.ticker))
                setStockData(prev => [...prev, data])
    
                }
            } catch (error) {
                console.log(error);
                console.log(response.status)
                setCards(prev => 
                    prev.map(card => 
                        card.id === id ? { ...card, loading: false } : card
                    )
                )

            }
        
    }, [setCards, setStockData]);





    function createCard() {
        const newId = uuid()


        const newCard = { 
            id: newId, 
            ticker: '', 
            price: '', 
            dailyChange: '', 
            loading: true,
            active: true
        }
        setCards((prev) => 
            [...prev, newCard]
        )

        setActive(prev => !prev)

    }

    function deleteCard(id) {
        setCards((prevCards) => prevCards.filter((card) => card.id !== id));
        setActive(false);
        localStorage.removeItem(id)
    }


    function editCard(id) {
        setCards(prev => 
            prev.map(card => 
                card.id === id ? { ...card, active: true} : card
            )
        )
        localStorage.setItem(id, '')
        setActive(prev => !prev)
    }



    function handleSubmit(id, input) {
        fetchData(id, input)
        setActive(prev => !prev)
    }

    //upon page load
    useEffect(() => {


            //add all local storage items to an array of objects
            const localStorageCards = Object.keys(localStorage)
                .filter(key => key.match(/^[\w-]{36}$/))
                .map(key => ({
                    id: key,
                    ticker: JSON.parse(localStorage.getItem(key))
                }))



            const previousCards = localStorageCards.map(card => ({
                id: card.id, 
                ticker: card.ticker, 
                price: '', 
                dailyChange: '', 
                loading: true,
                active: false
            })
            )
            console.log(previousCards)

            setCards(previousCards)

            localStorageCards.forEach(card => (
                fetchData(card.id, card.ticker)
            ))


    }, [fetchData])
    

    
    return (
        <>
        <div className='cards--container'>
            {cards.map((card) => (
                <Card 
                key={card.id}
                id={card.id}
                input={card.input}
                isActive={card.active}
                handleSubmit={handleSubmit}
                deleteCard={deleteCard}
                stockData={stockData}
                ticker={card.ticker}
                price={card.price}
                dailyChange={card.dailyChange}
                editCard={editCard}
            />
            )
            )}
        {(cards.length === 0 || cards.length < 6 && !active) && <button id="add-btn" onClick={createCard}>+</button>}
        </div>

        </>
    )
}
