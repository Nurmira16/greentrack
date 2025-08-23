// components/HadithCard.jsx
import React from 'react';
import '../styles/hadithCard.scss';

const HadithCard = ({ hadith, reference }) => {
  return (
    <div className="hadith-card">
      <p className="hadith-text">"{hadith}"</p>
      {reference && <p className="hadith-reference">— {reference}</p>}
    </div>
  );
};

export default HadithCard;
