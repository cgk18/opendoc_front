// src/app/page.tsx
"use client";

import { useState } from 'react';
import Header from './components/Header';
import SearchForm from './components/SearchForm';
import FeatureRanking from './components/FeatureRanking';
// Update the import path for styles if needed
import styles from './components/styles/Home.module.css'; 

interface FormData {
  location: string;
  insurance: string;
  language: string;
  features: Record<number, boolean>;
  additionalDescription: string;
}

export default function Home() {
  const [formData, setFormData] = useState<FormData>({
    location: '',
    insurance: '',
    language: '',
    features: {},
    additionalDescription: ''
  });

  const handleSearch = () => {
    console.log('Search submitted with data:', formData);
  };

  return (
    <main className={styles.main}>
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>
          Connecting <span className={styles.emphasis}>YOU</span> with the right <span className={styles.emphasis}>DOCTORS</span>
        </h1>
        <p className={styles.subtitle}>through smart, personalized recommendations.</p>
      </div>

      <SearchForm formData={formData} setFormData={setFormData} />
      
      <FeatureRanking formData={formData} setFormData={setFormData} />
      
      <div className={styles.additionalInfo}>
        <h2>Additional descriptions:</h2>
        <textarea 
          placeholder="type here..."
          value={formData.additionalDescription}
          onChange={(e) => setFormData({...formData, additionalDescription: e.target.value})}
          className={styles.textarea}
        />
      </div>
      
      <button className={styles.searchButton} onClick={handleSearch}>
        SEARCH
      </button>
    </main>
  );
}