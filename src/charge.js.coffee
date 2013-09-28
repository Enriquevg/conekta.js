parse_form = (charge_form)->
  charge = {}
  if typeof charge_form == 'object'
    if typeof jQuery != 'undefined' and charge_form instanceof jQuery
      charge_form = charge_form.get()[0]

    if charge_form instanceof HTMLElement
      textareas = Array.prototype.slice.call(charge_form.getElementsByTagName('textarea'))
      inputs = Array.prototype.slice.call(charge_form.getElementsByTagName('input')).concat(textareas)
      for input in inputs 
        attribute_name = input.getAttribute('data-conekta')
        if attribute_name
          val = input.getAttribute('value') || input.innerHTML || input.value 
          attributes = attribute_name.replace(/\]/, '').replace(/\-/,'_').split(/\[/)

          parent_node = null
          node = charge
          last_attribute = null
          for attribute in attributes
            if ! node[attribute]
              node[attribute] = {}

            parent_node = node
            last_attribute = attribute
            node = node[attribute]

          parent_node[last_attribute] = val
    else
      charge = charge_form

  charge

Conekta.charge = {}

Conekta.charge.create = (charge_form, success_callback, failure_callback)->
  if typeof success_callback != 'function'
    success_callback = Conekta._helpers.log

  if typeof failure_callback != 'function'
    failure_callback = Conekta._helpers.log

  charge = parse_form(charge_form)
  charge.session_id = Conekta._helpers.getSessionId()

  if typeof charge == 'object'
    #charge.capture = false
    Conekta._helpers.xDomainPost(
      jsonp_url:'charges/create'#'https://api.conekta.io'
      url:'charges'#'https://api.conekta.io'
      data:charge
      success:success_callback
      error:failure_callback
    )
  else
    failure_callback(
      'object':'error'
      'type':'invalid_request_error'
      'message':"Supplied parameter 'charge' is not a javascript object"
    )
