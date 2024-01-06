import React, { useState, useEffect } from "react";
import './Admin.css'
import info from "../img/info.png"
import save from "../img/save.png"
import del from "../img/delete.png"
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const GundemPanel = () => {
    const [newsHeadlines, setNewsHeadlines] = useState([]);

        useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8080/admin/getTopics');
                const data = await response.json();
                setNewsHeadlines(data);
            } catch (error) {
                console.error('Error fetching news headlines:', error);
            }
        };

        fetchData(); // Call the function to fetch data when the component mounts
    }, []); // Empty dependency array ensures the effect runs only once

    const scrapeNews = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/news/top-headlines');
            const data = await response.json();
            setNewsHeadlines(data.articles); // Assuming the response has an "articles" property
        } catch (error) {
            console.error('Error fetching news headlines:', error);
        }
    };
   const deleteTopic = async (topicId) => {
           try {
               const response = await fetch(`http://localhost:8080/admin/deleteTopic/${topicId}`, {
                   method: 'DELETE',
                   headers: {
                       'Content-Type': 'application/json',
                   },
               });

               if (response.ok) {
                   setNewsHeadlines((prevHeadlines) => prevHeadlines.filter((headline) => headline.id !== topicId));
                   toast.success('Topic deleted successfully!');
               } else {
                   console.error('Error deleting topic:', response.statusText);
                   toast.error('Error deleting topic');
               }
           } catch (error) {
               console.error('Error deleting topic:', error);
               toast.error('Error deleting topic');
           }
       };

    return (

        <div className="bg-gray-100 rounded-md w-11/12 h-gundem flex">
            <div className="flex flex-wrap w-full items-center justify-center">
                <h1 className="text-2xl text-gray-700">Gündem İşlemleri</h1>
                <div className="justify-center items-center w-11/12 rounded-md h-1/6 flex bg-gray-200">
                    <div className="w-fit h-fit pr-2">
                        <button onClick={scrapeNews} className="text-sm font-medium flex items-center w-full h-full p-2 bg-adminmenu hover:bg-slate-800 rounded-lg text-gray-200 hover:text-white hover:shadow-2xl hover:shadow-adminmenu">
                            <img  src={save} className='menuIcons' style={{ width: '20px', height: '20px' }} alt="Save"></img>
                            Gündemleri scrape et
                        </button>
                    </div>
                    <div className="flex items-center">
                        <img src={info} className='menuIcons' style={{ width: '15px', height: '15px' }} alt="Info"></img>
                        <p className="text-gray-700 text-2xs font-light">Scrape işlemlerini yapan ve veritabanına kaydeden controller'ı çalıştırır</p>
                    </div>
                </div>
                <div className="w-full h-4/6 items-center justify-center flex">
                    <div className="rounded-md w-11/12 h-11/12 bg-gray-200 overflow-auto">
                        <div className="w-full h-fit">
                            <ul>
                                {newsHeadlines.map((headline) => (
                                    <li key={headline.id} className="items-center text-center rounded-md bg-gray-150 m-1 p-1 text-gray-700 flex text-center items-center">
                                        <div className="border-b border-gray-700 flex pb-2 text-center items-center w-full">
                                            <p className="pr-4">{headline.title}</p>
                                            <button
                                                className="text-sm font-medium flex items-center w-fit h-fit p-2 bg-red-700 hover:bg-red-600 rounded-lg text-gray-200 hover:text-white hover:shadow-2xl hover:shadow-adminmenu"
                                                onClick={() => deleteTopic(headline.id)}
                                            >
                                                <img src={del} className="mr-2" style={{ width: '13px', height: '13px' }} alt="Delete"></img>
                                                Sil
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default GundemPanel;
