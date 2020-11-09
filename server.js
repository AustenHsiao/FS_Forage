const http = require('http'); 
const port = process.env.PORT || 5000;

const server = http.createServer((req, res) => {
    
    res.end();
};

server.listen(port, () => {
    console.log(`Server running at on port:${port}`);
});