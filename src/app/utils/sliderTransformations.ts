export const transformWarmCaringSlider = (value: number): string => {
  if (value <= 20) {
    return "I very much want a doctor who is a lot more warm and caring.";
  } else if (value <= 40) {
    return "I want a doctor that is warm and caring, but still has some values of prompt and on-time.";
  } else if (value <= 60) {
    return ""; // Return empty string for middle values as we might not want to include it
  } else if (value <= 80) {
    return "I prefer a doctor who prioritizes being prompt and on-time while maintaining some warmth.";
  } else {
    return "I strongly prefer a doctor who prioritizes punctuality and efficiency above all.";
  }
};

export const transformEvaluationSlider = (value: number): string => {
  if (value <= 20) {
    return "I want a doctor who provides very thorough and in-depth evaluations.";
  } else if (value <= 40) {
    return "I prefer comprehensive examinations with some consideration for efficiency.";
  } else if (value <= 60) {
    return ""; // Return empty string for middle values
  } else if (value <= 80) {
    return "I prefer efficient check-ups while still being thorough enough.";
  } else {
    return "I strongly prefer quick and efficient check-ups.";
  }
}; 