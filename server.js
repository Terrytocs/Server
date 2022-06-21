const http=require('http');
const url=require('url');
const fs=require('fs');

const server=http.createServer((req,res)=>{
    let path='.'+url.parse(req.url,true).pathname;
    if(path==='./'||path==='./home'||path.includes('./index')){
        path='./index.html';
    };
    if(!path.includes('.html')&&!path.includes('.htm')&&!path.includes('.css')&&!path.includes('.js')){
        path+='.html';
    };
    fs.readFile(path,(err,data)=>{
        if(err){
            res.writeHead(404,{'content-type':'text/html'});
            res.write(`
                <div style='font-family:sans-serif;height:100vh;display:flex;align-items:center;justify-content:center;flex-direction:column;'>
                    <h1>404 Page Not Found!</h1>
                    <p>We can't seem to find the page you're looking for.</p>
                    <p>Try going <a href='./index.html'>home</a></p>
                </div>
            `);
            console.log(err);
            return;
        };
        if(path.includes('.html')||path.includes('.htm')){
            res.writeHead(200,{'content-type':'text/html'});
            res.write(data);
            return res.end();
        } else if(path.includes('.css')){
            res.writeHead(200,{'content-type':'text/css'});
            res.write(data);
            return res.end();
        } else if(path.includes('.js')){
            res.writeHead(200,{'content-type':'text/javascript'});
            console.log(req)
            res.write(data);
            return res.end();
        };
    });
});

server.listen(5000,()=>{
    console.log('Listening on port: 5000...');
});