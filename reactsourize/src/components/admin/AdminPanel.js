
import React, { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLeftMenu from './AdminLeftMenu';
import AdminBase from './AdminBase';
import UserPanel from './UserPanel';
import GundemPanel from './GundemPanel'; // Import other panels as needed
import YorumPanel from './YorumPanel';
import SupportPanel from './SupportPanel';

const AdminPanel = () => {
  const navigate = useNavigate();
  const [activePanel, setActivePanel] = useState('adminBase');

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';


    if (!isAuthenticated ) {
      navigate('/admin');
    }
  }, [navigate]);

  const handlePanelChange = (panelName) => {
    setActivePanel(panelName);
  };

  return (
    <div className="min-h-screen flex bg-gray-200 justify-between">
      {/* Pass onPanelChange prop here */}
      <AdminLeftMenu onPanelChange={handlePanelChange} />
      <div className='w-10/12 items-center bg-gray-200 justify-center flex'>
        {/* Render appropriate panel based on activePanel state */}
        {activePanel === 'adminBase' && <AdminBase />}
        {activePanel === 'userPanel' && <UserPanel />}
        {activePanel === 'gundemPanel' && <GundemPanel />}
        {activePanel === 'yorumPanel' && <YorumPanel />}
        {activePanel === 'supportPanel' && <SupportPanel />}
      </div>
    </div>
  );
};

export default AdminPanel;
