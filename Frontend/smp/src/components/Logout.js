const Logout =()=>{
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("username");
    sessionStorage.setItem("login",false);
    return <div>
        Logged out
    </div>
}
export default Logout;