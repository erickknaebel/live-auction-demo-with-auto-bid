{
    APP_HOST ='http://localhost',
    APP_PORT = '3000',
    API_VERSION = 'v1'

    DEVELOPMENT = {
        DATABASE = 'mongodb://localhost/authentication',
        DATABASE_TEST = 'mongodb://localhost/test',
        SECRET_KEY = 'b6264fca-8adf-457f-a94f-5a4b0d1ca2b9',
        TOKEN_EXP = '1h'
    },

    TEST = {
        SECRET_KEY = 'b60264f',
        TOKEN_EXP = '1h'
    }
}