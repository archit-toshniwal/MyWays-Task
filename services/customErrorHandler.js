
class Custom extends Error
{
    constructor(code,msg)
    {
        super();
        this.statusCode = code;
        this.message = msg;
    }

    static requestDeclined(statusCode,msg)
    {
        return new Custom(statusCode,msg);
    }

    static alreadyExist(statusCode,msg)
    {
        return new Custom(statusCode,msg)
    }

    static UserNotFound(statusCode,msg)
    {
        return new Custom(statusCode,msg)
    }
}


module.exports = Custom;