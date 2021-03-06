// Ghost Configuration for Heroku

var path = require('path'),
config,
fileStorage = true,
storage;

if (!!process.env.S3_ACCESS_KEY_ID) {
    storage = {
        active: 's3',
        's3': {
            accessKeyId:     process.env.S3_ACCESS_KEY_ID,
            secretAccessKey: process.env.S3_ACCESS_SECRET_KEY,
            bucket:          process.env.S3_BUCKET_NAME,
            region:          process.env.S3_BUCKET_REGION,
            assetHost:       process.env.S3_ASSET_HOST_URL
        }
    }
} else if (!!process.env.BUCKETEER_AWS_ACCESS_KEY_ID) {
    storage = {
        active: 's3',
        's3': {
            accessKeyId:     process.env.BUCKETEER_AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.BUCKETEER_AWS_SECRET_ACCESS_KEY,
            bucket:          process.env.BUCKETEER_BUCKET_NAME,
            region:          process.env.S3_BUCKET_REGION,
            assetHost:       process.env.S3_ASSET_HOST_URL
        }
    }
} else {
    fileStorage = false
    storage = {}
}

config = {

    // Production (Heroku)
    production: {
        url: process.env.HEROKU_URL,
        mail: {
            transport: 'SMTP',
            options: {
                service: 'Mailgun',
                auth: {
                    user: process.env.MAILGUN_SMTP_LOGIN,
                    pass: process.env.MAILGUN_SMTP_PASSWORD
                }
            }
        },
        fileStorage: fileStorage,
        storage: storage,
        database: {
            client: 'postgres',
            connection: process.env.DATABASE_URL,
            debug: false
        },
        server: {
            host: process.env.IP || '0.0.0.0',
            port: process.env.PORT
        },
        paths: {
            contentPath: path.join(__dirname, '/content/'),
            storagePath: {
                custom: path.join(__dirname, '/content/storage/')
            }
        }
    },

    // Development
    development: {
        url: process.env.C9_HOSTNAME ? 'https://' + process.env.C9_HOSTNAME : 'http://localhost:2368',
        database: {
            client: 'sqlite3',
            connection: {
                filename: path.join(__dirname, '/content/data/ghost-dev.db')
            },
            debug: false
        },
        server: {
            host: process.env.IP || '127.0.0.1',
            port: process.env.PORT || '2368'
        },
        storage: storage,
        paths: {
            contentPath: path.join(__dirname, '/content/'),
            storagePath: {
                custom: path.join(__dirname, '/content/storage/')
            }
        }
    }

};

// Export config
module.exports = config;
