import {Socket} from "socket.io";

export const disconnect = (client: Socket) => {
    client.on('disconnect', () => {
        console.log('Client disconnected');
    })
};

export const newMessage = ( client: Socket) => {
    client.on('message', (payload: {de: string, cuerpo: string}) => {
        console.log('Meesage received', payload);
    })
};
