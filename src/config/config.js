import 'dotenv/config'
const { PORT, DEPLOY_DATABASE, LOCAL_DATABASE, NODE_ENV } = process.env

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
    }

export { PORT, DATABASE_CONFIG }
