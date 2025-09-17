import React, { useEffect, useState } from 'react';

const UserBannerList = () => {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/banners")
      .then((res) => res.json())
      .then((data) => setBanners(data));
  }, []);

  const getImage = (banner) => `http://localhost:8080${banner.imageUrl}`;

  const renderBanner = (banner, alt, key) => {
    const image = (
      <div className="w-full h-[80px] border border-white rounded-md overflow-hidden ">
        <img
          src={getImage(banner)}
          alt={alt}
          className="w-full h-full object-fill"
        />
      </div>
    );

    return banner.link ? (
      <a key={key} href={banner.link} target="_blank" rel="noopener noreferrer">
        {image}
      </a>
    ) : (
      <div key={key}>{image}</div>
    );
  };

  return (
    <div className="p-2 max-w-[650px] mx-auto space-y-2">
      {/* 배너 1 */}
      {banners[0] && renderBanner(banners[0], "배너1", banners[0].id || 0)}

      {/* 배너 2 */}
      {banners[1] && renderBanner(banners[1], "배너2", banners[1].id || 1)}

      {/* 배너 3 */}
      <div className="grid grid-cols-2 ">
        {banners.slice(2).map((banner, index) =>
          renderBanner(banner, `배너${index + 3}`, banner.id || index + 2)
        )}
      </div>
    </div>
  );
};

export default UserBannerList;
