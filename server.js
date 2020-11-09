const http = require('http'); 
const port = process.env.PORT || 5000;

const server = http.createServer((req, res) => {
    let url = req.url;
    if(url == '/'){
        res.write("HI");
    }
    res.end();
});

server.listen(port, () => {
    console.log(`Server running at on port:${port}`);
});