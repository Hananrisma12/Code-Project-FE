import React, { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios';

function App() {
  const [users,setUsers] = useState([]);
  const [name,setName] = useState('');
  const [kamar,setKamar] = useState('');
  const [diagnosa,setDiganosa] = useState('');
  const [dokter,setDokter] = userState('');
  const [nik, setNik] = userState('');
  const [tanggal, setTanggal] = userState('');

  const [userEdit, setUser] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(()=>{
    getAllData();
  },[]);
   // display
  async function getAllData(){
    const respone = await axios.get(API_URL);
    console.log(respone.data);
    setUsers(respone.data);
  }

  //tambah data pasien
  async function addData(e){
    e.preventDefault();
    if(!name || !kamar || !diagnosa || !dokter || !nik || !tanggal){
      return;
    }
    const respone = await axios.post(API_URL,{name, kamar, diagnosa, dokter, nik, tanggal});
    setName('');
    setKamar('');
    setDiganosa('');
    setDokter('');
    setNik('');
    setTanggal('');
    getAllData();
  }
//edit data pasien
function editData(data){
  setUserEdit(data);
  setName(data.name);
  setKamar(data.kamar);
  setDiganosa(data.diagnosa);
  setDokter(data.dokter);
  setNik(data.nik);
  setTanggal(data.tanggal);
  getAllData();
}
//Update data pasien
 async function updateData(e){
    e.preventDefault();
    if(!name || !kamar || !diagnosa || !dokter || !nik || !tanggal){
      return;
    }
    const respone = await axios.put(API_URL+"/"+userEdit.id,{name, kamar, diagnosa, dokter, nik, tanggal});
    setName('');
    setKamar('');
    setDiganosa('');
    setDokter('');
    setNik('');
    setTanggal('');
    getAllData();
    setUserEdit(null);
  }
  //handleClick
  async function handleClick(e){
    e.preventDefault();
    if(userEdit){
      await updateData();
    }else{
      await addData();
    }
  }
  //delete data
  async function deleteData(id) {
    const respone = await axios.delete(API_URL+"/"+id);
    getAllData();
  }

  return (
    <div className='wrapper'>
      <div className='header'>
        <h3>{userEdit?'Edit Pasien':'Tambah Pasien'}</h3>
        <form className='input-box' type='submit' onSubmit={handleClick}>
          <input type='text' placeholder='Nama' value={name} onChange={(e)=>setName(e.target.value)} />
          <input type='text' placeholder='Kamar' value={kamar} onChange={(e)=>setKamar(e.target.value)}/>
          <input type='text' placeholder='Diagnosa' value={diagnosa} onChange={(e)=>setDiagnosa(e.target.value)}/>
          <input type='text' placeholder='Dokter' value={dokter} onChange={(e)=>setDokter(e.target.value)}/>
          <input type='text' placeholder='Nik' value={nik} onChange={(e)=>setNik(e.target.value)}/>
          <input type='text' placeholder='Tanggal' value={tanggal} onChange={(e)=>setTanggal(e.target.value)}/>
          <button type='submit'>{userEdit?'Update Pasien':'Tambah Data Pasien'}</button>
        </form>
      </div>
      <div className='data-pengguna'>
      <h3>Data Pengguna</h3>
          <ul>
            {
              users.map((user)=>(
            <li>
              <div>
                {user.name} <span className='Kamar'>
                ({user.kamar})</span>
              </div>
              <div>
                <a href='#' className='edit' onClick={()=>editData(user)}
                >Edit</a> - <a href='#' className='delete' onClick={()=>deleteData(user.id)}>Delete</a>
              </div>
            </li>
              ))
            }
            
          </ul>
      </div>
     </div>
  )
}

export default App