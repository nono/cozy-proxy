cozydb = require 'cozydb'
Client = require('request-json').JsonClient
urlHelper = require 'cozy-url-sdk'

helpers      = require '../lib/helpers'
timezones    = require '../lib/timezones'
localization = require '../lib/localization_manager'
ArrayHelper = require '../lib/array_helper'
passwordHelper = require '../lib/password_helper'

client = new Client urlHelper.dataSystem.url()
if process.env.NODE_ENV in ['production', 'test']
    client.setBasicAuth process.env.NAME, process.env.TOKEN

# hardcoded onboarding steps order and slug names
# TODO: find a way to define those step only server side or only client site.
ONBOARDING_STEPS = [
    'welcome',
    'agreement',
    'password',
    'infos',
    'accounts',
    'confirmation'
]

LAST_UNAUTHENTICATED_STEP = 'password'

fixOnboardedSteps = (user) ->
    user.onboardedSteps = user.onboardedSteps or []
    # It seems that there is a bug, string Arrays are fetched like following:
    # [['text']] instead of ['text']
    # So until it's fixed, we prevent this issue by mapping the desired values
    # it the first array object is an array.
    if Array.isArray user.onboardedSteps[0]
        user.onboardedSteps = user.onboardedSteps[0]
    return user

module.exports = User = cozydb.getModel 'User',
    email: String
    password: String
    salt: String
    public_name: String
    timezone: String
    owner: Boolean
    allow_stats: Boolean
    isCGUaccepted: Boolean
    activated: Boolean
    encryptedOtpKey: String
    hotpCounter: Number
    authType: String
    encryptedRecoveryCodes: Array
    onboardedSteps: Array


User.createNew = (data, callback) ->
    data.docType = "User"
    client.post "user/", data, (err, res, body) ->
        if err? then callback err
        else if res.statusCode isnt 201
            err = "#{res.statusCode} -- #{body}"
            callback err
        else
            callback()


User::merge = (data, callback) ->
    client.put "user/merge/#{@id}/", data, (err, res, body) ->
        if err? then callback err
        else if res.statusCode is 404
            callback new Error "Model does not exist"
        else if res.statusCode isnt 200
            err = "#{res.statusCode} -- #{body}"
            callback err
        else
            callback()


User.first = (callback) ->
    User.request 'all', (err, users) ->
        if err then callback err
        else if not users or users.length is 0 then callback null, null
        else
            user = fixOnboardedSteps users[0]
            callback null, user


User.getUsername = (callback) ->
    User.first (err, user) ->
        return callback err if err

        return callback() unless user and user.public_name

        callback null, user.public_name


User.validate = (data, errors = {}) ->
    ['public_name', 'email', 'timezone'].reduce((errors, field) ->
        if not(typeof data[field] is 'undefined') \
                and data[field].trim().length is 0
            errors[field] = "missing #{field}"
        return errors
    , errors)

    if data.email and not helpers.checkEmail data.email
        errors.email = 'invalid email format'

    if data.timezone and not (data.timezone in timezones)
        errors.timezone = 'invalid timezone'

    return errors


User.checkInfos = (data) ->
    hasEmail = if data.email then helpers.checkEmail(data.email) else false
    hasUserName = data?.public_name
    hasTimezone = if data.timezone
        not (timezones.indexOf(data.timezone) is -1)
    else
        false
    return hasEmail and hasUserName and hasTimezone


User.validatePassword = (password, errors = {}) ->
    if not password
        errors.password = localization.t 'password missing'
    else
        passwordStrength = passwordHelper.getStrength password
        if passwordStrength.label is 'weak'
            errors.password = localization.t 'password too weak'

    return errors


# Returns true if user is complete and is ready to log into his Cozy.
# At this time this memthod check only if the user has completed all onboarding
# steps.
User.isRegistered = (userData) ->
    hasCompletedOnboarding = ArrayHelper.areEquals userData?.onboardedSteps,
        ONBOARDING_STEPS

    # Old user existing before onboarding refactor
    isLegacyUser = userData and userData.password and \
        (not userData.onboardedSteps or not userData.onboardedSteps.length)

    return hasCompletedOnboarding or isLegacyUser


# Returns true if the user data contains enough informations fotr cozy
# authentication
User.isAuthenticatable = (userData) ->
    return false unless userData?.onboardedSteps?

    hasCompletedLastNotAuthenticatedStep = \
        LAST_UNAUTHENTICATED_STEP in userData.onboardedSteps

    hasPassword = userData and userData.password and userData.salt

    return hasCompletedLastNotAuthenticatedStep and hasPassword
