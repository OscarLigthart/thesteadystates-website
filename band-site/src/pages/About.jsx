import { useState } from "react";
import members from "../content/members.json";

const ProfileIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="8" r="4" fill="currentColor" opacity="0.3"/>
    <path d="M6 21C6 17.134 8.686 14 12 14C15.314 14 18 17.134 18 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.3"/>
  </svg>
);

function MemberImage({ imgPath, name }) {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // Remove leading slash to make it relative to base path
  const relativePath = imgPath.startsWith('/') ? imgPath.slice(1) : imgPath;
  // Use Vite's base URL
  const fullPath = `${import.meta.env.BASE_URL}${relativePath}`;

  console.log('MemberImage:', { name, imgPath, fullPath, imageError, imageLoaded });

  if (imageError || !imgPath) {
    console.log('Showing fallback icon for:', name);
    return <ProfileIcon />;
  }

  const handleLoad = () => {
    console.log('Image loaded successfully for:', name);
    setImageLoaded(true);
  };

  const handleError = (e) => {
    console.log('Image failed to load for:', name, e);
    setImageError(true);
  };

  return (
    <>
      {!imageLoaded && <ProfileIcon />}
      <img 
        src={fullPath} 
        alt={name}
        onLoad={handleLoad}
        onError={handleError}
        style={{ display: imageLoaded ? 'block' : 'none' }}
      />
    </>
  );
}

export default function About() {
  return (
    <section id="about" className="container">
      <h1>About Us</h1>
      <p className="lead">
        We met at Vinted, where we were just nerdy colleagues fixing bugs and shipping features. 
        Late-night coding sessions turned into jam sessions, and before we knew it, 
        we'd gone from debugging code to dropping beats. Now we're The Steady States—
        a party-inducing hit band that proves the best collaborations happen when you 
        least expect them.
      </p>

      <div className="member-grid">
        {members.map((member) => (
          <div className="member-card" key={member.name}>
            <div className="member-card__image">
              <MemberImage imgPath={member.img_path} name={member.name} />
            </div>
            <div className="member-card__content">
              <div className="member-card__role">{member.role}</div>
              <div className="member-card__name">{member.name}</div>
              <p className="member-card__bio">{member.bio}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
