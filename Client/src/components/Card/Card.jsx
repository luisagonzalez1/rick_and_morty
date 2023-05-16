import style from './Card.module.css';
import { Link, useLocation } from 'react-router-dom';         
import { connect } from 'react-redux';
import  {addFav, removeFav} from '../../redux/actions';
import {  useEffect, useState } from 'react';
 

 function Card(props) {
  const {id, name, gender, species, image, status, origin, onClose, addFav, removeFav, myFavorites  } = props
  
  const { pathname } = useLocation()

  const [ isFav, setIsfav] = useState (false)

  useEffect(() => {
    myFavorites?.forEach((fav) => {
       if (fav.id === props.id) {
        setIsfav(true);
       }
    });
 }, [myFavorites]);

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
          {  
             !pathname.includes('/favorites') &&
                <button 
                   className={style.btn}
                   onClick={()=> onClose(id)}
                 >
                     X
                </button>  
           }                                                                   
                <h2>{name}</h2>
          <Link to = {`/detail/${id}`}>
            <img 
                 src={image} 
                 alt={name} 
                 className={style.image}
               />    
                </Link>
                 
               
             </div>

             <div className={style.back}>
             
                
                <h2>{species}</h2>
                <h2>{gender}</h2>
                <h2>{status}</h2>
                <h2>{origin?.name}</h2>

      </div>

    </div>
 </div>
 );
}
const mapStateToProps = (state) => {
  return {
    myFavorites : state.myFavorites
  }
}

const mapDispatchToProps = (dispatch) => {
    return {
      addFav : (character) => dispatch(addFav(character)),
      removeFav: (id)=> dispatch(removeFav(id))
   }
}
   

export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(Card)
