const OIDCStrategy = require('passport-azure-ad').OIDCStrategy
const mongoose = require('mongoose')
const config = require('../config/config')
const User = require('../models/User')

module.exports = function (passport) {
  passport.use(
    new OIDCStrategy(
      {
        identityMetadata: config.creds.identityMetadata,
        clientID: config.creds.clientID,
        responseType: config.creds.responseType,
        responseMode: config.creds.responseMode,
        redirectUrl: config.creds.redirectUrl,
        allowHttpForRedirectUrl: config.creds.allowHttpForRedirectUrl,
        clientSecret: config.creds.clientSecret,
        validateIssuer: config.creds.validateIssuer,
        isB2C: config.creds.isB2C,
        issuer: config.creds.issuer,
        passReqToCallback: config.creds.passReqToCallback,
        scope: config.creds.scope,
        loggingLevel: config.creds.loggingLevel,
        nonceLifetime: config.creds.nonceLifetime,
        nonceMaxAmount: config.creds.nonceMaxAmount,
        useCookieInsteadOfSession: config.creds.useCookieInsteadOfSession,
        cookieEncryptionKeys: config.creds.cookieEncryptionKeys,
        clockSkew: config.creds.clockSkew,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          let user = await User.findOne({ microsoftId: profile.oid })
          if (user) {
            // update user info if needed
            if (user.displayName !== profile.displayName || user.email !== profile._json.email) {
              console.log('user info changed')
              user.overwrite({
                microsoftId: profile.oid,
                displayName: profile.displayName,
                email: profile._json.email,
              })
              try {
                await user.save()
              } catch (error) {
                console.log('passport.js: Error updating user')
                console.log(error)
              }
            }
          } else {
            // create new user
            const newUser = {
              microsoftId: profile.oid,
              displayName: profile.displayName,
              email: profile._json.email,
            }
            try {
              user = await User.create(newUser)
            } catch (error) {
              console.log('passport.js: Error enrolling new user')
              console.log(error)
            }
          }
          done(null, user)
        } catch (err) {
          console.log('passport.js: Error in OIDCStrategy')
          console.error(err)
        }
      }
    )
  )

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user))
  })
}
