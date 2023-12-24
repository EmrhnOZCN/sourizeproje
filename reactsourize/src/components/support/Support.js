import {  ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../base/base.css'

const Support = () => {
    return (
        <div className=" rounded-md w-11/12 h-11/12 flex">
            <div className="flex flex-wrap w-full items-center justify-center">
                <h1 className="text-2xl text-gray-700">Destek Mesajı Gönder</h1>
                <div className="w-full h-11/12 items-center justify-center flex bg-gray-50">
                    <div className="rounded-md w-11/12 h-11/12  overflow-auto">
                        <div className=" w-full h-full">
                            <div className=" w-full h-2/6  flex">
                                <div className="flex w-full h-full mt-4 ml-2  items-center">
                                    <p className=" mr-4">Konu</p>
                                    <div class="relative w-full">
                                    <input
                                    type="text"
                                    class="better-inputs peer w-9/12 h-2/6 bg-white text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border   text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                                    placeholder="Konunuzu girin..." /><label
                                    class="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px]  peer-focus:after:!border-gray-900">
                                    </label>
                                </div>
                                </div>
                            </div>
                            <div className=" w-full h-3/6 ">
                                <div className="flex w-full h-full  items-start pt-4 pl-2">
                                    <p className="">Mesaj</p>
                                    <div class="relative w-full h-full ml-3">
                                    <textarea
                                        type="text"
                                        className="better-inputs long-inputs peer w-full h-5/6 bg-white text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border  text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                                        placeholder="Mesajınızı girin..."
                                        style={{ whiteSpace: 'pre-wrap' }}
                                    />
                                </div>
                            </div>
                            <div className=' w-full h-1/6  flex items-end justify-end'>
                                <button className='buttons w-fit h-fit'>Gönder</button>   
                            </div>
                                 
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
