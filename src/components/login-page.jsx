import { useState } from "react";

const LoginPage = ({setUserName}) => {
  // console.log(userName, setUserName);
    const [storeUserName,setStoreUserName] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        setUserName(storeUserName);
    }
  return <div>
    <form onSubmit={handleSubmit}>
        <label htmlFor="userName">Enter your name:</label>
        <input type="text" id="userName" value={storeUserName} onChange={(e) => setStoreUserName(e.target.value)} />
        <button onClick={handleSubmit} type="submit">Login</button>
    </form>
   
  </div>;

};

export default LoginPage;
// TODO: implement log out button