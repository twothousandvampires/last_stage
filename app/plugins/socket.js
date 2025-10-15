import { io } from 'socket.io-client';

export default defineNuxtPlugin(() => {
    const config = useRuntimeConfig()
    
    let socket = io(config.public.baseIp + ':' + config.public.basePort, {
        autoConnect: false,
    });

    socket.connect()

    let connectTo = (port) => {
        if (socket) {
            socket.disconnect()
            socket = null
        }
        socket = io(config.public.baseIp + ':' + port, {
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