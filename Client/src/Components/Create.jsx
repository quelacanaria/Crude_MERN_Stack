import React, { useState, useEffect } from "react";
import axios from 'axios'
import { Link } from "react-router-dom";
function Create(){
    // const url = 'http://localhost:3000';
    const url = 'https://crude-mern-stack.vercel.app';
    const [createdMessage, setCreatedMessage] = useState([]);
    const [showDisplay, setShowDisplay] = useState('hidden');
    const [addProducts, setAddProducts] = useState({
        title: '',
        author: '',
        year: ''
    });

    const show = () => {
        setTimeout(() => {
                setShowDisplay('block');
                setTimeout(() => {
                    setShowDisplay('hidden');
                }, 3000);
            }, 0);
    }

    const add = async(event) => {
        event.preventDefault();
        
        try{
            event.preventDefault();
            const response = await axios.post(`${url}/api/books/add`, addProducts);
            console.log(response.data);
            setCreatedMessage(response.data);
            show();
        }catch(error){
            console.log('error -> ', error);
        }finally{
            event.target.reset();
        }
    }
    
    return(
        <>
            <main className="w-full h-screen bg-teal-100 flex justify-center items-center flex-col">
                <section className="w-[98%] h-[500px] bg-white p-[20px] rounded-3xl">  
                        <div className="flex h-[50px]">
                            <h1 className="font-bold text-3xl">Add Books</h1>
                            <Link className="relative ml-auto text-center content-center" to={'/'}><button className="mx-1 w-[70px] h-[40px] border-2-transparent rounded-[10px] font-bold text-white bg-yellow-500 shadow-mine hover:scale-115 active:scale-90 duration-300">Home</button></Link>
                        </div>
                        <form className="w-[300px] h-[400px] justify-self-center self-center bg-blue-100 rounded-2xl shadow-mine grid p-[20px]" onSubmit={add}>
                            <label className="self-start font-bold" htmlFor="">Title:</label>
                            <input className="h-[50px] bg-white shadow-mine hover:scale-110 active:scale-90 duration-300 p-[10px]" name="title" type="text" onChange={event => setAddProducts({...addProducts, title: event.target.value})} required/>
                            <label className="self-start font-bold" htmlFor="">Author:</label>
                            <input className="h-[50px] bg-white shadow-mine hover:scale-110 active:scale-90 duration-300 p-[10px]" name="author" type="text" onChange={event => setAddProducts({...addProducts, author: event.target.value})} required/>
                            <label className="self-start font-bold" htmlFor="">Year Created:</label>
                            <input className="h-[50px] bg-white shadow-mine hover:scale-110 active:scale-90 duration-300 p-[10px] [&::-webkit-inner-spin-button]:hidden" name="year" type="number" inputMode="numeric" min={1000} max={new Date().getFullYear()} onChange={event => setAddProducts({...addProducts, year: event.target.value})} required/>
                            <button className="mx-1 w-[70px] h-[40px] border-2-transparent rounded-[10px] font-bold text-white bg-green-500 shadow-mine hover:scale-115 active:scale-90 duration-300 justify-self-center self-center" >Create</button>
                        </form>
                </section>
            </main>

            <p className={`absolute top-[20px] mx-0 w-[300px] h-[80px] bg-white rounded-xl shadow-mine hover:scale-110 duration-300  text-center content-center text-green-500 font-bold text-[20px] justify-self-center  p-0 ${showDisplay}`}>{createdMessage.message}</p>
        </>
    )
}

export default Create