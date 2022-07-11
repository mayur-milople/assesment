const mime = require("mime");
const AWS = require("aws-sdk");
const { v4: uuidv4 } = require("uuid");
const fsAsync = require("fs").promises;
const fs = require("fs");

const s3 = new AWS.S3({
  accessKeyId: "AKIARTWOD32MQL4UT3N5",
  secretAccessKey: "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",
  region: "us-east-1",
});

const FileUser = (fileName) => `post/${fileName}`;

exports.UsersProfile = (localFilePath, fileName) => {
  return uploadFile(localFilePath, FileUser(fileName));
};

const uploadFile = (localFilePath, uploadFilePath) => {
  var imageAsBase64 = fs.readFileSync(localFilePath, "base64");
  let buff = new Buffer(imageAsBase64, "base64");

  return new Promise((res, rej) => {
    fs.readFile(localFilePath, (err, data) => {
      if (err) {
        console.log(err);

        rej({ success: false, error: err });
      }
      const params = {
        Bucket: "coursenator-images",
        Key: uploadFilePath, // file will be saved as Bucket/uploadfilepath
        Body: data,
        ACL: "public-read",
      };
      s3.upload(params, async function (s3Err, data) {
        if (s3Err) {
          console.log(s3Err);

          rej({ success: false });
          // console.log('s3Err', s3Err);
        } else {
          //CleanUp : removing local file that is not needed now
          // fsAsync.unlink(localFilePath);
          res({ success: true, path: data.Location });
          // console.log(data);
        }
      });
    });
  });
};
const decodeBase64Image = (dataString) => {
  // console.log('dataString', dataString);

  var matches = dataString.match(/^data:([A-Za-z0-9-+\/]+);base64,(.+)$/),
    response = {};

  // console.log("matches", matches);

  if (!matches || matches.length !== 3) {
    // return new Error('Invalid input string');
    return null;
  }

  response.type = matches[1];
  response.data = new Buffer(matches[2], "base64");

  return response;
};

exports.saveBase64File = async (imageData) => {
  var decodedImg = decodeBase64Image(imageData);
  // console.log("&&&", decodedImg);
  var imageBuffer = decodedImg.data;
  var type = decodedImg.type;
  var extension = mime.getExtension(type);
  const FolderPath = "tmp/";
  var randomTmpfile = FolderPath + uuidv4();
  if (!fs.existsSync(FolderPath)) {
    fs.mkdirSync(FolderPath);
  }

  var fileLocaiton = `${randomTmpfile}.${extension}`;
  try {
    await fsAsync.writeFile(fileLocaiton, imageBuffer, "utf8");
    return fileLocaiton;
  } catch (err) {
    console.error(err);
  }
};
