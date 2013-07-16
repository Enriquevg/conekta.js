publishable_token = null

window.conekta = 
  _helpers:
    x_domain_post:(params)->
      type = 'POST'
      dataType = 'JSON'
      if navigator.userAgent.match(/MSIE [67]+/)
        dataType = 'JSONP'
        type = 'GET'

      jQuery.ajax(
        url: 'https://paymentsapi-dev.herokuapp.com/' + params.url + '.json'
        type:type
        dataType:dataType
        data:params.data
        headers:
          'Authorization':('Token token="' + conekta.getPublishableToken() + '"')
        success:(data, textStatus, jqXHR)->
          params.success(data)
        error:(jqXHR, textStatus, errorThrown)->
          params.error(JSON.parse(jqXHR.responseText || "{}"))
      )

    log:(data)->
      if console and console.log
        console.log(data)

conekta.setPublishableToken = (token)->
  if typeof token == 'string' and token.match(/^[a-zA-Z0-9]*$/) and token.length >= 20 and token.length < 30
    publishable_token = token
  else
    conekta._helpers.log('Unusable public token: ' + token)
  return

conekta.getPublishableToken = ()->
  publishable_token
