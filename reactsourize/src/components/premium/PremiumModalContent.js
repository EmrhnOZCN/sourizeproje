    import React from 'react';
    import { useNavigate } from 'react-router-dom';
     const userId = localStorage.getItem('userId');

     const PremiumModalContent = () => {

      const navigate = useNavigate();

   const handleUserRoleUpdate = async () => {
            try {
                const role = localStorage.getItem('role');

                console.log(userId)

                if (role === 'ROLE_USER') {
                    // Kullanıcının rolü 'ROLE_USER' ise, backend'e PUT isteği gönder ve rolü 'ROLE_PREMIUM' olarak günceller
                    const userId = localStorage.getItem('userId');
                    const response = await fetch(`http://localhost:8080/private/update/${userId}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                            // Eğer giriş yapılmışsa token'ı ekleyebilirsiniz
                            // "Authorization": `Bearer ${yourAuthToken}`
                        },
                    });

                    if (response.ok) {
                        // Rol güncelleme başarılı
                        console.log('Rol güncelleme başarılı.');

                        // Kullanıcı bilgilerini güncelle (örneğin localStorage'da saklanan bilgileri güncelle)
                        localStorage.setItem('role', 'ROLE_PREMIUM');
                    const role = localStorage.getItem('role');
                        // Sayfayı yeniden yükle
                        navigate(`/${role}/user#${userId}/`);
                         window.location.reload();
                    } else {
                        // Hata durumunu kontrol et ve gerekirse işlem yap
                        console.error('Rol güncelleme başarısız.');
                    }
                } else {
                    // Kullanıcının rolü zaten 'ROLE_PREMIUM' veya başka bir rolse, bir şey yapma
                    console.log('Kullanıcı zaten ROLE_PREMIUM veya başka bir role sahip.');
                }
            } catch (error) {
                console.error('Bir hata oluştu:', error);
            }
        };

      return (
        <div className="lc-lg:order-1 -order-1 flex flex-1 flex-col items-start justify-center gap-4 rounded-xl border px-10 py-10" style={{ background: 'rgba(46, 206, 92, 1)', boxShadow: '0px 12px 36px #75d475', borderColor: 'rgba(255, 161, 22, 0.1)' }}>
          <div className="lc-xl:flex-row lc-xl:justify-between flex w-full flex-col items-start gap-1">
            <div className="flex items-end gap-3">
              <div className="text-label-1 text-2xl font-medium">Aylık</div>

            </div>
            <div className="text-md text-label-1 lc-xl:order-1 -order-1 rounded px-2 py-5 font-medium backdrop-blur-[2px]" style={{ background: 'rgba(46, 206, 92, 0.0)' }}>🎉 Popüler</div>
          </div>
          <div className="text-md text-label-3"><span className="text-label-2 font-semibold"></span> Bu planı alarak aylık sınırsız olarak özetleme işlemi yapabilirsiniz <span className="text-label-2 font-semibold"></span><br /> <span className="text-label-2 font-semibold"></span> </div>
          <div className="lc-lg:pt-16 lc-xl:flex-row lc-xl:items-end lc-xl:justify-between flex w-full flex-col items-start justify-start gap-2 py-4">
            <div className="flex items-end gap-2">
              <div className="text-label-1 text-4xl font-semibold">$9.99</div>
              <div className="text-label-2 mb-0.5 text-base">/mo</div>
            </div>
            <div className="text-md text-label-3">Prices are marked in USD</div>
          </div>
          <button onClick={handleUserRoleUpdate} className="rounded items-center whitespace-nowrap focus:outline-none flex w-full justify-center bg-black px-4 py-2 text-base font-medium text-white transition-colors hover:bg-dark-layer-1">Subscribe</button>
        </div>
      );
    };

    export default PremiumModalContent;
