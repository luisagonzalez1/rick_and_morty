import style from './SearchBar.module.css';
import imageLogo from '../../image/logo.jpg';
import { useState } from 'react';

export default function SearchBar(props) {
   let [id, setId] =useState ('');
     
   const handleEnter = (event) => {
      if (event.key === 'Enter'){
         if(id)
         props.onSearch (id);
      }   
   }
   
  
   const handleChange = (evento) => {
      setId(evento.target.value)
   }
   
   return (
      <div className={style.containersSearch}>
        <img
         src={imageLogo}
        alt="logo rick and morty"
      className={style.logo}
      />
   
   <div className={style.containerInput}>
  <input
     type='search'
     placeholder="Search..."
     className={style.input}
     onKeyUp={handleEnter}
     onChange={handleChange}
     value = {id}
  />
  

  </div>
 </div>

   );

   }