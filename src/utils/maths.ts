export const roundToOneDecimal = (input: number) => {
    try {
        let result = Math.round(input * 10) / 10;
        return result;
    } catch (error) {
        console.log(error);
        return input;
    }
};
