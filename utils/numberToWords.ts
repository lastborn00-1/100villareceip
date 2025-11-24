export function numberToWords(amount: number): string {
  if (amount === 0) return "Zero Naira Only";

  const units = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];
  const teens = ["Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
  const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
  const thousands = ["", "Thousand", "Million", "Billion"];

  let words = "";
  let numStr = amount.toString();
  
  // Basic implementation for typical rent amounts (simplified)
  // For production, a robust library like 'n2words' is better, but we keep it dependency-free here.
  
  if (amount < 0) return "Negative amount";

  const convertGroup = (n: number): string => {
    let str = "";
    if (n >= 100) {
      str += units[Math.floor(n / 100)] + " Hundred ";
      n %= 100;
    }
    if (n >= 20) {
      str += tens[Math.floor(n / 10)] + " ";
      n %= 10;
    }
    if (n >= 10) {
      str += teens[n - 10] + " ";
      return str;
    }
    if (n > 0) {
      str += units[n] + " ";
    }
    return str;
  };

  let i = 0;
  let chunkCount = 0;
  
  if (amount === 0) return "Zero";

  // Handling integer part only for rent receipt mainly
  let intPart = Math.floor(amount);
  
  if (intPart === 0) words = "Zero ";
  
  let result = "";
  
  while (intPart > 0) {
    const chunk = intPart % 1000;
    if (chunk > 0) {
      const chunkStr = convertGroup(chunk);
      result = chunkStr + thousands[i] + " " + result;
    }
    intPart = Math.floor(intPart / 1000);
    i++;
  }

  return result.trim() + " Naira Only";
}