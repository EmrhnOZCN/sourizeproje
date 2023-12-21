// AdminLeftMenu.js

import React from 'react';
import admin from '../img/admin.png';
import user from '../img/user.png' ;
import gundem from '../img/gundem.png';
import yorum from '../img/comments.png';
import haber from '../img/haber.png';
import ozet from '../img/ozet.png';
import support from '../img/support.png';

import './Admin.css';

const AdminLeftMenu = ({onPanelChange }) => {
  return (
    <div className=' bg-adminmenu w-2/12 border-b-2 border-gray-50' >
      <div className=' justify-center items-center flex pt-12 h-1/12' onClick={() => onPanelChange('adminBase')} >
        <img src={admin} style={{ width: '40px', height: '40px' }} className='flex w-2/12' ></img>
        <button className='items-center justify-center text-center'>
          <h2 className="text-2xl font-sans font-bold text-center w-3/6 text-blue-900" >
            <h2 className='text-xl font-sans font-bold text-center text-white'>Sour</h2>
          Admin</h2>
        </button>
      </div>
      <div className='text-center h-4/6 flex pt-5'>
        <div className=' w-full ml-1  h-full flex flex-col pt-10'>
          <button className='leftMenu' onClick={() => onPanelChange('userPanel')}>
            <img src={user} className='menuIcons'style={{ width: '30px', height: '30px' }}></img>
            Kullanıcı İşlemleri
          </button>
          <button className='leftMenu' onClick={() => onPanelChange('gundemPanel')}>
            <img src={gundem} className='menuIcons'style={{ width: '30px', height: '30px' }}></img>
            Gündem İşlemleri
          </button>
          <button className='leftMenu' onClick={() => onPanelChange('yorumPanel')}>
            <img src={yorum} className='menuIcons'style={{ width: '30px', height: '30px' }}></img>
            Yorum İşlemleri
          </button>
          <button className='leftMenu' onClick={() => onPanelChange('haberPanel')}>
            <img src={haber} className='menuIcons'style={{ width: '30px', height: '30px' }}></img>
            Haber İşlemleri
          </button>
          <button className='leftMenu' onClick={() => onPanelChange('ozetPanel')}>
            <img src={ozet} className='menuIcons'style={{ width: '30px', height: '30px' }}></img>
            Özet İşlemleri
          </button>
          <button className='leftMenu' onClick={() => onPanelChange('supportPanel')}>
            <img src={support} className='menuIcons'style={{ width: '30px', height: '30px' }}></img>
            Destek Mesajları
          </button>
        </div>
      </div>

    </div>
  );
};

export default AdminLeftMenu;
