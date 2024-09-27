const http = require('http');
const fs = require('fs');
const path = require('path');

// Função para ler arquivos HTML de forma assíncrona
function readHTMLFile(filePath, response, statusCode = 200) {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            response.writeHead(500, { 'Content-Type': 'text/html' });
            response.end('<h1>500 Internal Server Error</h1>');
        } else {
            response.writeHead(statusCode, { 'Content-Type': 'text/html' });
            response.end(data);
        }
    });
}

// Criação do servidor
const server = http.createServer((req, res) => {
    // Normaliza a URL para remover parâmetros ou query strings
    const cleanUrl = req.url.split('?')[0];

    if (req.method === 'GET' && cleanUrl === '/') {
        // Caminho para o arquivo index.html
        const indexPath = path.join(__dirname, 'index.html');
        readHTMLFile(indexPath, res);
    } else {
        // Para qualquer outro caminho ou método, retorna a página 404
        const error404Path = path.join(__dirname, '404.html');
        readHTMLFile(error404Path, res, 404);
    }
});

// Servidor escutando em todas as interfaces (localhost e IP da rede local)
const PORT = 8080;
server.listen(PORT, '0.0.0.0', () => {
    console.log('Servidor rodando em http://localhost:${PORT}/ ou acesse via IP da rede local.');
});