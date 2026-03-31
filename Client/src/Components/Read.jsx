import React, { useState } from "react";
import axios from 'axios'
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";

function Read(){
    // const url = 'http://localhost:3000'
    const url = 'https://crude-mern-stack.vercel.app';
    const [data, setData] = useState([]);
    const {id} = useParams();
    const getSingleProduct = async() => {
     try{
            const response = await axios.get(`${url}/api/books/get/` + id);
            console.log('response -> ', response.data.data);
            setData(response.data.data)
        }catch(error){
            console.log('error -> ', error); 
        }
    }

    useEffect(() => {
        getSingleProduct();
    }, [])

    return(
        <>
            <main className="w-full h-screen flex justify-center items-center bg-teal-100">
                <div className="w-[300px] h-[170px] p-[10px] bg-white rounded-2xl overflow-hidden shadow-mine hover:scale-105 duration-300">
                    <div className="flex h-12">
                        <div className="flex h-12"></div>
                        <h1 className="font-bold text-3xl">Details</h1>
                    </div>
                    <section className="w-full h-fit p-2">
                        <strong>Title: {data.title}</strong><br /> 
                        <strong>Author: {data.author}</strong><br />
                        <strong>Year: {data.year}</strong><br />
                    </section>
                    <Link to={`/update/${data._id}`}><button className="mx-[5px] w-[70px] h-[40px] border-2-transparent rounded-[10px] font-bold text-white bg-blue-500 shadow-mine hover:scale-115 active:scale-90 duration-300">Update</button></Link>
                    <Link to={`/`}><button className="mx-[5px] w-[70px] h-[40px] border-2-transparent rounded-[10px] font-bold text-white bg-yellow-500 shadow-mine hover:scale-115 active:scale-90 duration-300">Home</button></Link>
                </div>
            </main>
        </>
    )
}

export default Read