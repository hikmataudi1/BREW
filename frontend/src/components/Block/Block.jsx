import React from 'react'
import './Block.css'
import { Link } from 'react-router-dom'
const Block = ({header,content,btn_text,img,button_to,onClick , id}) => {
  const style={
    background:`url('${img}') no-repeat`,
    backgroundSize:"cover",
    
  }
  return (
    <div style={style} className='block' id={id}>
        <div className="block-content" >
            <h2>{header}</h2>
            <p>{content}</p>
            <Link to={`/${button_to}`}>
            
              <button onClick={onClick}>
              {btn_text}
              </button> 
            </Link>
        </div>
    </div>
  )
}

export default Block