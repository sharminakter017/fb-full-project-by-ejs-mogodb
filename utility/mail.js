import nodemailer from "nodemailer"


/**
 * Account activation email
 */

 export const accountActivationMail = async(to, data) => {

  try {

    const transport = nodemailer.createTransport({
        host : process.env.MAIL_HOST,
        port : process.env.MAIL_PORT,
        auth :{
            user : process.env.MAIL_ID,
            pass : process.env.MAIL_PASSWORD

        }
    })



    await transport.sendMail({
        from    : `Facebook <${process.env.MAIL_ID}>`,
        to      : to,
        subject : 'Account Activation Mail',
        text    : 'Please Active your Account',
        html    : `


        <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Tamplate</title>

    <style>
        *{
            margin: 0px;
            padding: 0px;
            font-family: serif;
        }
        ul{
            margin: 0px;
            padding: 0px;
        }
        li{
            list-style: none;
        }
        .massage-body{
            padding: 20px 0;
        }
        .massage-body h2{
            font-size: 18px;
            margin-bottom: 10px;
        }
        .massage-body p{
            font-size: 14px;
            margin-bottom: 10px;
        }
        .massage-body a{
            font-size: 15px;
            margin-bottom: 10px;
            background-color: #ff4800;
            border: 5px solid #efefef;
            display: inline-block;
            padding: 15px 40px;
            text-decoration: none;
            color: #fff;
            text-transform: uppercase;
        }
        .main-wrapper{
            height: 100vh;
            width: 100%;
            background-color: #cccccc;
            overflow : hidden;
            
        }
        .wrapper{
            background-color: #fff;
            width: 500px;
            padding: 30px;
            margin : 200px auto;
        }
        .pay{
      width: 200px;
      }
      .footer span{
        padding-bottom: 30px;
        display: block;
      }
      .footer .social ul{
        display: flex;
        gap: 10px;
      }



    </style>
</head>
<body>

    <div class="main-wrapper">
        <div class="wrapper">
            <div class="header">
                <a href=""><img class="pay" src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Payoneer_logo.svg/1200px-Payoneer_logo.svg.png" alt=""></a>
                <hr>
                <div class="massage-body">
                Hii,Sharmin..your otp code is ${data.otp}
                <h2>Dear Sharmin</h2>
                <p>You are welcome to payoneer. Now you have to verify your account by clicking the verify button . </p>
                <a href="${data.link}">Verify Now</a>
                </div>
                <div class="footer">
                    <span>Your account cell : 01790169442</span>
                    <div class="social">
                       <ul> 
                        <li><a href=""><img src="https://ci5.googleusercontent.com/proxy/Hp1tHwpZJplBQHTr-WRQujyXVO54yAQdUwALRHoIu3TW_4YDZ6B6Ls74s-w-3MEDpMW9F5Bc8V4B2IT49EMXsm4X1qqiK8IjzmNO4S_OfAs-tByTjpOe2-uS3s3hY3HTf5w=s0-d-e1-ft#http://pubs.payoneer.com/EmailSender/Payoneer/img/Default/BlocksTemplate/fb.jpg" alt=""></a></li>
                        <li><a href=""><img src="https://ci6.googleusercontent.com/proxy/IrEOgUYJAxNOXCfkCzRhp3Pr5plttxi_SK_vo7HZtMFa9MnD5KZqMxD0PxnsIjARnAifRp7OuUYYY20Bx98L__qgfC-G266Bqx7WcwKAYkekf1hLO0pZhaVmV4UfPbaFNGY=s0-d-e1-ft#http://pubs.payoneer.com/EmailSender/Payoneer/img/Default/BlocksTemplate/tw.jpg" alt=""></a></li>
                        <li><a href=""><img src="https://ci6.googleusercontent.com/proxy/BBjsFigvYDp0PT-b94ETYc7WSfGfoM6FGTJqeLE4twWSHEMs_hzt4NjPmtA_RkcJUPXv2xZI6yLiYsgSEpldVZ49jzuRngt2mFvNZCkGxGhGitIl9O7XVqsilGoehTQNH9c=s0-d-e1-ft#http://pubs.payoneer.com/EmailSender/Payoneer/img/Default/BlocksTemplate/gp.jpg" alt=""></a></li>
                        <li><a href=""><img src="https://ci6.googleusercontent.com/proxy/KSBDtD0zHbN5XeL5qH34sW3-l80xoG-w0BBfwWJAKOpm5TzMSQdySc4IybYGoQHKjT_Wo3UDUSeCtTIWDxoIky3CVQs4NQ208Te17XQNfgN2coi-_NX4ppd5lt40uL9B-LE=s0-d-e1-ft#http://pubs.payoneer.com/EmailSender/Payoneer/img/Default/BlocksTemplate/li.jpg" alt=""></a></li>
                       </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
</body>
</html>
         
        `
    
     })
    
  } catch (error) {
    console.log(error.message);
    
  }
 }


