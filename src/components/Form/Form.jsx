import { useState } from "react";
import validation from './validation.js'

const Form = (props) => {
    const { login } = props
   const [ userData, setUserData] = useState({
    email: '',
    password: ''
})

const [errors, setErrors] = useState ({})

const handleChange = (evento) => {
    setUserData({
        ...userData,
      //email 
      //password  
      [evento.target.name] : evento.target.value
    })
    setErrors(validation({
        ...userData,
        [evento.target.name] : evento.target.value
        
    }))
}

   const handleSubmit = (evento) => {
    evento.preventDefault()
    login(userData)
}
    return (
        <>
        <form onSubmit={handleSubmit}>
            <label>Email</label>
                <input
                 type="email"
                 placeholder="Email"
                 name= "email"
                 value={userData.email}
                 onChange={handleChange}
                
                />

                {
                  errors.email ? (
                     <p style={{color:"white"}}>
                        {errors.email}</p>

                  ) : errors.emailVacio ? (
                      <p style={{color: "white"}} >
                      {errors.emailVacio}</p>
                  ) : 

                  (
                      <p style={{color:"white"}}>
                      {errors.caracteres}</p>
                  )
                
                 }  

                <label>Password</label>
                <input 
                 type= "password"
                 placeholder="password"
                 name="password"
                 value={userData.password}
                 onChange={handleChange}
               
               />
                 {
                  errors.password ? (
                      <p style={{color:"white"}}>
                        {errors.password}</p>
                  ) : 
                  ''
                  
                
                 }  
            <button type="submit" >Submit</button>
             
        </form>
        </>
        
    )
}

export default Form; 