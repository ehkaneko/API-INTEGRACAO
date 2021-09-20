module.exports = (value) => {
  const cnpjDigits = value.split("");
  let multiplierDigits = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  let ok = false;
  let verifyingDigit1 = 0;
  let verifyingDigit2 = 0;

  for (let i = 1; i < cnpjDigits.length; i++) {
    if (cnpjDigits[i - 1] !== cnpjDigits[i]) {
      ok = true;
      break;
    }
  }

  if (!ok) return false;

  for (let i = 0; i < multiplierDigits.length; i++)
    verifyingDigit1 += parseInt(cnpjDigits[i]) * multiplierDigits[i];

  verifyingDigit1 = verifyingDigit1 % 11;
  verifyingDigit1 = verifyingDigit1 < 2 ? 0 : 11 - verifyingDigit1;

  if (verifyingDigit1 != cnpjDigits[12]) return false;

  multiplierDigits = [6, ...multiplierDigits];

  for (let i = 0; i < multiplierDigits.length; i++)
    verifyingDigit2 += parseInt(cnpjDigits[i]) * multiplierDigits[i];

  verifyingDigit2 = verifyingDigit2 % 11;
  verifyingDigit2 = verifyingDigit2 < 2 ? 0 : 11 - verifyingDigit2;

  if (verifyingDigit2 != cnpjDigits[13]) return false;

  return true;
};
