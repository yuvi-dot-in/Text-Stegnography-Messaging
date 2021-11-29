import { ControlCameraOutlined } from "@material-ui/icons";

function loadImage(url) {
  var image = new Image();
  image.src = url;
  return image;
}
const Decode = (image, orgImage) => {
  // Handle image url
  //image - from firebase(Encoded Image)
  //orgImage - from reciever(original image uploaded by the reciever)
  if (image && orgImage) {
    image = loadImage(image);
    orgImage = loadImage(orgImage);

  }
  else {
    return "Error in LOADING IMAGES";
  }
  //Two canvas one for orginal image and ecoded image
  var canvas1 = document.createElement('canvas'),
    ctx1 = canvas1.getContext('2d');
  var canvas2 = document.createElement('canvas'),
    ctx2 = canvas2.getContext('2d');

  canvas1.style.display = 'none';
  canvas1.width = image.width;
  canvas1.height = image.height;

  ctx1.drawImage(image, 0, 0);

  canvas2.style.display = 'none';
  canvas2.width = orgImage.width;
  canvas2.height = orgImage.height;
  ctx2.drawImage(orgImage, 0, 0);

  var txtData = ctx1.getImageData(0, 0, canvas1.width, canvas1.height);

  var imageData = ctx2.getImageData(0, 0, canvas2.width, canvas2.height);
  var i;
  var binMessage = "";

  for (i = 0; i < txtData.data.length; i += 4) {

    if (txtData.data[i] - imageData.data[i] == 5) {
      //' '
      // binMessage = binMessage.concat(" ")
      binMessage = binMessage + " ";
    }
    else if (txtData.data[i] - imageData.data[i] == 1) {
      //1
      binMessage = binMessage + "1";

    }
    else if (txtData.data[i] - imageData.data[i] == -1) {
      //0
      binMessage = binMessage + "0";
    }
    else if (txtData.data[i] - imageData.data[i] == 10) {
      break;
    }
    else
      return ("Upload the Correct Reference Image");


  }

  var outputStr = String.fromCharCode(
    ...binMessage.split(' ') //Split string in array of binary chars
      .map(bin => parseInt(bin, 2)) //Map every base 2 'number' to base 10
  )

  return outputStr;
};

export default Decode;
