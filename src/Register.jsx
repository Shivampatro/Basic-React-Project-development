import {useState} from 'react'

const Register = () => {
    const initialState = {
    name: "",
    emailid: "",
    password: "",
    mobileno: "",
    workstatus: ""
    }
    const [formData, setFormData] = useState(initialState);

    const changeHandler =(e) =>{
        const {name,value} = e.target;
        setFormData({...formData,[name]:value})
    }

    const onSubmitHandler =(e) => {
        e.preventDefault();
        alert('Form submitted successfully');
        console.log(formData);
    }  
    const resetHandler = () => {
  setFormData(initialState);
};
  return (
    <div>
      <form onSubmit={onSubmitHandler}>
        <div>
            Full Name : <input type="text" name="name" value={formData.name} onChange={changeHandler} required/>
        </div>
        <div>
            Email ID : <input type="email" name="emailid" value={formData.emailid} onChange={changeHandler}/>
        </div>
        <div>
            Password : <input type="password" name="password" value={formData.password} onChange={changeHandler}/>
        </div>
        <div>
            Mobile Number : <input type="number" name="mobileno" value={formData.mobileno} onChange={changeHandler}/>
        </div>
        <div>
            Work Status : <br/>
            Experienced <input type="radio" name="workstatus" value="Experienced" onChange={changeHandler}/>
            Fresher <input type="radio" name="workstatus" value="Fresher" onChange={changeHandler}/>
        </div>
        
            <button type="submit">Submit</button>
           <button type="button" onClick={resetHandler}>
  Clear
</button>
        
      </form>
    </div>
  )
}

export default Register