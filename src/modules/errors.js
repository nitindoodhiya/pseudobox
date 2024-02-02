class UserError extends Error {
    constructor(message) {
        super(message);
        this.extensions = {
            isUserError: true,
            code: 400,
            errMessage: message,
        };
    }
}

class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.extensions = {
            isNotFoundError: true,
            code: 404,
            errMessage: message,
        };
    }
}

class InternalServerError extends Error {
    constructor(message) {
        super(message);
        this.extensions = {
            code: 500,
            errMessage: "Internal Server Error",
        };
    }
}

function errorHandler(error) {
    if (error.extensions?.isUserError || error.extensions?.isNotFoundError) {
        return { errMessage: error.message, code: error.extensions.code };
    }
    console.log(`DEBUG_ERROR_LOG_${JSON.stringify(error)}`);
    return { errMessage: "INTERNAL_SERVER_ERROR", code: 500 };
}

module.exports = {
    UserError,
    NotFoundError,
    InternalServerError,
    errorHandler,
};