(function() {
  var getOrPostRegEx, httpRegEx, jsonRegEx, sameSchemeRegEx, xmlRegEx;

  if (!jQuery.support.cors && jQuery.ajaxTransport && window.XDomainRequest) {
    httpRegEx = /^https?:\/\//i;
    getOrPostRegEx = /^get|post|put|delete$/i;
    sameSchemeRegEx = new RegExp("^" + location.protocol, "i");
    jsonRegEx = /\/json/i;
    xmlRegEx = /\/xml/i;
    jQuery.ajaxTransport("text html xml json", function(options, userOptions, jqXHR) {
      var userType, xdr;
      if (location.protocol.match(/^http:$/)) {
        options.url = options.url.replace(/^https/, 'http');
      }
      if (options.crossDomain && options.async && getOrPostRegEx.test(options.type) && httpRegEx.test(options.url) && sameSchemeRegEx.test(options.url)) {
        xdr = null;
        userType = (userOptions.dataType || "").toLowerCase();
        return {
          send: function(headers, complete) {
            var data_hash, first_part, last_index_of, last_part, postData;
            xdr = new XDomainRequest();
            if (/^\d+$/.test(userOptions.timeout)) {
              xdr.timeout = userOptions.timeout;
            }
            xdr.ontimeout = function() {
              return complete(500, "timeout");
            };
            xdr.onload = function() {
              var allResponseHeaders, doc, e, parseMessage, responses, status;
              allResponseHeaders = "Content-Length: " + xdr.responseText.length + "\r\nContent-Type: " + xdr.contentType;
              status = {
                code: 200,
                message: "success"
              };
              responses = {
                text: xdr.responseText
              };
              try {
                if ((userType === "json") || ((userType !== "text") && jsonRegEx.test(xdr.contentType))) {
                  try {
                    return responses.json = jQuery.parseJSON(xdr.responseText);
                  } catch (_error) {
                    e = _error;
                    status.code = 500;
                    return status.message = "parseerror";
                  }
                } else if ((userType === "xml") || ((userType !== "text") && xmlRegEx.test(xdr.contentType))) {
                  doc = new ActiveXObject("Microsoft.XMLDOM");
                  doc.async = false;
                  try {
                    doc.loadXML(xdr.responseText);
                  } catch (_error) {
                    e = _error;
                    doc = undefined;
                  }
                  if (!doc || !doc.documentElement || doc.getElementsByTagName("parsererror").length) {
                    status.code = 500;
                    status.message = "parseerror";
                    throw "Invalid XML: " + xdr.responseText;
                  }
                  return responses.xml = doc;
                }
              } catch (_error) {
                parseMessage = _error;
                throw parseMessage;
              } finally {
                complete(status.code, status.message, responses, allResponseHeaders);
              }
            };
            xdr.onprogress = function() {};
            xdr.onerror = function() {
              return complete(500, "error", {
                text: xdr.responseText
              });
            };
            if (options.type.toLowerCase() === 'put') {
              options.type = 'post';
              last_index_of = options.url.lastIndexOf('/');
              if (last_index_of > 0) {
                first_part = options.url.substring(0, last_index_of + 1);
                last_part = options.url.substring(last_index_of + 1, options.url.length - 1);
                options.url = first_part + 'update/' + last_part;
              }
            }
            if (options.type.toLowerCase() === 'delete') {
              options.type = 'post';
              last_index_of = options.url.lastIndexOf('/');
              if (last_index_of > 0) {
                first_part = options.url.substring(0, last_index_of + 1);
                last_part = options.url.substring(last_index_of + 1, options.url.length - 1);
                options.url = first_part + 'destroy/' + last_part;
              }
            }
            if (options['headers']['Authorization']) {
              if (options.url.match(/\?/)) {
                options.url = options.url + '&auth_token=' + options['headers']['Authorization'].replace(/Token token\=\"/, '').replace(/"/, '');
              } else {
                options.url = options.url + '?auth_token=' + options['headers']['Authorization'].replace(/Token token\=\"/, '').replace(/"/, '');
              }
            }
            data_hash = userOptions.data;
            if (typeof userOptions.data === 'string') {
              data_hash = JSON.parse(userOptions.data);
            }
            postData = (userOptions.data && jQuery.param(data_hash)) || "";
            xdr.open(options.type, options.url);
            return xdr.send(postData);
          },
          abort: function() {
            if (xdr) {
              return xdr.abort();
            }
          }
        };
      }
    });
  }

}).call(this);

