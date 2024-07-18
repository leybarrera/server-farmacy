import { v2 as cloudinary } from 'cloudinary';

const uploadImage = async (folder, file) => {
  const { secure_url } = await cloudinary.uploader.upload(file, {
    folder: `vouchers/${folder}`,
  });
  return secure_url;
};

export default { uploadImage };
