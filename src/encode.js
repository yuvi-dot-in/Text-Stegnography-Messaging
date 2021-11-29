function loadImage(url) {
    var image = new Image();
    image.src = url;
    return image;
}
function textToBin(text) {
    var length = text.length,
        output = [];
    for (var i = 0; i < length; i++) {
        var bin = text[i].charCodeAt().toString(2);
        output.push(Array(8 - bin.length + 1).join("0") + bin);
    }
    return output.join(" ");
}
const Encode = (message, image) => {
    var binMessage = textToBin(message);   //message converted to binary

    console.log("Mesage converted to binary " + binMessage);

    image = loadImage(image);
    var shadowCanvas = document.createElement('canvas'),
        shadowCtx = shadowCanvas.getContext('2d');
    shadowCanvas.style.display = 'none';
    shadowCanvas.width = image.width;
    shadowCanvas.height = image.height;
    shadowCtx.drawImage(image, 0, 0);

    var imageData = shadowCtx.getImageData(0, 0, shadowCanvas.width, shadowCanvas.height),
        data = imageData.data;
    console.log(imageData);


    var i;
    var msgCount = 0;
    for (i = 0; i < data.length; i += 4) {
        // console.log(imageData.data[i]);
        // console.log(binMessage[msgCount]);
        if (msgCount === binMessage.length) {
            imageData.data[i] += 10;    //delimiter
            break;
        }
        if (binMessage[msgCount] === '1')
            imageData.data[i]++;

        else if (binMessage[msgCount] === '0')
            imageData.data[i]--;

        else if (binMessage[msgCount] === ' ') {
            imageData.data[i] += 5;
            // console.log('k')
            // console.log(binMessage[msgCount])

        }
        msgCount++;
        // console.log(imageData.data[i])
        // console.log(' ')

        // imageData.data[i
    }
    console.log("after Encoding the message")
    console.log(imageData.data);
    shadowCtx.putImageData(imageData, 0, 0);
    return shadowCanvas.toDataURL(); //this will return the base64 of the canvas image
}

export default Encode