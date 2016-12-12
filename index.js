const server = new Hapi.Server();
server.connection({
host: 'localhost',
port: 8000
});
