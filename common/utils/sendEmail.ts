import { Injectable, InternalServerErrorException, OnModuleInit } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { createTransport, sendEmailOptions, Transporter } from "nodemailer";

@Injectable()
export class SendEmail implements OnModuleInit {
    private transporter: Transporter
    onModuleInit() {
        this.eventEmitter.on("sendOtp", async (data: sendEmailOptions) => {
            try {
                const info = await this.transporter.sendMail({
                    from: '"E-commerce app" <zaghloul85@gmail.com>', // sender address
                    to: data.to, // list of receivers
                    subject: data.subject, // Subject line
                    //text: data.text, // plain text body
                    html: data.html, // html body
                })
                console.log(info.messageId);
                
            } catch (error) {
                throw new InternalServerErrorException("Unable to send OTP", error)
            }
        })
    }
    constructor(private eventEmitter: EventEmitter2) {
        this.transporter = createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true, // true for port 465, false for other ports
            auth: {
                user: "zaghloul85@gmail.com",
                pass: process.env.EMAIL_PASSWORD,
            },
        });
    }
}


