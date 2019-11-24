/**
 * Converts a data URL to a Blob.
 * @param {String} url data URL
 */
async function dataURLToBlob(url: string): Promise<Blob> {
    const res = await fetch(url);
    return await res.blob();
}

/**
 * Asynchronous FileReader.
 * @param {File} file 
 */
function readFileAsDataURL(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        if (!file) return reject();

        const reader = new FileReader();
    
        reader.addEventListener("load", () => {
            resolve(reader.result as string);
        }, false);

        reader.addEventListener("error", () => {
            reject();
        });
    
        reader.readAsDataURL(file);
    });
}

export {
    readFileAsDataURL,
    dataURLToBlob,
};