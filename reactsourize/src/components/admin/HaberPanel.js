import React from "react";
import './Admin.css'

const HaberPanel = () =>{
    return(
        <div className=" bg-gray-100 rounded-md w-11/12 h-11/12 flex" >
            <div className="flex flex-wrap w-full items-center ">
                <div className="baseDivsContainer">
                <div className='baseDivs'>
                        <div className=" w-full items-center text-center h-full">
                            <div className="w-full h-fit">
                                <h2 className='cardStyles'>
                                    Toplam kullanıcı sayısı
                                </h2>
                            </div>
                            <div className="items-center text-center h-4/6 w-full flex justify-center">
                                <p className='text-2xs text-gray-500'>
                                    <p className="text-4xl text-blue-800">99</p>Kişi kayıt oldu
                                </p>
                            </div>
                        </div>
                    </div>
                    
                </div>
                
            </div>
        </div>
    );
}

export default HaberPanel;