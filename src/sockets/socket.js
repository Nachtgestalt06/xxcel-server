"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.disconnect = (client) => {
    client.on('disconnect', () => {
        console.log('Client disconnected');
    });
};
exports.newMessage = (client) => {
    client.on('message', (payload) => {
        console.log('Meesage received', payload);
    });
};
//# sourceMappingURL=socket.js.map