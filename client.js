const { createClient } = require('contentful/dist/contentful.browser.min.js')
import { CONTENTFUL_SPACE_ID, CONTENTFUL_ACCESS_TOKEN } from '@env'
const client = createClient(
    {
        accessToken: CONTENTFUL_ACCESS_TOKEN,
        space: CONTENTFUL_SPACE_ID,
    }
)

export const getContentfulData = (entryID) => {
    return client.getEntry(entryID).then(response => {
        return response.fields
    }).catch(err => console.log(err))
}