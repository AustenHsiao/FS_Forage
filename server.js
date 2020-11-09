const http = require('http'); 
const fs = require('fs');
const port = process.env.PORT || 5000;

const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    fs.readFile('index.html', (err, data) => {
        if(err){
            return console.log(err);
        }
    })
    
    res.end();
});

server.listen(port, () => {
    console.log(`Server running at on port:${port}`);
});