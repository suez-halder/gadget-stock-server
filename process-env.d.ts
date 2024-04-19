declare namespace NodeJS {
  export type ProcessEnv = {
    PORT: number
    DATABASE_URL: string
    NODE_ENV: string
    BCRYPT_SALT_ROUNDS: number
  }
}
