
conekta.charge = {}

conekta.charge.new = (charge, success_callback, failure_callback)->
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
          if jQuery('div#conekta_iframe_wrapper').length == 0 
            jQuery('body').append('<div id="conekta_iframe_wrapper" style="position: absolute; left: 50%;top:50%;"></div>')
          socket = new easyXDM.Socket(
            swf:"https://s3.amazonaws.com/conekta_api/flash/easyxdm.swf"
            remote: "https://paymentsapi-dev.herokuapp.com/iframe_proxy.html"#charges/banorte_3d_secure_response"
            container:'conekta_iframe_wrapper'
            props:
              style:
                width:'376px'
                height:'400px'
                position: 'relative'
                left: '-188px'
                'margin-top':'-200px'
                'overflow-x':'hidden'
                'overflow-y':'hidden'
              scrolling:'no'
            #container:"conekta_3_d_secure"
            onMessage:(message, origin)->
              parsed_message = JSON.parse(message)
              if parsed_message.type and parsed_message.message
                failure_callback(message)
              else
                success_callback(message)
              socket.destroy()
              $('#conekta_iframe_wrapper').remove()
          )
          socket.postMessage(JSON.stringify(data.card.redirect_form))
        else
          success_callback(data)
      error:failure_callback
    )
  else
    failure_callback(
      'type':'invalid_request_error'
      'message':"Supplied parameter 'charge' is not a javascript object"
    )
