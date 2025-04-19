"use client";

import { useEffect } from 'react';
import styles from './styles/FeatureRanking.module.css';

interface FormData {
  location: string;
  insurance: string;
  language: string;
  features: Record<number, boolean>;
  additionalDescription: string;
}

interface FeatureRankingProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

export default function FeatureRanking({ formData, setFormData }: FeatureRankingProps) {
  const features = [
    { id: 1, name: 'Thoroughness of Examination' },
    { id: 2, name: 'Ability to Answer Questions' },
    { id: 3, name: 'Clarity of Instruction' },
    { id: 4, name: 'Provider\'s Follow-Up' },
    { id: 5, name: 'Amount of Time with Patient' },
    { id: 6, name: 'Provider\'s Attitude' },
    { id: 7, name: 'Provider\'s Perceived Outcomes' },
    { id: 8, name: 'Patient Loyalty to Provider' },
    { id: 9, name: 'Inclusion in Decisions' },
    { id: 10, name: 'General Feedback' },
    { id: 11, name: 'Reputation' }
  ];

  // Initialize feature selections
  useEffect(() => {
    const initialFeatures: Record<number, boolean> = {};
    features.forEach(feature => {
      initialFeatures[feature.id] = false;
    });
    setFormData(prev => ({...prev, features: initialFeatures}));
  }, []);

  const toggleFeature = (id: number) => {
    setFormData(prev => ({
      ...prev, 
      features: {
        ...prev.features,
        [id]: !prev.features[id]
      }
    }));
  };

  return (
    <div className={styles.featureRanking}>
      <h2>Rank the following features:</h2>
      <div className={styles.featureList}>
        {features.map((feature) => (
          <div key={feature.id} className={styles.featureItem}>
            <div className={styles.featureNumber}>{feature.id}</div>
            <div className={styles.featureName}>{feature.name}</div>
            <input 
              type="checkbox"
              checked={formData.features[feature.id] || false}
              onChange={() => toggleFeature(feature.id)}
              className={styles.checkbox}
            />
          </div>
        ))}
      </div>
    </div>
  );
}