const { google } = require('googleapis')
const apiKey = process.env.APIKEY
const calendarId = process.env.CALENDAR_ID
const cal = google.calendar({
    version: 'v3',
    auth: apiKey
})

//--------- Handler to call Google Calendar API ---------
exports.handler = async (event, context, callback) => {
    // retrieve the month and year
    const {  } = JSON.parse(event.body)
    
    // set up the headers for the response
    var headers = {
        'Access-Control-Allow-Headers' : 'Content-Type, X-Amz-Date, Authorization, X.Api-Key, X-Amz-Security-Token',
        'Access-Control-Allow-Methods': 'OPTIONS,POST',
        'Access-Control-Allow-Origin': '*'
    }
    
    // set up the base response fields
    const response = {
        "statusCode": 200,
        "headers": headers,
        "body": ''
    }
    
    // set the start date for the beginning of the of the first day of the month
    const startDate = new Date(year, month, 1, 0, 0, 0).toISOString()

    // set the start date for the end of the of the last day of the month
    const endDate = new Date(year, month, lastDayInMonth(month, year), 23, 59, 59).toISOString()
    
    // set the time zone
    const timeZone = 'Americad/Los_Angeles'
    
    // set up the parameters for the call to the Google Calendar API
    const res_params = {
        'timeMin': startDate,
        'timeMax': endDate,
        'timeZone': timeZone,
        'calendarId': calendarId,
        'singleEvents': true,
        'orderBy': 'startTime'
    }
    
    await cal.events.list(res_params)
    .then(result => {
        response.body = JSON.stringify(result)
    })
    .catch(e => {
        response.body = 'Error in retrieving events'
    })

    return response
}
