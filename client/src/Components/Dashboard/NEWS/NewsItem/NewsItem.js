import React from 'react'
import './NewsItem.css'

const NewsItem = ({title, description, url, urlToImage}) => {
  return (
    <div className='news-box'>
        <div className='news-content'>
        <h3><a href={url}>{title}</a></h3>
        <p>{description}</p>
        </div>
        <img className='news-img' src={urlToImage}/>
    </div>
  )
}

export default NewsItem