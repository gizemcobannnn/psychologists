import { useState } from 'react';
import app from '../../firebaseConfig.js';
import {getDatabase, ref,get} from "firebase/database";

export default function ReadFirebase() {
  const [psyArr, setPsyArr] = useState([]);

  const fectchFirebaseData = async() =>{
    const db = getDatabase(app);
    const dbRef = ref(db,"/");
    const snapshot = await get(dbRef);
    if(snapshot.exists()){
        setPsyArr(Object.values(snapshot.val()))
    }else{
      alert("No data found in database."); 
    }
  }
  return (
    <div>
        <button onClick={fectchFirebaseData}>Get Data</button>
        <ul>
            {psyArr.map((item,index)=>(
                <li key={index}>
                    {item.name}
                </li>
            ))}        
        </ul>
    </div>
  )
}



