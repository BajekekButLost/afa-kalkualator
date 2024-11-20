export function gtn(tax: number, grossPrice: number) {
    return {
        netPrice: (grossPrice / (1 + tax / 100)).toFixed(2),
        taxAmount: (grossPrice - grossPrice / (1 + tax / 100)).toFixed(2),
    };
}

export function ntg(tax: number, netPrice: number) {
    return {
        grossPrice: (netPrice * (1 + tax / 100)).toFixed(2),
        taxAmount: (netPrice * (tax / 100)).toFixed(2),
    };
}
