import axios from 'axios'
import { encode as btoa } from 'base-64'

const sendEmail = async (to , result, answers) => {

    const data = {
        "from": {
            "email": "yousef.alramli@optimumpartners.co"
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
        "template_id": "d-6d4550fcb5e341ef9b3dd7d1bab50fd8"

    }

    const config = {
        method: 'post',
        url: 'https://api.sendgrid.com/v3/mail/send',
        headers: {
            'Authorization': 'Bearer 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',
            'Content-Type': 'application/json'
        },
        data: data
    };

    return await axios(config)
        .then(() => {
            return true
        })
        .catch(function (error) {
            console.log('ERROR', error);
            return false
        });
}

export default sendEmail
