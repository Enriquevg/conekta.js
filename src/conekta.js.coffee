publishable_token = null

window.Conekta = 
  _helpers:
    x_domain_post:(params)->
      type = 'POST'
      dataType = 'JSON'
      if navigator.userAgent.match(/MSIE [6789]+/)
        dataType = 'JSONP'
        type = 'GET'
        params.url = (params.jsonp_url || params.url) + '.js'
        params.data.auth_token = Conekta.getPublishableToken()
      else
        params.url = params.url + '.json'

      params.data['RaiseHtmlError'] = false
      jQuery.ajax(
        url: 'https://api.conekta.io/' + params.url
        type: type
        dataType: dataType
        data: params.data
        headers:
          'Authorization': ('Token token="' + Conekta.getPublishableToken() + '"')
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

Conekta.setPublishableToken = (token)->
  if typeof token == 'string' and token.match(/^[a-zA-Z0-9]*$/) and token.length >= 20 and token.length < 30
    publishable_token = token
  else
    Conekta._helpers.log('Unusable public token: ' + token)
  return

Conekta.getPublishableToken = ()->
  publishable_token
