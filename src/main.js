const express = require('express');
const webserver = express();
const path = require('path');
const port = 5050;

webserver.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'static/html/hello.html'));
})

webserver.listen(port, () => {
    console.log('Server is running on port 5050');

})