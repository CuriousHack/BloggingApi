//helper function goes here
//read time algorithm comes first

const humanizeTime = (time) => {
    if(time < 0.5){
        return "less than a minute"
    }
    if((time >= 0.5) && (time < 1.5)){
        return "a minute"
    }
    return `${Math.ceil(time)} minutes`
}

const noOfWords = (words) => {
    counts = words.trim().split(/\s+/)
    return counts.filter(count => count.length > 0).length

}

const timeCalculator = (words) => {
    const WPM = process.env.WORD_PER_MINUTE
    time = noOfWords(words)/WPM
    // return noOfWords(words)
    return humanizeTime(time)
}

module.exports = {
    humanizeTime,
    timeCalculator
}