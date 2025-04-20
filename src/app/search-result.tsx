"use client";

import Header from './components/Header';
import DoctorCard from './components/DoctorCard';
import styles from '../components/styles/SearchResults.module.css';

// Mock data for doctors
const mockDoctors = [
  {
    id: 1,
    name: 'Dr. Greg Tolmochow',
    credentials: 'MD',
    rating: 5,
    reviewCount: 5,
    image: '/path-to-image1.jpg',
    reviewText: 'Patients like that Dr. Tolmochow is professional and find his explanations easy to understand. He is known for his ability to treat X, Y, and Z. The office staff ensures a smooth check-in process, and the clinic maintains high cleanliness.',
  },
  {
    id: 2,
    name: 'Dr. Andrew Yang',
    credentials: 'MD',
    rating: 5,
    reviewCount: 5,
    image: '/path-to-image2.jpg',
    reviewText: 'Patients like that Dr. Yang shows incredible empathy and makes patients feel at easy during their visits. He is known for his ability to treat X, Y, and Z. His staff make people feel welcomed.',
  },
  {
    id: 3,
    name: 'Dr. Brian Suh',
    credentials: 'MD',
    rating: 5,
    reviewCount: 5,
    image: '/path-to-image3.jpg',
    reviewText: 'Patients like that Dr. Suh is straightforward and explains everything thoroughly. He is known for his ability to treat X, Y, and Z. Patients are also satisfied with the empathy. He has been practicing for over 20 years.',
  },
];

export default function SearchResults() {
  return (
    <div className={styles.container}>
      <Header />
      
      <main className={styles.main}>
        <h1 className={styles.title}>What we found:</h1>
        
        <div className={styles.resultsGrid}>
          {mockDoctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
      </main>
    </div>
  );
}