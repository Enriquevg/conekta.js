publishable_key = null

window.Conekta = 
  _helpers:
    x_domain_post:(params)->
      type = 'POST'
      dataType = 'JSON'
      if navigator.userAgent.match(/MSIE [6789]+/) or document.location.protocol == 'file:'
        dataType = 'JSONP'
        type = 'GET'
        params.url = (params.jsonp_url || params.url) + '.js'
        params.data.auth_token = Conekta.getPublishableKey()
        params.data['Accept'] = 'application/vnd.conekta-v0.1.0+json; charset=utf-8'
      else
        params.url = params.url + '.json'

      params.data['RaiseHtmlError'] = false
      jQuery.ajax(
        url: 'https://api.conekta.io/' + params.url
        type: type
        #dataType: dataType
        data: params.data
        headers:
          'Accept': "application/vnd.conekta-v0.1.0+json; charset=utf-8"
        username: Conekta.getPublishableKey()
        password: ''
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

Conekta.setPublishableKey = (token)->
  if typeof token == 'string' and token.match(/^[a-zA-Z0-9_]*$/) and token.length >= 20 and token.length < 30
    publishable_key = token
  else
    Conekta._helpers.log('Unusable public token: ' + token)
  return

Conekta.getPublishableKey = ()->
  publishable_key

#This method is aliased to support older versions but has been deprecated
Conekta.setPublishableToken = Conekta.setPublishableKey
Conekta.getPublishableToken = Conekta.getPublishableKey

