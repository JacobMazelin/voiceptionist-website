
export const isValidBusinessEmail = (email: string): boolean => {
  const gmailPattern = /@gmail\.com$/i;
  const generalPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return generalPattern.test(email) && !gmailPattern.test(email);
};