(function() {
  var publishable_token;

  publishable_token = null;

  window.conekta = {
    _helpers: {
      x_domain_post: function(params) {
        var dataType, type;
        type = 'POST';
        dataType = 'JSON';
        if (navigator.userAgent.match(/MSIE [67]+/)) {
          dataType = 'JSONP';
          type = 'GET';
          params.url = params.jsonp_url || params.url;
          params.data.auth_token = conekta.getPublishableToken();
        }
        params.data._js = true;
        return jQuery.ajax({
          url: 'https://paymentsapi-dev.herokuapp.com/' + params.url + '.json',
          type: type,
          dataType: dataType,
          data: params.data,
          headers: {
            'Authorization': 'Token token="' + conekta.getPublishableToken() + '"'
          },
          success: function(data, textStatus, jqXHR) {
            if (!data || (data.type && data.message)) {
              return params.error(data || {
                type: 'api_error',
                message: "Something went wrong on Conekta's end"
              });
            } else {
              return params.success(data);
            }
          },
          error: function() {
            return params.error({
              type: 'api_error',
              message: 'Something went wrong, possibly a connectivity issue'
            });
          }
        });
      },
      log: function(data) {
        if (console && console.log) {
          return console.log(data);
        }
      }
    }
  };

  conekta.setPublishableToken = function(token) {
    if (typeof token === 'string' && token.match(/^[a-zA-Z0-9]*$/) && token.length >= 20 && token.length < 30) {
      publishable_token = token;
    } else {
      conekta._helpers.log('Unusable public token: ' + token);
    }
  };

  conekta.getPublishableToken = function() {
    return publishable_token;
  };

}).call(this);

(function() {
  conekta.charge = {};

  conekta.charge.preauthorizePayment = function(charge, success_callback, failure_callback) {
    if (typeof success_callback !== 'function') {
      success_callback = conekta._helpers.log;
    }
    if (typeof failure_callback !== 'function') {
      failure_callback = conekta._helpers.log;
    }
    if (typeof charge === 'object') {
      return conekta._helpers.x_domain_post({
        jsonp_url: 'charges/create',
        url: 'charges',
        data: charge,
        success: function(data) {
          var form;
          if (data && data.card && data.card.redirect_form) {
            form = jQuery("<form></form>");
            form.attr("style", "display:none;");
            form.attr("action", data.card.redirect_form.url);
            form.attr("method", data.card.redirect_form.action);
            jQuery.each(data.card.redirect_form.attributes, function(key, value) {
              return form.append(jQuery("<input/>").attr("type", "hidden").attr("name", key).val(value));
            });
            jQuery("body").append(form);
            form.submit();
            return form.remove();
          } else {
            return success_callback(data);
          }
        },
        error: failure_callback
      });
    } else {
      return failure_callback({
        'type': 'invalid_request_error',
        'message': "Supplied parameter 'charge' is not a javascript object"
      });
    }
  };

}).call(this);

