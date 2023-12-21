import React from "react";
import './Admin.css'
import ban from '../img/ban.png'
import unban from '../img/unban.png'
import search from '../img/search.png'


const UserPanel = () =>{
    return(
        <div className=" bg-gray-100 rounded-md w-11/12 h-11/12  " >
            <div className="flex justify-center w-full h-1/12">
              <h1 className=" text-2xl text-gray-700">Kullanıcı İşlemleri</h1>
            </div>
            <div className="w-full h-11/12 flex p-5">   
                <div className="w-5/12 h-10/12 bg-gray-200 rounded-lg">
                    <h1 className=" text-center">Kullanıcı Ara</h1>
                    <div class="w-full justify-center flex mt-5">
                    <div class="relative  w-4/6 min-w-[200px] h-10">
                        <input
                        class="peer w-full h-full bg-white text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-1 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                        placeholder="" /><label
                        class="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-800 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">E-mail
                        </label>
                    </div>
                    <button className=" bg-white rounded-lg p-2 ml-4"> <img src={search} style={{ width: '24px', height: '24px' }}></img> </button>
                    </div>  
                </div>
            <div className="w-7/12 flex-col">
                <div className="w-full h-3/6  mb-3 mr-3 ml-3 bg-gray-200 rounded-lg">
                    <div className="w-full h-10/12 bg-gray-200 rounded-lg">
                        <h1 className=" text-center">Kullanıcı Banla</h1>
                        <div className=" w-full justify-center flex mt-5">
                            <div class="w-3/6">
                                <div class="relative w-full min-w-[200px] h-10">
                                <input
                                class="peer w-full h-full bg-white text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-1 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                                placeholder="" /><label
                                class="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-800 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">E-mail
                                </label>
                                </div>
                            </div>
                            <button className=" bg-white rounded-lg p-2 ml-4"> <img src={ban} style={{ width: '24px', height: '24px' }}></img> </button>  
                        </div>
                    </div>
                </div>
                <div className=" w-full h-3/6  m-3 bg-gray-200 rounded-lg">
                <div className="w-full h-10/12 bg-gray-200 rounded-lg">
                    <h1 className=" text-center">Kullanıcının Banını Kaldır </h1>
                    <div className=" w-full justify-center flex mt-5">
                    <div class=" w-3/6">
                            <div class="relative w-full min-w-[200px] h-10">
                                <input
                                class="peer w-full h-full bg-white text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border  border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                                placeholder="" /><label
                                class="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-800 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">E-mail
                                </label>
                            </div>
                        </div>
                        <button className=" bg-white rounded-lg p-2 ml-4"> <img src={unban} style={{ width: '24px', height: '24px' }}></img> </button>
                    </div>
                </div>
                </div>
            </div>
            </div>

        </div>
    );
}

export default UserPanel;