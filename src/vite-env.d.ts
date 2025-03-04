/// <reference types="vite/client" />


interface ImportMetaEnv {
    readonly VITE_SOCKET_DEV_URL: string
    // more env variables...
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }