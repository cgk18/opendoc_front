import React, { useState, useRef } from 'react';
import styles from './styles/FeatureRanking.module.css';

interface TradeoffSliderProps {
  leftOption: string;
  rightOption: string;
  value: number;
  onChange: (value: number) => void;
  leftIcon?: string;
  rightIcon?: string;
  helperText: string;
}

const TradeoffSlider: React.FC<TradeoffSliderProps> = ({
  leftOption,
  rightOption,
  value,
  onChange,
  leftIcon,
  rightIcon,
  helperText,
}) => {
  const [hovering, setHovering] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipTimeoutRef = useRef<number | null>(null);
  
  // Calculate percentages for each option based on slider value (0-100)
  const rightPercentage = value;
  const leftPercentage = 100 - value;
  
  // Generate tooltip text based on value
  const getTooltipText = () => {
    if (value < 50) {
      return `${leftPercentage}% ${leftOption}, ${rightPercentage}% ${rightOption}`;
    } else if (value > 50) {
      return `${leftPercentage}% ${leftOption}, ${rightPercentage}% ${rightOption}`;
    }
    return `50% ${leftOption}, 50% ${rightOption}`;
  };

  const handleMouseDown = () => {
    // Clear any existing timeout when user starts dragging
    if (tooltipTimeoutRef.current) {
      window.clearTimeout(tooltipTimeoutRef.current);
      tooltipTimeoutRef.current = null;
    }
    setShowTooltip(false);
  };

  const handleMouseUp = () => {
    // Show tooltip when user releases the slider
    setShowTooltip(true);
    
    // Hide tooltip after 2 seconds
    tooltipTimeoutRef.current = window.setTimeout(() => {
      setShowTooltip(false);
    }, 2000);
  };

  // Clean up timeout on unmount
  React.useEffect(() => {
    return () => {
      if (tooltipTimeoutRef.current) {
        window.clearTimeout(tooltipTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className={styles.tradeoffContainer}>
      <div className={styles.sliderLabels}>
        <div className={styles.labelWithIcon}>
          {leftIcon && <img src={leftIcon} alt="" className={styles.optionIcon} />}
          <span className={styles.tradeoffLabel}>{leftOption}</span>
        </div>
        <div className={styles.labelWithIcon}>
          <span className={styles.tradeoffLabel}>{rightOption}</span>
          {rightIcon && <img src={rightIcon} alt="" className={styles.optionIcon} />}
        </div>
      </div>
      
      <div className={styles.sliderWrapper}>
        <div 
          className={styles.sliderContainer}
          style={{ '--fill-percentage': `${value}%` } as React.CSSProperties}
        >
          <input
            type="range"
            min="0"
            max="100"
            step="1"
            value={value}
            onChange={(e) => onChange(parseInt(e.target.value))}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onTouchStart={handleMouseDown}
            onTouchEnd={handleMouseUp}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            className={`${styles.slider} ${hovering ? styles.sliderHover : ''}`}
            aria-label={`Choose between ${leftOption} and ${rightOption}`}
          />
          
          {showTooltip && (
            <div className={styles.valueTooltip} style={{ left: `${value}%` }}>
              {getTooltipText()}
            </div>
          )}
        </div>
      </div>
      
      <p className={styles.helperText}>{helperText}</p>
    </div>
  );
};

const FeatureRanking: React.FC = () => {
  const [warmVsPrompt, setWarmVsPrompt] = useState(25);
  const [inDepthVsEfficient, setInDepthVsEfficient] = useState(50);
  const [closeVsFullService, setCloseVsFullService] = useState(50);

  return (
    <div className={styles.featureRankingWrapper}>
      <div className={styles.rankingContainer}>
        <h2 className={styles.rankingTitle}>What matters most to you?</h2>
        
        <div className={styles.tradeoffsSection}>
          <TradeoffSlider
            leftOption="Warm & Caring"
            rightOption="Prompt & On-Time"
            value={warmVsPrompt}
            onChange={setWarmVsPrompt}
            helperText="Choose between a provider with empathetic bedside manner or one who prioritizes punctuality."
          />
          
          <TradeoffSlider
            leftOption="In-Depth Evaluation"
            rightOption="Efficient Check-Up"
            value={inDepthVsEfficient}
            onChange={setInDepthVsEfficient}
            helperText="Balance between comprehensive examinations or quicker, focused appointments."
          />
          
          <TradeoffSlider
            leftOption="Close-to-Home Care"
            rightOption="Full-Service Facilities"
            value={closeVsFullService}
            onChange={setCloseVsFullService}
            helperText="Decide between nearby convenience or comprehensive facilities with more services."
          />
        </div>
      </div>
    </div>
  );
};

export default FeatureRanking;