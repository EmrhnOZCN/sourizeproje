import React, { useState, useEffect } from "react";
import './Admin.css';
import 'react-toastify/dist/ReactToastify.css';

const SupportPanel = () => {
    const [supportMessage, setSupportMessage] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8080/admin/getSupportMessage');
                const data = await response.json();
                setSupportMessage(data);
            } catch (error) {
                console.error('Error fetching support messages:', error);
            }
        };

        fetchData();
    }, []);

    const [openMessages, setOpenMessages] = useState([]);

    const toggleMessage = (index,messageId,isReads) => {
        setOpenMessages((prevOpenMessages) => {

            console.log(isReads);
            if(!isReads){
                
                markMessageAsRead(messageId);}
           
            const updatedOpenMessages = [...prevOpenMessages];
            updatedOpenMessages[index] = !updatedOpenMessages[index];
            return updatedOpenMessages;
        });
    };
    const markMessageAsRead = async (messageId) => {
        // API isteği ile mesajı işaretlenmiş olarak güncelle
        try {
            await fetch(`http://localhost:8080/api/messages/mark-as-read/${messageId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            // Mesajı işaretlendi olarak güncelle
            setSupportMessage((prevSupportMessage) => {
                const updatedMessages = prevSupportMessage.map((message) =>
                    message.id === messageId ? { ...message, isRead: true } : message
                );
                return updatedMessages;
            });
        } catch (error) {
            console.error('Error marking message as read:', error);
        }
    };

    return (
        <div className="bg-gray-100 rounded-md w-11/12 h-11/12 flex">
            <div className="flex flex-wrap w-full items-center justify-center">
                <h1 className="text-2xl text-gray-700">Destek Mesajları</h1>
                <div className="w-full h-11/12 items-center justify-center flex">
                    <div className="rounded-md w-11/12 h-11/12 bg-gray-200 overflow-auto">
                        <div className="w-full h-fit">
                            <ul>
                                {supportMessage.map((message, index) => (
                                    <li key={index} className={`items-center rounded-md ${message.isRead ? 'bg-gray-150' : 'bg-yellow-200'} m-1 p-1 text-gray-700 flex`}>
                                        <div className="flex pb-2 items-center w-full">
                                            <div className='w-full bg-gray-50 rounded-md'>
                                                <button className='w-full' onClick={() => toggleMessage(index,message.id,message.isRead)}>
                                                    <div id='baslik' className='flex items-center' >
                                                        <p className={`w-fit m-2 p-1 text-sm font-semibold ${message.isRead ? 'bg-blue-950 text-white' : 'bg-yellow-500 text-black'} rounded-md`}>{message.firstName + ' ' + message.lastName}</p>
                                                        <p className='text-2xs m-1 font-bold'>kişisinden "</p>
                                                        <p className='text-2xs m-1 font-bold'>{message.subject}</p>
                                                        <p className='text-2xs m-1 font-bold'>" konusunda bir mesaj</p>
                                                        <p className='text-2xs m-1 font-normal font-mono'>at {message.timeStamp}</p>
                                                    </div>
                                                </button>
                                                {openMessages[index] && (
                                                    <p id="message" className='text-base m-1 p-2 font-normal text-adminmenu bg-gray-200 rounded-md' >
                                                        {message.content}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SupportPanel;
