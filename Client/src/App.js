import './App.css'
import Cards from './components/Cards/Cards.jsx'; 
import Nav from './components/Nav/Nav';
import { useState, useEffect } from 'react';
import axios from 'axios';
import {Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Detail from './components/Detail/Detail';
import About from './components/About/About';
import Form from './components/Form/Form';
import Favorites from './components/Favorites/Favorites';
//const URL = 'http://localhost:3001/rickandmorty/login/';

function App() {   
   let [ characters, setCharacters ] = useState([])

   const [access, setAccess] = useState(false);
   //const EMAIL ='luisa@gmail.com';
   //const PASSWORD = "1234luisa"

   const { pathname } = useLocation();
   const navigate = useNavigate();

  
 async function onSearch(id) {
  try {
    const url ='http://localhost:3001/rickandmorty/character/' + id

    const { data } = await axios(url)
      const char = characters?.find(e => Number (e.id) === Number(data.id))
        
      if (char){
        alert("Already in the list")
      }
   else if (data.id !== undefined) {
    setCharacters(characters => [...characters, data]);
   }
      else {
        alert('Character not found');
      }
  }

  catch (error) {
    return { error: error.message};
  }
 }

   async function login(userData) {
    try {
      const { email, password } = userData;
      const URL = 'http://localhost:3001/rickandmorty/login/';
      const QUERY = `?email=${email}&password=${password}`
      const { data } = await axios (URL + QUERY)
        const { access} = data;
         setAccess(data);
         access && navigate('/home');
   
    } catch (error) {
      return { error: error.message};
      
    }
   
 }
   
  useEffect(()=> {
    !access && navigate('/')
  }, [access])
 
 const onClose = (id) => {
   setCharacters(
    characters.filter((character) => character.id !== id)
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
