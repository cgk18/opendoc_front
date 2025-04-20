"use client";

import React, { useEffect, useRef, useMemo } from 'react';
import styles from './styles/SearchForm.module.css';

interface FormData {
  location: string;
  insurance: string;
  language: string;
  features: Record<number, boolean>;
  additionalDescription: string;
}

interface SearchFormProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
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
        // small pause before typing the next example
        timeoutId.current = setTimeout(typeNext, 800)
      }
    }

    // kick it all off after the initial delay
    timeoutId.current = setTimeout(typeNext, startDelay)

    return () => {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current)
      }
    }
  // only re-run if your inputs truly change
  }, [examples, startDelay, typeSpeed, eraseSpeed, pauseDuration])

  return displayText
}

export default function SearchForm({ formData, setFormData }: SearchFormProps) {
  const locationExamples = useMemo(() => ['Atlanta, GA', '30307', '30349', 'Atlanta, GA', '30318'], [])
  const insuranceExamples = useMemo(() => ['Blue Shield', 'Cigna', 'Aetna', 'UnitedHealthcare', 'Kaiser Permanente'], [])
  const languageExamples = useMemo(() => ['English', 'Spanish', 'Korean', 'Mandarin', 'Vietnamese'], [])

  const locationPlaceholder = useTypingPlaceholder(locationExamples, 0)
  const insurancePlaceholder = useTypingPlaceholder(insuranceExamples, 1500)
  const languagePlaceholder = useTypingPlaceholder(languageExamples, 3000)

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData({...formData, [field]: value});
  };

  return (
    <div className={styles.searchForm}>
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
          placeholder={languagePlaceholder}
          value={formData.language}
          onChange={(e) => handleInputChange('language', e.target.value)}
        />
      </div>
    </div>
  );
}