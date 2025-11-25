import React, { useState,useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from 'axios'
function Update(){
    const [updatedMessage, setUpdatedMessage] = useState([]);
    const [showDisplay, setShowDisplay] = useState('hidden');
    const navigate = useNavigate();
    const { id } = useParams();
    const [update, setUpdate] = useState({
        title: '',
        author: '',
        year: ''
    })

    const show = () => {
        setTimeout(() => {
                setShowDisplay('block');
                setTimeout(() => {
                    setShowDisplay('hidden');
                }, 3000);
            }, 0);
    }
    
    const updated = async() => {
        
        try{
            const response = await axios.get('http://localhost:3000/api/books/get/' + id);
            console.log('response -> ', response.data.data)
            setUpdate(response.data.data)
        }catch(error){
            console.log('error -> ', error);
        }
    }
    
    const updatedSubmit = async(event) => {
        try{
            event.preventDefault();
            const updating = await axios.put(`http://localhost:3000/api/books/update/`+id, update);
            console.log('response -> ', updating.data);
            setUpdatedMessage(updating.data);
            // navigate('/');
        }catch(error){
            console.log('error -> ', error);
        }
    }

    useEffect(() => {
        updated();
    }, [])

    return(
        <>
            <main className="w-full h-screen bg-teal-100 flex justify-center items-center flex-col">
                <section className="w-[98%] h-[500px] bg-white p-[20px] rounded-3xl">    
                    <div className="flex h-[50px]">
                            <h1 className="font-bold text-3xl">Update Books</h1>
                            <Link className="relative ml-auto text-center content-center" to={'/'}><button className="mx-1 w-[70px] h-[40px] border-2-transparent rounded-[10px] font-bold text-white bg-yellow-500 shadow-mine hover:scale-115 active:scale-90 duration-300">Home</button></Link>
                    </div>
                    <form className="w-[300px] h-[400px] justify-self-center self-center bg-blue-100 rounded-2xl shadow-mine grid p-[20px]" onSubmit={updatedSubmit}>
                        <label className="self-start font-bold" htmlFor="">Title:</label>
                        <input className="h-[50px] bg-white shadow-mine hover:scale-110 active:scale-90 duration-300 p-[10px]" name="title" type="text" value={update.title} onChange={event => setUpdate({...update, title: event.target.value})} required/>
                        <label className="self-start font-bold" htmlFor="">Author:</label>
                        <input className="h-[50px] bg-white shadow-mine hover:scale-110 active:scale-90 duration-300 p-[10px]" name="author" type="text" value={update.author} onChange={event => setUpdate({...update, author: event.target.value})} required/>
                        <label className="self-start font-bold" htmlFor="">Year Created:</label>
                        <input className="h-[50px] bg-white shadow-mine hover:scale-110 active:scale-90 duration-300 p-[10px] [&::-webkit-inner-spin-button]:hidden" inputMode="numeric" name="year" type="number" value={update.year} onChange={event => setUpdate({...update, year: event.target.value})} required/>
                        <button className="mx-1 w-[70px] h-[40px] border-2-transparent rounded-[10px] font-bold text-white bg-blue-500 shadow-mine hover:scale-115 active:scale-90 duration-300 justify-self-center self-center" onClick={() => show()}>Update</button>
                    </form>
                </section>
            </main>
            <p className={`absolute top-[20px] mx-0 w-[300px] h-[80px] bg-white rounded-xl shadow-mine hover:scale-110 duration-300  text-center content-center text-green-500 font-bold text-[20px] justify-self-center  p-0 ${showDisplay}`}>{updatedMessage.message}</p>
        </>
    )
}

export default Update