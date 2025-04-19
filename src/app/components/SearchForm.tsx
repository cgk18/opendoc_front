"use client";

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

export default function SearchForm({ formData, setFormData }: SearchFormProps) {
  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData({...formData, [field]: value});
  };

  return (
    <div className={styles.searchForm}>
      <div className={styles.formGroup}>
        <label>Location:</label>
        <input 
          type="text" 
          placeholder="ZipCode/City" 
          value={formData.location}
          onChange={(e) => handleInputChange('location', e.target.value)}
        />
      </div>
      
      <div className={styles.formGroup}>
        <label>Insurance:</label>
        <input 
          type="text" 
          placeholder="Insurance provider" 
          value={formData.insurance}
          onChange={(e) => handleInputChange('insurance', e.target.value)}
        />
      </div>
      
      <div className={styles.formGroup}>
        <label>Language:</label>
        <input 
          type="text" 
          placeholder="Preferred language" 
          value={formData.language}
          onChange={(e) => handleInputChange('language', e.target.value)}
        />
      </div>
    </div>
  );
}