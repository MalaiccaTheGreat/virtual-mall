/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string; // Example for your API URL
  readonly VITE_PROD: boolean; // Example for production flag
  // Add other environment variables here if needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}