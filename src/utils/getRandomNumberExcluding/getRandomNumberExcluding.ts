/**
 * Returns a random number between the min and max values, excluding any numbers in the excludedNumbers array
 */
export const getRandomNumberExcluding = (
    excludedNumbers: number[],
    min: number = 1,
    max: number = 300,
    maxRetries: number = 1000 // Limit retries to 1000 times (or any reasonable number)
) => {
    const uniqueExcluded = [...new Set(excludedNumbers)];
    let randomNumber;
    let retries = 0;

    do {
        randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        retries++;

        // If the number is in the excluded array, keep trying
        if (retries > maxRetries) {
            return -1;
        }
    } while (uniqueExcluded.includes(randomNumber));

    return randomNumber;
};
