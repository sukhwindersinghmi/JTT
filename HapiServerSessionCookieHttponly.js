const Hapi = require('hapi');
const server = new Hapi.Server();
server.connection({
host: 'localhost',
port: 8000
});
server.route({
method: 'GET',
path: '/hello',
config: {
handler: function (request, reply) {
reply({foo: 'bar'});
},
jsonp: 'callback'
}
});
server.start((err) => {
if (err) {
throw err;
}
console.log('Server running at:', server.info.uri);
});
