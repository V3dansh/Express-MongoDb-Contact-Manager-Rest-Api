const {errorConstants}=require("./../errorConstans");
const errorHandler=(err,req,res,next)=>{
    const statusCode=res.statusCode ? res.statusCode:500;
    res.json({message: err.message,stackTrace: err.stack})

    switch(statusCode)
    {
        case errorConstants.VALIDATION_ERROR:
        res.json({
            title:"Validation Error",
            message: err.message,
            stackTrace: err.stack
            });
            break;

        case errorConstants.NOT_FOUND:
            res.json({
                title:"Not Found",
                message: err.message,
                stackTrace: err.stack
            });
            break;
        case errorConstants.UNAUTHORIZED:
            res.json({
                title:"Not authorized",
                message: err.message,
                stackTrace: err.stack
            });
            break;
        case errorConstants.FORBIDDEN:
            res.json({
                title:"Forbidden",
                message: err.message,
                stackTrace: err.stack
            });
            break;
        case errorConstants.SERVER_ERROR:
            res.json({
                title:"Server Error",
                message: err.message,
                stackTrace: err.stack
            });
            break;
        default:
            next(err);
    }
};

module.exports=errorHandler;