import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (file: Blob): Promise<string | null> => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          resource_type: "auto",
        },
        (error, result) => {
          if (error) {
            console.log("========== CLOUDINARY ERROR ==========");

            console.dir(error, { depth: null });

            // ADD THESE
            console.log("error.message:", error.message);
            console.log("error.http_code:", (error as any).http_code);
            console.log("error.error:", (error as any).error);
            console.log("error.response:", (error as any).response);

            reject(error);
          } else {
            console.log("========== CLOUDINARY SUCCESS ==========");
            console.log(result);
            resolve(result?.secure_url ?? null);
          }
        }
      );

      stream.end(buffer);
    });
  } catch (err: any) {
    console.log("UPLOAD FUNCTION ERROR");
    console.dir(err, { depth: null });

    console.log("message:", err.message);
    console.log("response:", err.response);
    console.log("error:", err.error);

    return null;
}
};

export default uploadOnCloudinary;