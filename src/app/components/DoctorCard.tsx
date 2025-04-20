// src/app/components/DoctorCard.tsx
import React from 'react';
import StarRating from './StarRating';
import styles from './styles/DoctorCard.module.css';

interface DoctorProps {
  doctor: {
    id: number;
    name: string;
    credentials: string;
    rating: number;
    reviewCount: number;
    image: string;
    reviewText: string;
  };
}

const DoctorCard: React.FC<DoctorProps> = ({ doctor }) => {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={doctor.image} alt={doctor.name} className={styles.doctorImage} />
      </div>
      
      <h2 className={styles.doctorName}>
        {doctor.name}, {doctor.credentials}
      </h2>
      
      <div className={styles.ratingContainer}>
        <StarRating rating={doctor.rating} />
        <span className={styles.reviewCount}>{doctor.rating}/{doctor.reviewCount}</span>
      </div>
      
      <div className={styles.reviewSection}>
        <h3 className={styles.reviewTitle}>What patients say...</h3>
        <p className={styles.reviewText}>{doctor.reviewText}</p>
      </div>
      
      <div className={styles.seeMoreReviews}>
        <button className={styles.seeMoreButton}>
          See more reviews
          <span className={styles.circleIcon}>ⓘ</span>
        </button>
      </div>
      
      <div className={styles.appointmentLink}>
        <a href="#" className={styles.bookLink}>Link to Book Appointment</a>
      </div>
    </div>
  );
};

export default DoctorCard;