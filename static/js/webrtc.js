/* promise-polyfill 8.1.0 https://github.com/taylorhakes/promise-polyfill */ ! function(e, n) {
    "object" == typeof exports && "undefined" != typeof module ? n() : "function" == typeof define && define.amd ? define(n) : n()
}(0, function() {
    "use strict";

    function e(n) {
        var t = this.constructor;
        return this.then(function(e) {
            return t.resolve(n()).then(function() {
                return e
            })
        }, function(e) {
            return t.resolve(n()).then(function() {
                return t.reject(e)
            })
        })
    }
    var n = setTimeout;

    function o() {}

    function f(e) {
        if (!(this instanceof f)) throw new TypeError("Promises must be constructed via new");
        if ("function" != typeof e) throw new TypeError("not a function");
        this._state = 0, this._handled = !1, this._value = undefined, this._deferreds = [], l(e, this)
    }

    function r(o, r) {
        for (; 3 === o._state;) o = o._value;
        0 !== o._state ? (o._handled = !0, f._immediateFn(function() {
            var e = 1 === o._state ? r.onFulfilled : r.onRejected;
            if (null !== e) {
                var n;
                try {
                    n = e(o._value)
                } catch (t) {
                    return void u(r.promise, t)
                }
                i(r.promise, n)
            } else(1 === o._state ? i : u)(r.promise, o._value)
        })) : o._deferreds.push(r)
    }

    function i(e, n) {
        try {
            if (n === e) throw new TypeError("A promise cannot be resolved with itself.");
            if (n && ("object" == typeof n || "function" == typeof n)) {
                var t = n.then;
                if (n instanceof f) return e._state = 3, e._value = n, void c(e);
                if ("function" == typeof t) return void l((o = t, r = n, function() {
                    o.apply(r, arguments)
                }), e)
            }
            e._state = 1, e._value = n, c(e)
        } catch (i) {
            u(e, i)
        }
        var o, r
    }

    function u(e, n) {
        e._state = 2, e._value = n, c(e)
    }

    function c(e) {
        2 === e._state && 0 === e._deferreds.length && f._immediateFn(function() {
            e._handled || f._unhandledRejectionFn(e._value)
        });
        for (var n = 0, t = e._deferreds.length; n < t; n++) r(e, e._deferreds[n]);
        e._deferreds = null
    }

    function a(e, n, t) {
        this.onFulfilled = "function" == typeof e ? e : null, this.onRejected = "function" == typeof n ? n : null, this.promise = t
    }

    function l(e, n) {
        var t = !1;
        try {
            e(function(e) {
                t || (t = !0, i(n, e))
            }, function(e) {
                t || (t = !0, u(n, e))
            })
        } catch (o) {
            if (t) return;
            t = !0, u(n, o)
        }
    }
    f.prototype["catch"] = function(e) {
        return this.then(null, e)
    }, f.prototype.then = function(e, n) {
        var t = new this.constructor(o);
        return r(this, new a(e, n, t)), t
    }, f.prototype["finally"] = e, f.all = function(n) {
        return new f(function(r, i) {
            if (!n || "undefined" == typeof n.length) throw new TypeError("Promise.all accepts an array");
            var f = Array.prototype.slice.call(n);
            if (0 === f.length) return r([]);
            var u = f.length;

            function c(n, e) {
                try {
                    if (e && ("object" == typeof e || "function" == typeof e)) {
                        var t = e.then;
                        if ("function" == typeof t) return void t.call(e, function(e) {
                            c(n, e)
                        }, i)
                    }
                    f[n] = e, 0 == --u && r(f)
                } catch (o) {
                    i(o)
                }
            }
            for (var e = 0; e < f.length; e++) c(e, f[e])
        })
    }, f.resolve = function(n) {
        return n && "object" == typeof n && n.constructor === f ? n : new f(function(e) {
            e(n)
        })
    }, f.reject = function(t) {
        return new f(function(e, n) {
            n(t)
        })
    }, f.race = function(r) {
        return new f(function(e, n) {
            for (var t = 0, o = r.length; t < o; t++) r[t].then(e, n)
        })
    }, f._immediateFn = "function" == typeof setImmediate && function(e) {
        setImmediate(e)
    } || function(e) {
        n(e, 0)
    }, f._unhandledRejectionFn = function(e) {
        void 0 !== console && console && console.warn("Possible Unhandled Promise Rejection:", e)
    };
    var t = function() {
        if ("undefined" != typeof self) return self;
        if ("undefined" != typeof window) return window;
        if ("undefined" != typeof global) return global;
        throw Error("unable to locate global object")
    }();
    "Promise" in t ? t.Promise.prototype["finally"] || (t.Promise.prototype["finally"] = e) : t.Promise = f
});

