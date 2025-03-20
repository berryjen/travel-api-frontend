import { useState } from "react";

const LogoutButton = ({ setUserName }) => {
    const handleOnClick = () => {
        setUserName('')
    }
    return (
        <div className="logout-button">
             <button onClick={handleOnClick} type="submit">Logout

             </button>
        </div>
    )   
}
export default LogoutButton;