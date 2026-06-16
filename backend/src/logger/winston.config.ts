import {transports,format,createLogger} from 'winston';
import {utilities} from "nest-winston";

export const winstonConfig = {
    transports:[
        new transports.Console({
            format:format.combine(
                format.timestamp({format:"YYYY-MM-DD HH:mm:ss"}),
                format.errors({stack:true}),
                format.ms(),
                utilities.format.nestLike("backend",{
                    colors:true,
                    prettyPrint:true
                })
            )
        }),
        new transports.File({
            filename:"logs/error.log",
            level:"error",
            format:format.combine(
                format.timestamp(),
                format.json()
            )
        }), 
        new transports.File({
            filename:"logs/combined.log",
            format:format.combine(
                format.timestamp(),
                format.json()
            )
        })
    ],
    level:process.env.NODE_ENV === "production" ? "info" : "debug",
    exitOnError:false
}

export const logger = createLogger(winstonConfig);