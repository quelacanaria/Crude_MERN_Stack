import React, {useState, useEffect} from "react";
import axios from 'axios'
import { Link, useParams } from "react-router-dom";

function Home(){
    const [deletedMessage, setDeletedMessage] = useState([]);
    const [showDisplay, setShowDisplay] = useState('hidden');
    const [delIndex, setDelIndex] = useState(null);
    const [books, getBooks] = useState([]);
    const [del, setDel] = useState([]);
    const [isChange, setIsChange] = useState(false);

    const show = () => {
        setTimeout(() => {
                setShowDisplay('block');
                setTimeout(() => {
                    setShowDisplay('hidden');
                }, 3000);
            }, 0);
    }

    const displayBooks = async() => {
        try{
            const response = await axios.get('http://localhost:3000/api/books/get');
            const getDisplay = response.data.data;
            console.log('response -> ', response.data.data);
            getBooks(getDisplay);
        }catch(error){
            console.log('error -> ', error.response.data)
        }
    }
    
    const deletingProd = async(index) => {
        try{
            setDelIndex(index);
            const deleted = await axios.delete('http://localhost:3000/api/books/delete/' + del);
            console.log(deleted.data);
            setDeletedMessage(deleted.data)
            setIsChange(!isChange);
        }catch(error){
            console.log('error -> ', error);
        }
    }
    useEffect(() => {
        displayBooks();
    }, [isChange])
    return(
        <>
            
            <main className="w-full h-screen bg-teal-100 flex justify-center items-center flex-col">
                <section className="w-[98%] h-[500px] bg-white p-[20px] rounded-3xl">    
                    <div className="flex h-[50px]">
                        <h1 className="font-bold text-3xl">List of Books</h1>
                        <Link to={'/create'} className="relative ml-auto text-center content-center" ><button className="mx-1 w-[70px] h-[40px] border-2-transparent rounded-[10px] font-bold text-white bg-green-500 shadow-mine hover:scale-115 active:scale-90 duration-300" >Create</button></Link>
                    </div>
                    <section className="w-full h-[376px] bg-white p-2 overflow-auto">
                        <table className="w-full h-[100px">
                            <thead className="p-100">
                                <tr className="bg-amber-200">
                                    <td className="border-1 text-center font-bold h-10">ID</td> 
                                    <td className="border-1 text-center font-bold h-10">Title</td>
                                    <td className="border-1 text-center font-bold h-10">Author</td>
                                    <td className="border-1 text-center font-bold h-10">Year</td>
                                    <td className="border-1 text-center font-bold h-10">Action</td>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    books.map((book, index) => (
                                        <tr key={index} className="bg-white hover:bg-gray-200">
                                            <td className="border-1 text-center h-[50px] p-[2px]" >{index+1}</td>
                                            <td className="border-1 text-center h-[50px] p-[2px]" >{book.title}</td>
                                            <td className="border-1 text-center h-[50px] p-[2px]" >{book.author}</td>
                                            <td className="border-1 text-center h-[50px] p-[2px]" >{book.year}</td>
                                            <td className="border-1 text-center h-10 w-[300px] p-[2px] mx-auto" >
                                                <Link to={`/read/${book._id}`} className="mx-[5px]"><button className=" w-[70px] h-[40px] border-2-transparent rounded-lg font-bold text-white bg-yellow-500 shadow-mine hover:scale-115 active:scale-90 duration-300">Read</button></Link>
                                                <Link to={`/update/${book._id}`} className="mx-[5px]"><button className=" w-[70px] h-[40px] border-2-transparent rounded-lg font-bold text-white bg-blue-500 shadow-mine hover:scale-115 active:scale-90 duration-300">Update</button></Link>
                                                <button className="mx-[5px] w-[70px] h-[40px] border-2-transparent rounded-lg font-bold text-white bg-red-500 shadow-mine hover:scale-115 active:scale-90 duration-300" onClick={(event) =>  {setDelIndex(index); setDel(book._id)}}>Delete</button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </section>
                </section>
            </main>
            {delIndex !== null && (
            <main className="w-full h-screen fixed top-[0px] left-[0px] bg-me-100 flex justify-center items-center">
                <section className="w-[300px] h-[110px] p-[10px] bg-white rounded-2xl overflow-hidden shadow-mine hover:scale-105 duration-300">
                    <strong>Are you sure you want to delete this Book?</strong><br />
                    <button className="mx-[5px] w-[70px] h-[40px] border-2-transparent rounded-lg font-bold text-white bg-red-500 shadow-mine hover:scale-115 active:scale-90 duration-300" onClick={() => {deletingProd(null); show()}}>Delete</button>
                    <button className="mx-[5px] w-[70px] h-[40px] border-2-transparent rounded-lg font-bold text-white bg-yellow-500 shadow-mine hover:scale-115 active:scale-90 duration-300" onClick={() => setDelIndex(null)}>Back</button>
                </section>
            </main>
            )}
            <p className={`absolute top-[20px] mx-0 w-[300px] h-[80px] bg-white rounded-xl shadow-mine hover:scale-110 duration-300  text-center content-center text-green-500 font-bold text-[20px] justify-self-center  p-0 ${showDisplay}`}>{deletedMessage.message}</p>
        </>
    )
}

export default Home