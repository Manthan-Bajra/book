require("dotenv").config();

const AWS = require("aws-sdk");

const s3 = new AWS.S3({
  region: "ap-south-1",
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
});

let bucketBaseUrl = process.env.AWS_BUCKET_NAME;

const makePresignedURL = (pathName) => {
  const myBucket = process.env.AWS_BUCKET_NAME;
  const region = process.env.AWS_REGION;
  let replacedPath = pathName.replace(/ /g,"+");
  const publicUrl = `https://${myBucket}.s3.${region}.amazonaws.com/${replacedPath}`;

  // const url = s3.getSignedUrl("getObject", {
  //   Bucket: myBucket,
  //   Key: pathName,
  //   //Expires: +process.env.AWS_SIGNED_URL_EXPIRES,
  // });

  return publicUrl;
};


module.exports.createUrl = async (image,newFolderPath) => {
    if (image) {
      let tempImagePath = process.env.AWS_BUCKET_TEMP_FOLDER + "/" + image;
      let newImagePath = newFolderPath + "/" + image;
      renameFile(tempImagePath, newImagePath);
      const signedURL = makePresignedURL(newImagePath);
      return signedURL;
    }
    return image;
  };


module.exports.generateUrl = (url) => {
  if (url) {
    return `${bucketBaseUrl}/${url}`;
  }
  return "";
};

const renameFile = (sourceFile, newFileName) => {
  try {
    const myBucket = process.env.AWS_BUCKET_NAME;

    s3.copyObject({
      Bucket: myBucket,
      CopySource: `${myBucket}/${sourceFile}`,
      Key: newFileName,
      ACL:'public-read',
    })
      .promise()
      .then((res) => {
        // Delete the old object
        s3.deleteObject({
          Bucket: myBucket,
          Key: sourceFile,
        })
          .promise()
          .catch((e) => console.error("Error while deleting s3 file", e.stack));
      })
      // Error handling is left up to reader
      .catch((e) => console.error("Error while rename s3 file", e.stack));
  } catch (e) {
    console.error("Error from rename s3 file method", e.stack);
  }
};


module.exports.deleteFile = async (sourceFile) => {
  try {
    const myBucket = process.env.AWS_BUCKET_NAME;
        // Delete the old object
        s3.deleteObject({
          Bucket: myBucket,
          Key: sourceFile,
        })
        .promise()
        .catch((e) => console.error("Error while deleting s3 file", e.stack));
  } catch (e) {
    console.error("Error from rename s3 file method", e.stack);
  }
}

module.exports.getFileList = async (folderName) => {
  try {
    const myBucket = process.env.AWS_BUCKET_NAME;

    let data = await s3.listObjects({
      Bucket: myBucket,
      // Delimiter: '/',
      Prefix: folderName
    }).promise();

    return data;
  } catch (e) {
    console.error("Error from rename s3 file method", e.stack);
  }
};

// Function to upload image to S3
module.exports.uploadFile = async (file, folderName, fileName) => {
  // Read the file
  const myBucket = process.env.AWS_BUCKET_NAME;
  //const fileStream = fs.createReadStream(localFilePath);

  // Set up parameters for the upload
  const uploadParams = {
    Bucket: myBucket,
    Key: `${folderName}/${fileName}`,
    Body: file,
    ACL: 'public-read', // Set ACL to public-read for making the image publicly accessible
    // ContentType: 'image/jpeg' // Modify content type according to your image type
  };

  // Upload the file
  return new Promise((resolve, reject) => {
    s3.upload(uploadParams, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data.Location);
      }
    });
  });
};

module.exports.bucketBaseUrl = bucketBaseUrl;
module.exports.tempFolderPath = process.env.AWS_BUCKET_TEMP_FOLDER;
module.exports.headerFolderPath = process.env.AWS_BUCKET_HEADER_FOLDER;
module.exports.bookFolderPath = process.env.AWS_BUCKET_BOOK_FOLDER;
module.exports.sthanFolderPath = process.env.AWS_BUCKET_STHAN_FOLDER;
module.exports.planFolderPath = process.env.AWS_BUCKET_PLAN_FOLDER;

module.exports = {
    renameFile,
    makePresignedURL
}