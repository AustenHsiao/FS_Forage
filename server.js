const http = require('http'); 
const fs = require('fs');
const port = process.env.PORT || 5000;


const mainPage = fs.readFileSync('pages/index.html');

const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(mainPage);
});

server.listen(port, () => {
    console.log(`Server running at on port:${port}`);
});