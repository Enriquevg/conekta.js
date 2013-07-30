/*!conekta.js v0.1.0 | 2013- Conekta | https://github.com/conekta/conekta.js/blob/master/LICENSE-MIT.txt
*/


(function() {


}).call(this);

(function() {
  var publishable_token;

  publishable_token = null;

  window.Conekta = {
    _helpers: {
      x_domain_post: function(params) {
        var dataType, type;
        type = 'POST';
        dataType = 'JSON';
        if (navigator.userAgent.match(/MSIE [6789]+/)) {
          dataType = 'JSONP';
          type = 'GET';
          params.url = (params.jsonp_url || params.url) + '.js';
          params.data.auth_token = Conekta.getPublishableToken();
        } else {
          params.url = params.url + '.json';
        }
        params.data._js = true;
        return jQuery.ajax({
          url: 'https://api.conekta.io/' + params.url,
          type: type,
          dataType: dataType,
          data: params.data,
          headers: {
            'Authorization': 'Token token="' + Conekta.getPublishableToken() + '"'
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

  Conekta.setPublishableToken = function(token) {
    if (typeof token === 'string' && token.match(/^[a-zA-Z0-9]*$/) && token.length >= 20 && token.length < 30) {
      publishable_token = token;
    } else {
      Conekta._helpers.log('Unusable public token: ' + token);
    }
  };

  Conekta.getPublishableToken = function() {
    return publishable_token;
  };

}).call(this);

(function() {
  var parse_form;

  parse_form = function($form) {
    var charge;
    charge = {};
    $form.find('input[data-conekta]').each(function(i, input) {
      var $input, attribute, attributes, last_attribute, node, parent_node, val, _i, _len;
      $input = $(input);
      val = $input.val();
      attributes = $input.data('conekta').replace(/\]/, '').replace(/\-/, '_').split(/\[/);
      parent_node;
      node = charge;
      last_attribute = null;
      for (_i = 0, _len = attributes.length; _i < _len; _i++) {
        attribute = attributes[_i];
        if (!node[attribute]) {
          node[attribute] = {};
        }
        parent_node = node;
        last_attribute = attribute;
        node = node[attribute];
      }
      return parent_node[last_attribute] = val;
    });
    return charge;
  };

  Conekta.charge = {};

  Conekta.charge.create = function(charge, success_callback, failure_callback) {
    if (typeof success_callback !== 'function') {
      success_callback = Conekta._helpers.log;
    }
    if (typeof failure_callback !== 'function') {
      failure_callback = Conekta._helpers.log;
    }
    if (jQuery && charge instanceof jQuery) {
      charge = parse_form(charge);
    }
    if (typeof charge === 'object') {
      charge._js = true;
      return Conekta._helpers.x_domain_post({
        jsonp_url: 'charges/create',
        url: 'charges',
        data: charge,
        success: function(data) {
          var socket;
          if (data && data.card && data.card.redirect_form) {
            if (jQuery('div#conekta_iframe_wrapper').length === 0) {
              jQuery('body').append('<div id="conekta_iframe_wrapper" style="position: absolute; left: 50%;top:50%;"></div>');
            }
            socket = new easyXDM.Socket({
              swf: "https://s3.amazonaws.com/conekta_api/flash/easyxdm.swf",
              remote: "https://api.conekta.io/iframe_proxy.html",
              container: 'conekta_iframe_wrapper',
              props: {
                style: {
                  width: '376px',
                  height: '400px',
                  position: 'relative',
                  left: '-188px',
                  'margin-top': '-200px',
                  'overflow-x': 'hidden',
                  'overflow-y': 'hidden'
                },
                scrolling: 'no'
              },
              onMessage: function(message, origin) {
                var parsed_message;
                parsed_message = JSON.parse(message);
                if (parsed_message.type && parsed_message.message) {
                  failure_callback(parsed_message);
                } else {
                  success_callback(parsed_message);
                }
                socket.destroy();
                return $('#conekta_iframe_wrapper').remove();
              }
            });
            return socket.postMessage(JSON.stringify(data.card.redirect_form));
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

  Conekta.card = {};

  Conekta.card.getBrand = function(number) {
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

  Conekta.card.validateCVC = function(cvc) {
    if ((typeof cvc === 'number' && cvc >= 0 && cvc < 10000) || (typeof cvc === 'string' && cvc.match(/^[\d]{3,4}$/))) {
      return true;
    } else {
      return false;
    }
  };

  Conekta.card.validateExpiry = function(month, year) {
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

  Conekta.card.validateNumber = function(number) {
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
