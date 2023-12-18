import React from "react";
import './Admin.css'

const UserPanel = () =>{
    return(
        <div className=" bg-gray-100 rounded-md w-11/12 h-11/12  " >
            <div className="flex justify-center w-full h-1/12">
              <h1 className=" text-2xl text-gray-700">Kullanıcı İşlemleri</h1>
            </div>
            <div className="w-full h-11/12 flex p-5">   
                <div className="w-5/12 h-10/12 bg-gray-200 rounded-lg">
                    <h1 className=" text-center">Kullanıcı Ara</h1>
                    <form className=" justify-center">   
                        <label for="default-search" class="mb-2 text-sm font-medium text-gray-600 sr-only dark:text-white">Search</label>
                        <div class="relative">
                            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            </div>
                            <div className=" ml-2 mt-5">
                                <input type="search" id="default-search" class="block w-10/12 h-1/12 p-4 ps-10 text-sm  border  rounded-lg bg-gray-700 border-gray-600 placeholder-gray-400 text-white " placeholder="Search Mockups, Logos..." required></input>
                                <button type="submit" class=" w-1.5/12 h-3/6 text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 rounded-md text-xs ">Search</button>
                            </div>
                        </div>
                    </form>
                </div>
            <div className="w-7/12 flex-col">
                <div className="w-full h-3/6  mb-3 mr-3 ml-3 bg-gray-200 rounded-lg">
                    <div className="w-full h-10/12 bg-gray-200 rounded-lg">
                        <h1 className=" text-center">Kullanıcı Banla</h1>
                        <div className=" w-8/12">
                            <form className=" justify-center">   
                                <label for="default-search" class="mb-2 text-sm font-medium text-gray-600 sr-only dark:text-white">Search</label>
                                <div class="relative">
                                    <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                    </div>
                                    <div className=" justify-center items-center">
                                        <input type="search" id="default-search" class="block w-10/12 h-1/12 p-4 ps-10 text-sm  border  rounded-lg bg-gray-700 border-gray-600 placeholder-gray-400 text-white " placeholder="Search Mockups, Logos..." required></input>
                                        <button type="submit" class=" w-1.5/12 h-3/6 text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 rounded-md text-xs ">Search</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className=" w-full h-3/6  m-3 bg-gray-200 rounded-lg">
                <div className="w-full h-10/12 bg-gray-200 rounded-lg">
                    <h1 className=" text-center">Kullanıcınun </h1>
                    <form className=" justify-center">
                        <label for="default-search" class="mb-2 text-sm font-medium text-gray-600 sr-only dark:text-white">Search</label>
                        <div class="relative">
                            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            </div>
                            <div className=" ml-2 mt-5">
                                <input type="search" id="default-search" class="block w-10/12 h-1/12 p-4 ps-10 text-sm  border  rounded-lg bg-gray-700 border-gray-600 placeholder-gray-400 text-white " placeholder="Search Mockups, Logos..." required></input>
                                <button type="submit" class=" w-1.5/12 h-3/6 text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 rounded-md text-xs ">Search</button>
                            </div>
                        </div>
                    </form>
                </div>
                </div>
            </div>
            </div>

        </div>
    );
}

export default UserPanel;