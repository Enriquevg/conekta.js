parse_form = (charge_form)->
  charge = {}
  if typeof charge_form == 'object'
    if typeof jQuery != 'undefined' and charge_form instanceof jQuery
      charge_form = charge_form.get()[0]

    if charge_form.nodeType
      textareas = charge_form.getElementsByTagName('textarea')
      inputs = charge_form.getElementsByTagName('input')
      all_inputs = new Array(textareas.length + inputs.length)

      for i in [0..textareas.length-1] by 1
        all_inputs[i] = textareas[i]

      for i in [0..inputs.length-1] by 1
        all_inputs[i+textareas.length] = inputs[i]

      for input in all_inputs
        if input
          attribute_name = input.getAttribute('data-conekta')
          if attribute_name
            val = input.getAttribute('value') || input.innerHTML || input.value 
            attributes = attribute_name.replace(/\]/g, '').replace(/\-/g,'_').split(/\[/)

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

    if charge.details && charge.details.line_items && Object.prototype.toString.call( charge.details.line_items ) != '[object Array]' && typeof charge.details.line_items == 'object'
      line_items = []
      for key of charge.details.line_items
        line_items.push(charge.details.line_items[key])
      charge.details.line_items = line_items

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
