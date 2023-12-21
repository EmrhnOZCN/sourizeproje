import React, { useEffect, useState } from "react";
import './Admin.css'
import axios from "axios";
const AdminBase = () =>{
    const [totalUserCount, setTotalUserCount] = useState(null);
    const [premiumUserCount, setPremiumUserCount] = useState(null);
    const [totalScrapeCount, setTotalScrapeCount] = useState(null);
    const [totalSummaryClickCount, setTotalSummaryClickCount] = useState(null);
    const [totalLikeCount, setTotalLikeCount] = useState(null);
    const [totalCommentCount, setTotalCommentCount] = useState(null);
    const [totalSummaryCount, setTotalSummaryCount] = useState(null);

    useEffect(() => {
           // Fetch the total user count
           axios.get('http://localhost:8080/admin/getTotalUserCount')
               .then(response => {
                   // Assuming the response structure is like { totalUserCount: 99 }
                   setTotalUserCount(response.data);
               })
               .catch(error => {
                   console.error('Error fetching total user count:', error);
               });

           // Fetch the premium user count
           axios.get('http://localhost:8080/admin/getTotalUserRolePremiumCount')
               .then(response => {
                   // Assuming the response structure is like { premiumUserCount: 50 }
                   setPremiumUserCount(response.data);
               })
               .catch(error => {
                   console.error('Error fetching premium user count:', error);
               });

           // Fetch the total scrape count
           axios.get('http://localhost:8080/admin/getScrapeCount')
               .then(response => {
                   // Assuming the response structure is like { totalScrapeCount: 75 }
                   setTotalScrapeCount(response.data);
               })
               .catch(error => {
                   console.error('Error fetching total scrape count:', error);
               });


         axios.get('http://localhost:8080/admin/getSummaryClickCount')
                     .then(response => {

                         setTotalSummaryClickCount(response.data);
                     })
                     .catch(error => {
                         console.error('Error fetching total summary click count:', error);
                     });



            // Fetch the total like count
                   axios.get('http://localhost:8080/admin/getTotalLikeCount')
                       .then(response => {
                           // Assuming the response structure is like { totalLikeCount: 30 }
                           setTotalLikeCount(response.data);
                       })
                       .catch(error => {
                           console.error('Error fetching total like count:', error);
                       });

                        axios.get('http://localhost:8080/admin/getTotalCommentCount')
                                   .then(response => {
                                       // Assuming the response structure is like { totalCommentCount: 20 }
                                       setTotalCommentCount(response.data);
                                   })
                                   .catch(error => {
                                       console.error('Error fetching total comment count:', error);
                                   });


                axios.get('http://localhost:8080/admin/getSummaryCount')
                            .then(response => {
                                // Assuming the response structure is like { totalSummaryCount: 10 }
                                setTotalSummaryCount(response.data);
                            })
                            .catch(error => {
                                console.error('Error fetching total summary count:', error);
                            });
       }, []);


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
                                    <p className="text-4xl text-blue-800">{totalUserCount}</p>Kişi kayıt oldu
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className='baseDivs'>
                        <div className=" w-full items-center text-center h-full">
                            <div className="w-full h-fit">
                                <h2 className='cardStyles'>
                                    Toplam gelir
                                </h2>
                            </div>
                            <div className="items-center text-center h-4/6 w-full flex justify-center">
                                <p className='text-2xs text-gray-500'>
                                    <p className="text-4xl text-blue-800">{premiumUserCount*10}$</p>Premium üyelerden gelen toplam gelir
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className='baseDivs'>
                        <div className=" w-full items-center text-center h-full">
                            <div className="w-full h-fit">
                                <h2 className='cardStyles'>
                                    Premium üye sayısı
                                </h2>
                            </div>
                            <div className="items-center text-center h-4/6 w-full flex justify-center">
                                <p className='text-2xs text-gray-500'>
                                    <p className="text-4xl text-blue-800">{premiumUserCount}</p>Kişi premium üyelik satın aldı
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="baseDivsContainer">
                    <div className='baseDivs'>
                        <div className=" w-full items-center text-center h-full">
                            <div className="w-full h-fit">
                                <h2 className='cardStyles'>
                                    Scrape edilen haber sayısı
                                </h2>
                            </div>
                            <div className="items-center text-center h-4/6 w-full flex justify-center">
                                <p className='text-2xs text-gray-500'>
                                  <p className="text-4xl text-blue-800">{totalScrapeCount}</p>haber scrape edilip veritabanına kaydedildi
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className='baseDivs'>
                        <div className=" w-full items-center text-center h-full">
                            <div className="w-full h-fit">
                                <h2 className='cardStyles'>
                                    Özetlenen haber sayısı
                                </h2>
                            </div>
                            <div className="items-center text-center h-4/6 w-full flex justify-center">
                                <p className='text-2xs text-gray-500'>
                                    <p className="text-4xl text-blue-800">{totalSummaryCount}</p>Haber özetlendi
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className='baseDivs'>
                        <div className=" w-full items-center text-center h-full">
                            <div className="w-full h-fit">
                                <h2 className='cardStyles'>
                                    Toplam yorum sayısı
                                </h2>
                            </div>
                            <div className="items-center text-center h-4/6 w-full flex justify-center">
                                <p className='text-2xs text-gray-500'>
                                    <p className="text-4xl text-blue-800">{totalCommentCount}</p>Kullanıcılar tarafından yorum yapıldı
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="baseDivsContainer" >
                    <div className='baseDivs'>
                        <div className=" w-full items-center text-center h-full">
                            <div className="w-full h-fit">
                                <h2 className='cardStyles'>
                                    Toplam özetleme isteği
                                </h2>
                            </div>
                            <div className="items-center text-center h-4/6 w-full flex justify-center">
                                <p className='text-2xs text-gray-500'>
                                    <p className="text-4xl text-blue-800">{totalSummaryClickCount}</p>Defa kullanıcılar tarafından özetleme yapıldı
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className='baseDivs'>
                                            <div className=" w-full items-center text-center h-full">
                                                <div className="w-full h-fit">
                                                    <h2 className='cardStyles'>
                                                        Toplam Like sayısı
                                                    </h2>
                                                </div>
                                                <div className="items-center text-center h-4/6 w-full flex justify-center">
                                                    <p className='text-2xs text-gray-500'>
                                                        <p className="text-4xl text-blue-800">{totalLikeCount}</p>Kullanıcılar tarafından favori yapıldı
                            </p>
                        </div>
                       </div>
                       </div>

                </div>


            </div>
        </div>
    );
}

export default AdminBase;