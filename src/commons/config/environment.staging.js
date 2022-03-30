const env = {};

env.ENV = 'staging';
env.PORT = 3000;
env.DATABASE_HOST = '127.0.0.1',
env.DATABASE_PORT = 5432,
env.DATABASE_NAME = 'my_database',
env.DATABASE_PASSWORD = "1234",
env.DATABASE_USER = 'postgres'
env.JWT_TOKEN_SECRET = 'kartik',
env.REDIS_PORT = 6379,
env.REDIS_HOST = 'localhost'

module.exports = env;