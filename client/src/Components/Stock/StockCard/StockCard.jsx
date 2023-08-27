import React from 'react'
import './StockCard.css'

const StockCard = () => {
  return (
    <div className='stockcard_container'>
     <div className='stockcard-top'>
       <div className='stock-date'>
        Medicine: Pantop D
       </div>
       <div className='scard-right'>
       <div className='stock-time'>
        Price: Rs22p/u
       </div>
       <div className='stock-time'>
        Quantity: 200
       </div>
       <div className='stock-cancel'>
        Update
       </div>
       </div>
     </div>
    </div>
  )
}

export default StockCard