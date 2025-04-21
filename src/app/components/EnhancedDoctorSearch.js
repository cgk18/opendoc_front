"use client";

import { useState } from 'react';
import styles from './styles/SearchForm.module.css';
import ResultStyles from './styles/SearchResults.module.css';

export default function EnhancedDoctorSearch() {
  // Form state
  const [location, setLocation] = useState('');
  const [insurance, setInsurance] = useState('');
  const [language, setLanguage] = useState('');
  const [warmthValue, setWarmthValue] = useState(50);
  const [evaluationValue, setEvaluationValue] = useState(50);
  const [locationValue, setLocationValue] = useState(50);
  const [additionalQuery, setAdditionalQuery] = useState('');
  
  // Results state
  const [doctors, setDoctors] = useState([]);
  const [missing, setMissing] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [resultsVisible, setResultsVisible] = useState(false);

  const API_BASE = 'http://localhost:8000';

  // Transform slider values to natural language query
  function transformSlidersToQuery() {
    let queryParts = [];
    
    // Transform warmth preference (0-100)
    if (warmthValue < 20) {
      queryParts.push("I very much want a doctor who is warm and caring above all else.");
    } else if (warmthValue < 40) {
      queryParts.push("I prefer a doctor who is warm and caring, but punctuality is also important.");
    } else if (warmthValue > 80) {
      queryParts.push("I strongly prefer a doctor who prioritizes being prompt and on-time.");
    } else if (warmthValue > 60) {
      queryParts.push("I prefer a doctor who prioritizes punctuality, but bedside manner is also important.");
    }
    
    // Transform evaluation preference
    if (evaluationValue < 20) {
      queryParts.push("I want a doctor who provides in-depth, comprehensive evaluations.");
    } else if (evaluationValue < 40) {
      queryParts.push("I prefer thorough evaluations but also value efficiency.");
    } else if (evaluationValue > 80) {
      queryParts.push("I strongly prefer efficient, focused appointments.");
    } else if (evaluationValue > 60) {
      queryParts.push("I prefer efficient check-ups but still want some thoroughness.");
    }
    
    // Transform location preference
    if (locationValue < 20) {
      queryParts.push("Proximity to my home is very important to me.");
    } else if (locationValue < 40) {
      queryParts.push("I prefer a doctor close to home, but am willing to travel for better facilities.");
    } else if (locationValue > 80) {
      queryParts.push("I strongly prefer a doctor with full-service facilities, even if it's farther away.");
    } else if (locationValue > 60) {
      queryParts.push("Having access to comprehensive facilities is important to me.");
    }
    
    // Add additional query if provided
    if (additionalQuery && additionalQuery.trim()) {
      queryParts.push(additionalQuery.trim());
    }
    
    return queryParts.join(" ");
  }

  async function handleSearch(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    
    // Transform sliders to query
    const transformedQuery = transformSlidersToQuery();
    
    // build query string
    const params = new URLSearchParams();
    params.append('query', transformedQuery);
    params.append('k', '10');
    
    if (insurance) params.append('insurance', insurance);
    
    // In a real implementation, you'd use a geocoding service here
    // For demonstration, we'll use placeholder coordinates if location is provided
    if (location) {
      // These would typically come from geocoding the location string
      params.append('latitude', '37.7749');
      params.append('longitude', '-122.4194');
    }

    try {
      console.log(`Searching with query: ${transformedQuery}`);
      const res = await fetch(`${API_BASE}/search?${params.toString()}`);
      
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      
      const { results, missing_insurance } = await res.json();
      setDoctors(results);
      setMissing(missing_insurance || []);
      setResultsVisible(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.container}>
      {!resultsVisible ? (
        <>
          <div className={styles.searchContainer}>
            <form onSubmit={handleSearch} className={styles.searchForm}>
              {/* Basic fields section */}
              <div className={styles.basicFields}>
                <div className={styles.formGroup}>
                  <label>Location:</label>
                  <input 
                    type="text" 
                    placeholder="Enter city, state or ZIP"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label>Insurance:</label>
                  <input 
                    type="text" 
                    placeholder="Your insurance provider"
                    value={insurance}
                    onChange={(e) => setInsurance(e.target.value)}
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label>Language:</label>
                  <input 
                    type="text" 
                    placeholder="Preferred language"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                  />
                </div>
              </div>
              
              {/* Preference sliders section */}
              <div className={styles.preferencesSection}>
                <h2>What matters most to you?</h2>
                
                <div className={styles.sliderGroup}>
                  <div className={styles.sliderLabels}>
                    <span>Warm & Caring</span>
                    <span>Prompt & On-Time</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={warmthValue}
                    onChange={(e) => setWarmthValue(parseInt(e.target.value))}
                    className={styles.slider}
                  />
                  <p className={styles.sliderDescription}>
                    Choose between a provider with empathetic bedside manner or one who prioritizes punctuality.
                  </p>
                </div>
                
                <div className={styles.sliderGroup}>
                  <div className={styles.sliderLabels}>
                    <span>In-Depth Evaluation</span>
                    <span>Efficient Check-Up</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={evaluationValue}
                    onChange={(e) => setEvaluationValue(parseInt(e.target.value))}
                    className={styles.slider}
                  />
                  <p className={styles.sliderDescription}>
                    Balance between comprehensive examinations or quicker, focused appointments.
                  </p>
                </div>
                
                <div className={styles.sliderGroup}>
                  <div className={styles.sliderLabels}>
                    <span>Close-to-Home Care</span>
                    <span>Full-Service Facilities</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={locationValue}
                    onChange={(e) => setLocationValue(parseInt(e.target.value))}
                    className={styles.slider}
                  />
                  <p className={styles.sliderDescription}>
                    Decide between nearby convenience or comprehensive facilities with more services.
                  </p>
                </div>
              </div>
              
              {/* Additional description section */}
              <div className={styles.additionalDescription}>
                <h2>Tell us what you're looking for!</h2>
                <textarea
                  placeholder="Examples: 'I need a pediatrician who is good with anxious children', 'Looking for a specialist in sports injuries who offers weekend appointments', 'I prefer a doctor nice to my parents'..."
                  value={additionalQuery}
                  onChange={(e) => setAdditionalQuery(e.target.value)}
                />
              </div>
              
              {/* Submit button */}
              <div className={styles.submitContainer}>
                <button 
                  type="submit" 
                  className={styles.searchButton}
                  disabled={loading}
                >
                  {loading ? 'Searching...' : 'SEARCH'}
                </button>
              </div>
            </form>
          </div>
        </>
      ) : (
        <div className={ResultStyles.resultsContainer}>
          <h1>What we found:</h1>
          
          {error && <div className={ResultStyles.error}>Error: {error}</div>}
          
          {doctors.length === 0 ? (
            <div className={ResultStyles.noResults}>
              <p>No doctors matched your criteria.</p>
              <button 
                onClick={() => setResultsVisible(false)} 
                className={ResultStyles.backButton}
              >
                Try Again
              </button>
            </div>
          ) : (
            <>
              <div className={ResultStyles.doctorGrid}>
                {doctors.map((doctor) => (
                  <div key={doctor.doctor_id} className={ResultStyles.doctorCard}>
                    <h2 className={ResultStyles.doctorName}>
                      Dr. {doctor.metadata?.name || doctor.doctor_id}
                    </h2>
                    
                    <div className={ResultStyles.rating}>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span 
                          key={i} 
                          className={i < (doctor.metadata?.rating || 5) ? ResultStyles.starFilled : ResultStyles.starEmpty}
                        >
                          ★
                        </span>
                      ))}
                      <span className={ResultStyles.ratingText}>{doctor.metadata?.rating || 5}/5</span>
                    </div>
                    
                    <div className={ResultStyles.summary}>
                      <h3>What patients say...</h3>
                      <p>
                        {doctor.summary || 
                         doctor.metadata?.summary || 
                         `Patients like that Dr. ${doctor.metadata?.name || doctor.doctor_id} is professional and makes patients feel comfortable during visits.`}
                      </p>
                    </div>
                    
                    {doctor.metadata?.specialty && (
                      <p className={ResultStyles.specialty}>
                        <strong>Specialty:</strong> {doctor.metadata.specialty}
                      </p>
                    )}
                    
                    {doctor.metadata?.address && (
                      <p className={ResultStyles.address}>
                        <strong>Address:</strong> {doctor.metadata.address}
                      </p>
                    )}
                    
                    {doctor.distance !== undefined && (
                      <p className={ResultStyles.distance}>
                        <strong>Distance:</strong> {doctor.distance < 1 ? 
                          `${(doctor.distance * 1000).toFixed(0)} meters` : 
                          `${doctor.distance.toFixed(1)} km`}
                      </p>
                    )}
                    
                    {doctor.metadata?.top_reviews && doctor.metadata.top_reviews.length > 0 && (
                      <div className={ResultStyles.reviews}>
                        <h4>Top reviews:</h4>
                        <ul>
                          {doctor.metadata.top_reviews.slice(0, 2).map((review, index) => (
                            <li key={index}>&quot;{review}&quot;</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    <button className={ResultStyles.viewProfileButton}>
                      View Profile
                    </button>
                  </div>
                ))}
              </div>
              
              {missing.length > 0 && (
                <div className={ResultStyles.missingInsurance}>
                  <h2>Doctors with No Insurance Info</h2>
                  <ul>
                    {missing.map(doc => (
                      <li key={doc.doctor_id}>{doc.doctor_id}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              <div className={ResultStyles.newSearchLink}>
                <button 
                  onClick={() => setResultsVisible(false)}
                  className={ResultStyles.backButton}
                >
                  Start a new search
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}