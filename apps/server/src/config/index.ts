import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
    port: process.env.PORT,
    server_url: process.env.SERVER_URL,
    client_url: process.env.CLIENT_URL,
    news_api_key: process.env.NEWS_API_KEY,
    mongodb_url: process.env.MONGODB_URL,
    jwt: { secret: process.env.JWT_SECRET },
    cloud: {
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    },
    sslcommerz: {
        store_id: process.env.SSLCOMMERZ_STORE_ID,
        store_passwd: process.env.SSLCOMMERZ_STORE_PASSWORD,
        is_live: false,
    },
};
