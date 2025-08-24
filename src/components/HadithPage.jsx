import React, { useEffect, useState } from 'react';
import HadithCard from './HadithCard';
import '../styles/hadithPage.scss';

const HadithPage = () => {
  const [hadith, setHadith] = useState('');
  const [reference, setReference] = useState('');

  const fetchRandomHadith = async () => {
    const res = await fetch('https://random-hadith-generator.vercel.app/api/random');
    const data = await res.json();
    // Assuming response structure: { hadith: "...", reference: "Sahih Bukhari 1234" }
    setHadith(data.hadith);
    setReference(data.reference);
  };

  useEffect(() => {
    fetchRandomHadith();
  }, []);

  return (
    <div className="hadith-page">
      <HadithCard hadith={hadith} reference={reference} />
      <button onClick={fetchRandomHadith}>Next Hadith</button>
    </div>
  );
};

export default HadithPage;
