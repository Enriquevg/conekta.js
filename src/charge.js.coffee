parse_form = ($form)->
  charge = {}
  $form.find('input[data-conekta]').each((i, input)->
    $input = $(input)
    val = $input.val()
    attributes = $input.data('conekta').replace(/\]/, '').replace(/\-/,'_').split(/\[/)

    parent_node
    node = charge
    last_attribute = null
    for attribute in attributes
      if ! node[attribute]
        node[attribute] = {}

      parent_node = node
      last_attribute = attribute
      node = node[attribute]


    parent_node[last_attribute] = val
  )

  charge

Conekta.charge = {}

Conekta.charge.create = (charge, success_callback, failure_callback)->
  if typeof success_callback != 'function'
    success_callback = Conekta._helpers.log

  if typeof failure_callback != 'function'
    failure_callback = Conekta._helpers.log

  if jQuery and charge instanceof jQuery
    charge = parse_form(charge)

  if typeof charge == 'object'
    #charge.capture = false
    charge._js = true
    Conekta._helpers.x_domain_post(
      jsonp_url:'charges/create'#'https://api.conekta.io'
      url:'charges'#'https://api.conekta.io'
      data:charge
      success:success_callback
      error:failure_callback
    )
  else
    failure_callback(
      'type':'invalid_request_error'
      'message':"Supplied parameter 'charge' is not a javascript object"
    )
