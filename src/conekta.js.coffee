publishable_token = null

window.conekta = 
  _helpers:
    x_domain_post:(params)->
      type = 'POST'
      dataType = 'JSON'
      if navigator.userAgent.match(/MSIE [67]+/)
        dataType = 'JSONP'
        type = 'GET'
        params.url = params.jsonp_url || params.url
        params.data.auth_token = conekta.getPublishableToken()

      params.data._js = true
      jQuery.ajax(
        url: 'https://paymentsapi-dev.herokuapp.com/' + params.url + '.json'
        type: type
        dataType: dataType
        data: params.data
        headers:
          'Authorization': ('Token token="' + conekta.getPublishableToken() + '"')
        success: (data, textStatus, jqXHR)->
          if ! data or (data.type and data.message)
            params.error(data || {
              type:'api_error',
              message:"Something went wrong on Conekta's end"
            })
          else
            params.success(data)
        error:()->
          params.error({
            type:'api_error',
            message:'Something went wrong, possibly a connectivity issue'
          })
      )

    log: (data)->
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
