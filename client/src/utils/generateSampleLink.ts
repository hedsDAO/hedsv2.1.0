const generateSampleLink = (id: string) => {
    if (id === `7`) return `public/samples/ht${id}.wav`
    else if (id === `6`) return `public/samples/ht${id}.zip`
    else if (id === '8') return `public/samples/ht${id}.wav`
    else if (id === '9') return `public/samples/ht${id}.wav`
    else return `public/samples/ht${id}.mp3`
}

export { generateSampleLink }