import 'dotenv/config';
const {
  PORT,
  DEPLOY_DATABASE,
  LOCAL_DATABASE,
  NODE_ENV,
  EMAIL_PASSWORD,
  ADMIN_SECRET_PASSWORD,
  CLOUDINARY_URL,
} = process.env;

const DATABASE_CONFIG = NODE_ENV
  ? {
      URI: DEPLOY_DATABASE,
      CONFIG: {
        logging: false,
        native: false,
        dialectOptions: {
          ssl: {
            require: true,
          },
        },
      },
    }
  : {
      URI: LOCAL_DATABASE,
      CONFIG: {
        logging: false,
        native: false,
      },
    };

export const NODEMAILER_CONFIG = {
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: 'nyellove1998@gmail.com',
    pass: EMAIL_PASSWORD,
  },
};

export { PORT, DATABASE_CONFIG, ADMIN_SECRET_PASSWORD, CLOUDINARY_URL };
