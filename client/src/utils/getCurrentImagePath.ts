const getCurrentImagePath = (link: string, wallet: string) => {
    if (link?.includes('.png')) return wallet.toLowerCase() + ".png";
    else if (link?.includes('.jpeg')) return wallet.toLowerCase() + ".jpeg";
    else if (link?.includes('.jpg')) return wallet.toLowerCase() + ".jpg";
}


export {getCurrentImagePath}