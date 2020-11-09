const http = require('http'); 
const fs = require('fs');
const port = process.env.PORT || 5000;

const server = http.createServer((req, res) => {
    const mainPage = fs.readFileSync('pages/index.html');
    const cssFile = fs.readFileSync('css/forage.css');

    switch (req.url) {
        case "/css/forage.css" :
            res.writeHead(200, {"Content-Type": "text/css"});
            res.write(cssFile);
            break;
        default :    
            res.writeHead(200, {"Content-Type": "text/html"});
            res.write(mainPage);
    };
    res.end();
});

server.listen(port, () => {
    console.log(`Server running at on port:${port}`);
});