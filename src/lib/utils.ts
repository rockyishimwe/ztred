export const cn = (...inputs: string[]): string => {
  return inputs.filter(Boolean).join(' ');
};