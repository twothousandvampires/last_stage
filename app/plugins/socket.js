import { io } from 'socket.io-client';

export default defineNuxtPlugin(() => {
    const config = useRuntimeConfig()
    
    let socket = io(config.public.baseUrl, {
        autoConnect: false,
    });

    socket.connect()

    let connectTo = (url) => {
        if (socket) {
            socket.disconnect()
            socket = null
        }
        socket = io(url, {
            autoConnect: false,
        });
        socket.connect()
    };

    let getInstance = () => {
        return socket
    }

    return {
        provide: {
            getInstance: getInstance,
            connectTo: connectTo
        }
    };
});