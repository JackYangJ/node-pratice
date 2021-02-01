let connect = require('connect');
let bodyParser = require('body-parser');


let app = connect()
            .use(bodyParser.json())
            .listen(3000);
