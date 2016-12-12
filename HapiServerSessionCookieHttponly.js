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

// Start the server
server.start((err) => {
if (err) {
throw err;
}
console.log('Server running at:', server.info.uri);
});
