const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
const pify = require('pify');

const s3 = new aws.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const uploadToAws = pify(multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.S3_BUCKET,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: function(req, file, cb) {
            cb(null, Date.now().toString())
        },
        acl: "public-read",
    })
}).single('event-image'));

module.exports = {
    uploadToAws
}