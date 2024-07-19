const transformHistoricalData = (data) => {
    return data.prices.map(([timestamp, price]) => ({
        date: new Date(timestamp).toLocaleDateString(),
        price: price,
    }));
};

export { transformHistoricalData }