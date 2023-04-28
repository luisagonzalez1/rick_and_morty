import style from './Card.module.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import  {addFav, removeFav} from '../../redux/actions';
import { useState } from 'react';
 

 function Card(props) {
  const {id, name, gender, species, image, status, origin, onClose, addFav, removeFav } = props

  const [ isFav, setIsfav] = useState (false)

  const handleFavorite =() => {
   if(isFav) {
    setIsfav(false)
    removeFav(id)
   }
   else {
    setIsfav(true)
    addFav(props)
  }
}

   return (
      <div className={style.container}>
        <div className={style.containerCard}>
        {
         isFav ? (
           <button onClick={handleFavorite}>❤️</button>
        ) : (
            <button onClick={handleFavorite}>🤍</button>
        )
      }
          <div className={style.front}>
            <img 
                 src={image} 
                 alt={name} 
                 className={style.image}
               />     
             </div>

             <div className={style.back}>
                <button 
                   className={style.btn}
                   onClick={()=> onClose(id)}
                 >
                     X
                </button>                                                                     
                <Link to = {`/detail/${id}`}>
                   <h2>{name}</h2>
                </Link>
                
                <h2>{species}</h2>
                <h2>{gender}</h2>
                <h2>{status}</h2>
                <h2>{origin.name}</h2>

      </div>

    </div>
 </div>
 );
}

const mapDispatchToProps = (dispatch) => {
    return {
      addFav : (character) => dispatch(addFav(character)),
      removeFav: (id)=> dispatch(removeFav(id))
   }
}
   

export default connect(
  null,
  mapDispatchToProps
  )(Card)
