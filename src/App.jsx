import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import ToDoList from './components/ToDoList.jsx'

// function CallName({name}) { //props : property
//   return <h1>Panggil Aku {name} </h1>;
// }

function CallName(props) { //props : property
  return (
    <>
    <h1>Panggil aku {props.name},</h1>
    <p>alamat aku {props.address}</p>
    <p>jenis kelamin {props.gender}</p>
    </>
  );
}

function User({user}){
  return (
    <>
    <h1>Nama {user.name}</h1>
    <p>Phone {user.phone}</p>
    </>
  );
}

function App() {
  // const [count, setCount] = useState(0); //perubah data di dalam component
  // const [name, setName] = useState("");
  // const dataUser = {
  //   name: "Miftahul Huda",
  //   phone: "085779130690",
  // };
  return (
    <>
      {/* <section>
        <h1>Nama : {name}</h1>

        <input type="text" onChange={(e) => setName(e.target.value)}/>
        <button onClick={function(){}}></button>
        <button onClick={()=>setCount(count + 1)}>Tambah</button><br />
        <button onClick={()=>setCount(count - 1)}>Kurang</button>
      </section>
      <CallName name="Huda" address="Jakarta Timur" gender="laki-laki"/>
      <User user={dataUser}/> */}

      <ToDoList/>
    </>
  )
}

export default App
