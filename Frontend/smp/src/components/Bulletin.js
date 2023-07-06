import React, { useEffect, useState } from "react";
import ApiService from "./services/ApiService";
import Card from 'react-bootstrap/Card';
const Bulletin=()=>{
  const api=new ApiService();
  const [bulletin, setBulletin]=useState([]);
  useEffect(()=>{
     getBulletins();
  },[]);
  const getBulletins=()=>{
    api.getBulletins().then((response)=>{
      console.log(response.data);
      setBulletin(response.data);
    })
    .catch((error)=>{
      console.log(`Error fetching bulletin`,error);
    })
  }
  return(
    
    <Card style={{ width: '20rem' }}>
      <Card.Body>
        <Card.Title>Bulletin Board</Card.Title>
        {bulletin.map((bulletin) => (
          <div key={bulletin.id}>
        <Card.Subtitle className="mb-2 text-muted">{bulletin.name}</Card.Subtitle>
        <Card.Text>
          {bulletin.description}
        </Card.Text>
        <Card.Link href="#">Card Link</Card.Link>
        </div>
        ))}
      </Card.Body>
    </Card>
  )
}
export default Bulletin;