(function() {
  var accepted_cards, card_types, get_card_type, is_valid_length, is_valid_luhn,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  card_types = [
    {
      name: 'amex',
      pattern: /^3[47]/,
      valid_length: [15]
    }, {
      name: 'diners_club_carte_blanche',
      pattern: /^30[0-5]/,
      valid_length: [14]
    }, {
      name: 'diners_club_international',
      pattern: /^36/,
      valid_length: [14]
    }, {
      name: 'jcb',
      pattern: /^35(2[89]|[3-8][0-9])/,
      valid_length: [16]
    }, {
      name: 'laser',
      pattern: /^(6304|670[69]|6771)/,
      valid_length: [16, 17, 18, 19]
    }, {
      name: 'visa_electron',
      pattern: /^(4026|417500|4508|4844|491(3|7))/,
      valid_length: [16]
    }, {
      name: 'visa',
      pattern: /^4/,
      valid_length: [16]
    }, {
      name: 'mastercard',
      pattern: /^5[1-5]/,
      valid_length: [16]
    }, {
      name: 'maestro',
      pattern: /^(5018|5020|5038|6304|6759|676[1-3])/,
      valid_length: [12, 13, 14, 15, 16, 17, 18, 19]
    }, {
      name: 'discover',
      pattern: /^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)/,
      valid_length: [16]
    }
  ];

  is_valid_luhn = function(number) {
    var digit, n, sum, _i, _len, _ref;
    sum = 0;
    _ref = number.split('').reverse();
    for (n = _i = 0, _len = _ref.length; _i < _len; n = ++_i) {
      digit = _ref[n];
      digit = +digit;
      if (n % 2) {
        digit *= 2;
        if (digit < 10) {
          sum += digit;
        } else {
          sum += digit - 9;
        }
      } else {
        sum += digit;
      }
    }
    return sum % 10 === 0;
  };

  is_valid_length = function(number, card_type) {
    var _ref;
    return _ref = number.length, __indexOf.call(card_type.valid_length, _ref) >= 0;
  };

  accepted_cards = ['visa', 'mastercard'];

  get_card_type = function(number) {
    var card, card_type, _i, _len, _ref;
    _ref = (function() {
      var _j, _len, _ref, _results;
      _results = [];
      for (_j = 0, _len = card_types.length; _j < _len; _j++) {
        card = card_types[_j];
        if (_ref = card.name, __indexOf.call(accepted_cards, _ref) >= 0) {
          _results.push(card);
        }
      }
      return _results;
    })();
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      card_type = _ref[_i];
      if (number.match(card_type.pattern)) {
        return card_type;
      }
    }
    return null;
  };

  conekta.card = {};

  conekta.card.getBrand = function(number) {
    var brand;
    if (typeof number === 'string') {
      number = number.replace(/[ -]/g, '');
    } else if (typeof number === 'number') {
      number = toString(number);
    }
    brand = get_card_type(number);
    if (brand && brand.name) {
      return brand.name;
    }
    return null;
  };

  conekta.card.validateCVC = function(cvc) {
    if ((typeof cvc === 'number' && cvc >= 0 && cvc < 10000) || (typeof cvc === 'string' && cvc.match(/^[\d]{3,4}$/))) {
      return true;
    } else {
      return false;
    }
  };

  conekta.card.validateExpiry = function(month, year) {
    if (typeof month === 'string' && month.match(/^[\d]{1,2}$/)) {
      month = parseInt(month);
    }
    if (year.match(/^([\d]{2,2}|20[\d]{2,2})$/)) {
      if (typeof year === 'string' && year.match(/^([\d]{2,2})$/)) {
        year = '20' + year;
      }
      year = parseInt(year);
    }
    if ((typeof month === 'number' && month > 0 && month < 13) && (typeof year === 'number' && year > 2012 && year < 2050)) {
      return Date.parse(month + '/' + new Date(year, month, 0).getDate() + '/' + year) > Date.now();
    } else {
      return false;
    }
  };

  conekta.card.validateNumber = function(number) {
    var card_type, length_valid, luhn_valid;
    if (typeof number === 'string') {
      number = number.replace(/[ -]/g, '');
    } else if (type(number === 'number')) {
      number = toString(number);
    }
    card_type = get_card_type(number);
    luhn_valid = false;
    length_valid = false;
    if (card_type != null) {
      luhn_valid = is_valid_luhn(number);
      length_valid = is_valid_length(number, card_type);
    }
    return luhn_valid && length_valid;
  };

}).call(this);
