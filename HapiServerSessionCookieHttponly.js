'use strict';
const hapi = require('hapi');
const bcrypt = require('bcrypt');
const fs = require('fs');

const server = new hapi.Server();

const users = {
john: {
username: 'john',
password: '$2a$10$iqJSHD.BGr0E2IxQwYgJmeP3NvhPrXAeLSaGCj6IR/XU5QtjVu5Tm', // 'secret'
name: 'John Doe',
id: '2133d32a'
}
};

const port = 3000;
server.connection({
host: 'localhost',
address: '127.0.0.1',
port: port,
});

server.register([
{
register: require('hapi-auth-basic')
}
], function (err) {
if (err) {
throw err;
}

server.auth.strategy('simple', 'basic', {
validateFunc: function (request, username, password, callback) {
const user = users[username];
if (!user) {
return callback(null, false);
}
bcrypt.compare(password, user.password, function (err, isValid) {
callback(err, isValid, {
id: user.id,
name: user.name
});
});
}
});

server.route({
method: 'GET',
path: '/auth',
config: {
auth: 'simple',
handler: function (request, reply) {
reply('hello, ' + request.auth.credentials.name);
}
}
});
});

server.start(function () {
console.log('Now Visit: http://localhost:' + port);
});
