import nodemailer from 'nodemailer';

// create reusable transporter object using the default SMIP transport

    const send = async infoObj => {
        try {
            const transporter = nodemailer.createTransport({
                host: process.env.EMAIL_SMTP,
                port: 587,
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS,
                },
            });

             //send email with defined transport object
        let info = await transporter.sendMail(infoObj);

        console.log("Message sent: %s", info.messageId);

        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

        } catch (error) {
            console.log(error);
            
        }
        

    }




   const emailProcessor = ({ email, subject, text, html }) => {
      
        let info = {
            from: `"EShop" <${process.env.EMAIL_USER}>`, //sender address
            to: email, //list of receivers
            subject,//Subject Line
            text, // plain text body
            html, 
        };

        send(info);
    };

//send email notification for password update
export const sendPasswordResetOTP= emailObj =>{
    const {fname, otp} = emailObj;
    
    
    const obj = {
        ...emailObj,

    subject: "Reset password OTP",
    text: `Hi ${fname}, You have the following otp to reset your password. ${otp}. The otp will expire in 15 min`,
   html: ` 
    Hello ${fname},
    <br/>
    
    You have the following otp to reset your password.
     ${otp}
     <br/><br/>
      The otp will expire in 15 min
     <br/><br/>
    Thank you <br/><br/>

    Kind regards, <br/>

    ---some company information----
    
    `,
    // html body 
};

    emailProcessor(obj);
}
export const sendPasswordUpdateNotification= emailObj =>{
    const {fname} =emailObj;
    
    
    const obj = {
        ...emailObj,

    subject: "Your password has been updated",
    text: `Hi ${fname}, Your password has just been updated, 
    if you did not make this change, please conatct us immediately., ${link}`,
    html: ` 
    Hello there,
    <br/>
    
    Your password has just been updated, 
    if you did not make this change, please conatct us immediately.. <br/><br/>
    <a href="${link}" target="_blank"> ${link} </a>

    
    <br/><br/>
    Thank you <br/><br/><br/>

    Kind regards, 

    ---some company information----
    
    `,
    // html body 
};

    emailProcessor(obj);
}

      

    export const sendEmailVerificationLink = emailObj =>{
        const {fname, pin, email} =emailObj;
        const link = `http://localhost:3000/email-verification?pin=${pin}&email=${email}`;
        
        const obj = {
            ...emailObj,

        subject: "Email confirmation required",
        text: `Hi ${fname}, please follow the link below to confirm your email., ${link}`,
        html: ` 
        Hello there,
        <br/>
        
        Please follow the link below to confirm your email. <br/><br/>
        <a href="${link}" target="_blank"> ${link} </a>

        
        <br/><br/>
        Thank you <br/><br/><br/>

        Kind regards, 

        ---some company information----
        
        `,
        // html body 
    };
    
        emailProcessor(obj);
}
 

  //send the email confirm  welcome message
  export const sendEmailVerificationConfirmation = emailObj =>{
    const { fname } = emailObj;
    console.log (Object);
    
   
    const obj = {
        ...emailObj,

    subject: "Email confirmation required",
    text: `Hi ${fname}, Your email has been verified,you may log in.`,
    html: ` 
    Hello ${fname},
    <br/>
    
    Your email has been verified. you may log in. <br/><br/>, 
   

    
    <br/><br/>
    Thank you <br/><br/><br/>

    Kind regards, 

    ---some company information----
    
    `,
    // html body 
};

    emailProcessor(obj);
};