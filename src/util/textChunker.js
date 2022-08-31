const TextChunker = (text, chunkLength) => {
    chunkLength = chunkLength || 200;
    let arr = [];
    if (!text || text?.length < chunkLength) {
        arr.push(text);
        return arr;
    }

    var pattRegex = new RegExp(
        '^[\\s\\S]{' +
            Math.floor(chunkLength / 2) +
            ',' +
            chunkLength +
            '}[.!?,]{1}|^[\\s\\S]{1,' +
            chunkLength +
            '}$|^[\\s\\S]{1,' +
            chunkLength +
            '} '
    );

    while (text.length > 0) {
        arr.push(text.match(pattRegex)[0]);
        text = text.substring(arr[arr.length - 1].length);
    }

    return arr;
};

export default TextChunker;
