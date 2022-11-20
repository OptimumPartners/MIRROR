import axios from 'axios'
import { SENDER_EMAIL, SENDGRID_API_KEY, EMAIL_TEMPLATE_ID } from '@env'

const sendEmail = async (to, result, answers) => {

    const data = {
        "from": {
            "email": SENDER_EMAIL
        },
        "personalizations": [
            {
                "to": [
                    {
                        "email": to
                    }
                ],
                "dynamic_template_data": {
                    "result": result,
                    "answers": answers
                }
            }
        ],
        "template_id": EMAIL_TEMPLATE_ID

    }

    const config = {
        method: 'post',
        url: 'https://api.sendgrid.com/v3/mail/send',
        headers: {
            'Authorization': `Bearer ${SENDGRID_API_KEY}`,
            'Content-Type': 'application/json'
        },
        data: data
    };

    return await axios(config)
        .then(() => {
            console.log('sent');
            return true
        })
        .catch(function (error) {
            console.log('ERROR', error.response.data);
            return false
        });
}

export default sendEmail
