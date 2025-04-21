"use client";

import React, { useEffect, useRef, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './styles/SearchForm.module.css';
import { transformWarmCaringSlider, transformEvaluationSlider } from '../utils/sliderTransformations';

interface FormData {
  location: string;
  insurance: string;
  language: string;
  warmCaringValue: number;
  evaluationValue: number;
  facilityValue: number;
  additionalDescription: string;
}

function useTypingPlaceholder(
  examples: string[],
  startDelay = 0,
  typeSpeed = 200,
  eraseSpeed = 100,
  pauseDuration = 3000
): string {
  const [displayText, setDisplayText] = React.useState('');
  const exampleIdx = useRef<number>(0);
  const charIdx = useRef<number>(0);
  const timeoutId = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const typeNext = () => {
      const full = examples[exampleIdx.current]
      if (charIdx.current < full.length) {
        charIdx.current++
        setDisplayText(full.slice(0, charIdx.current))
        const variation = typeSpeed * (0.8 + Math.random() * 0.4)
        timeoutId.current = setTimeout(typeNext, variation)
      } else {
        timeoutId.current = setTimeout(eraseNext, pauseDuration)
      }
    }

    const eraseNext = () => {
      if (charIdx.current > 0) {
        charIdx.current--
        setDisplayText(examples[exampleIdx.current].slice(0, charIdx.current))
        timeoutId.current = setTimeout(eraseNext, eraseSpeed)
      } else {
        exampleIdx.current = (exampleIdx.current + 1) % examples.length
        timeoutId.current = setTimeout(typeNext, 800)
      }
    }

    timeoutId.current = setTimeout(typeNext, startDelay)

    return () => {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current)
      }
    }
  }, [examples, startDelay, typeSpeed, eraseSpeed, pauseDuration])

  return displayText
}

export default function SearchForm() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    location: '',
    insurance: '',
    language: 'English',
    warmCaringValue: 50,
    evaluationValue: 50,
    facilityValue: 50,
    additionalDescription: ''
  });
  const [error, setError] = useState<string | null>(null);

  const locationExamples = useMemo(() => ['Atlanta, GA', '30307', '30349', 'Atlanta, GA', '30318'], []);
  const insuranceExamples = useMemo(() => ['Blue Shield', 'Cigna', 'Aetna', 'UnitedHealthcare', 'Kaiser Permanente'], []);
  const additionalDescriptionExamples = useMemo(() => [
    'I want a doctor who is good with children',
    'I want a doctor who will explain the concepts in detail',
    'I want the doctor to be super brief'
  ], []);

  const locationPlaceholder = useTypingPlaceholder(locationExamples, 0);
  const insurancePlaceholder = useTypingPlaceholder(insuranceExamples, 1500);
  const additionalDescriptionPlaceholder = useTypingPlaceholder(additionalDescriptionExamples, 3000);

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({...prev, [field]: value}));
  };

  const handleSearch = async () => {
    try {
      setError(null);
      
      // Build the query string from slider values and additional description
      const warmCaringQuery = transformWarmCaringSlider(formData.warmCaringValue);
      const evaluationQuery = transformEvaluationSlider(formData.evaluationValue);
      
      // Combine all query parts
      const queryParts = [
        warmCaringQuery, 
        evaluationQuery,
        formData.additionalDescription
      ].filter(q => q !== "" && q !== undefined);

      // Extract zip code from location if it's a 5-digit number
      const zipCode = formData.location.match(/\b\d{5}\b/)?.[0] || formData.location;

      // Clean and validate insurance input
      const cleanedInsurance = formData.insurance.trim();

      const params = new URLSearchParams({
        query: queryParts.join(" "),
        ...(cleanedInsurance && { insurance: cleanedInsurance }),
        ...(zipCode && { zip: zipCode }),
        k: '5'
      });

      // First make the API call
      const response = await fetch(`http://localhost:8000/search?${params.toString()}`);
      if (!response.ok) {
        throw new Error('Search request failed');
      }

      const data = await response.json();
      
      // Then navigate to results page with both the search parameters and results
      router.push(`/search-results?${params.toString()}&results=${encodeURIComponent(JSON.stringify(data))}`);
    } catch (error) {
      console.error('Search error:', error);
      setError(error instanceof Error ? error.message : 'An error occurred');
    }
  };

  return (
    <div className={styles.searchForm}>
      <div className={styles.basicFields}>
        <div className={styles.inputFields}>
          <div className={styles.formGroup}>
            <label>Location:</label>
            <input 
              type="text" 
              placeholder={locationPlaceholder}
              value={formData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
            />
          </div>
          
          <div className={styles.formGroup}>
            <label>Insurance:</label>
            <input 
              type="text" 
              placeholder={insurancePlaceholder}
              value={formData.insurance}
              onChange={(e) => handleInputChange('insurance', e.target.value)}
            />
          </div>
          
          <div className={styles.formGroup}>
            <label>Language:</label>
            <input 
              type="text" 
              value={formData.language}
              onChange={(e) => handleInputChange('language', e.target.value)}
              disabled
            />
          </div>
        </div>

        <div className={styles.preferencesSection}>
          <h3>What matters most to you?</h3>
          
          <div className={styles.sliderGroup}>
            <div className={styles.sliderLabels}>
              <span>Warm & Caring</span>
              <span>Prompt & On-Time</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={formData.warmCaringValue}
              onChange={(e) => handleInputChange('warmCaringValue', parseInt(e.target.value))}
              className={styles.slider}
            />
            <div className={styles.sliderDescription}>
              Choose between a provider with empathetic bedside manner or one who prioritizes punctuality.
            </div>
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
              value={formData.evaluationValue}
              onChange={(e) => handleInputChange('evaluationValue', parseInt(e.target.value))}
              className={styles.slider}
            />
            <div className={styles.sliderDescription}>
              Balance between comprehensive examinations or quicker, focused appointments.
            </div>
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
              value={formData.facilityValue}
              onChange={(e) => handleInputChange('facilityValue', parseInt(e.target.value))}
              className={styles.slider}
            />
            <div className={styles.sliderDescription}>
              Decide between nearby convenience or comprehensive facilities with more services.
            </div>
          </div>
        </div>

        <div className={styles.additionalDescription}>
          <h3>Tell us what you're looking for!</h3>
          <textarea
            placeholder={additionalDescriptionPlaceholder}
            value={formData.additionalDescription}
            onChange={(e) => handleInputChange('additionalDescription', e.target.value)}
          />
          <div className={styles.examplesText}>
            Examples: 'I want a doctor who is good with children', 'I want a doctor who will explain the concepts in detail', 'I want the doctor to be super brief'...
          </div>
        </div>

        {error && <div className={styles.error}>{error}</div>}
      </div>

      <button 
        className={styles.searchButton}
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
}