import supertokens from 'supertokens-node'
import Dashboard from 'supertokens-node/recipe/dashboard'
import Session from 'supertokens-node/recipe/session'
import EmailPassword from 'supertokens-node/recipe/emailpassword'
import jwt from 'supertokens-node/recipe/jwt'
import UserRoles from 'supertokens-node/recipe/userroles'

supertokens.init({
  framework: 'fastify',
  supertokens: {
    // https://try.supertokens.com is for demo purposes. Replace this with the address of your core instance (sign up on supertokens.com), or self host a core.
    connectionURI: 'http://localhost:3567'
    // apiKey: <API_KEY(if configured)>,
  },
  appInfo: {
    // learn more about this on https://supertokens.com/docs/session/appinfo
    appName: 'labnoc',
    apiDomain: 'http://localhost:3000',
    websiteDomain: 'http://localhost',
    apiBasePath: '/auth',
    websiteBasePath: '/login'
  },
  recipeList: [
    EmailPassword.init(),
    Session.init(),
    jwt.init(),
    UserRoles.init(),
    Dashboard.init({
      apiKey: process.env.SUPERTOKENS_API_KEY ?? 'password'
    })
  ]
})