/* mediaDevices polyfill */
void 0 === navigator.mediaDevices && (navigator.mediaDevices = {});
void 0 === navigator.mediaDevices.getUserMedia && (navigator.mediaDevices.getUserMedia = function(b) {
    var a = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    return a ? new Promise(function(c, d) {
        a.call(navigator, b, c, d)
    }) : Promise.reject(Error("polyfillReject"))
});
(function() {
    var r, t, n, e, i, o, a, s;
    t = {}, s = this, "undefined" != typeof module && null !== module && module.exports ? module.exports = t : s.ipaddr = t, a = function(r, t, n, e) {
        var i, o;
        if (r.length !== t.length) throw new Error("ipaddr: cannot match CIDR for objects with different lengths");
        for (i = 0; e > 0;) {
            if ((o = n - e) < 0 && (o = 0), r[i] >> o != t[i] >> o) return !1;
            e -= n, i += 1
        }
        return !0
    }, t.subnetMatch = function(r, t, n) {
        var e, i, o, a, s;
        null == n && (n = "unicast");
        for (o in t)
            for (!(a = t[o])[0] || a[0] instanceof Array || (a = [a]), e = 0, i = a.length; e < i; e++)
                if (s = a[e], r.kind() === s[0].kind() && r.match.apply(r, s)) return o;
        return n
    }, t.IPv4 = function() {
        function r(r) {
            var t, n, e;
            if (4 !== r.length) throw new Error("ipaddr: ipv4 octet count should be 4");
            for (t = 0, n = r.length; t < n; t++)
                if (!(0 <= (e = r[t]) && e <= 255)) throw new Error("ipaddr: ipv4 octet should fit in 8 bits");
            this.octets = r
        }
        return r.prototype.kind = function() {
            return "ipv4"
        }, r.prototype.toString = function() {
            return this.octets.join(".")
        }, r.prototype.toNormalizedString = function() {
            return this.toString()
        }, r.prototype.toByteArray = function() {
            return this.octets.slice(0)
        }, r.prototype.match = function(r, t) {
            var n;
            if (void 0 === t && (r = (n = r)[0], t = n[1]), "ipv4" !== r.kind()) throw new Error("ipaddr: cannot match ipv4 address with non-ipv4 one");
            return a(this.octets, r.octets, 8, t)
        }, r.prototype.SpecialRanges = {
            unspecified: [
                [new r([0, 0, 0, 0]), 8]
            ],
            broadcast: [
                [new r([255, 255, 255, 255]), 32]
            ],
            multicast: [
                [new r([224, 0, 0, 0]), 4]
            ],
            linkLocal: [
                [new r([169, 254, 0, 0]), 16]
            ],
            loopback: [
                [new r([127, 0, 0, 0]), 8]
            ],
            carrierGradeNat: [
                [new r([100, 64, 0, 0]), 10]
            ],
            private: [
                [new r([10, 0, 0, 0]), 8],
                [new r([172, 16, 0, 0]), 12],
                [new r([192, 168, 0, 0]), 16]
            ],
            reserved: [
                [new r([192, 0, 0, 0]), 24],
                [new r([192, 0, 2, 0]), 24],
                [new r([192, 88, 99, 0]), 24],
                [new r([198, 51, 100, 0]), 24],
                [new r([203, 0, 113, 0]), 24],
                [new r([240, 0, 0, 0]), 4]
            ]
        }, r.prototype.range = function() {
            return t.subnetMatch(this, this.SpecialRanges)
        }, r.prototype.toIPv4MappedAddress = function() {
            return t.IPv6.parse("::ffff:" + this.toString())
        }, r.prototype.prefixLengthFromSubnetMask = function() {
            var r, t, n, e, i, o, a;
            for (a = {
                    0: 8,
                    128: 7,
                    192: 6,
                    224: 5,
                    240: 4,
                    248: 3,
                    252: 2,
                    254: 1,
                    255: 0
                }, r = 0, i = !1, t = n = 3; n >= 0; t = n += -1) {
                if (!((e = this.octets[t]) in a)) return null;
                if (o = a[e], i && 0 !== o) return null;
                8 !== o && (i = !0), r += o
            }
            return 32 - r
        }, r
    }(), n = "(0?\\d+|0x[a-f0-9]+)", e = {
        fourOctet: new RegExp("^" + n + "\\." + n + "\\." + n + "\\." + n + "$", "i"),
        longValue: new RegExp("^" + n + "$", "i")
    }, t.IPv4.parser = function(r) {
        var t, n, i, o, a;
        if (n = function(r) {
                return "0" === r[0] && "x" !== r[1] ? parseInt(r, 8) : parseInt(r)
            }, t = r.match(e.fourOctet)) return function() {
            var r, e, o, a;
            for (a = [], r = 0, e = (o = t.slice(1, 6)).length; r < e; r++) i = o[r], a.push(n(i));
            return a
        }();
        if (t = r.match(e.longValue)) {
            if ((a = n(t[1])) > 4294967295 || a < 0) throw new Error("ipaddr: address outside defined range");
            return function() {
                var r, t;
                for (t = [], o = r = 0; r <= 24; o = r += 8) t.push(a >> o & 255);
                return t
            }().reverse()
        }
        return null
    }, t.IPv6 = function() {
        function r(r, t) {
            var n, e, i, o, a, s;
            if (16 === r.length)
                for (this.parts = [], n = e = 0; e <= 14; n = e += 2) this.parts.push(r[n] << 8 | r[n + 1]);
            else {
                if (8 !== r.length) throw new Error("ipaddr: ipv6 part count should be 8 or 16");
                this.parts = r
            }
            for (i = 0, o = (s = this.parts).length; i < o; i++)
                if (!(0 <= (a = s[i]) && a <= 65535)) throw new Error("ipaddr: ipv6 part should fit in 16 bits");
            t && (this.zoneId = t)
        }
        return r.prototype.kind = function() {
            return "ipv6"
        }, r.prototype.toString = function() {
            return this.toNormalizedString().replace(/((^|:)(0(:|$))+)/, "::")
        }, r.prototype.toRFC5952String = function() {
            var r, t, n, e, i;
            for (e = /((^|:)(0(:|$)){2,})/g, i = this.toNormalizedString(), r = 0, t = -1; n = e.exec(i);) n[0].length > t && (r = n.index, t = n[0].length);
            return t < 0 ? i : i.substring(0, r) + "::" + i.substring(r + t)
        }, r.prototype.toByteArray = function() {
            var r, t, n, e, i;
            for (r = [], t = 0, n = (i = this.parts).length; t < n; t++) e = i[t], r.push(e >> 8), r.push(255 & e);
            return r
        }, r.prototype.toNormalizedString = function() {
            var r, t, n;
            return r = function() {
                var r, n, e, i;
                for (i = [], r = 0, n = (e = this.parts).length; r < n; r++) t = e[r], i.push(t.toString(16));
                return i
            }.call(this).join(":"), n = "", this.zoneId && (n = "%" + this.zoneId), r + n
        }, r.prototype.toFixedLengthString = function() {
            var r, t, n;
            return r = function() {
                var r, n, e, i;
                for (i = [], r = 0, n = (e = this.parts).length; r < n; r++) t = e[r], i.push(t.toString(16).padStart(4, "0"));
                return i
            }.call(this).join(":"), n = "", this.zoneId && (n = "%" + this.zoneId), r + n
        }, r.prototype.match = function(r, t) {
            var n;
            if (void 0 === t && (r = (n = r)[0], t = n[1]), "ipv6" !== r.kind()) throw new Error("ipaddr: cannot match ipv6 address with non-ipv6 one");
            return a(this.parts, r.parts, 16, t)
        }, r.prototype.SpecialRanges = {
            unspecified: [new r([0, 0, 0, 0, 0, 0, 0, 0]), 128],
            linkLocal: [new r([65152, 0, 0, 0, 0, 0, 0, 0]), 10],
            multicast: [new r([65280, 0, 0, 0, 0, 0, 0, 0]), 8],
            loopback: [new r([0, 0, 0, 0, 0, 0, 0, 1]), 128],
            uniqueLocal: [new r([64512, 0, 0, 0, 0, 0, 0, 0]), 7],
            ipv4Mapped: [new r([0, 0, 0, 0, 0, 65535, 0, 0]), 96],
            rfc6145: [new r([0, 0, 0, 0, 65535, 0, 0, 0]), 96],
            rfc6052: [new r([100, 65435, 0, 0, 0, 0, 0, 0]), 96],
            "6to4": [new r([8194, 0, 0, 0, 0, 0, 0, 0]), 16],
            teredo: [new r([8193, 0, 0, 0, 0, 0, 0, 0]), 32],
            reserved: [
                [new r([8193, 3512, 0, 0, 0, 0, 0, 0]), 32]
            ]
        }, r.prototype.range = function() {
            return t.subnetMatch(this, this.SpecialRanges)
        }, r.prototype.isIPv4MappedAddress = function() {
            return "ipv4Mapped" === this.range()
        }, r.prototype.toIPv4Address = function() {
            var r, n, e;
            if (!this.isIPv4MappedAddress()) throw new Error("ipaddr: trying to convert a generic ipv6 address to ipv4");
            return e = this.parts.slice(-2), r = e[0], n = e[1], new t.IPv4([r >> 8, 255 & r, n >> 8, 255 & n])
        }, r.prototype.prefixLengthFromSubnetMask = function() {
            var r, t, n, e, i, o, a;
            for (a = {
                    0: 16,
                    32768: 15,
                    49152: 14,
                    57344: 13,
                    61440: 12,
                    63488: 11,
                    64512: 10,
                    65024: 9,
                    65280: 8,
                    65408: 7,
                    65472: 6,
                    65504: 5,
                    65520: 4,
                    65528: 3,
                    65532: 2,
                    65534: 1,
                    65535: 0
                }, r = 0, i = !1, t = n = 7; n >= 0; t = n += -1) {
                if (!((e = this.parts[t]) in a)) return null;
                if (o = a[e], i && 0 !== o) return null;
                16 !== o && (i = !0), r += o
            }
            return 128 - r
        }, r
    }(), i = "(?:[0-9a-f]+::?)+", o = {
        zoneIndex: new RegExp("%[0-9a-z]{1,}", "i"),
        native: new RegExp("^(::)?(" + i + ")?([0-9a-f]+)?(::)?(%[0-9a-z]{1,})?$", "i"),
        transitional: new RegExp("^((?:" + i + ")|(?:::)(?:" + i + ")?)" + n + "\\." + n + "\\." + n + "\\." + n + "(%[0-9a-z]{1,})?$", "i")
    }, r = function(r, t) {
        var n, e, i, a, s, p;
        if (r.indexOf("::") !== r.lastIndexOf("::")) return null;
        for ((p = (r.match(o.zoneIndex) || [])[0]) && (p = p.substring(1), r = r.replace(/%.+$/, "")), n = 0, e = -1;
            (e = r.indexOf(":", e + 1)) >= 0;) n++;
        if ("::" === r.substr(0, 2) && n--, "::" === r.substr(-2, 2) && n--, n > t) return null;
        for (s = t - n, a = ":"; s--;) a += "0:";
        return ":" === (r = r.replace("::", a))[0] && (r = r.slice(1)), ":" === r[r.length - 1] && (r = r.slice(0, -1)), t = function() {
            var t, n, e, o;
            for (o = [], t = 0, n = (e = r.split(":")).length; t < n; t++) i = e[t], o.push(parseInt(i, 16));
            return o
        }(), {
            parts: t,
            zoneId: p
        }
    }, t.IPv6.parser = function(t) {
        var n, e, i, a, s, p, u;
        if (o.native.test(t)) return r(t, 8);
        if ((a = t.match(o.transitional)) && (u = a[6] || "", (n = r(a[1].slice(0, -1) + u, 6)).parts)) {
            for (e = 0, i = (p = [parseInt(a[2]), parseInt(a[3]), parseInt(a[4]), parseInt(a[5])]).length; e < i; e++)
                if (!(0 <= (s = p[e]) && s <= 255)) return null;
            return n.parts.push(p[0] << 8 | p[1]), n.parts.push(p[2] << 8 | p[3]), {
                parts: n.parts,
                zoneId: n.zoneId
            }
        }
        return null
    }, t.IPv4.isIPv4 = t.IPv6.isIPv6 = function(r) {
        return null !== this.parser(r)
    }, t.IPv4.isValid = function(r) {
        try {
            return new this(this.parser(r)), !0
        } catch (r) {
            return r, !1
        }
    }, t.IPv4.isValidFourPartDecimal = function(r) {
        return !(!t.IPv4.isValid(r) || !r.match(/^(0|[1-9]\d*)(\.(0|[1-9]\d*)){3}$/))
    }, t.IPv6.isValid = function(r) {
        var t;
        if ("string" == typeof r && -1 === r.indexOf(":")) return !1;
        try {
            return t = this.parser(r), new this(t.parts, t.zoneId), !0
        } catch (r) {
            return r, !1
        }
    }, t.IPv4.parse = function(r) {
        var t;
        if (null === (t = this.parser(r))) throw new Error("ipaddr: string is not formatted like ip address");
        return new this(t)
    }, t.IPv6.parse = function(r) {
        var t;
        if (null === (t = this.parser(r)).parts) throw new Error("ipaddr: string is not formatted like ip address");
        return new this(t.parts, t.zoneId)
    }, t.IPv4.parseCIDR = function(r) {
        var t, n, e;
        if ((n = r.match(/^(.+)\/(\d+)$/)) && (t = parseInt(n[2])) >= 0 && t <= 32) return e = [this.parse(n[1]), t], Object.defineProperty(e, "toString", {
            value: function() {
                return this.join("/")
            }
        }), e;
        throw new Error("ipaddr: string is not formatted like an IPv4 CIDR range")
    }, t.IPv4.subnetMaskFromPrefixLength = function(r) {
        var t, n, e;
        if ((r = parseInt(r)) < 0 || r > 32) throw new Error("ipaddr: invalid IPv4 prefix length");
        for (e = [0, 0, 0, 0], n = 0, t = Math.floor(r / 8); n < t;) e[n] = 255, n++;
        return t < 4 && (e[t] = Math.pow(2, r % 8) - 1 << 8 - r % 8), new this(e)
    }, t.IPv4.broadcastAddressFromCIDR = function(r) {
        var t, n, e, i, o;
        try {
            for (e = (t = this.parseCIDR(r))[0].toByteArray(), o = this.subnetMaskFromPrefixLength(t[1]).toByteArray(), i = [], n = 0; n < 4;) i.push(parseInt(e[n], 10) | 255 ^ parseInt(o[n], 10)), n++;
            return new this(i)
        } catch (r) {
            throw r, new Error("ipaddr: the address does not have IPv4 CIDR format")
        }
    }, t.IPv4.networkAddressFromCIDR = function(r) {
        var t, n, e, i, o;
        try {
            for (e = (t = this.parseCIDR(r))[0].toByteArray(), o = this.subnetMaskFromPrefixLength(t[1]).toByteArray(), i = [], n = 0; n < 4;) i.push(parseInt(e[n], 10) & parseInt(o[n], 10)), n++;
            return new this(i)
        } catch (r) {
            throw r, new Error("ipaddr: the address does not have IPv4 CIDR format")
        }
    }, t.IPv6.parseCIDR = function(r) {
        var t, n, e;
        if ((n = r.match(/^(.+)\/(\d+)$/)) && (t = parseInt(n[2])) >= 0 && t <= 128) return e = [this.parse(n[1]), t], Object.defineProperty(e, "toString", {
            value: function() {
                return this.join("/")
            }
        }), e;
        throw new Error("ipaddr: string is not formatted like an IPv6 CIDR range")
    }, t.isValid = function(r) {
        return t.IPv6.isValid(r) || t.IPv4.isValid(r)
    }, t.parse = function(r) {
        if (t.IPv6.isValid(r)) return t.IPv6.parse(r);
        if (t.IPv4.isValid(r)) return t.IPv4.parse(r);
        throw new Error("ipaddr: the address has neither IPv6 nor IPv4 format")
    }, t.parseCIDR = function(r) {
        try {
            return t.IPv6.parseCIDR(r)
        } catch (n) {
            n;
            try {
                return t.IPv4.parseCIDR(r)
            } catch (r) {
                throw r, new Error("ipaddr: the address has neither IPv6 nor IPv4 CIDR format")
            }
        }
    }, t.fromByteArray = function(r) {
        var n;
        if (4 === (n = r.length)) return new t.IPv4(r);
        if (16 === n) return new t.IPv6(r);
        throw new Error("ipaddr: the binary input is neither an IPv6 nor IPv4 address")
    }, t.process = function(r) {
        var t;
        return t = this.parse(r), "ipv6" === t.kind() && t.isIPv4MappedAddress() ? t.toIPv4Address() : t
    }
}).call(this);
! function() {
    var o = /([0-9]{1,3}(\.[0-9]{1,3}){3}|(([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))/;
    $("#rtc-permission-audio,#rtc-permission-video").html(ico(2));
    var e = !1,
        i = !1,
        a = ["", "webkit", "moz", "ms"];
    try {
        for (var n = 0, r = a.length; n < r; n++) {
            var t = window[a[n] + "RTCPeerConnection"];
            if (t) {
                e = !0, "createDataChannel" in new t({
                    iceServers: [{
                        urls: "stun:0"
                    }]
                }) && (i = !0);
                break
            }
        }
    } catch (f) {
        i = e = !1
    }

    function d() {
        if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) try {
            navigator.mediaDevices.enumerateDevices().then(function(e) {
                c(e)
            })["catch"](function() {
                throw 1
            })
        } catch (e) {
            s()
        } else if (window.MediaStreamTrack && window.MediaStreamTrack.getSources) try {
            MediaStreamTrack.getSources(function(e) {
                c(e)
            })
        } catch (e) {
            s()
        } else s()
    }

    function c(e) {
        var i = {},
            a = "",
            n = !0,
            r = {};
        e.forEach(function(e) {
            n || (a += "\n\n"), n = !1, e.deviceId ? a += "    kind: " + e.kind + "\ndeviceId: " + e.deviceId + "\n   label: " + (e.label.length ? e.label : "n/a") : a += " kind: " + e.kind + "\n   id: " + e.id + "\nlabel: " + (e.label.length ? e.label : "n/a"), r[e.kind] || (r[e.kind] = !!e.label.length), i[e.kind] = !0
        }), $("#rtc-is-device-enumeration").html(ico(1) + "True"), "" != a ? $("#rtc-device-ids").addClass("mono").text(a) : $("#rtc-device-ids").text("n/a"), $("#rtc-has-microphone").html(i.audioinput || i.audio ? ico(1) + "True" : ico(0) + "False"), $("#rtc-has-camera").html(i.videoinput || i.video ? ico(1) + "True" : ico(0) + "False")
    }

    function s() {
        $("#rtc-has-microphone,#rtc-has-camera,#rtc-is-device-enumeration,#rtc-permission-audio,#rtc-permission-video").html(ico(0) + "False"), $("#rtc-device-ids").text("n/a")
    }

    function l(e) {
        var i, a, n;
        if (ipaddr.IPv4.isValid(e)) i = {
            local: [
                [ipaddr.parse("10.0.0.0"), 8],
                [ipaddr.parse("172.16.0.0"), 12],
                [ipaddr.parse("192.168.0.0"), 16],
                [ipaddr.parse("127.0.0.0"), 8],
                [ipaddr.parse("0.0.0.0"), 8],
                [ipaddr.parse("169.254.0.0"), 16],
                [ipaddr.parse("192.0.2.0"), 24],
                [ipaddr.parse("224.0.0.0"), 4],
                [ipaddr.parse("100.64.0.0"), 10],
                [ipaddr.parse("192.0.0.0"), 24]
            ]
        }, n = ipaddr.subnetMatch(ipaddr.parse(e), i, "ipv4"), a = 4;
        else {
            if (!ipaddr.IPv6.isValid(e)) return !1;
            i = {
                local: [
                    [ipaddr.parse("fc00::"), 8],
                    [ipaddr.parse("fd00::"), 8],
                    [ipaddr.parse("::1"), 128],
                    [ipaddr.parse("::"), 128],
                    [ipaddr.parse("::ffff:0:0"), 96],
                    [ipaddr.parse("fe80::"), 10]
                ]
            }, n = ipaddr.subnetMatch(ipaddr.parse(e), i, "ipv6"), a = 6
        }
        var r = $("#rtc-" + n);
        if ("" == r.find(".n_a").text() ? r.addClass("flag-multi") : r.find(".n_a").text(""), "local" == n) 4 == a ? r.prepend(flag_box("_local", e)) : r.append(flag_box("_local", e));
        else if ("ipv4" == n || "ipv6" == n) {
            var t = "ip_" + e.replace(/[\.\:\%]/g, "_");
            r.prepend(flag_box(!1, e, !0, ' id="' + t + '"')), "ipv4" == n && ($(".vpn").removeClass("n"), r.hasClass("flag-multi") || $(".vpn").css("margin-left", "8px")), $.ajax({
                method: "GET",
                url: "/xhr/flag/" + e,
                dataType: "json"
            }).always(function(e) {
                var i = "x";
                e && "object" == typeof e && e.flag !== undefined && (i = e.flag), "x" != i && $("#" + t).attr("title", i.toUpperCase()), $("#" + t).css("background-image", "url(/img/flags/" + i + ".png?v=21928395)")
            })
        }
    }
    $("#rtc-is-rtcpeerconnection").html(e ? ico(1) + "True" : ico(0) + "False"), $("#rtc-is-rtcdatachannel").html(i ? ico(1) + "True" : ico(0) + "False"), window.RTCIceGatherer ? $("#rtc-is-ortc").html(ico(1) + "True") : $("#rtc-is-ortc").html(ico(0) + "False"), d(), $("#rtc-button-audio").click(function() {
            void navigator.mediaDevices.getUserMedia({
                audio: !0,
                video: !1
            }).then(function() {
                $("#rtc-permission-audio").html(ico(1) + "Granted"), d()
            })["catch"](function(e) {
                var i;
                return i = "NotAllowedError" == e.name ? "Denied (" + e.name + ")" : "polyfillReject" == e.message ? "Not implemented" : 'False: "' + e.name + '"', $("#rtc-permission-audio").html(ico(0) + i), !1
            }) || $("#rtc-permission-audio").html(ico(2))
        }), $("#rtc-button-video").click(function() {
            void navigator.mediaDevices.getUserMedia({
                audio: !1,
                video: !0
            }).then(function() {
                $("#rtc-permission-video").html(ico(1) + "Granted"), d()
            })["catch"](function(e) {
                var i;
                return i = "NotAllowedError" == e.name ? "Denied (" + e.name + ")" : "polyfillReject" == e.message ? "Not implemented" : 'False: "' + e.name + '"', $("#rtc-permission-video").html(ico(0) + i), !1
            }) || $("#rtc-permission-video").html(ico(2))
        }),
        function(e) {
            var i, a = {},
                n = window.RTCPeerConnection || window.webkitRTCPeerConnection || window.mozRTCPeerConnection || window.msRTCPeerConnection;
            if (!n) {
                var r = document.getElementById("rtc-iframe").contentWindow;
                n = r.RTCPeerConnection || r.webkitRTCPeerConnection || r.mozRTCPeerConnection || r.msRTCPeerConnection
            }
            try {
                i = new n({
                    iceServers: [{
                        urls: "stun:stun.l.google.com:19302?transport=udp"
                    }]
                }, {
                    optional: [{
                        RtpDataChannels: !0
                    }]
                })
            } catch (d) {
                return function p() {
                    if (window.RTCIceGatherer) {
                        $("#rtc-is-ortc").html(ico(1) + "True");
                        try {
                            var i = new RTCIceGatherer({
                                    gatherPolicy: "all",
                                    iceServers: [{
                                        urls: Array.from("pdu=tropsnart?8743:ac.einegaiv.bmun:nrut").reverse().join(""),
                                        username: Array.from("moc.liamg@skaelresworb").reverse().join(""),
                                        credential: Array.from("0062").reverse().join("")
                                    }]
                                }),
                                a = {};
                            i.onlocalcandidate = function(i) {
                                setTimeout(function() {
                                    if (i.candidate.ip && "relay" != i.candidate.type) {
                                        var e = o.exec(i.candidate.ip)[1];
                                        a[e] === undefined && l(e), a[e] = !0
                                    }
                                }, 300)
                            }
                        } catch (n) {}
                    }
                }()
            }

            function t(e) {
                try {
                    var i = o.exec(e)[1];
                    a[i] === undefined && l(i), a[i] = !0
                } catch (d) {}
            }
            i.onicecandidate = function(e) {
                e.candidate && t(e.candidate.candidate)
            }, i.createDataChannel("bl");
            try {
                i.createOffer().then(function(e) {
                    i.setLocalDescription(e)
                })
            } catch (c) {
                i.createOffer(function(e) {
                    i.setLocalDescription(e, function() {}, function() {})
                }, function() {})
            }
            setTimeout(function() {
                i.localDescription.sdp.split("\n").forEach(function(e) {
                    0 === e.indexOf("a=candidate:") && t(e)
                })
            }, 1e3)
        }()
}();