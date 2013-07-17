conekta.charge = {}

conekta.charge.preauthorizePayment = (charge, success_callback, failure_callback)->
  if typeof success_callback != 'function'
    success_callback = conekta._helpers.log

  if typeof failure_callback != 'function'
    failure_callback = conekta._helpers.log

  if typeof charge == 'object'
    #charge.capture = false
    conekta._helpers.x_domain_post(
      jsonp_url:'charges/create'#'https://paymentsapi-dev.herokuapp.com'
      url:'charges'#'https://paymentsapi-dev.herokuapp.com'
      data:charge
      success:(data)->
        if data and data.card and data.card.redirect_form
          form = jQuery("<form></form>")
          form.attr "style", "display:none;"
          form.attr "action", data.card.redirect_form.url
          form.attr "method", data.card.redirect_form.action
          jQuery.each data.card.redirect_form.attributes, (key, value) ->
            form.append jQuery("<input/>").attr("type", "hidden").attr("name", key).val(value)

          jQuery("body").append form
          form.submit()
          form.remove()
        else
          success_callback(data)
      error:failure_callback
    )
  else
    failure_callback(
      'type':'invalid_request_error'
      'message':"Supplied parameter 'charge' is not a javascript object"
    )
