// src/app/components/StarRating.tsx
import React from 'react';
import styles from './styles/StarRating.module.css';

interface StarRatingProps {
  rating: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
  return (
    <div className={styles.starRating}>
      {[...Array(5)].map((_, i) => (
        <span key={i} className={i < rating ? styles.starFilled : styles.starEmpty}>
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRating;