import { io } from 'socket.io-client';

export default defineNuxtPlugin(() => {
    const socket = io('http://89.111.154.136:9001', {
        autoConnect: false,
    });

    socket.on('connect', (data) => {
        console.log('connected');
    });
    
    socket.on('server_status', (data) => {
        
    })

    return {
        provide: {
            socket: socket
        }
    };
});