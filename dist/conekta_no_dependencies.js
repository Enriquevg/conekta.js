/*!conekta.js v0.1.0 | 2013- Conekta | https://github.com/conekta/conekta.js/blob/master/LICENSE-MIT.txt
*/


(function() {


}).call(this);

(function() {
  var Base64, base_url, fingerprint, i, publishable_key, session_id, useable_characters, _i;

  base_url = 'https://api.conekta.io/';

  publishable_key = null;

  session_id = "";

  useable_characters = "abcdefghijklmnopqrstuvwxyz0123456789-_";

  for (i = _i = 0; _i <= 87; i = ++_i) {
    session_id += useable_characters.charAt(Math.floor(Math.random() * 38));
  }

  fingerprint = function() {
    var body, fingerprint_png_img, fingerprint_png_p, fingerprint_script, fingerprint_swf_object, fingerprint_swf_param;
    if (document.readyState === 'interactive' || document.readyState === 'complete') {
      body = document.getElementsByTagName('body')[0];
      fingerprint_png_p = document.createElement('p');
      fingerprint_png_p.setAttribute("style", "background:url(https://h.online-metrix.net/fp/clear.png?org_id=1snn5n9w&amp;session_id=merchantID" + session_id + "&amp;m=1) ! important; display:none ! important;");
      body.appendChild(fingerprint_png_p);
      fingerprint_png_img = document.createElement('img');
      fingerprint_png_img.setAttribute('style', 'display:none ! important;');
      fingerprint_png_img.src = "https://h.online-metrix.net/fp/clear.png?org_id=1snn5n9w&amp;session_id=merchantID" + session_id + "&amp;m=2";
      body.appendChild(fingerprint_png_img);
      fingerprint_swf_object = document.createElement('object');
      fingerprint_swf_object.type = 'application/x-shockwave-flash';
      fingerprint_swf_object.data = "https://h.online-metrix.net/fp/fp.swf?org_id=1snn5n9w&amp;session_id=merchantID" + session_id;
      fingerprint_swf_object.width = '1';
      fingerprint_swf_object.setAttribute('style', 'display:none ! important;');
      body.appendChild(fingerprint_swf_object);
      fingerprint_swf_param = document.createElement('param');
      fingerprint_swf_param.name = 'movie';
      fingerprint_swf_param.setAttribute('style', 'display:none ! important;');
      fingerprint_swf_param.value = 'https://h.online-metrix.net/fp/fp.swf?org_id=1snn5n9w&amp;session_id=merchant' + session_id;
      fingerprint_swf_param.appendChild(document.createElement('div'));
      body.appendChild(fingerprint_swf_param);
      fingerprint_script = document.createElement('script');
      fingerprint_script.type = 'text/javascript';
      fingerprint_script.src = 'https://h.online-metrix.net/fp/check.js?org_id=1snn5n9w&amp;session_id=merchantID' + session_id;
      return body.appendChild(fingerprint_script);
    } else {
      return setTimeout(fingerprint, 150);
    }
  };

  fingerprint();

  Base64 = {
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    encode: function(input) {
      var chr1, chr2, chr3, enc1, enc2, enc3, enc4, output;
      output = "";
      chr1 = void 0;
      chr2 = void 0;
      chr3 = void 0;
      enc1 = void 0;
      enc2 = void 0;
      enc3 = void 0;
      enc4 = void 0;
      i = 0;
      input = Base64._utf8_encode(input);
      while (i < input.length) {
        chr1 = input.charCodeAt(i++);
        chr2 = input.charCodeAt(i++);
        chr3 = input.charCodeAt(i++);
        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & 63;
        if (isNaN(chr2)) {
          enc3 = enc4 = 64;
        } else {
          if (isNaN(chr3)) {
            enc4 = 64;
          }
        }
        output = output + Base64._keyStr.charAt(enc1) + Base64._keyStr.charAt(enc2) + Base64._keyStr.charAt(enc3) + Base64._keyStr.charAt(enc4);
      }
      return output;
    },
    decode: function(input) {
      var chr1, chr2, chr3, enc1, enc2, enc3, enc4, output;
      output = "";
      chr1 = void 0;
      chr2 = void 0;
      chr3 = void 0;
      enc1 = void 0;
      enc2 = void 0;
      enc3 = void 0;
      enc4 = void 0;
      i = 0;
      input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
      while (i < input.length) {
        enc1 = Base64._keyStr.indexOf(input.charAt(i++));
        enc2 = Base64._keyStr.indexOf(input.charAt(i++));
        enc3 = Base64._keyStr.indexOf(input.charAt(i++));
        enc4 = Base64._keyStr.indexOf(input.charAt(i++));
        chr1 = (enc1 << 2) | (enc2 >> 4);
        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
        chr3 = ((enc3 & 3) << 6) | enc4;
        output = output + String.fromCharCode(chr1);
        if (enc3 !== 64) {
          output = output + String.fromCharCode(chr2);
        }
        if (enc4 !== 64) {
          output = output + String.fromCharCode(chr3);
        }
      }
      output = Base64._utf8_decode(output);
      return output;
    },
    _utf8_encode: function(string) {
      var c, n, utftext;
      string = string.replace(/\r\n/g, "\n");
      utftext = "";
      n = 0;
      while (n < string.length) {
        c = string.charCodeAt(n);
        if (c < 128) {
          utftext += String.fromCharCode(c);
        } else if ((c > 127) && (c < 2048)) {
          utftext += String.fromCharCode((c >> 6) | 192);
          utftext += String.fromCharCode((c & 63) | 128);
        } else {
          utftext += String.fromCharCode((c >> 12) | 224);
          utftext += String.fromCharCode(((c >> 6) & 63) | 128);
          utftext += String.fromCharCode((c & 63) | 128);
        }
        n++;
      }
      return utftext;
    },
    _utf8_decode: function(utftext) {
      var c, c1, c2, c3, string;
      string = "";
      i = 0;
      c = c1 = c2 = 0;
      while (i < utftext.length) {
        c = utftext.charCodeAt(i);
        if (c < 128) {
          string += String.fromCharCode(c);
          i++;
        } else if ((c > 191) && (c < 224)) {
          c2 = utftext.charCodeAt(i + 1);
          string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
          i += 2;
        } else {
          c2 = utftext.charCodeAt(i + 1);
          c3 = utftext.charCodeAt(i + 2);
          string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
          i += 3;
        }
      }
      return string;
    }
  };

  window.Conekta = {
    setPublishableKey: function(key) {
      if (typeof key === 'string' && key.match(/^[a-zA-Z0-9]*$/) && key.length >= 20 && key.length < 30) {
        publishable_key = key;
      } else {
        Conekta._helpers.log('Unusable public key: ' + key);
      }
    },
    getPublishableKey: function() {
      return publishable_key;
    },
    _helpers: {
      getSessionId: function() {
        return session_id;
      },
      xDomainPost: function(params) {
        var error_callback, rpc, success_callback;
        success_callback = function(data, textStatus, jqXHR) {
          if (!data || (data.object === 'error')) {
            return params.error(data || {
              object: 'error',
              type: 'api_error',
              message: "Something went wrong on Conekta's end"
            });
          } else {
            return params.success(data);
          }
        };
        error_callback = function() {
          return params.error({
            object: 'error',
            type: 'api_error',
            message: 'Something went wrong, possibly a connectivity issue'
          });
        };
        if (document.location.protocol === 'file:') {
          params.url = (params.jsonp_url || params.url) + '.js';
          params.data['_Version'] = "0.2.0";
          params.data['_RaiseHtmlError'] = false;
          params.data['auth_token'] = Conekta.getPublishableKey();
          return ajax({
            url: base_url + params.url,
            dataType: 'jsonp',
            data: params.data,
            success: success_callback,
            error: error_callback
          });
        } else {
          if (false && typeof (new XMLHttpRequest()).withCredentials !== 'undefined') {
            return ajax({
              url: base_url + params.url,
              type: 'POST',
              dataType: 'json',
              data: params.data,
              headers: {
                'RaiseHtmlError': false,
                'Accept': 'application/vnd.conekta-v0.2.0+json',
                'Authorization': 'Basic ' + Base64.encode(Conekta.getPublishableKey() + ':')
              },
              success: success_callback,
              error: error_callback
            });
          } else {
            rpc = new easyXDM.Rpc({
              swf: "https://conektaapi.s3.amazonaws.com/flash/easyxdm.swf",
              remote: base_url + "easyxdm_cors_proxy.html"
            }, {
              remote: {
                request: {}
              }
            });
            return rpc.request({
              url: base_url + params.url,
              method: 'POST',
              headers: {
                'RaiseHtmlError': false,
                'Accept': 'application/vnd.conekta-v0.2.0+json',
                'Authorization': 'Basic ' + Base64.encode(Conekta.getPublishableKey() + ':')
              },
              data: JSON.stringify(params.data)
            }, success_callback, error_callback);
          }
        }
      },
      log: function(data) {
        if (typeof console !== 'undefined' && console.log) {
          return console.log(data);
        }
      }
    }
  };

}).call(this);

