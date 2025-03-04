import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

const isProd = () => import.meta.env.MODE === 'production';
const dev = import.meta.env.VITE_SOCKET_DEV_URL;
const prod = import.meta.env.VITE_SOCKET_PROD_URL;

interface SocketOptions {
  withCredentials?: boolean;
}

export default function useSocket(options: SocketOptions = { withCredentials: true }) {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    // Log the environment variables for debugging
    console.log('Environment:', {
      mode: import.meta.env.MODE,
      dev: import.meta.env.VITE_SOCKET_DEV_URL,
      prod: import.meta.env.VITE_SOCKET_PROD_URL,
    });

    const socketUrl = isProd() ? prod : dev;

    if (!socketUrl) {
      console.error('Socket URL is not defined in environment variables', { dev, prod });
      return;
    }

    socketRef.current = io(socketUrl, {
       path: '/socket.io/', 
      transports: ['websocket', 'polling'],
      reconnection: true,
      withCredentials: options.withCredentials,
    });

    socketRef.current.on('connect', () => {
      console.log('Socket connected successfully');
    });

    socketRef.current.on('disconnect', (reason: any) => {
      console.log('Socket disconnected:', reason);
    });

    socketRef.current.on('connect_error', (error: any) => {
      console.error('Socket connection error:', error.message);
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        console.log('Socket connection cleaned up');
      }
    };
  }, []);

  return socketRef.current;
}