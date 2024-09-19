function formatCurrency(amount:number, currency="KSH", locale = 'en-US') {
    if (typeof amount !== 'number' || isNaN(amount)) {
        throw new Error('Invalid amount. Must be a number.');
    }
    
    const formatter = new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
    });

    return formatter.format(amount);
}
export default formatCurrency

