export const readDictionary = () => {
    const dictionary = require('./Dictionary.json');
    dictionary.forEach(word => {
        word.showDefinition = false
    });
    return dictionary
}