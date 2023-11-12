import React, { useState } from 'react';
import './ReqCard.css';

const ReqCard = ({ date, timeSlot, remarks }) => {  
    return (
      <div className='reqCard'>
        <div className='reqcard-top'>
            <div className='info'>
            <div className='row1'>
            <div className='bt'>
                Date: {date}
                </div>
                <div className='bt'>
                Name: {timeSlot}
                </div>
            </div>
            <div className='row2'>
            <div className='bt'>
                Quatity: {date}
                </div>
                <div className='bt'>
                Medicine: {timeSlot}
                </div>
            </div>
                
            </div>
            

            <div className='but-req'>
                <div className='med-cancel m1'>
                    PRESCRIPTION
                </div>
                <div>
                <div className='med-cancel m2'>
                    AVAILABLE
                </div>
                <div className='med-cancel m3'>
                    CANCEL
                </div>
                </div>                
            </div>
            
        </div>
      </div>
    );
  };

export default ReqCard
