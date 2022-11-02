import axios from 'axios'
import { encode as btoa } from 'base-64'

const sendEmail = async () => {
    const data = new FormData();
    data.append('from', 'yousef yousef.alramli@optimumpartners.co');
    data.append('to', 'yousef.alramli@sociumtech.com');
    data.append('subject', 'Hello');
    data.append('text', 'Testing some Mailgun awesomeness!');

    var config = {
        method: 'post',
        url: 'https://api.mailgun.net/v3/sandbox683c9bf662344cc0ae2abb68f03c73b7.mailgun.org/messages',
        headers: {
            'Authorization': `Basic ${btoa(`api:78cb713dc477615bcdafc848209f1213-31eedc68-c9af605e`)}`,
        },
        data
    };

    await axios(config).then(function (response) {
          console.log(JSON.stringify(response.data));
        })
}

export default sendEmail
