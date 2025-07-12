/* eslint-disable @typescript-eslint/prefer-promise-reject-errors */

import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadToCloudinary = (file: Express.Multer.File) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ resource_type: 'image' }, (error, result) => {
        if (error) return reject(error);
        resolve(result);
      })
      .end(file.buffer);
  });
};

export const uploadMultipleToCloudinary = async (
  files: Express.Multer.File[],
) => {
  return await Promise.all(files.map(uploadToCloudinary));
};
