    export const BASE_PRICE = {
    delivery: 2500,
    errand: 3500,
    custom: 4000,
    };

    export function getEstimate(taskType) {
    return BASE_PRICE[taskType] ?? BASE_PRICE.delivery;
    }

    export function formatNaira(amount) {
    return `\u20A6${amount.toLocaleString()}`;
    }