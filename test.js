function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min
}


let x = getRandomArbitrary(10, 100)
console.log(x)