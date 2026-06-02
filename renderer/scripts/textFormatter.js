

/**
 * 
 * @param {string} input
 * @returns {string} 
 */
const formatText = (input) => {
    let lowerText = input.toLowerCase().trim()

    return lowerText.split(' ').map((word, i, list) => {
        if (i === 0 || endsWithPunctuation(list[i-1])) {
            return capitalize(word)
        }
        return word
    }).join(' ')
}

/**
 * 
 * @param {string} word
 * @returns {string} 
 */
const capitalize = (word) => {
    if (typeof(word) !== 'string') throw new Error('Type error')

    return word[0].toUpperCase() + word.substring(1)
}

/**
 * 
 * @param {string} char 
 */
const isAlpha = (char) => {
    if (char.length !== 1) return false

    return 'abcdefghijklmnopqrstuvwxyz'.includes(char[0].toLowerCase())
}

/**
 * 
 * @param {string} str 
 */
const endsWithPunctuation = (str) => {
    const endingPunctuation = /[\.\?\!]\s*$/

    return endingPunctuation.test(str)
}