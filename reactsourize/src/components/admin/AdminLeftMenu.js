// AdminLeftMenu.js

import React from 'react';
import admin from '../img/admin.png';
import ban from'../img/ban.png';
import unban from '../img/unban.png';
import searchIcon from '../img/search.png';
import gundem from '../img/gundem.png';
import gundemsil from '../img/gundemsil.png';
import yorum from '../img/comments.png';
import haber from '../img/haber.png';
import ozet from '../img/ozet.png';

import './Admin.css';

const AdminLeftMenu = () => {
  return (
    <div className=' bg-adminmenu w-2/12 border-b-2 border-gray-50'>
      <div className=' justify-center items-center flex pt-5 h-1/12'>
        <img src={admin} className='flex w-2/12'></img>
        <h2 className="text-2xl font-sans font-thin text-white text-center w-3/6">SourAdmin</h2>
      </div>
      <div className='text-center h-4/6 flex'>
        <div className=' w-full ml-1  h-full flex flex-col pt-10'>
          <button className='leftMenu'>
            <img src={ban} className='menuIcons'style={{ width: '30px', height: '30px' }}></img>
            Kullanıcı Engelleme
            </button>
          <button className='leftMenu'>
            <img src={unban} className='menuIcons'style={{ width: '30px', height: '30px' }}></img>
            Engel Kaldırma
          </button>
          <button className='leftMenu'>
            <img src={searchIcon} className='menuIcons'style={{ width: '30px', height: '30px' }}></img>
            Kullanıcı Arama
          </button>
          <button className='leftMenu'>
            <img src={gundem} className='menuIcons'style={{ width: '30px', height: '30px' }}></img>
            Gündemleri Görüntüle
          </button>
          <button className='leftMenu'>
            <img src={gundemsil} className='menuIcons'style={{ width: '30px', height: '30px' }}></img>
            Gündemleri Sil
          </button>
          <button className='leftMenu'>
            <img src={yorum} className='menuIcons'style={{ width: '30px', height: '30px' }}></img>
            Yorumları Göster
          </button>
          <button className='leftMenu'>
            <img src={haber} className='menuIcons'style={{ width: '30px', height: '30px' }}></img>
            Haberleri Göster
          </button>
          <button className='leftMenu'>
            <img src={ozet} className='menuIcons'style={{ width: '30px', height: '30px' }}></img>
            Özetleri Göster
          </button>
        </div>
      </div>

    </div>
  );
};

export default AdminLeftMenu;
