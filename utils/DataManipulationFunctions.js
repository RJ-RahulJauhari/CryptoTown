const transformHistoricalData = (data) => {
    return data.prices.map(([timestamp, price]) => ({
        date: new Date(timestamp).toLocaleDateString(),
        price: price,
    }));
};

const formatNumber = (number) => {
    if (number >= 1e12) {
        return (number / 1e12).toFixed(2) + 'T'; // Trillions
    } else if (number >= 1e9) {
        return (number / 1e9).toFixed(2) + 'B'; // Billions
    } else if (number >= 1e6) {
        return (number / 1e6).toFixed(2) + 'M'; // Millions
    } else if (number >= 1e3) {
        return (number / 1e3).toFixed(2) + 'K'; // Thousands
    } else {
        return number.toFixed(2); // Less than 1,000
    }
};


export { transformHistoricalData, formatNumber }