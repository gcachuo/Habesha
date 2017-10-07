var BwGateway = function (vars) {
    var _self = this;
    this.gateway_url = 'https://sw.banwire.com/';
    this.popup_completed = !1;
    this.popup = null;
    this.fields = {
        'user': ['string'],
        'title': ['string'],
        'reference': ['string'],
        'concept': ['string'],
        'language': ['string'],
        'analitycs': ['string'],
        'cust': ['array', null, {
            'fname': ['string', 'cust-fname'],
            'lname': ['string', 'cust-lname'],
            'mname': ['string', 'cust-mname'],
            'email': ['string', 'cust-email'],
            'addr': ['string', 'cust-addr'],
            'zip': ['string', 'cust-zip'],
            'phone': ['string', 'cust-phone'],
            'city': ['string', 'cust-city'],
            'country': ['string', 'cust-country'],
            'state': ['string', 'cust-state'],
            'represented': ['bool', !1, 'cust-represent']
        }, 'customer'],
        'ship': ['array', null, {
            'addr': ['string', 'ship-addr'],
            'city': ['string', 'ship-city'],
            'country': ['string', 'ship-country'],
            'state': ['string', 'ship-state'],
            'zip': ['string', 'ship-zip']
        }, 'shipping'],
        'recurring': ['array', null, {
            'interval': ['string', 'recurring-interval'],
            'limit': ['int', 'recurring-limit'],
            'start': ['string', 'recurring-start'],
            'total': ['float', 'recurring-total']
        }],
        'infoMsg': ['string', 'info-msg'],
        'notifyUrl': ['string', 'notify-url'],
        'currency': ['string'],
        'exchangeRate': ['float', 'exchange-rate'],
        'showShipping': ['bool', 'show-shipping'],
        'sandbox': ['bool'],
        'total': ['float'],
        'items': ['array'],
        'paymentOptions': ['string', 'payment-options'],
        'reviewOrder': ['bool', 'review-order'],
        'months': ['array'],
        'postmessage': ['bool'],
        'urlparent': ['string'],
        'loadingText': ['string'],
        'successPage': ['string', 'success-page'],
        'onSuccess': ['function'],
        'errorPage': ['string', 'error-page'],
        'onError': ['function'],
        'challengePage': ['string', 'challenge-page'],
        'onChallenge': ['function'],
        'pendingPage': ['string', 'pending-page'],
        'onPending': ['function'],
        'onCancel': ['function']
    };
    this.params = {
        'method': 'iframe',
        'currency': 'MXN',
        'showShipping': !0,
        'sandbox': !1,
        'paymentOptions': 'all',
        'reviewOrder': !0,
        'months': [],
        'successPage': '',
        'errorPage': '',
        'challengePage': '',
        'pendingPage': ''
    }

    function build_query(obj, num_prefix, temp_key) {
        var output_string = []
        for (var key in obj) {
            if (!obj.hasOwnProperty(key)) continue;
            var val = key;
            num_prefix && !isNaN(key) ? key = num_prefix + key : ''
            var key = encodeURIComponent(key.replace(/[!'()*]/g, escape));
            temp_key ? key = temp_key + '[' + key + ']' : ''
            if (typeof obj[val] === 'function') continue;
            if (typeof obj[val] === 'object') {
                var query = build_query(obj[val], null, key)
                output_string.push(query)
            } else if (typeof obj[val] != "undefined") {
                var value = (isNaN(obj[val])) ? encodeURIComponent(String(obj[val]).replace(/[!'()*]/g, escape)) : obj[val];
                output_string.push(key + '=' + value)
            }
        }
        return output_string.join('&')
    }

    function createElement(htmlStr) {
        var frag = document.createDocumentFragment(), temp = document.createElement('div');
        temp.innerHTML = htmlStr;
        while (temp.firstChild) {
            frag.appendChild(temp.firstChild)
        }
        return frag
    }

    function setSocket() {
        this.interval_id = null;
        try {
            var onSocket = function (e) {
                var data = {};
                var closeEvent = !1;
                try {
                    data = JSON.parse(e.data)
                } catch (err) {
                    try {
                        data = eval('(' + e.data + ')')
                    } catch (ex) {
                        data = {event: e.data}
                    }
                }
                switch (data.event) {
                    case 'loaded':
                        _self.onLoaded();
                        break;
                    case 'payment_success':
                        closeEvent = !0;
                        _self.onPaymentOk(data)
                        break;
                    case 'payment_pending':
                        closeEvent = !0;
                        _self.onPaymentPending(data);
                        break;
                    case 'payment_error':
                        closeEvent = !0;
                        _self.onPaymentError(data);
                        break;
                    case 'payment_challenge':
                        closeEvent = !0;
                        _self.onPaymentChallenge(data);
                        break;
                    case 'close_iframe':
                        closeEvent = !0;
                        _self.closeIframe(data);
                        break;
                    case 'analytics':
                        _self.sendAnalytics(data);
                        break
                }
                if (closeEvent) {
                    try {
                        if (window.postMessage) {
                            document.body.style.overflowY = "auto";
                            if (eventMethod == "addEventListener")
                                window.removeEventListener(messageEvent, onSocket, !1); else window.detachEvent(messageEvent, onSocket)
                        } else {
                            clearInterval(_self.interval_id)
                        }
                    } catch (e) {
                    }
                }
            }
            if (window.postMessage) {
                var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
                var eventer = window[eventMethod];
                var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";
                eventer(messageEvent, onSocket, !1)
            } else {
                var last_hash = document.location.hash;
                _self.interval_id = setInterval(function () {
                    var hash = document.location.hash, re = /^#?\d+&/;
                    if (hash !== last_hash && re.test(hash)) {
                        var data = decodeURIComponent(hash.replace(re, ''));
                        onSocket({data: data});
                        document.location.hash = last_hash
                    }
                }, 100)
            }
        } catch (e) {
        }
    }

    function GoogleAnalytics() {
        if (typeof _self.params.analytics == 'undefined') return;
        if (!_self.tracker) _self.tracker = {};
        var _analyticsStart = function () {
            _self.tracker[_self.params.analytics] = ga.create(_self.params.analytics, 'auto', 'sw')
        };
        if (typeof ga != 'function') {
            (function (i, s, o, g, r, a, m) {
                i.GoogleAnalyticsObject = r;
                i[r] = i[r] || function () {
                    (i[r].q = i[r].q || []).push(arguments)
                }, i[r].l = 1 * new Date();
                a = s.createElement(o), m = s.getElementsByTagName(o)[0];
                a.async = 1;
                a.src = g;
                m.parentNode.insertBefore(a, m);
                _analyticsStart()
            })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga')
        } else _analyticsStart()
    }

    this.construct = function (data) {
        data.urlparent = document.location.href;
        this.setParams(data);
        if (!(typeof vars.language != "undefined" && vars.language))
            this.params.language = (((navigator.language || navigator.userLanguage).indexOf('es') > -1) ? 'es' : 'en')
    };
    this.pay = function (data) {
        if (this.popup != null) return !1;
        this.popup_completed = !1;
        try {
            document.body.style.overflowY = "hidden";
            var _Bw_preloader = Bw_onload();
            _Bw_preloader.style.display = "block"
        } catch (e) {
        }
        this.setParams(data);
        var _src = this.gateway_url + '?' + build_query(this.params);
        var iframe = createElement('<iframe id="bw_popup" name="bw_popup" src="' + _src + '" allowtransparency="true" frameborder="0" style="width: 100%; height: 100%; left: 0px; top: 0px; right: 0px; bottom: 0px; z-index: 9999; overflow-x: hidden; overflow-y: auto; display: none; margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent; position: fixed; background: transparent" onload="this.style.display=\'block\'"></iframe>');
        document.body.appendChild(iframe);
        this.popup = document.getElementById("bw_popup");
        setSocket()
    }
    this.setParams = function (data) {
        if (typeof data != "object" || data.tagName) return;
        var _recursive = function (_data, _params, _fields) {
            for (_key in _data) {
                if (typeof _fields[_key] == 'undefined') continue;
                var _param = _data[_key];
                var _field = _fields[_key];
                var _type = _field[0];
                var _name = (_field[3] != null ? _field[3] : _key);
                try {
                    switch (_type) {
                        case 'string':
                            _param = String(_param);
                            break;
                        case 'int':
                            _param = parseInt(_param);
                            if (isNaN(_param)) _param = 0;
                            break;
                        case 'float':
                            _param = parseFloat(_param);
                            if (isNaN(_param)) _param = 0.00;
                            break;
                        case 'bool':
                            _param = (String(_param).toLowerCase() == 'true' ? !0 : !1);
                            break;
                        case 'array':
                            if (typeof _field[2] == 'object') {
                                var __name = _name;
                                _param = _recursive(_param, (_params[_key] == null ? {} : _params[_key]), _field[2]);
                                _name = __name
                            } else _param = (typeof _param == 'object' ? _param : []);
                            break
                    }
                } catch (e) {
                    continue
                }
                _params[_name] = _param
            }
            return _params
        }
        this.params = _recursive(data, this.params, this.fields);
        GoogleAnalytics()
    }
    this.onLoaded = function () {
        var _Bw_preloader = Bw_onload();
        _Bw_preloader.style.display = "none"
    }
    this.closeIframe = function (data) {
        try {
            this.popup.parentNode.removeChild(this.popup)
        } catch (ignore) {
        }
        this.onPopupClose()
    }
    this.onPopupClose = function () {
        if (!this.popup_completed && typeof vars.onCancel == "function") vars.onCancel.call(this);
        if (typeof(vars.onClose) == "function") vars.onClose.call(this);
        this.popup = null
    }
    this.onPaymentOk = function (data) {
        this.popup_completed = !0;
        if (typeof(vars.onSuccess) == "function") vars.onSuccess.call(this, data); else if (this.params.successPage != "") window.location.href = this.params.successPage;
        this.closeIframe()
    }
    this.onPaymentError = function (data) {
        this.popup_completed = !0;
        if (typeof(vars.onError) == "function") vars.onError.call(this, data); else if (this.params.errorPage != "") window.location.href = this.params.errorPage;
        this.closeIframe()
    }
    this.onPaymentPending = function (data) {
        this.popup_completed = !0;
        if (typeof(vars.onPending) == "function") vars.onPending.call(this, data); else if (this.params.pendingPage != "") window.location.href = this.params.pendingPage;
        this.closeIframe()
    }
    this.onPaymentChallenge = function (data) {
        this.popup_completed = !0;
        if (typeof(vars.onChallenge) == "function") vars.onChallenge.call(this, data); else if (this.params.challengePage != "") window.location.href = this.params.challengePage;
        this.closeIframe()
    }
    this.sendAnalytics = function (data) {
        if (typeof _self.tracker != "object" || typeof _self.tracker[_self.params.analytics] != "object") return !1;
        try {
            if (typeof data.data == 'object' && data.data instanceof Array) {
                var tmp = data.data;
                data.data = {};
                var keys = [];
                switch (data.type) {
                    case 'event':
                        keys = ['eventCategory', 'eventAction', 'eventLabel', 'eventValue'];
                        break;
                    case 'pageview':
                        keys = ['page', 'title'];
                        break;
                    case 'set':
                        keys = ['key', 'value'];
                        break
                }
                for (var i = 0; i <= tmp.length; i++) {
                    data.data[keys[i]] = tmp[i]
                }
            }
            switch (data.type) {
                case 'set':
                    ga('sw.set', data.data.key, data.data.value);
                    break;
                case 'pageview':
                    ga('sw.set', 'page', data.data.page);
                    ga('sw.set', 'title', data.data.title);
                    ga('sw.send', data.type, data.data);
                    break;
                default:
                    ga('sw.send', data.type, data.data);
                    break
            }
        } catch (ignore) {
        }
    }
    this.construct((typeof vars == 'object' ? vars : {}))
}
var SW = null;
var BwCheckout = [];
var scripts = document.getElementsByTagName("script");
for (var i = 0, l = scripts.length; i < l; i++) {
    var _script = scripts[i];
    if (!(_script.src === 'https://sw.banwire.com/checkout.js' || _script.src === 'https://test.banwire.com/sw/checkout.js') || (_script.getAttribute('data-user') == null || _script.getAttribute('data-user') == undefined)) continue;
    var _BwCheckout = new BwGateway({});
    var _recursive = function (_fields) {
        var _params = {}
        for (_key in _fields) {
            var _field = _fields[_key];
            var _type = _field[0];
            var _value = _script.getAttribute('data-' + ((_field[1] != null) ? _field[1] : _key));
            if (_type == 'array' && (typeof _field[2] == 'object'))
                _params[_key] = _recursive(_field[2]); else if (_type == 'array' && typeof _value == 'string') _params[_key] = _value.split(','); else if (_value != null) _params[_key] = _value
        }
        return _params
    }
    var _params = _recursive(_BwCheckout.fields);
    var j = 1;
    while (!0) {
        var _item = scripts[i].getAttribute('data-item-' + j + '-name');
        if (_item == null) break;
        if (typeof _params.items == "undefined") _params.items = [];
        _params.items.push({
            name: _script.getAttribute('data-item-' + j + '-name'),
            unitPrice: _script.getAttribute('data-item-' + j + '-price'),
            qty: (_script.getAttribute('data-item-' + j + '-qty') == null ? 1 : parseInt(_script.getAttribute('data-item-' + j + '-qty')))
        });
        j++
    }
    _BwCheckout.setParams(_params);
    var a = document.createElement('a');
    a.href = '#';
    a.id = 'bw_pay_btn';
    a.setAttribute('onclick', 'BwCheckout[' + i + '].pay(); return false;');
    if (_script.getAttribute('data-button-class') != null)
        a.className = _script.getAttribute('data-button-class');
    if (_script.getAttribute('data-button-caption') != null)
        a.innerHTML = _script.getAttribute('data-button-caption');
    _script.parentNode.insertBefore(a, _script);
    if (SW == null) SW = _BwCheckout;
    BwCheckout[i] = _BwCheckout
}

function Bw_onload() {
    if (document.getElementById("Bw_preloader")) return document.getElementById("Bw_preloader");
    var div = document.createElement('div');
    div.style.display = 'none';
    div.style.position = 'fixed';
    div.style.width = '30px';
    div.style.height = '30px';
    div.style.top = '50%';
    div.style.marginTop = '-15px';
    div.style.left = '50%';
    div.style.marginLeft = '-15px';
    div.style.background = 'transparent url(https://sw.banwire.com/css/img/preloader.gif) no-repeat';
    div.id = 'Bw_preloader';
    document.body.appendChild(div);
    return document.getElementById("Bw_preloader")
};
try {
    if (window.attachEvent) window.attachEvent('onload', function () {
        Bw_onload()
    }); else if (window.addEventListener) window.addEventListener('load', function () {
        Bw_onload()
    })
} catch (e) {
}