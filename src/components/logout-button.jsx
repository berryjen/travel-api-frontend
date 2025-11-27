import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LogoutButton = ({ setUserName }) => {
    const navigate = useNavigate();
    const handleOnClick = () => {
        setUserName('')
        navigate('/login');
    }
    return (
        <div className="logout-button">
            <button onClick={handleOnClick} type="submit">Logout

            </button>
        </div>
    )
}
export default LogoutButton;