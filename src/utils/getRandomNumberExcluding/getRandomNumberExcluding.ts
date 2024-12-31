/**
 * Returns a random number between the min and max values, excluding any numbers in the excludedNumbers array
 */
export const getRandomNumberExcluding = (
    excludedNumbers: number[],
    min: number = 1,
    max: number = 300
) => {
    // Ensure the excluded numbers array is unique
    const uniqueExcluded = [...new Set(excludedNumbers)];

    let randomNumber;

    // Keep generating a random number until it's not in the excluded array
    do {
        randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    } while (uniqueExcluded.includes(randomNumber));

    return randomNumber;
};
