/// <reference types="vite/client" />



interface ImportMetaEnv {
  /**高德key */
  readonly VITE_AMAP_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}