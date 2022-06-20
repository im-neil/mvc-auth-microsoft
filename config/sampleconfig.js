exports.creds = {
  identityMetadata: 'https://login.microsoftonline.com/<insert-tenant>.onmicrosoft.com/v2.0/.well-known/openid-configuration',

  clientID: '<insert-client-id>',

  clientSecret: '<insert-client-secret>',

  responseType: 'code id_token',

  responseMode: 'form_post',

  redirectUrl: 'http://localhost:2121/auth/openid/return',

  allowHttpForRedirectUrl: true,

  validateIssuer: false,

  issuer: null,

  passReqToCallback: false,

  useCookieInsteadOfSession: false,

  cookieEncryptionKeys: [
    { key: '12345678901234567890123456789011', iv: '123456789011' },
    { key: 'abcdefghijklmnopqrstuvwxyzabcdee', iv: 'abcdefghijkk' },
  ],

  scope: ['profile', 'email', 'offline_access'],

  loggingLevel: false,

  nonceLifetime: null,

  nonceMaxAmount: 5,

  clockSkew: null,
}

exports.destroySessionUrl = 'http://localhost:2121'
