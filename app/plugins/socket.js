import { io } from 'socket.io-client';

export default defineNuxtPlugin(() => {
    const config = useRuntimeConfig()

    console.log(config.public.baseUrl)
    const socket = io(config.public.baseUrl, {
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