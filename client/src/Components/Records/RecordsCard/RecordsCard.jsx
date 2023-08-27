import React from 'react'
import './RecordsCard.css'

const RecordsCard = () => {
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
        Prescrption
       </div>
     </div>
     <div className='bookcard-bottom'>
      Diagnosis: IBS
     </div>
    </div>
  )
}

export default RecordsCard