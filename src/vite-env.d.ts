/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_MUX_PLAYBACK_ID?: string;
}

declare module "*.module.css" {
  const classes: Readonly<Record<string, string>>;
  export default classes;
}
