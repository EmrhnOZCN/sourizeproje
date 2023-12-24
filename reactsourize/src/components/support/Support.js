import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../base/base.css';

const Support = () => {
    // Use state to capture input values
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [userId, setUserId] = useState('');
    useEffect(() => {
        // Fetch userId from localStorage when the component mounts
        const storedUserId = localStorage.getItem('userId');
        if (storedUserId) {
            setUserId(storedUserId);
        }
    }, []);
    const handleSupportSubmit = async () => {
        try {
            // Make a POST request to the specified endpoint
            const response = await fetch('http://localhost:8080/api/messages/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    subject,
                    content: message,
                    senderId: parseInt(userId), // Assuming userId is a number
                    recipientId: 3, // You can replace 0 with the actual recipientId
                }),
            });

            if (response.ok) {
                // Log userId, subject, and message to the console
                console.log('UserId:', userId);
                console.log('Konu:', subject);
                console.log('Mesaj:', message);

                // Show success toast after successful submission
                toast.success('Destek mesajınız başarıyla gönderildi!', {
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });

                // Close the support modal or perform any other necessary actions
            } else {
                // Handle error scenarios
                console.error('Error:', response.statusText);
                toast.error('Bir hata oluştu. Lütfen tekrar deneyin.');
            }
        } catch (error) {
            // Handle network or other errors
            console.error('Error:', error.message);
            toast.error('Bir hata oluştu. Lütfen tekrar deneyin.');
        }
    };
    return (
        <div className="rounded-md w-11/12 h-11/12 flex">
            <div className="flex flex-wrap w-full items-center justify-center">
                <h1 className="text-2xl text-gray-700">Destek Mesajı Gönder</h1>
                <div className="w-full h-11/12 items-center justify-center flex bg-gray-50">
                    <div className="rounded-md w-11/12 h-11/12  overflow-auto">
                        <div className="w-full h-full">
                            <div className="w-full h-2/6  flex">
                                <div className="flex w-full h-full mt-4 ml-2  items-center">
                                    <p className="mr-4">Konu</p>
                                    <div className="relative w-full">
                                        <input
                                            type="text"
                                            className="better-inputs peer w-9/12 h-2/6 bg-white text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border   text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                                            placeholder="Konunuzu girin..."
                                            value={subject}
                                            onChange={(e) => setSubject(e.target.value)} // Update state on input change
                                        />
                                        <label
                                            className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px]  peer-focus:after:!border-gray-900">
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full h-3/6 ">
                                <div className="flex w-full h-full  items-start pt-4 pl-2">
                                    <p className="">Mesaj</p>
                                    <div className="relative w-full h-full ml-3">
                                        <textarea
                                            type="text"
                                            className="better-inputs long-inputs peer w-full h-5/6 bg-white text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border  text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                                            placeholder="Mesajınızı girin..."
                                            style={{ whiteSpace: 'pre-wrap' }}
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)} // Update state on input change
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='w-full h-1/6  flex items-end justify-end'>
                                <button className='buttons w-fit h-fit' onClick={handleSupportSubmit}>
                                    Gönder
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Support;
