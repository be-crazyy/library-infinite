const activeEnv = process.env.NODE_ENV || "development";
const envFile = `./environment.${activeEnv}`;
const env = require(envFile);

const config = {
    env: env.ENV,
    PORT: env.PORT,
    DATABASE_HOST: env.DATABASE_HOST,
    DATABASE_PORT: env.DATABASE_PORT,
    DATABASE_NAME: env.DATABASE_NAME,
    DATABASE_PASSWORD: env.DATABASE_PASSWORD,
    DATABASE_USER: env.DATABASE_USER,
    JWT_TOKEN_SECRET: env.JWT_TOKEN_SECRET
};

module.exports = { ...config };