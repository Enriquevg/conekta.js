# jQuery.XDomainRequest.js
# Author: Jason Moon - @JSONMOON, Modified by Leo Fischer @leofischer
# IE8+
if not jQuery.support.cors and jQuery.ajaxTransport and window.XDomainRequest
  httpRegEx = /^https?:\/\//i
  getOrPostRegEx = /^get|post|put|delete$/i
  sameSchemeRegEx = new RegExp("^" + location.protocol, "i")
  jsonRegEx = /\/json/i
  xmlRegEx = /\/xml/i
  # ajaxTransport exists in jQuery 1.5+
  jQuery.ajaxTransport "text html xml json", (options, userOptions, jqXHR) ->
    if location.protocol.match(/^http:$/)
      options.url = options.url.replace(/^https/,'http')
    
    # XDomainRequests must be: asynchronous, GET or POST methods, HTTP or HTTPS protocol, and same scheme as calling page
    if options.crossDomain and options.async and getOrPostRegEx.test(options.type) and httpRegEx.test(options.url) and sameSchemeRegEx.test(options.url)
      xdr = null
      userType = (userOptions.dataType or "").toLowerCase()
      send: (headers, complete) ->
        xdr = new XDomainRequest()
        xdr.timeout = userOptions.timeout  if /^\d+$/.test(userOptions.timeout)
        xdr.ontimeout = ->
          complete 500, "timeout"

        xdr.onload = ->
          allResponseHeaders = "Content-Length: " + xdr.responseText.length + "\r\nContent-Type: " + xdr.contentType
          status =
            code: 200
            message: "success"

          responses = text: xdr.responseText
          
          try
            if (userType is "json") or ((userType isnt "text") and jsonRegEx.test(xdr.contentType))
              try
                responses.json = jQuery.parseJSON(xdr.responseText)
              catch e
                status.code = 500
                status.message = "parseerror"
            
            #throw 'Invalid JSON: ' + xdr.responseText;
            else if (userType is "xml") or ((userType isnt "text") and xmlRegEx.test(xdr.contentType))
              doc = new ActiveXObject("Microsoft.XMLDOM")
              doc.async = false
              try
                doc.loadXML xdr.responseText
              catch e
                doc = `undefined`
              if not doc or not doc.documentElement or doc.getElementsByTagName("parsererror").length
                status.code = 500
                status.message = "parseerror"
                throw "Invalid XML: " + xdr.responseText
              responses.xml = doc
          catch parseMessage
            throw parseMessage
          finally
            complete status.code, status.message, responses, allResponseHeaders

        
        #set an empty handler for 'onprogress' so requests don't get aborted
        xdr.onprogress = ->

        xdr.onerror = ->
          complete 500, "error",
            text: xdr.responseText

        if options.type.toLowerCase() == 'put'
          options.type = 'post'
          last_index_of = options.url.lastIndexOf('/')

          if last_index_of > 0
            first_part = options.url.substring(0, last_index_of + 1)
            last_part = options.url.substring(last_index_of + 1, options.url.length - 1)
            options.url = first_part + 'update/' + last_part

        if options.type.toLowerCase() == 'delete'
          options.type = 'post'
          last_index_of = options.url.lastIndexOf('/')

          if last_index_of > 0
            first_part = options.url.substring(0, last_index_of + 1)
            last_part = options.url.substring(last_index_of + 1, options.url.length - 1)
            options.url = first_part + 'destroy/' + last_part

        #if options['headers']['Accept']
        options.url = options.url.replace(/paymentsapi-dev\.herokuapp\.com\//, 'paymentsapi-dev.herokuapp.com/v1/')

        if options['headers']['Authorization']
          if options.url.match(/\?/)
            options.url = options.url + '&auth_token=' + options['headers']['Authorization'].replace(/Token token\=\"/,'').replace(/"/,'')
          else
            options.url = options.url + '?auth_token=' + options['headers']['Authorization'].replace(/Token token\=\"/,'').replace(/"/,'')

        data_hash = userOptions.data
        if typeof userOptions.data == 'string'
          data_hash = JSON.parse(userOptions.data)

        postData = (userOptions.data and jQuery.param(data_hash)) or ""
        xdr.open options.type, options.url
        xdr.send postData

      abort: ->
        xdr.abort()  if xdr
