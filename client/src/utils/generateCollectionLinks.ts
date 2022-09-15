const tapeAddresses: { [key: string]: string } = {
    "0xde8a0b17d3dc0468adc65309881d9d6a6cd66372": "/listen/heds/hedstape/1",
    "0x5083cf11003f2b25ca7456717e6dc980545002e5": "/listen/heds/hedstape/2",
    "0x567e687c93103010962f9e9cf5730ae8dbfc6d41": "/listen/heds/hedstape/3",
    "0x8045fd700946a00436923f37d08f280ade3b4af6": "/listen/heds/hedstape/4",
    "0x8f36eb094f7b960a234a482d4d8ffb8b37f728c6": "/listen/heds/hedstape/5",
    "0x885236535d5cf7033bdc5bc1050cad7fdf4970a6": "/listen/heds/hedstape/6",
    "0x20f2717f113d0b3815124876f3d72f8e1179341e": "/listen/heds/hedstape/7",
};

const generateCollectionLinks = (wallet: string) => {
    return tapeAddresses[wallet];
};

export { generateCollectionLinks };
