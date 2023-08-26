import React from 'react'
import './BookingsCard.css'

const BookingsCard = () => {
  return (
    <div className='bookcard_container'>
     <div className='bookcard-top'>
       <div className='book-date'>
        Date: 12/08/23
       </div>
       <div className='book-time'>
        Time: 2.33pm
       </div>
       <div className='book-cancel'>
        Cancel
       </div>
     </div>
     <div className='bookcard-bottom'>
      Problem: Diarrhea
     </div>
    </div>
  )
}

export default BookingsCard