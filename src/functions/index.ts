export const timeout = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))


export function shuffle(array: Array<object>) {
    let currentIndex = array.length, randomIndex

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]]
    }

    return array
}
