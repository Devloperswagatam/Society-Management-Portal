import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { BsFillSunFill, BsMoonStarsFill } from 'react-icons/bs';

function DarkMode() {
    const [theme, setTheme] = useState("light-theme");

  const toggleTheme = () => {
    theme === "dark-theme" ? setTheme("light-theme") : setTheme("dark-theme");
  };

  useEffect(()=>{
    document.body.className = theme;
  },[theme])
  return (
    <div className="toggle" onClick={toggleTheme} style={{cursor:"pointer", border:'1px white solid', padding:'0.5rem',borderRadius:'20%'}}>
      {theme === "light-theme" ? <BsMoonStarsFill style={{fontSize:'20px', color:"#dcdde1"}}/> : <BsFillSunFill style={{fontSize:'20px',color:'#e1b12c'}}/>}
    </div>
  )
}

export default DarkMode;