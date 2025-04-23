import React from 'react';
import styles from './styles/AdditionalInfo.module.css';

interface AdditionalInfoProps {
  value: string;
  onChange: (value: string) => void;
}

const AdditionalInfo: React.FC<AdditionalInfoProps> = ({ value, onChange }) => {
  return (
    <div className={styles.additionalInfoContainer}>
      <h3 className={styles.additionalInfoTitle}>Tell us what you're looking for!</h3>
      <p className={styles.additionalInfoSubtitle}>
        Describe your ideal doctor, specific needs, or any preferences not covered above.
      </p>
      <textarea
        className={styles.additionalInfoTextarea}
        placeholder="Examples: 'I need a pediatrician who is good with anxious children', 'Looking for a specialist in sports injuries who offers weekend appointments', 'I prefer a female doctor who speaks Spanish'..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={5}
        aria-label="Additional doctor preferences"
      />
    </div>
  );
};

export default AdditionalInfo;