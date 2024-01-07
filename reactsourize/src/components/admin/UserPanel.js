import React, { useState, useEffect } from "react";
import './Admin.css'
import ban from '../img/ban.png'
import unban from '../img/unban.png'
import search from '../img/search.png'
import axios from 'axios';


const UserList = ({ users }) => {
  return (
    <div className="w-full h-8/10 overflow-y-auto">
      <table className="min-w-full bg-gray-100 border border-gray-100">
        <thead>
          <tr>
            <th className="py-2 px-2 border-b">Ad</th>
            <th className="py-2 px-2 border-b">Soyad</th>
            <th className="py-2 px-2 border-b">E-posta</th>
            <th className="py-2 px-2 border-b">Şifre</th>
            <th className="py-2 px-2 border-b">Enable</th>
            <th className="py-2 px-2 border-b">Rol</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="py-2 px-2 border-b">{user.firstName}</td>
              <td className="py-2 px-2 border-b">{user.lastName}</td>
              <td className="py-2 px-2 border-b">{user.username}</td>
              <td className="py-2 px-2 border-b">{user.password}</td>
              <td className="py-2 px-2 border-b">{user.enabled ? 'Evet' : 'Hayır'}</td>
              <td className="py-2 px-2 border-b">{user.rolesEntity.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const UserPanel = () =>{  

const [searchEmail, setSearchEmail] = useState("");
const [disableEmail, setDisableEmail] = useState("");
const [enableEmail, setEnableEmail] = useState("");
const [searchResults, setSearchResults] = useState([]);
const [error, setError] = useState(null); // Hata durumu için state

  const handleSearch = async () => {
    try {
      if (!searchEmail.trim()) {
        console.error('Geçerli bir e-posta girin.');
        setError('Geçerli bir e-posta girin.'); // Hata durumunu güncelle
        return;
      }

      const response = await axios.get(`http://localhost:8080/admin/email/${encodeURIComponent(searchEmail)}`);

      if (response.data) {
        setSearchResults([response.data]);
        setError(null); // Hata durumunu temizle
      } else {
        setSearchResults([]);
        setError('Kullanıcı bulunamadı.'); // Hata durumunu güncelle
      }
    } catch (error) {
      console.error('Kullanıcı arama işlemi başarısız:', error);
      setError('Kullanıcı arama işlemi başarısız!!'); // Hata durumunu güncelle
    }
  };

  const handleDisable = async () => {
    try {
      // E-posta boşsa işlemi gerçekleştirme
      if (!disableEmail.trim()) {
        console.error('Geçerli bir e-posta girin.');
        return;
      }

      console.log('Gönderilen E-posta:', disableEmail);

      const response = await fetch(`http://localhost:8080/admin/disable?email=${encodeURIComponent(disableEmail)}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        console.log('Kullanıcı devre dışı bırakıldı.');
       
        // Kullanıcı başarıyla devre dışı bırakıldıysa ek işlemleri burada yapabilirsiniz.
      } else {
        console.error('Kullanıcı devre dışı bırakma işlemi başarısız.');
      }
    } catch (error) {
      console.error('Bir hata oluştu:', error);
    }
  };
  const handleEnable = async () => {
      try {
        // E-posta boşsa işlemi gerçekleştirme
        if (!enableEmail.trim()) {
          console.error('Geçerli bir e-posta girin.');
          return;
        }

        console.log('Gönderilen E-posta:', enableEmail);

        const response = await fetch(`http://localhost:8080/admin/enable?email=${encodeURIComponent(enableEmail)}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          console.log('Kullanıcı banı kaldırıldı.');
          setError('Kullanıcı banı kaldırıldı.');
          // Kullanıcı başarıyla devre dışı bırakıldıysa ek işlemleri burada yapabilirsiniz.
        } else {
          console.error('Kullanıcı ban kaldırma işlemi başarısız.');
        }
      } catch (error) {
        console.error('Bir hata oluştu:', error);
      }
    };
    useEffect(() => {
      const fetchAllUsers = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/admin/getAllUsers`);
  
          if (response.data) {
            setSearchResults(response.data);
          }
        } catch (error) {
          console.error('Kullanıcı listesi alınamadı:', error);
        }
      };
  
      fetchAllUsers();
    }, []);


    return (
      <div className="bg-gray-100 rounded-md w-11/12 h-11/12">
        {/* Kullanıcı işlemleri başlığı */}
        <div className="flex justify-center w-full h-1/12">
          <h1 className="text-2xl text-gray-700">Kullanıcı İşlemleri</h1>
        </div>
    
        {/* Kullanıcı arama ve liste bölümü */}
        <div className="w-full h-11/12 flex p-5">
          {/* Kullanıcı arama formu */}
          <div className="w-5/12 h-10/12 bg-gray-200 rounded-lg">
            <h1 className="text-center">Kullanıcı Ara</h1>
            <div className="w-full justify-center flex mt-5">
              <div className="relative w-5/6">
              <input
                type="text"
                value={searchEmail}
                onChange={(e) => setSearchEmail(e.target.value)}
                className="peer w-11/12 h-full bg-white text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-1 border-t-transparent focus:border-t-transparent text-sm py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                placeholder=""
              />
                <label
                  className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-800 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900"
                >
                  E-mail
                </label>
              </div>
              <button onClick={handleSearch} className="bg-white rounded-lg px-2 mr-1">
                <img src={search} style={{ width: '22px', height: '22px' }} alt="search" />
              </button>
            </div>
            {error && <p className="text-red-500 text-center">{error}</p>}
          </div>
    
          {/* Kullanıcı listesi */}
          <UserList users={searchResults} />
    
          {/* Kullanıcı banlama ve ban kaldırma bölümü */}
          <div className="w-7/12 flex-col">
            {/* Kullanıcıyı banlama formu */}
            <div className="w-full h-3/6 mb-3 mr-3 ml-3 bg-gray-200 rounded-lg">
              <div className="w-full h-10/12 bg-gray-200 rounded-lg">
                <h1 className="text-center">Kullanıcı Banla</h1>
                <div className="w-full justify-center flex mt-5">
                  <div className="w-5/6">
                    <div className="relative w-full">
                      <input
                        type="text"
                        value={disableEmail}
                        onChange={(e) => setDisableEmail(e.target.value)}
                        className="peer w-full h-full bg-white text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                        placeholder=""
                      />
                      <label
                        className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-800 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900"
                      >
                        E-mail
                      </label>
                    </div>
                  </div>
                  <button onClick={handleDisable} className="bg-white rounded-lg p-2 ml-2">
                    <img src={ban} style={{ width: '24px', height: '24px' }} alt="ban" />
                  </button>
                </div>
                
              </div>
            </div>
    
            {/* Kullanıcının banını kaldırma formu */}
            <div className="w-full h-3/6 m-3 bg-gray-200 rounded-lg">
              <div className="w-full h-10/12 bg-gray-200 rounded-lg">
                <h1 className="text-center">Kullanıcının Banını Kaldır </h1>
                <div className="w-full justify-center flex mt-5">
                  <div className="w-5/6">
                    <div className="relative w-full">
                      <input
                        type="text"
                        value={enableEmail}
                        onChange={(e) => setEnableEmail(e.target.value)}
                        className="peer w-full h-full bg-white text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                        placeholder=""
                      />
                      <label
                        className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-800 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900"
                      >
                        E-mail
                      </label>
                    </div>
                  </div>
                  <button onClick={handleEnable} className="bg-white rounded-lg p-2 ml-2">
                    <img src={unban} style={{ width: '24px', height: '24px' }} alt="unban" />
                  </button>
                </div>
              

              </div>
            </div>
          </div>
        </div>
      </div>
    );
    
}

export default UserPanel;