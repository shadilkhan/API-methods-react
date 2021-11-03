import React, { useState ,useEffect } from 'react'

export default function App() {
  const [users,setUsers] = useState([]);
  const [firstname,setFirstName] = useState("");
  const [lastname,setLastName] = useState("");
  const [email,setEmail] = useState("");
  const [id,setId] = useState(null);

  function getUser(){
    fetch("http://localhost:8000/employees").then((result)=>{
      result.json().then((resp)=>{
        setUsers(resp);
        // setFirstName(resp[0].firstname);
        // setLastName(resp[0].lastname);
        // setEmail(resp[0].email);
        // setId(resp[0].id);
      })
    })
  }

  useEffect(() => {
    getUser();
  }, [])

                                        //delete a user
  function deleteUser(id){
    // console.log(id);
    fetch(`http://localhost:8000/employees/${id}`,{
      method:"DELETE"
    }).then((result)=>{
      result.json().then((resp)=>{
        // console.log(resp);
        getUser();
      })
    })
  }

                              //Select User for prefilled form
   function selectUser(id){
  //  console.log(users[id-1]);
   let item=users[id-1];
   setFirstName(item.firstname);
   setLastName(item.lastname);
   setEmail(item.email);
   setId(item.id);
   }
                                  //update user data
    function updateUser(){
        // console.log(firstname,lastname,email,id);
        let data={firstname,lastname,email,id}
        fetch(`http://localhost:8000/employees/${id}`,{
          method:"PUT",
          headers:{
            "Accept":"application/json",
            "Content-Type":"application/json",
          },
          body:JSON.stringify(data)
        }).then((result)=>{
          result.json().then((resp)=>{
            // console.log(resp);
            getUser();
           
          })
        })
    }
                              //add a new user
      // function addUser(){
      //   // let data={firstname,lastname,email}
      //   // fetch(`http://localhost:8000/employees`,{
      //   //   method:"P",
      //   //   headers:{
      //   //     "Accept":"application/json",
      //   //     "Content-Type":"application/json",
      //   //   },
      //   //   body:JSON.stringify(data)
      //   // }).then((result)=>{
      //   //   result.json().then((resp)=>{
      //   //     // console.log(resp);
      //   //     getUser();
           
      //   //   })
      //   // })
      // }
      function addUser(){
        console.log(firstname,lastname,email);
        let data={firstname,lastname,email}
        fetch(`http://localhost:8000/employees`,{
          method:"POST",
          headers:{
            "Accept":"application/json",
            "Content-Type":"application/json",
          },
          body:JSON.stringify(data)
        }).then((result)=>{
          result.json().then((resp)=>{
            console.log(resp);
            getUser();
           
          })
        })

      }
  return (
    <div className="container">
      <h1 className="text-center my-5">ALL METHOD OF API</h1>
      <table className="table table-striped table-hover">
  <thead>
    <tr> 
      <th scope="col">id</th>
      <th scope="col">First Name</th>
      <th scope="col">Last Name</th>
      <th scope="col">Email</th>
      <th scope="col">Operation</th>
      <th scope="col">AutoFilled</th>
      {/* <th scope="col">Add User</th> */}
    </tr>
  </thead>
  <tbody>
    {users.map((e)=>
    <tr key={e.id}>
      <th scope="row">{e.id}</th>
      <td>{e.firstname}</td>
      <td>{e.lastname}</td>
      <td>{e.email}</td>
      <td><button className="btn btn-sm btn-danger" onClick={()=>deleteUser(e.id)}>Delete</button></td>
      <td><button className="btn btn-sm btn-info" onClick={()=>selectUser(e.id)}>Update</button></td>

    </tr> 
    )}
    
  </tbody>
  </table>
  <div className="container text-center my-5">
    <input type="text" value={firstname} onChange={(e)=>setFirstName(e.target.value)} name="firstname" /><br/><br/>
    <input type="text" value={lastname} onChange={(e)=>setLastName(e.target.value)} name="lastname" /><br/><br/>
    <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)} name="email" /><br/><br/>
    <button className="btn btn-sm btn-success" onClick={()=>updateUser()}>UpdateUser</button>
    <button className="btn btn-sm btn-info mx-3" onClick={()=>addUser()}>AddNewUser</button>

  </div>
    </div>
  )
}
