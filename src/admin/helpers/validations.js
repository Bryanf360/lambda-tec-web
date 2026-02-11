// Function to validate Ecuadorian RUC (13 digits)
export const isValidRuc = (ruc) => {
    if (!/^\d{13}$/.test(ruc)) return false;

    const provinceCode = parseInt(ruc.slice(0, 2), 10);
    if (provinceCode < 1 || provinceCode > 24) return false;

    const thirdDigit = parseInt(ruc[2], 10);

    // Natural person (third digit 0–5)
    if (thirdDigit >= 0 && thirdDigit <= 5) {
        const idNumber = ruc.slice(0, 10);
        const coef = [2, 1, 2, 1, 2, 1, 2, 1, 2];
        let sum = 0;
        for (let i = 0; i < 9; i++) {
            let mult = parseInt(idNumber[i]) * coef[i];
            if (mult >= 10) mult -= 9;
            sum += mult;
        }
        const checkDigit = (10 - (sum % 10)) % 10;
        if (checkDigit !== parseInt(idNumber[9])) return false;
        const suffix = parseInt(ruc.slice(10), 10);
        return suffix >= 1 && suffix <= 999;
    }

    // Public entity (third digit 6)
    if (thirdDigit === 6) {
        const coef = [3, 2, 7, 6, 5, 4, 3, 2];
        let sum = 0;
        for (let i = 0; i < 8; i++) sum += parseInt(ruc[i]) * coef[i];
        const checkDigit = 11 - (sum % 11);
        if (checkDigit !== parseInt(ruc[8])) return false;
        return ruc.slice(9) === '0001';
    }

    // Private or foreign company (third digit 9)
    if (thirdDigit === 9) {
        const coef = [4, 3, 2, 7, 6, 5, 4, 3, 2];
        let sum = 0;
        for (let i = 0; i < 9; i++) sum += parseInt(ruc[i]) * coef[i];
        const checkDigit = 11 - (sum % 11);
        if (checkDigit !== parseInt(ruc[9])) return false;
        const suffix = parseInt(ruc.slice(10), 10);
        return suffix >= 1 && suffix <= 999;
    }

    return false;
};
