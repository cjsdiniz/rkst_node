const http = require('http');
http.createServer((req,res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });

    if(req.url=== '/product'){
        res.end(JSON.stringify({ 
            
        message: 'Produto'}))
    }
    if(req.url=== '/user'){
        res.end(JSON.stringify({ 
            
        message: 'Utilizador'}))
    }
    if(req.url=== '/'){
        res.end(JSON.stringify({
        message: 'Hello World!'
        }));
    }

}).listen(4001, ()=> console.log("Server running on 4001"));