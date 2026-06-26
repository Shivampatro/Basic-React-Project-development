import { useState } from 'react'

const Home = () => {
 //Step-1 :
  // Create a form
 // Step-2: Giveb value attribute in each field
 // Step-3 : create UseState hooks 

   const [name , setName] = useState("");
   const [email , setEmail] = useState("");
   const [phone , setPhone] = useState("");
   const [password, setPassword] = useState("");

   const handleSubmit =(e) =>{
       e.preventDefault();
       console.log(' name '+ name);
       console.log(' email '+ email);
       console.log(' phone '+ phone);
       console.log(' password '+ password);
   }

  return (
    <div>
      
      <h1> Home </h1>

      <form onSubmit={handleSubmit}>
        <div>
          Name : <input type="text" name="name" value={name} onChange={(e)=>setName(e.target.value)}/>
          
        </div>
        <div>
          Email : <input type="text" name="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>          
        </div>
          <div>
          Phone : <input type="text" name="phone" value={phone} onChange={(e)=>setPhone(e.target.value)}/>          
        </div>
          <div>
          Password : <input type="password" name="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>          
        </div>
       <div>
          <input type='submit' name="submit"/>
       </div>

      </form>
      </div>
  )
}

export default Home