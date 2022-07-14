import { API_CLIENT_TOKEN, API_SPACE_NAME } from "@env";
const { createClient } = require('contentful/dist/contentful.browser.min.js')

export const client = createClient(
    {
        accessToken: API_CLIENT_TOKEN,
        space: API_SPACE_NAME,
    }
)