(function() {
  var parse_form;

  parse_form = function(charge_form) {
    var attribute, attribute_name, attributes, charge, input, inputs, last_attribute, node, parent_node, textareas, val, _i, _j, _len, _len1;
    charge = {};
    textareas = Array.prototype.slice.call(charge_form.getElementsByTagName('textarea'));
    inputs = Array.prototype.slice.call(charge_form.getElementsByTagName('input')).concat(textareas);
    for (_i = 0, _len = inputs.length; _i < _len; _i++) {
      input = inputs[_i];
      attribute_name = input.getAttribute('data-conekta');
      if (attribute_name) {
        val = input.getAttribute('value') || input.innerHTML || input.value;
        attributes = attribute_name.replace(/\]/, '').replace(/\-/, '_').split(/\[/);
        parent_node = null;
        node = charge;
        last_attribute = null;
        for (_j = 0, _len1 = attributes.length; _j < _len1; _j++) {
          attribute = attributes[_j];
          if (!node[attribute]) {
            node[attribute] = {};
          }
          parent_node = node;
          last_attribute = attribute;
          node = node[attribute];
        }
        parent_node[last_attribute] = val;
      }
    }
    return charge;
  };

  Conekta.charge = {};

  Conekta.charge.create = function(charge_form, success_callback, failure_callback) {
    var charge;
    if (typeof success_callback !== 'function') {
      success_callback = Conekta._helpers.log;
    }
    if (typeof failure_callback !== 'function') {
      failure_callback = Conekta._helpers.log;
    }
    charge = parse_form(charge_form);
    charge.session_id = Conekta._helpers.getSessionId();
    if (typeof charge === 'object') {
      return Conekta._helpers.xDomainPost({
        jsonp_url: 'charges/create',
        url: 'charges',
        data: charge,
        success: success_callback,
        error: failure_callback
      });
    } else {
      return failure_callback({
        'object': 'error',
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
