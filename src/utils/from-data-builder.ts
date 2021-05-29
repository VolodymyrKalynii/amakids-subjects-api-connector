export const buildFormData = (formData, data, parentKey?:string) => {
    if (data && typeof data === 'object' && !(data instanceof Date) && !(data instanceof File)) {
        Object.keys(data).forEach(key => {
            buildFormData(formData, data[key], parentKey ? `${parentKey}[${key}]` : key);
        });
    } else {
        let value = data == null ? '' : data;

        if (typeof data === 'string' && data.includes('data:image/png;base64,')) {
            value = b64toBlob(data, 'image/png', 512);

            formData.append(parentKey, value, 'yourImage.png');
        } else {
            formData.append(parentKey, value);
        }
    }
};

const b64toBlob = (b64Data, contentType, sliceSize) => {
    contentType = contentType || '';

    sliceSize = sliceSize || 512;

    const str = b64Data.replace('data:image/png;base64,', '');

    const byteCharacters = atob(str);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);
        const byteNumbers = new Array(slice.length);

        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, {type: contentType});
};
