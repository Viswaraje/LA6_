const http = require('http');
const fs = require('fs');
const path = require('path');
const port = process.env.PORT || 3003;
const server = http.createServer((req, res) => {
// Serve the React app's index.html
if (req.url === '/' || req.url === '/index.html') {
const filePath = path.join(__dirname, 'build', 'index.html');
fs.readFile(filePath, (err, data) => {
if (err) {
res.writeHead(500, { 'Content-Type': 'text/plain' });
res.end('Internal Server Error');
} else {
res.writeHead(200, { 'Content-Type': 'text/html' });
res.end(data);
}
});
} else {
// Serve other static assets from the 'build' directory
const filePath = path.join(__dirname, 'build', req.url);
fs.readFile(filePath, (err, data) => {
if (err) {
res.writeHead(404, { 'Content-Type': 'text/plain' });
res.end('Not Found');
} else {
const contentType = getContentType(req.url);
res.writeHead(200, { 'Content-Type': contentType });
res.end(data);
}
});
}
});
function getContentType(url) {
const extname = path.extname(url);
switch (extname) {
case '.js':
return 'text/javascript';
case '.css':
return 'text/css';
default:
return 'text/plain';
}
}
server.listen(port, () => {
console.log(`Server is running on port ${port}`);
});