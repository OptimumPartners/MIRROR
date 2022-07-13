const { createClient } = require('contentful/dist/contentful.browser.min.js')

export const client = createClient(
    {
        accessToken: "a41dq54gb5EMLDKYBY-MvppmGl_gp9rsi05b_avkSGY",
        space: "tbs95e3opt12",
    }
)