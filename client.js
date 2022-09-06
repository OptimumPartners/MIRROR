const { createClient } = require('contentful/dist/contentful.browser.min.js')
import { CONTENTFUL_SPACE_ID, CONTENTFUL_ACCESS_TOKEN } from './env/env.json'
const client = createClient(
    {
        accessToken: CONTENTFUL_ACCESS_TOKEN,
        space: CONTENTFUL_SPACE_ID,
    }
)

export const getContentfulData = (entryID) => {
    return client.getEntry(entryID).then(response => {
        console.log('response.fields: ', response.fields);
        return response.fields
    }).catch(err => console.log(err))
}