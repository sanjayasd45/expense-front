import "./Navbar.css";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaRegCircleUser } from "react-icons/fa6";
import { AiOutlineLogout } from "react-icons/ai";
import { RiLoginCircleLine } from "react-icons/ri";
const baseUrl = import.meta.env.VITE_SERVER_BASE_URL;
const clientId = import.meta.env.VITE_SERVER_CLIENTID;
const redirectUri = import.meta.env.VITE_SERVER_REDIRECTURI;

export default function Navbar() {
  const navigate = useNavigate()
  const path = useLocation()
  const user = useSelector(state => state.user);
  console.log(user);
  const handleClick = () => {
    console.log("path", path.pathname);
    
    if(path.pathname === "/dashboard"){
      navigate("/")
    }else{
      navigate("/dashboard")
    }
  }
  
  

  function handleAuth() {
    const scope = "profile email";
    const authUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}`;
  
    window.open(authUrl, "_self");
  }
  function logOut() {
    window.open(`${baseUrl}/auth/logout`, "_self"); 
  }
  return (
    <div className="navbar">
      <div>
        {user.picture ? <img src={user.picture}alt="profile pic" onClick={handleClick}></img> :  <FaRegCircleUser />}
        <NavLink>
          {user.name != "" || undefined ? (
            <p onClick={logOut}><AiOutlineLogout /></p>
          ) : (
            <p onClick={handleAuth}>
              <RiLoginCircleLine />
            </p>
          )}
        </NavLink>
      </div>
    </div>
  );
}
