import './Admin.css'
import info from "../img/info.png"
import del from "../img/delete.png"
import {  ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const YorumPanel = () => {
    return (
        <div className="bg-gray-100 rounded-md w-11/12 h-11/12 flex">
            <div className="flex flex-wrap w-full items-center justify-center">
                <h1 className="text-2xl text-gray-700">Yorum İşlemleri</h1>
                <div className="w-full h-11/12 items-center justify-center flex">
                    <div className="rounded-md w-11/12 h-11/12 bg-gray-200 overflow-auto">
                        <div className="w-full h-fit">
                            <ul>
                                <li className="items-center rounded-md bg-gray-150 m-1 p-1 text-gray-700 flex">
                                    <div className=" flex pb-2 items-center w-full">
                                        <div className=' w-full bg-gray-50 rounded-md'>
                                            <div className=' flex justify-between'>
                                                <p className='text-2xs m-1 font-bold'>Sokak hayvanlarının kısırlaştırılması hakkında</p>
                                                <p className='text-2xs m-1 font-normal font-mono'>at 19.03.2001</p>
                                            </div>
                                            <p className=' w-fit m-2 p-1 text-sm font-semibold bg-blue-950 text-white rounded-md'>u/kullaniciAdi</p>
                                            <p className=' text-base m-1 p-2 font-normal text-adminmenu bg-gray-200 rounded-md'>
                                                Anadolu Yakasında (Tepeören Sahipsiz Hayvan Geçici Bakımevi ve Bahçeli Yaşam Alanı) ve Avrupa Yakasında (Kemerburgaz Sahipsiz Hayvan Geçici Bakımevi) İBB’ye ait birer hayvan bakımevinde 7/24 esasına göre nöbetçi ekip ve veteriner hekim bulunmakta olup, bu birimlerce mesai saatleri sonrasında yeni oluşan trafik kazası vb. travmatik yaralanmalar gibi acil durumlara öncelikle müdahale edilmektedir.
                                                Hayvanları Koruma Kanunu doğrultusunda ilçe belediyelerinin de büyükşehir belediyeleri gibi sahipsiz hayvanlara yönelik hizmet sunma görevi bulunmaktadır.
                                            </p>
                                        </div>
                                        <button
                                            className="text-sm font-medium flex items-center w-fit h-fit p-2 bg-red-700 hover:bg-red-600 rounded-lg text-gray-200 hover:text-white hover:shadow-2xl hover:shadow-adminmenu"
                                            onClick={null}
                                        >
                                            <img src={del} className="mr-2" style={{ width: '13px', height: '13px' }} alt="Delete"></img>
                                            Sil
                                        </button>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default YorumPanel;
