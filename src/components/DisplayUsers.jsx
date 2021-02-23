import React from 'react'
import axios from 'axios'
import './displayUsers.css'

export const DisplayUsers = () => {
    const [users ,setUsers] = React.useState([]);  
    const url ='http://localhost:5000/getUsers'
    React.useEffect(()=>{
        axios.get(url).then((resp)=>{
            const data = resp.data;
            data.map((val=>val.isHidden=false));
            setUsers(data);
        
        })},[]);
    
    const handleChange = (event) =>{
        hideRow();
        const filter = event.target.value.toUpperCase();
        const newUsers = users.slice();
        newUsers.map((user)=>{
            if(user[event.target.id].toUpperCase().indexOf(filter) == -1)
               user.isHidden = true;
        })
        setUsers(newUsers)
    }    

    const hideRow = ()=>{
        const newUsers = users.slice();
        newUsers.map((user)=>user.isHidden = false);
        setUsers(newUsers);
        
    }
    
    return (
        <div>
            <table >
            <tbody>    
            <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Email</th>
                <th>Gender</th>
            </tr>
            <tr>
              <td><input type="text" id="name" onChange={(e)=>handleChange(e)}></input></td>
              <td><input type="text" id="age" onChange={(e)=>handleChange(e)}></input></td>
              <td><input type="email" id="email" onChange={(e)=>handleChange(e)}></input></td>
              <td><input type="text" id="gender" onChange={(e)=>handleChange(e)}></input></td>
            </tr>
            {users.map((user,key)=>{
           
           return (!user.isHidden)?(
            <tr key={key}>
              <td>{user.name}</td>
              <td>{user.age}</td>
              <td>{user.email}</td>
              <td>{user.gender}</td>
            </tr>
            ):null
            
           }
            )}
            </tbody>
            </table>

        </div>
    )
}




