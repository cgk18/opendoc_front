"use client";

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from '../components/styles/SearchResults.module.css';
import Link from 'next/link';

interface Doctor {
  doctor_id: string;
  avg_score: number;
  metadata: {
    name?: string;
    specialty?: string;
    address?: string;
    rating?: number;
    summary?: string;
    top_reviews?: string[];
  };
}

export default function SearchResults() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [missingInsurance, setMissingInsurance] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const searchParams = useSearchParams();
  
  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);
        setError(null);

        // Check if results are already in the URL
        const resultsParam = searchParams.get('results');
        if (resultsParam) {
          const data = JSON.parse(decodeURIComponent(resultsParam));
          setDoctors(data.results || []);
          setMissingInsurance(data.missing_insurance || []);
          setLoading(false);
          return;
        }
        
        // If no results in URL, fetch them
        const params = new URLSearchParams();
        searchParams.forEach((value, key) => {
          if (key !== 'results') { // Skip the results parameter
            params.append(key, value);
          }
        });

        const response = await fetch(`http://localhost:8000/search?${params.toString()}`);
        if (!response.ok) {
          throw new Error('Search request failed');
        }

        const data = await response.json();
        setDoctors(data.results || []);
        setMissingInsurance(data.missing_insurance || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [searchParams]);

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Loading results...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <h2>Error</h2>
          <p>{error}</p>
          <Link href="/" className={styles.backButton}>
            Try another search
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Link href="/" className={styles.backButton}>
          ← Back to Search
        </Link>
        <h1>Search Results</h1>
      </div>

      {doctors.length === 0 ? (
        <div className={styles.noResults}>
          <h2>No doctors found matching your criteria</h2>
          <Link href="/" className={styles.backButton}>
            Try another search
          </Link>
        </div>
      ) : (
        <>
          <div className={styles.resultsGrid}>
            {doctors.map((doctor) => (
              <div key={doctor.doctor_id} className={styles.doctorCard}>
                <div className={styles.cardHeader}>
                  <h2>{doctor.metadata.name || `Doctor ${doctor.doctor_id}`}</h2>
                  {doctor.metadata.rating && (
                    <div className={styles.rating}>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i} className={i < doctor.metadata.rating! ? styles.starFilled : styles.starEmpty}>
                          ★
                        </span>
                      ))}
                      <span className={styles.ratingText}>{doctor.metadata.rating}/5</span>
                    </div>
                  )}
                </div>

                {doctor.metadata.specialty && (
                  <div className={styles.specialty}>
                    <strong>Specialty:</strong> {doctor.metadata.specialty}
                  </div>
                )}

                {doctor.metadata.address && (
                  <div className={styles.address}>
                    <strong>Address:</strong> {doctor.metadata.address}
                  </div>
                )}

                {doctor.metadata.summary && (
                  <div className={styles.summary}>
                    <strong>Summary:</strong>
                    <p>{doctor.metadata.summary}</p>
                  </div>
                )}

                {doctor.metadata.top_reviews && doctor.metadata.top_reviews.length > 0 && (
                  <div className={styles.reviews}>
                    <strong>Top Reviews:</strong>
                    <ul>
                      {doctor.metadata.top_reviews.slice(0, 2).map((review, index) => (
                        <li key={index}>{review}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <button className={styles.viewProfileButton}>
                  View Full Profile
                </button>
              </div>
            ))}
          </div>

          {missingInsurance.length > 0 && (
            <div className={styles.missingInsurance}>
              <h3>Additional Doctors (Insurance Not Confirmed)</h3>
              <div className={styles.resultsGrid}>
                {missingInsurance.map((doctor) => (
                  <div key={doctor.doctor_id} className={`${styles.doctorCard} ${styles.missingCard}`}>
                    <div className={styles.insuranceNote}>
                      Insurance coverage needs to be confirmed
                    </div>
                    <div className={styles.cardHeader}>
                      <h2>{doctor.metadata.name || `Doctor ${doctor.doctor_id}`}</h2>
                      {doctor.metadata.rating && (
                        <div className={styles.rating}>
                          {Array.from({ length: 5 }).map((_, i) => (
                            <span key={i} className={i < doctor.metadata.rating! ? styles.starFilled : styles.starEmpty}>
                              ★
                            </span>
                          ))}
                          <span className={styles.ratingText}>{doctor.metadata.rating}/5</span>
                        </div>
                      )}
                    </div>

                    {doctor.metadata.specialty && (
                      <div className={styles.specialty}>
                        <strong>Specialty:</strong> {doctor.metadata.specialty}
                      </div>
                    )}

                    {doctor.metadata.address && (
                      <div className={styles.address}>
                        <strong>Address:</strong> {doctor.metadata.address}
                      </div>
                    )}

                    {doctor.metadata.summary && (
                      <div className={styles.summary}>
                        <strong>Summary:</strong>
                        <p>{doctor.metadata.summary}</p>
                      </div>
                    )}

                    {doctor.metadata.top_reviews && doctor.metadata.top_reviews.length > 0 && (
                      <div className={styles.reviews}>
                        <strong>Top Reviews:</strong>
                        <ul>
                          {doctor.metadata.top_reviews.slice(0, 2).map((review, index) => (
                            <li key={index}>{review}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <button className={styles.viewProfileButton}>
                      View Full Profile
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
} 