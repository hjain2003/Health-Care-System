import React from 'react'
import './BookingsCard.css'

const DBookingsCard = () => {
  return (
    <div className='bookcard_container'>
    
     <div className='bookcard-top'>
       <div className='book-date'>
        Date: 12/08/23
       </div>
       <div className='book-time'>
        Time: 2.33pm
       </div>
       <div className='doc-booking-buttons'>
        <div className='book-accept'>
          Accept
        </div>
        <div className='book-cancel'>
          Cancel
        </div>
       </div>
       
     </div>
     <div className='bookcard-bottom'>
      Harsh Jain
      <div className='doc-bookcard-details'>
        Problem: Diarrhea
      </div>
     </div>
    </div>
  )
}

export default DBookingsCard