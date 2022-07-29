const generateSampleLink = (id: string) => {
    if (id === `7`) return `public/samples/ht${id}.wav`
    else if (id === `6`) return `public/samples/ht${id}.zip`
    else return `public/samples/ht${id}.mp3`
}

export { generateSampleLink }