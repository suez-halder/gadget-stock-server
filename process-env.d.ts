declare namespace NodeJS {
  export type ProcessEnv = {
    PORT: number
    DATABASE_URL: string
    NODE_ENV: string
    BCRYPT_SALT_ROUNDS: number

    JWT_ACCESS_TOKEN_SECRET: string
    JWT_ACCESS_TOKEN_EXPIRES_IN: string
    JWT_REFRESH_TOKEN_SECRET: string
    JWT_REFRESH_TOKEN_EXPIRES_IN: string
  }
}
