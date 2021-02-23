import React from 'react'
import axios from 'axios'

export const AddUser = () => {
    const [name,setName] = React.useState("");
    const [age,setAge] = React.useState("");
    const [email,setEmail] = React.useState("");
    const [gender,setGender] = React.useState("");

    const submitHandler = async (event) =>{
        event.preventDefault();
        const url='https://test-server-mern.herokuapp.com/addUser';
        let user = {
            name,
            age,
            email,
            gender
        };
        
        const resp = await axios.post(url,user);
        alert(resp.data);
    }
   
    return (
        
            <form onSubmit={submitHandler}>
               <h1>Hello</h1>
               <p>Enter your name:</p>
               <input type="text" onChange={(e)=>setName(e.target.value)} required/>
               <p>Enter your age:</p>
               <input type="text" onChange={(e)=>setAge(e.target.value)} required/>
               <p>Enter your email:</p>
               <input type="email" onChange={(e)=>setEmail(e.target.value)} required/>
               <p>Enter your gender:</p>
               <input type="text" onChange={(e)=>setGender(e.target.value)} required/>
               <input type ="submit"/>
            </form>
        
    )
}
