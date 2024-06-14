import { formatToCurrency } from "./formatAmount";

export const calculateFee = (amount) => {
    let cleanedAmount = amount.replaceAll('₦', '').replaceAll(',', '');
    const charge = 2.2 / 100 * Number(cleanedAmount)

    let fee;
    if (charge > 5000) {
        fee = 5000 + Number(cleanedAmount)
    } else {
        fee = charge + Number(cleanedAmount)
    }
    fee = `${Math.ceil(fee)}.00`
    return formatToCurrency(fee)
}

export const calculateSharedValue = (totalValue, equityValue) => {
    return Number(totalValue) * (Number(equityValue) / 100);
};

export const percentagePaid = (totalAmount, amountPaid) => {
    let percentPaid;
    try {
        percentPaid = ((Number(amountPaid) / Number(totalAmount)) * 100).toFixed(2);
        return `${percentPaid}%`;
    } catch (error) {
        return '-';
    }
};