import './App.css'
import Cards from './components/Cards/Cards.jsx'; 
import Nav from './components/Nav/Nav';
import About from './components/About/About';
import { useState, useEffect } from 'react';
import axios from 'axios';
import {Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Detail from './components/Detail/Detail';
import Form from './components/Form/Form';
import Favorites from './components/Favorites/Favorites';


function App() {   
   let [ characters, setCharacters ] = useState([])

   const [access, setAccess] = useState(false)
   const EMAIL ='luisa@gmail.com';
   const PASSWORD = "1234luisa"

   const { pathname } = useLocation();
   const navigate = useNavigate();

  
 function onSearch(id) {
   axios(`https://rickandmortyapi.com/api/character/${id}`)
   .then(({data}) => {
     
      const char = characters?.find(e => e.id === (data.id))
     
      if (char){
        alert("Already in the list")
      } 
      else if(data.id !== undefined) { 
       setCharacters(characters => [...characters, data]);
      }
       else {
        alert('Character not found');
      }
     })
   }
   
  const login = (userData) => {
    const { email, password } = userData;
    const URL = 'http://localhost:3001/rickandmorty/login/';
    axios(URL + `?email=${email}&password=${password}`).then(({ data }) => {
       const { access } = data;
       console.log(data)
       setAccess(access);
       access && navigate('/home');
    });
 }
   
  useEffect(()=> {
    !access && navigate('/')
  },[access])
 
 const onClose = (id) => {
   setCharacters(
    characters.filter((character) => character.id !== Number(id))
   )
 }
   return (
      <div className='container'>

        { pathname !== '/' && 
        <Nav
         onSearch = {onSearch}
         setAccess= {setAccess}
          /> }
       
         <Routes>
       
           <Route path='/' element= {<Form login= {login} />}/>
           
            <Route path="/home" element={<Cards  characters= {characters} onClose = {onClose}/> }/>

            <Route path="/about" element={<About/>}/>

            <Route path='/detail/:id' element={<Detail/>}/>

            <Route path='/favorites' element={<Favorites onClose = {onClose} />}/>

      
      </Routes>
    </div>
   )
}


export default App;
