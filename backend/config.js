const path = require('path');
const rootPath = __dirname;

module.exports = {
    rootPath,
    uploadPath: path.join(rootPath, 'public/uploads'),
    db: {
        url:'mongodb://localhost/musicapi',
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        },
    },
    facebook: {
        appId: '3969091523169875',
        appSecret: '25c0fff247ee2877ebb711ea4f5c3fdc',
    }
};