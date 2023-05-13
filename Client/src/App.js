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
const URL = 'http://localhost:3001/rickandmorty/login/';

function App() {   
   let [ characters, setCharacters ] = useState([])

   const [access, setAccess] = useState(false)
   const EMAIL ='luisa@gmail.com';
   const PASSWORD = "1234luisa"

   const { pathname } = useLocation();
   const navigate = useNavigate();

  
 const onSearch = async (id) => {
  try {
    const { data } = await axios(`http://localhost:3001/rickandmorty/character/${id}`)
   
      if (data.name){
        setCharacters((oldChars) => [...oldChars, data]);
      };

  } catch (error) {
    alert('!no hay personajes con este ID!');
  }
 };


  const login =  async (userData) => {
    try {
      const { email, password } = userData;
      const { data } = await axios(URL + `?email=${email}&password=${password}`)
      const { access } = data;
        
         setAccess(access);
         access && navigate('/home');
   
    } catch (error) {
      console.log(error.message);
    }
   
 }
   
  useEffect(()=> {
    !access && navigate('/')
  },[access, navigate])
 
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
