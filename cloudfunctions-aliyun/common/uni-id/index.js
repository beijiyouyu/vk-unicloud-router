"use strict";

function e(e) {
	return e && "object" == typeof e && "default" in e ? e.default : e
}
Object.defineProperty(exports, "__esModule", {
	value: !0
});
var t = e(require("fs")),
	r = e(require("path")),
	n = e(require("crypto")),
	o = e(require("buffer")),
	i = e(require("stream")),
	s = e(require("util")),
	a = e(require("querystring"));
const c = uniCloud.database(),
	u = c.collection("uni-id-users"),
	f = c.collection("uni-verify"),
	d = c.collection("uni-id-roles"),
	p = c.collection("uni-id-permissions");
let l = {};
try {
	l = JSON.parse(t.readFileSync(r.resolve(__dirname, "config.json")))
} catch (e) {}

function m(e) {
	const t = Object.assign(l, l[e || __ctx__.PLATFORM]) || {},
		r = Object.assign({
			bindTokenToDevice: !0
		}, t);
	return ["passwordSecret", "tokenSecret", "tokenExpiresIn", "passwordErrorLimit", "passwordErrorRetryTime"].forEach(e => {
		if (!r || !r[e]) throw new Error("请在公用模块uni-id的config.json或init方法中内添加配置项：" + e)
	}), r
}

function h(e) {
	const t = m(),
		r = n.createHmac("sha1", t.passwordSecret.toString("ascii"));
	return r.update(e), r.digest("hex")
}
class g extends Error {
	constructor(e) {
		super(e.message), this.errMsg = e.message || "", Object.defineProperties(this, {
			message: {
				get() {
					return `errCode: ${e.code||""} | errMsg: ` + this.errMsg
				},
				set(e) {
					this.errMsg = e
				}
			}
		})
	}
}
const y = Object.prototype.toString,
	w = Object.prototype.hasOwnProperty;

function v(e, t) {
	return w.call(e, t)
}

function b(e) {
	return "[object Object]" === y.call(e)
}

function _(e) {
	return "function" == typeof e
}
const S = /_(\w)/g,
	x = /[A-Z]/g;

function E(e) {
	return e.replace(S, (e, t) => t ? t.toUpperCase() : "")
}

function j(e) {
	return e.replace(x, e => "_" + e.toLowerCase())
}

function k(e, t) {
	let r, n;
	switch (t) {
		case "snake2camel":
			n = E, r = S;
			break;
		case "camel2snake":
			n = j, r = x
	}
	for (const o in e)
		if (v(e, o) && r.test(o)) {
			const r = n(o);
			e[r] = e[o], delete e[o], b(e[r]) ? e[r] = k(e[r], t) : Array.isArray(e[r]) && (e[r] = e[r].map(e => k(e, t)))
		} return e
}

function P(e) {
	return k(e, "snake2camel")
}

function O(e) {
	return k(e, "camel2snake")
}

function T(e) {
	return function(e, t = "-") {
		e = e || new Date;
		const r = [];
		return r.push(e.getFullYear()), r.push(("00" + (e.getMonth() + 1)).substr(-2)), r.push(("00" + e.getDate()).substr(-
			2)), r.join(t)
	}(e = e || new Date) + " " + function(e, t = ":") {
		e = e || new Date;
		const r = [];
		return r.push(("00" + e.getHours()).substr(-2)), r.push(("00" + e.getMinutes()).substr(-2)), r.push(("00" + e.getSeconds())
			.substr(-2)), r.join(t)
	}(e)
}

function I() {
	"development" === process.env.NODE_ENV && console.log(...arguments)
}

function R(e = 6) {
	let t = "";
	for (let r = 0; r < e; r++) t += Math.floor(10 * Math.random());
	return t
}

function A(e) {
	return Array.from(new Set(e))
}

function C(e = {}, t) {
	if (!t || !e) return e;
	const r = ["_pre", "_purify", "_post"];
	t._pre && (e = t._pre(e));
	let n = {
		shouldDelete: new Set([])
	};
	if (t._purify) {
		const e = t._purify;
		for (const t in e) e[t] = new Set(e[t]);
		n = Object.assign(n, e)
	}
	if (b(t))
		for (const o in t) {
			const i = t[o];
			_(i) && -1 === r.indexOf(o) ? e[o] = i(e) : "string" == typeof i && -1 === r.indexOf(o) && (e[o] = e[i], n.shouldDelete
				.add(i))
		} else _(t) && (e = t(e));
	if (n.shouldDelete)
		for (const t of n.shouldDelete) delete e[t];
	return t._post && (e = t._post(e)), e
}

function D(e, t) {
	const r = new e(t);
	return new Proxy(r, {
		get: function(e, t) {
			if ("function" == typeof e[t] && 0 !== t.indexOf("_") && e._protocols && e._protocols[t]) {
				const r = e._protocols[t];
				return async function(n) {
					n = C(n, r.args);
					let o = await e[t](n);
					return o = C(o, r.returnValue), o
				}
			}
			return e[t]
		}
	})
}

function $(e) {
	let t, r, n = e - Date.now(),
		o = "后";
	n < 0 && (o = "前", n = -n);
	const i = Math.floor(n / 1e3),
		s = Math.floor(i / 60),
		a = Math.floor(s / 60),
		c = Math.floor(a / 24),
		u = Math.floor(c / 30),
		f = Math.floor(u / 12);
	switch (!0) {
		case f > 0:
			t = f, r = "年";
			break;
		case u > 0:
			t = u, r = "月";
			break;
		case c > 0:
			t = c, r = "天";
			break;
		case a > 0:
			t = a, r = "小时";
			break;
		case s > 0:
			t = s, r = "分钟";
			break;
		default:
			t = i, r = "秒"
	}
	return `${t}${r}${o}`
}
const B = uniCloud.database().command;

function M(e = 6) {
	const t = ["2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "J", "K", "L", "M", "N",
		"P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"
	];
	let r = "";
	for (let n = 0; n < e; n++) r += t[Math.floor(Math.random() * t.length)];
	return r
}
async function N({
	inviteCode: e
}) {
	let t, r = 10;
	e ? (r = 1, t = e) : t = M();
	let n = !1;
	try {
		for (; r > 0 && !n;) {
			r -= 1;
			if (0 === (await u.where({
					invite_code: t
				}).count()).total) {
				n = !0;
				break
			}
			t = M()
		}
		return n ? {
			code: 0,
			inviteCode: t
		} : e ? {
			code: 80401,
			msg: "邀请码重复，设置失败"
		} : {
			code: 80402,
			msg: "邀请码设置失败稍后再试"
		}
	} catch (e) {
		return {
			code: 90001,
			msg: "数据库读写异常"
		}
	}
}

function L(e, t) {
	return e(t = {
		exports: {}
	}, t.exports), t.exports
}
var K = L((function(e, t) {
		var r = o.Buffer;

		function n(e, t) {
			for (var r in e) t[r] = e[r]
		}

		function i(e, t, n) {
			return r(e, t, n)
		}
		r.from && r.alloc && r.allocUnsafe && r.allocUnsafeSlow ? e.exports = o : (n(o, t), t.Buffer = i), i.prototype =
			Object.create(r.prototype), n(r, i), i.from = function(e, t, n) {
				if ("number" == typeof e) throw new TypeError("Argument must not be a number");
				return r(e, t, n)
			}, i.alloc = function(e, t, n) {
				if ("number" != typeof e) throw new TypeError("Argument must be a number");
				var o = r(e);
				return void 0 !== t ? "string" == typeof n ? o.fill(t, n) : o.fill(t) : o.fill(0), o
			}, i.allocUnsafe = function(e) {
				if ("number" != typeof e) throw new TypeError("Argument must be a number");
				return r(e)
			}, i.allocUnsafeSlow = function(e) {
				if ("number" != typeof e) throw new TypeError("Argument must be a number");
				return o.SlowBuffer(e)
			}
	})),
	V = (K.Buffer, K.Buffer);

function q(e) {
	if (this.buffer = null, this.writable = !0, this.readable = !0, !e) return this.buffer = V.alloc(0), this;
	if ("function" == typeof e.pipe) return this.buffer = V.alloc(0), e.pipe(this), this;
	if (e.length || "object" == typeof e) return this.buffer = e, this.writable = !1, process.nextTick(function() {
		this.emit("end", e), this.readable = !1, this.emit("close")
	}.bind(this)), this;
	throw new TypeError("Unexpected data type (" + typeof e + ")")
}
s.inherits(q, i), q.prototype.write = function(e) {
	this.buffer = V.concat([this.buffer, V.from(e)]), this.emit("data", e)
}, q.prototype.end = function(e) {
	e && this.write(e), this.emit("end", e), this.emit("close"), this.writable = !1, this.readable = !1
};
var U = q,
	H = o.Buffer,
	F = o.SlowBuffer,
	G = J;

function J(e, t) {
	if (!H.isBuffer(e) || !H.isBuffer(t)) return !1;
	if (e.length !== t.length) return !1;
	for (var r = 0, n = 0; n < e.length; n++) r |= e[n] ^ t[n];
	return 0 === r
}
J.install = function() {
	H.prototype.equal = F.prototype.equal = function(e) {
		return J(this, e)
	}
};
var z = H.prototype.equal,
	W = F.prototype.equal;

function Z(e) {
	return (e / 8 | 0) + (e % 8 == 0 ? 0 : 1)
}
J.restore = function() {
	H.prototype.equal = z, F.prototype.equal = W
};
var Y = {
	ES256: Z(256),
	ES384: Z(384),
	ES512: Z(521)
};
var X = function(e) {
		var t = Y[e];
		if (t) return t;
		throw new Error('Unknown algorithm "' + e + '"')
	},
	Q = K.Buffer;

function ee(e) {
	if (Q.isBuffer(e)) return e;
	if ("string" == typeof e) return Q.from(e, "base64");
	throw new TypeError("ECDSA signature must be a Base64 string or a Buffer")
}

function te(e, t, r) {
	for (var n = 0; t + n < r && 0 === e[t + n];) ++n;
	return e[t + n] >= 128 && --n, n
}
var re = {
		derToJose: function(e, t) {
			e = ee(e);
			var r = X(t),
				n = r + 1,
				o = e.length,
				i = 0;
			if (48 !== e[i++]) throw new Error('Could not find expected "seq"');
			var s = e[i++];
			if (129 === s && (s = e[i++]), o - i < s) throw new Error('"seq" specified length of "' + s + '", only "' + (o - i) +
				'" remaining');
			if (2 !== e[i++]) throw new Error('Could not find expected "int" for "r"');
			var a = e[i++];
			if (o - i - 2 < a) throw new Error('"r" specified length of "' + a + '", only "' + (o - i - 2) + '" available');
			if (n < a) throw new Error('"r" specified length of "' + a + '", max of "' + n + '" is acceptable');
			var c = i;
			if (i += a, 2 !== e[i++]) throw new Error('Could not find expected "int" for "s"');
			var u = e[i++];
			if (o - i !== u) throw new Error('"s" specified length of "' + u + '", expected "' + (o - i) + '"');
			if (n < u) throw new Error('"s" specified length of "' + u + '", max of "' + n + '" is acceptable');
			var f = i;
			if ((i += u) !== o) throw new Error('Expected to consume entire buffer, but "' + (o - i) + '" bytes remain');
			var d = r - a,
				p = r - u,
				l = Q.allocUnsafe(d + a + p + u);
			for (i = 0; i < d; ++i) l[i] = 0;
			e.copy(l, i, c + Math.max(-d, 0), c + a);
			for (var m = i = r; i < m + p; ++i) l[i] = 0;
			return e.copy(l, i, f + Math.max(-p, 0), f + u), l = (l = l.toString("base64")).replace(/=/g, "").replace(/\+/g,
				"-").replace(/\//g, "_")
		},
		joseToDer: function(e, t) {
			e = ee(e);
			var r = X(t),
				n = e.length;
			if (n !== 2 * r) throw new TypeError('"' + t + '" signatures must be "' + 2 * r + '" bytes, saw "' + n + '"');
			var o = te(e, 0, r),
				i = te(e, r, e.length),
				s = r - o,
				a = r - i,
				c = 2 + s + 1 + 1 + a,
				u = c < 128,
				f = Q.allocUnsafe((u ? 2 : 3) + c),
				d = 0;
			return f[d++] = 48, u ? f[d++] = c : (f[d++] = 129, f[d++] = 255 & c), f[d++] = 2, f[d++] = s, o < 0 ? (f[d++] = 0,
					d += e.copy(f, d, 0, r)) : d += e.copy(f, d, o, r), f[d++] = 2, f[d++] = a, i < 0 ? (f[d++] = 0, e.copy(f, d, r)) :
				e.copy(f, d, r + i), f
		}
	},
	ne = K.Buffer,
	oe = "secret must be a string or buffer",
	ie = "key must be a string or a buffer",
	se = "function" == typeof n.createPublicKey;

function ae(e) {
	if (!ne.isBuffer(e) && "string" != typeof e) {
		if (!se) throw de(ie);
		if ("object" != typeof e) throw de(ie);
		if ("string" != typeof e.type) throw de(ie);
		if ("string" != typeof e.asymmetricKeyType) throw de(ie);
		if ("function" != typeof e.export) throw de(ie)
	}
}

function ce(e) {
	if (!ne.isBuffer(e) && "string" != typeof e && "object" != typeof e) throw de(
		"key must be a string, a buffer or an object")
}

function ue(e) {
	return e.replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_")
}

function fe(e) {
	var t = 4 - (e = e.toString()).length % 4;
	if (4 !== t)
		for (var r = 0; r < t; ++r) e += "=";
	return e.replace(/\-/g, "+").replace(/_/g, "/")
}

function de(e) {
	var t = [].slice.call(arguments, 1),
		r = s.format.bind(s, e).apply(null, t);
	return new TypeError(r)
}

function pe(e) {
	var t;
	return t = e, ne.isBuffer(t) || "string" == typeof t || (e = JSON.stringify(e)), e
}

function le(e) {
	return function(t, r) {
		! function(e) {
			if (!ne.isBuffer(e)) {
				if ("string" == typeof e) return e;
				if (!se) throw de(oe);
				if ("object" != typeof e) throw de(oe);
				if ("secret" !== e.type) throw de(oe);
				if ("function" != typeof e.export) throw de(oe)
			}
		}(r), t = pe(t);
		var o = n.createHmac("sha" + e, r);
		return ue((o.update(t), o.digest("base64")))
	}
}

function me(e) {
	return function(t, r, n) {
		var o = le(e)(t, n);
		return G(ne.from(r), ne.from(o))
	}
}

function he(e) {
	return function(t, r) {
		ce(r), t = pe(t);
		var o = n.createSign("RSA-SHA" + e);
		return ue((o.update(t), o.sign(r, "base64")))
	}
}

function ge(e) {
	return function(t, r, o) {
		ae(o), t = pe(t), r = fe(r);
		var i = n.createVerify("RSA-SHA" + e);
		return i.update(t), i.verify(o, r, "base64")
	}
}

function ye(e) {
	return function(t, r) {
		ce(r), t = pe(t);
		var o = n.createSign("RSA-SHA" + e);
		return ue((o.update(t), o.sign({
			key: r,
			padding: n.constants.RSA_PKCS1_PSS_PADDING,
			saltLength: n.constants.RSA_PSS_SALTLEN_DIGEST
		}, "base64")))
	}
}

function we(e) {
	return function(t, r, o) {
		ae(o), t = pe(t), r = fe(r);
		var i = n.createVerify("RSA-SHA" + e);
		return i.update(t), i.verify({
			key: o,
			padding: n.constants.RSA_PKCS1_PSS_PADDING,
			saltLength: n.constants.RSA_PSS_SALTLEN_DIGEST
		}, r, "base64")
	}
}

function ve(e) {
	var t = he(e);
	return function() {
		var r = t.apply(null, arguments);
		return r = re.derToJose(r, "ES" + e)
	}
}

function be(e) {
	var t = ge(e);
	return function(r, n, o) {
		return n = re.joseToDer(n, "ES" + e).toString("base64"), t(r, n, o)
	}
}

function _e() {
	return function() {
		return ""
	}
}

function Se() {
	return function(e, t) {
		return "" === t
	}
}
se && (ie += " or a KeyObject", oe += "or a KeyObject");
var xe = function(e) {
		var t = {
				hs: le,
				rs: he,
				ps: ye,
				es: ve,
				none: _e
			},
			r = {
				hs: me,
				rs: ge,
				ps: we,
				es: be,
				none: Se
			},
			n = e.match(/^(RS|PS|ES|HS)(256|384|512)$|^(none)$/i);
		if (!n) throw de(
			'"%s" is not a valid algorithm.\n  Supported algorithms are:\n  "HS256", "HS384", "HS512", "RS256", "RS384", "RS512", "PS256", "PS384", "PS512", "ES256", "ES384", "ES512" and "none".',
			e);
		var o = (n[1] || n[3]).toLowerCase(),
			i = n[2];
		return {
			sign: t[o](i),
			verify: r[o](i)
		}
	},
	Ee = o.Buffer,
	je = function(e) {
		return "string" == typeof e ? e : "number" == typeof e || Ee.isBuffer(e) ? e.toString() : JSON.stringify(e)
	},
	ke = K.Buffer;

function Pe(e, t) {
	return ke.from(e, t).toString("base64").replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_")
}

function Oe(e) {
	var t = e.header,
		r = e.payload,
		n = e.secret || e.privateKey,
		o = e.encoding,
		i = xe(t.alg),
		a = function(e, t, r) {
			r = r || "utf8";
			var n = Pe(je(e), "binary"),
				o = Pe(je(t), r);
			return s.format("%s.%s", n, o)
		}(t, r, o),
		c = i.sign(a, n);
	return s.format("%s.%s", a, c)
}

function Te(e) {
	var t = e.secret || e.privateKey || e.key,
		r = new U(t);
	this.readable = !0, this.header = e.header, this.encoding = e.encoding, this.secret = this.privateKey = this.key = r,
		this.payload = new U(e.payload), this.secret.once("close", function() {
			!this.payload.writable && this.readable && this.sign()
		}.bind(this)), this.payload.once("close", function() {
			!this.secret.writable && this.readable && this.sign()
		}.bind(this))
}
s.inherits(Te, i), Te.prototype.sign = function() {
	try {
		var e = Oe({
			header: this.header,
			payload: this.payload.buffer,
			secret: this.secret.buffer,
			encoding: this.encoding
		});
		return this.emit("done", e), this.emit("data", e), this.emit("end"), this.readable = !1, e
	} catch (e) {
		this.readable = !1, this.emit("error", e), this.emit("close")
	}
}, Te.sign = Oe;
var Ie = Te,
	Re = K.Buffer,
	Ae = /^[a-zA-Z0-9\-_]+?\.[a-zA-Z0-9\-_]+?\.([a-zA-Z0-9\-_]+)?$/;

function Ce(e) {
	if (function(e) {
			return "[object Object]" === Object.prototype.toString.call(e)
		}(e)) return e;
	try {
		return JSON.parse(e)
	} catch (e) {
		return
	}
}

function De(e) {
	var t = e.split(".", 1)[0];
	return Ce(Re.from(t, "base64").toString("binary"))
}

function $e(e) {
	return e.split(".")[2]
}

function Be(e) {
	return Ae.test(e) && !!De(e)
}

function Me(e, t, r) {
	if (!t) {
		var n = new Error("Missing algorithm parameter for jws.verify");
		throw n.code = "MISSING_ALGORITHM", n
	}
	var o = $e(e = je(e)),
		i = function(e) {
			return e.split(".", 2).join(".")
		}(e);
	return xe(t).verify(i, o, r)
}

function Ne(e, t) {
	if (t = t || {}, !Be(e = je(e))) return null;
	var r = De(e);
	if (!r) return null;
	var n = function(e, t) {
		t = t || "utf8";
		var r = e.split(".")[1];
		return Re.from(r, "base64").toString(t)
	}(e);
	return ("JWT" === r.typ || t.json) && (n = JSON.parse(n, t.encoding)), {
		header: r,
		payload: n,
		signature: $e(e)
	}
}

function Le(e) {
	var t = (e = e || {}).secret || e.publicKey || e.key,
		r = new U(t);
	this.readable = !0, this.algorithm = e.algorithm, this.encoding = e.encoding, this.secret = this.publicKey = this.key =
		r, this.signature = new U(e.signature), this.secret.once("close", function() {
			!this.signature.writable && this.readable && this.verify()
		}.bind(this)), this.signature.once("close", function() {
			!this.secret.writable && this.readable && this.verify()
		}.bind(this))
}
s.inherits(Le, i), Le.prototype.verify = function() {
	try {
		var e = Me(this.signature.buffer, this.algorithm, this.key.buffer),
			t = Ne(this.signature.buffer, this.encoding);
		return this.emit("done", e, t), this.emit("data", e), this.emit("end"), this.readable = !1, e
	} catch (e) {
		this.readable = !1, this.emit("error", e), this.emit("close")
	}
}, Le.decode = Ne, Le.isValid = Be, Le.verify = Me;
var Ke = Le,
	Ve = {
		ALGORITHMS: ["HS256", "HS384", "HS512", "RS256", "RS384", "RS512", "PS256", "PS384", "PS512", "ES256", "ES384",
			"ES512"
		],
		sign: Ie.sign,
		verify: Ke.verify,
		decode: Ke.decode,
		isValid: Ke.isValid,
		createSign: function(e) {
			return new Ie(e)
		},
		createVerify: function(e) {
			return new Ke(e)
		}
	},
	qe = function(e, t) {
		t = t || {};
		var r = Ve.decode(e, t);
		if (!r) return null;
		var n = r.payload;
		if ("string" == typeof n) try {
			var o = JSON.parse(n);
			null !== o && "object" == typeof o && (n = o)
		} catch (e) {}
		return !0 === t.complete ? {
			header: r.header,
			payload: n,
			signature: r.signature
		} : n
	},
	Ue = function(e, t) {
		Error.call(this, e), Error.captureStackTrace && Error.captureStackTrace(this, this.constructor), this.name =
			"JsonWebTokenError", this.message = e, t && (this.inner = t)
	};
(Ue.prototype = Object.create(Error.prototype)).constructor = Ue;
var He = Ue,
	Fe = function(e, t) {
		He.call(this, e), this.name = "NotBeforeError", this.date = t
	};
(Fe.prototype = Object.create(He.prototype)).constructor = Fe;
var Ge = Fe,
	Je = function(e, t) {
		He.call(this, e), this.name = "TokenExpiredError", this.expiredAt = t
	};
(Je.prototype = Object.create(He.prototype)).constructor = Je;
var ze = Je,
	We = 1e3,
	Ze = 60 * We,
	Ye = 60 * Ze,
	Xe = 24 * Ye,
	Qe = function(e, t) {
		t = t || {};
		var r = typeof e;
		if ("string" === r && e.length > 0) return function(e) {
			if ((e = String(e)).length > 100) return;
			var t =
				/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i
				.exec(e);
			if (!t) return;
			var r = parseFloat(t[1]);
			switch ((t[2] || "ms").toLowerCase()) {
				case "years":
				case "year":
				case "yrs":
				case "yr":
				case "y":
					return 315576e5 * r;
				case "weeks":
				case "week":
				case "w":
					return 6048e5 * r;
				case "days":
				case "day":
				case "d":
					return r * Xe;
				case "hours":
				case "hour":
				case "hrs":
				case "hr":
				case "h":
					return r * Ye;
				case "minutes":
				case "minute":
				case "mins":
				case "min":
				case "m":
					return r * Ze;
				case "seconds":
				case "second":
				case "secs":
				case "sec":
				case "s":
					return r * We;
				case "milliseconds":
				case "millisecond":
				case "msecs":
				case "msec":
				case "ms":
					return r;
				default:
					return
			}
		}(e);
		if ("number" === r && isFinite(e)) return t.long ? function(e) {
			var t = Math.abs(e);
			if (t >= Xe) return et(e, t, Xe, "day");
			if (t >= Ye) return et(e, t, Ye, "hour");
			if (t >= Ze) return et(e, t, Ze, "minute");
			if (t >= We) return et(e, t, We, "second");
			return e + " ms"
		}(e) : function(e) {
			var t = Math.abs(e);
			if (t >= Xe) return Math.round(e / Xe) + "d";
			if (t >= Ye) return Math.round(e / Ye) + "h";
			if (t >= Ze) return Math.round(e / Ze) + "m";
			if (t >= We) return Math.round(e / We) + "s";
			return e + "ms"
		}(e);
		throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(e))
	};

function et(e, t, r, n) {
	var o = t >= 1.5 * r;
	return Math.round(e / r) + " " + n + (o ? "s" : "")
}
var tt = function(e, t) {
		var r = t || Math.floor(Date.now() / 1e3);
		if ("string" == typeof e) {
			var n = Qe(e);
			if (void 0 === n) return;
			return Math.floor(r + n / 1e3)
		}
		return "number" == typeof e ? r + e : void 0
	},
	rt = L((function(e, t) {
		var r;
		t = e.exports = G, r = "object" == typeof process && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(
			process.env.NODE_DEBUG) ? function() {
			var e = Array.prototype.slice.call(arguments, 0);
			e.unshift("SEMVER"), console.log.apply(console, e)
		} : function() {}, t.SEMVER_SPEC_VERSION = "2.0.0";
		var n = Number.MAX_SAFE_INTEGER || 9007199254740991,
			o = t.re = [],
			i = t.src = [],
			s = 0,
			a = s++;
		i[a] = "0|[1-9]\\d*";
		var c = s++;
		i[c] = "[0-9]+";
		var u = s++;
		i[u] = "\\d*[a-zA-Z-][a-zA-Z0-9-]*";
		var f = s++;
		i[f] = "(" + i[a] + ")\\.(" + i[a] + ")\\.(" + i[a] + ")";
		var d = s++;
		i[d] = "(" + i[c] + ")\\.(" + i[c] + ")\\.(" + i[c] + ")";
		var p = s++;
		i[p] = "(?:" + i[a] + "|" + i[u] + ")";
		var l = s++;
		i[l] = "(?:" + i[c] + "|" + i[u] + ")";
		var m = s++;
		i[m] = "(?:-(" + i[p] + "(?:\\." + i[p] + ")*))";
		var h = s++;
		i[h] = "(?:-?(" + i[l] + "(?:\\." + i[l] + ")*))";
		var g = s++;
		i[g] = "[0-9A-Za-z-]+";
		var y = s++;
		i[y] = "(?:\\+(" + i[g] + "(?:\\." + i[g] + ")*))";
		var w = s++,
			v = "v?" + i[f] + i[m] + "?" + i[y] + "?";
		i[w] = "^" + v + "$";
		var b = "[v=\\s]*" + i[d] + i[h] + "?" + i[y] + "?",
			_ = s++;
		i[_] = "^" + b + "$";
		var S = s++;
		i[S] = "((?:<|>)?=?)";
		var x = s++;
		i[x] = i[c] + "|x|X|\\*";
		var E = s++;
		i[E] = i[a] + "|x|X|\\*";
		var j = s++;
		i[j] = "[v=\\s]*(" + i[E] + ")(?:\\.(" + i[E] + ")(?:\\.(" + i[E] + ")(?:" + i[m] + ")?" + i[y] + "?)?)?";
		var k = s++;
		i[k] = "[v=\\s]*(" + i[x] + ")(?:\\.(" + i[x] + ")(?:\\.(" + i[x] + ")(?:" + i[h] + ")?" + i[y] + "?)?)?";
		var P = s++;
		i[P] = "^" + i[S] + "\\s*" + i[j] + "$";
		var O = s++;
		i[O] = "^" + i[S] + "\\s*" + i[k] + "$";
		var T = s++;
		i[T] = "(?:^|[^\\d])(\\d{1,16})(?:\\.(\\d{1,16}))?(?:\\.(\\d{1,16}))?(?:$|[^\\d])";
		var I = s++;
		i[I] = "(?:~>?)";
		var R = s++;
		i[R] = "(\\s*)" + i[I] + "\\s+", o[R] = new RegExp(i[R], "g");
		var A = s++;
		i[A] = "^" + i[I] + i[j] + "$";
		var C = s++;
		i[C] = "^" + i[I] + i[k] + "$";
		var D = s++;
		i[D] = "(?:\\^)";
		var $ = s++;
		i[$] = "(\\s*)" + i[D] + "\\s+", o[$] = new RegExp(i[$], "g");
		var B = s++;
		i[B] = "^" + i[D] + i[j] + "$";
		var M = s++;
		i[M] = "^" + i[D] + i[k] + "$";
		var N = s++;
		i[N] = "^" + i[S] + "\\s*(" + b + ")$|^$";
		var L = s++;
		i[L] = "^" + i[S] + "\\s*(" + v + ")$|^$";
		var K = s++;
		i[K] = "(\\s*)" + i[S] + "\\s*(" + b + "|" + i[j] + ")", o[K] = new RegExp(i[K], "g");
		var V = s++;
		i[V] = "^\\s*(" + i[j] + ")\\s+-\\s+(" + i[j] + ")\\s*$";
		var q = s++;
		i[q] = "^\\s*(" + i[k] + ")\\s+-\\s+(" + i[k] + ")\\s*$";
		var U = s++;
		i[U] = "(<|>)?=?\\s*\\*";
		for (var H = 0; H < 35; H++) r(H, i[H]), o[H] || (o[H] = new RegExp(i[H]));

		function F(e, t) {
			if (t && "object" == typeof t || (t = {
					loose: !!t,
					includePrerelease: !1
				}), e instanceof G) return e;
			if ("string" != typeof e) return null;
			if (e.length > 256) return null;
			if (!(t.loose ? o[_] : o[w]).test(e)) return null;
			try {
				return new G(e, t)
			} catch (e) {
				return null
			}
		}

		function G(e, t) {
			if (t && "object" == typeof t || (t = {
					loose: !!t,
					includePrerelease: !1
				}), e instanceof G) {
				if (e.loose === t.loose) return e;
				e = e.version
			} else if ("string" != typeof e) throw new TypeError("Invalid Version: " + e);
			if (e.length > 256) throw new TypeError("version is longer than 256 characters");
			if (!(this instanceof G)) return new G(e, t);
			r("SemVer", e, t), this.options = t, this.loose = !!t.loose;
			var i = e.trim().match(t.loose ? o[_] : o[w]);
			if (!i) throw new TypeError("Invalid Version: " + e);
			if (this.raw = e, this.major = +i[1], this.minor = +i[2], this.patch = +i[3], this.major > n || this.major < 0)
				throw new TypeError("Invalid major version");
			if (this.minor > n || this.minor < 0) throw new TypeError("Invalid minor version");
			if (this.patch > n || this.patch < 0) throw new TypeError("Invalid patch version");
			i[4] ? this.prerelease = i[4].split(".").map((function(e) {
				if (/^[0-9]+$/.test(e)) {
					var t = +e;
					if (t >= 0 && t < n) return t
				}
				return e
			})) : this.prerelease = [], this.build = i[5] ? i[5].split(".") : [], this.format()
		}
		t.parse = F, t.valid = function(e, t) {
			var r = F(e, t);
			return r ? r.version : null
		}, t.clean = function(e, t) {
			var r = F(e.trim().replace(/^[=v]+/, ""), t);
			return r ? r.version : null
		}, t.SemVer = G, G.prototype.format = function() {
			return this.version = this.major + "." + this.minor + "." + this.patch, this.prerelease.length && (this.version +=
				"-" + this.prerelease.join(".")), this.version
		}, G.prototype.toString = function() {
			return this.version
		}, G.prototype.compare = function(e) {
			return r("SemVer.compare", this.version, this.options, e), e instanceof G || (e = new G(e, this.options)), this.compareMain(
				e) || this.comparePre(e)
		}, G.prototype.compareMain = function(e) {
			return e instanceof G || (e = new G(e, this.options)), z(this.major, e.major) || z(this.minor, e.minor) || z(this
				.patch, e.patch)
		}, G.prototype.comparePre = function(e) {
			if (e instanceof G || (e = new G(e, this.options)), this.prerelease.length && !e.prerelease.length) return -1;
			if (!this.prerelease.length && e.prerelease.length) return 1;
			if (!this.prerelease.length && !e.prerelease.length) return 0;
			var t = 0;
			do {
				var n = this.prerelease[t],
					o = e.prerelease[t];
				if (r("prerelease compare", t, n, o), void 0 === n && void 0 === o) return 0;
				if (void 0 === o) return 1;
				if (void 0 === n) return -1;
				if (n !== o) return z(n, o)
			} while (++t)
		}, G.prototype.inc = function(e, t) {
			switch (e) {
				case "premajor":
					this.prerelease.length = 0, this.patch = 0, this.minor = 0, this.major++, this.inc("pre", t);
					break;
				case "preminor":
					this.prerelease.length = 0, this.patch = 0, this.minor++, this.inc("pre", t);
					break;
				case "prepatch":
					this.prerelease.length = 0, this.inc("patch", t), this.inc("pre", t);
					break;
				case "prerelease":
					0 === this.prerelease.length && this.inc("patch", t), this.inc("pre", t);
					break;
				case "major":
					0 === this.minor && 0 === this.patch && 0 !== this.prerelease.length || this.major++, this.minor = 0, this.patch =
						0, this.prerelease = [];
					break;
				case "minor":
					0 === this.patch && 0 !== this.prerelease.length || this.minor++, this.patch = 0, this.prerelease = [];
					break;
				case "patch":
					0 === this.prerelease.length && this.patch++, this.prerelease = [];
					break;
				case "pre":
					if (0 === this.prerelease.length) this.prerelease = [0];
					else {
						for (var r = this.prerelease.length; --r >= 0;) "number" == typeof this.prerelease[r] && (this.prerelease[r]++,
							r = -2); - 1 === r && this.prerelease.push(0)
					}
					t && (this.prerelease[0] === t ? isNaN(this.prerelease[1]) && (this.prerelease = [t, 0]) : this.prerelease = [t,
						0
					]);
					break;
				default:
					throw new Error("invalid increment argument: " + e)
			}
			return this.format(), this.raw = this.version, this
		}, t.inc = function(e, t, r, n) {
			"string" == typeof r && (n = r, r = void 0);
			try {
				return new G(e, r).inc(t, n).version
			} catch (e) {
				return null
			}
		}, t.diff = function(e, t) {
			if (X(e, t)) return null;
			var r = F(e),
				n = F(t),
				o = "";
			if (r.prerelease.length || n.prerelease.length) {
				o = "pre";
				var i = "prerelease"
			}
			for (var s in r)
				if (("major" === s || "minor" === s || "patch" === s) && r[s] !== n[s]) return o + s;
			return i
		}, t.compareIdentifiers = z;
		var J = /^[0-9]+$/;

		function z(e, t) {
			var r = J.test(e),
				n = J.test(t);
			return r && n && (e = +e, t = +t), e === t ? 0 : r && !n ? -1 : n && !r ? 1 : e < t ? -1 : 1
		}

		function W(e, t, r) {
			return new G(e, r).compare(new G(t, r))
		}

		function Z(e, t, r) {
			return W(e, t, r) > 0
		}

		function Y(e, t, r) {
			return W(e, t, r) < 0
		}

		function X(e, t, r) {
			return 0 === W(e, t, r)
		}

		function Q(e, t, r) {
			return 0 !== W(e, t, r)
		}

		function ee(e, t, r) {
			return W(e, t, r) >= 0
		}

		function te(e, t, r) {
			return W(e, t, r) <= 0
		}

		function re(e, t, r, n) {
			switch (t) {
				case "===":
					return "object" == typeof e && (e = e.version), "object" == typeof r && (r = r.version), e === r;
				case "!==":
					return "object" == typeof e && (e = e.version), "object" == typeof r && (r = r.version), e !== r;
				case "":
				case "=":
				case "==":
					return X(e, r, n);
				case "!=":
					return Q(e, r, n);
				case ">":
					return Z(e, r, n);
				case ">=":
					return ee(e, r, n);
				case "<":
					return Y(e, r, n);
				case "<=":
					return te(e, r, n);
				default:
					throw new TypeError("Invalid operator: " + t)
			}
		}

		function ne(e, t) {
			if (t && "object" == typeof t || (t = {
					loose: !!t,
					includePrerelease: !1
				}), e instanceof ne) {
				if (e.loose === !!t.loose) return e;
				e = e.value
			}
			if (!(this instanceof ne)) return new ne(e, t);
			r("comparator", e, t), this.options = t, this.loose = !!t.loose, this.parse(e), this.semver === oe ? this.value =
				"" : this.value = this.operator + this.semver.version, r("comp", this)
		}
		t.rcompareIdentifiers = function(e, t) {
			return z(t, e)
		}, t.major = function(e, t) {
			return new G(e, t).major
		}, t.minor = function(e, t) {
			return new G(e, t).minor
		}, t.patch = function(e, t) {
			return new G(e, t).patch
		}, t.compare = W, t.compareLoose = function(e, t) {
			return W(e, t, !0)
		}, t.rcompare = function(e, t, r) {
			return W(t, e, r)
		}, t.sort = function(e, r) {
			return e.sort((function(e, n) {
				return t.compare(e, n, r)
			}))
		}, t.rsort = function(e, r) {
			return e.sort((function(e, n) {
				return t.rcompare(e, n, r)
			}))
		}, t.gt = Z, t.lt = Y, t.eq = X, t.neq = Q, t.gte = ee, t.lte = te, t.cmp = re, t.Comparator = ne;
		var oe = {};

		function ie(e, t) {
			if (t && "object" == typeof t || (t = {
					loose: !!t,
					includePrerelease: !1
				}), e instanceof ie) return e.loose === !!t.loose && e.includePrerelease === !!t.includePrerelease ? e : new ie(e
				.raw, t);
			if (e instanceof ne) return new ie(e.value, t);
			if (!(this instanceof ie)) return new ie(e, t);
			if (this.options = t, this.loose = !!t.loose, this.includePrerelease = !!t.includePrerelease, this.raw = e, this.set =
				e.split(/\s*\|\|\s*/).map((function(e) {
					return this.parseRange(e.trim())
				}), this).filter((function(e) {
					return e.length
				})), !this.set.length) throw new TypeError("Invalid SemVer Range: " + e);
			this.format()
		}

		function se(e) {
			return !e || "x" === e.toLowerCase() || "*" === e
		}

		function ae(e, t, r, n, o, i, s, a, c, u, f, d, p) {
			return ((t = se(r) ? "" : se(n) ? ">=" + r + ".0.0" : se(o) ? ">=" + r + "." + n + ".0" : ">=" + t) + " " + (a =
				se(c) ? "" : se(u) ? "<" + (+c + 1) + ".0.0" : se(f) ? "<" + c + "." + (+u + 1) + ".0" : d ? "<=" + c + "." + u +
				"." + f + "-" + d : "<=" + a)).trim()
		}

		function ce(e, t, n) {
			for (var o = 0; o < e.length; o++)
				if (!e[o].test(t)) return !1;
			if (t.prerelease.length && !n.includePrerelease) {
				for (o = 0; o < e.length; o++)
					if (r(e[o].semver), e[o].semver !== oe && e[o].semver.prerelease.length > 0) {
						var i = e[o].semver;
						if (i.major === t.major && i.minor === t.minor && i.patch === t.patch) return !0
					} return !1
			}
			return !0
		}

		function ue(e, t, r) {
			try {
				t = new ie(t, r)
			} catch (e) {
				return !1
			}
			return t.test(e)
		}

		function fe(e, t, r, n) {
			var o, i, s, a, c;
			switch (e = new G(e, n), t = new ie(t, n), r) {
				case ">":
					o = Z, i = te, s = Y, a = ">", c = ">=";
					break;
				case "<":
					o = Y, i = ee, s = Z, a = "<", c = "<=";
					break;
				default:
					throw new TypeError('Must provide a hilo val of "<" or ">"')
			}
			if (ue(e, t, n)) return !1;
			for (var u = 0; u < t.set.length; ++u) {
				var f = t.set[u],
					d = null,
					p = null;
				if (f.forEach((function(e) {
						e.semver === oe && (e = new ne(">=0.0.0")), d = d || e, p = p || e, o(e.semver, d.semver, n) ? d = e : s(e.semver,
							p.semver, n) && (p = e)
					})), d.operator === a || d.operator === c) return !1;
				if ((!p.operator || p.operator === a) && i(e, p.semver)) return !1;
				if (p.operator === c && s(e, p.semver)) return !1
			}
			return !0
		}
		ne.prototype.parse = function(e) {
			var t = this.options.loose ? o[N] : o[L],
				r = e.match(t);
			if (!r) throw new TypeError("Invalid comparator: " + e);
			this.operator = r[1], "=" === this.operator && (this.operator = ""), r[2] ? this.semver = new G(r[2], this.options
				.loose) : this.semver = oe
		}, ne.prototype.toString = function() {
			return this.value
		}, ne.prototype.test = function(e) {
			return r("Comparator.test", e, this.options.loose), this.semver === oe || ("string" == typeof e && (e = new G(e,
				this.options)), re(e, this.operator, this.semver, this.options))
		}, ne.prototype.intersects = function(e, t) {
			if (!(e instanceof ne)) throw new TypeError("a Comparator is required");
			var r;
			if (t && "object" == typeof t || (t = {
					loose: !!t,
					includePrerelease: !1
				}), "" === this.operator) return r = new ie(e.value, t), ue(this.value, r, t);
			if ("" === e.operator) return r = new ie(this.value, t), ue(e.semver, r, t);
			var n = !(">=" !== this.operator && ">" !== this.operator || ">=" !== e.operator && ">" !== e.operator),
				o = !("<=" !== this.operator && "<" !== this.operator || "<=" !== e.operator && "<" !== e.operator),
				i = this.semver.version === e.semver.version,
				s = !(">=" !== this.operator && "<=" !== this.operator || ">=" !== e.operator && "<=" !== e.operator),
				a = re(this.semver, "<", e.semver, t) && (">=" === this.operator || ">" === this.operator) && ("<=" === e.operator ||
					"<" === e.operator),
				c = re(this.semver, ">", e.semver, t) && ("<=" === this.operator || "<" === this.operator) && (">=" === e.operator ||
					">" === e.operator);
			return n || o || i && s || a || c
		}, t.Range = ie, ie.prototype.format = function() {
			return this.range = this.set.map((function(e) {
				return e.join(" ").trim()
			})).join("||").trim(), this.range
		}, ie.prototype.toString = function() {
			return this.range
		}, ie.prototype.parseRange = function(e) {
			var t = this.options.loose;
			e = e.trim();
			var n = t ? o[q] : o[V];
			e = e.replace(n, ae), r("hyphen replace", e), e = e.replace(o[K], "$1$2$3"), r("comparator trim", e, o[K]), e = (
				e = (e = e.replace(o[R], "$1~")).replace(o[$], "$1^")).split(/\s+/).join(" ");
			var i = t ? o[N] : o[L],
				s = e.split(" ").map((function(e) {
					return function(e, t) {
						return r("comp", e, t), e = function(e, t) {
							return e.trim().split(/\s+/).map((function(e) {
								return function(e, t) {
									r("caret", e, t);
									var n = t.loose ? o[M] : o[B];
									return e.replace(n, (function(t, n, o, i, s) {
										var a;
										return r("caret", e, t, n, o, i, s), se(n) ? a = "" : se(o) ? a = ">=" + n + ".0.0 <" + (+n + 1) +
											".0.0" : se(i) ? a = "0" === n ? ">=" + n + "." + o + ".0 <" + n + "." + (+o + 1) + ".0" :
											">=" + n + "." + o + ".0 <" + (+n + 1) + ".0.0" : s ? (r("replaceCaret pr", s), a = "0" === n ?
												"0" === o ? ">=" + n + "." + o + "." + i + "-" + s + " <" + n + "." + o + "." + (+i + 1) :
												">=" + n + "." + o + "." + i + "-" + s + " <" + n + "." + (+o + 1) + ".0" : ">=" + n + "." +
												o + "." + i + "-" + s + " <" + (+n + 1) + ".0.0") : (r("no pr"), a = "0" === n ? "0" === o ?
												">=" + n + "." + o + "." + i + " <" + n + "." + o + "." + (+i + 1) : ">=" + n + "." + o + "." +
												i + " <" + n + "." + (+o + 1) + ".0" : ">=" + n + "." + o + "." + i + " <" + (+n + 1) +
												".0.0"), r("caret return", a), a
									}))
								}(e, t)
							})).join(" ")
						}(e, t), r("caret", e), e = function(e, t) {
							return e.trim().split(/\s+/).map((function(e) {
								return function(e, t) {
									var n = t.loose ? o[C] : o[A];
									return e.replace(n, (function(t, n, o, i, s) {
										var a;
										return r("tilde", e, t, n, o, i, s), se(n) ? a = "" : se(o) ? a = ">=" + n + ".0.0 <" + (+n + 1) +
											".0.0" : se(i) ? a = ">=" + n + "." + o + ".0 <" + n + "." + (+o + 1) + ".0" : s ? (r(
													"replaceTilde pr", s), a = ">=" + n + "." + o + "." + i + "-" + s + " <" + n + "." + (+o + 1) +
												".0") : a = ">=" + n + "." + o + "." + i + " <" + n + "." + (+o + 1) + ".0", r("tilde return",
												a), a
									}))
								}(e, t)
							})).join(" ")
						}(e, t), r("tildes", e), e = function(e, t) {
							return r("replaceXRanges", e, t), e.split(/\s+/).map((function(e) {
								return function(e, t) {
									e = e.trim();
									var n = t.loose ? o[O] : o[P];
									return e.replace(n, (function(t, n, o, i, s, a) {
										r("xRange", e, t, n, o, i, s, a);
										var c = se(o),
											u = c || se(i),
											f = u || se(s);
										return "=" === n && f && (n = ""), c ? t = ">" === n || "<" === n ? "<0.0.0" : "*" : n && f ? (
												u && (i = 0), s = 0, ">" === n ? (n = ">=", u ? (o = +o + 1, i = 0, s = 0) : (i = +i + 1, s =
													0)) : "<=" === n && (n = "<", u ? o = +o + 1 : i = +i + 1), t = n + o + "." + i + "." + s) :
											u ? t = ">=" + o + ".0.0 <" + (+o + 1) + ".0.0" : f && (t = ">=" + o + "." + i + ".0 <" + o +
												"." + (+i + 1) + ".0"), r("xRange return", t), t
									}))
								}(e, t)
							})).join(" ")
						}(e, t), r("xrange", e), e = function(e, t) {
							return r("replaceStars", e, t), e.trim().replace(o[U], "")
						}(e, t), r("stars", e), e
					}(e, this.options)
				}), this).join(" ").split(/\s+/);
			return this.options.loose && (s = s.filter((function(e) {
				return !!e.match(i)
			}))), s = s.map((function(e) {
				return new ne(e, this.options)
			}), this)
		}, ie.prototype.intersects = function(e, t) {
			if (!(e instanceof ie)) throw new TypeError("a Range is required");
			return this.set.some((function(r) {
				return r.every((function(r) {
					return e.set.some((function(e) {
						return e.every((function(e) {
							return r.intersects(e, t)
						}))
					}))
				}))
			}))
		}, t.toComparators = function(e, t) {
			return new ie(e, t).set.map((function(e) {
				return e.map((function(e) {
					return e.value
				})).join(" ").trim().split(" ")
			}))
		}, ie.prototype.test = function(e) {
			if (!e) return !1;
			"string" == typeof e && (e = new G(e, this.options));
			for (var t = 0; t < this.set.length; t++)
				if (ce(this.set[t], e, this.options)) return !0;
			return !1
		}, t.satisfies = ue, t.maxSatisfying = function(e, t, r) {
			var n = null,
				o = null;
			try {
				var i = new ie(t, r)
			} catch (e) {
				return null
			}
			return e.forEach((function(e) {
				i.test(e) && (n && -1 !== o.compare(e) || (o = new G(n = e, r)))
			})), n
		}, t.minSatisfying = function(e, t, r) {
			var n = null,
				o = null;
			try {
				var i = new ie(t, r)
			} catch (e) {
				return null
			}
			return e.forEach((function(e) {
				i.test(e) && (n && 1 !== o.compare(e) || (o = new G(n = e, r)))
			})), n
		}, t.minVersion = function(e, t) {
			e = new ie(e, t);
			var r = new G("0.0.0");
			if (e.test(r)) return r;
			if (r = new G("0.0.0-0"), e.test(r)) return r;
			r = null;
			for (var n = 0; n < e.set.length; ++n) {
				e.set[n].forEach((function(e) {
					var t = new G(e.semver.version);
					switch (e.operator) {
						case ">":
							0 === t.prerelease.length ? t.patch++ : t.prerelease.push(0), t.raw = t.format();
						case "":
						case ">=":
							r && !Z(r, t) || (r = t);
							break;
						case "<":
						case "<=":
							break;
						default:
							throw new Error("Unexpected operation: " + e.operator)
					}
				}))
			}
			if (r && e.test(r)) return r;
			return null
		}, t.validRange = function(e, t) {
			try {
				return new ie(e, t).range || "*"
			} catch (e) {
				return null
			}
		}, t.ltr = function(e, t, r) {
			return fe(e, t, "<", r)
		}, t.gtr = function(e, t, r) {
			return fe(e, t, ">", r)
		}, t.outside = fe, t.prerelease = function(e, t) {
			var r = F(e, t);
			return r && r.prerelease.length ? r.prerelease : null
		}, t.intersects = function(e, t, r) {
			return e = new ie(e, r), t = new ie(t, r), e.intersects(t)
		}, t.coerce = function(e) {
			if (e instanceof G) return e;
			if ("string" != typeof e) return null;
			var t = e.match(o[T]);
			if (null == t) return null;
			return F(t[1] + "." + (t[2] || "0") + "." + (t[3] || "0"))
		}
	})),
	nt = (rt.SEMVER_SPEC_VERSION, rt.re, rt.src, rt.parse, rt.valid, rt.clean, rt.SemVer, rt.inc, rt.diff, rt.compareIdentifiers,
		rt.rcompareIdentifiers, rt.major, rt.minor, rt.patch, rt.compare, rt.compareLoose, rt.rcompare, rt.sort, rt.rsort, rt
		.gt, rt.lt, rt.eq, rt.neq, rt.gte, rt.lte, rt.cmp, rt.Comparator, rt.Range, rt.toComparators, rt.satisfies, rt.maxSatisfying,
		rt.minSatisfying, rt.minVersion, rt.validRange, rt.ltr, rt.gtr, rt.outside, rt.prerelease, rt.intersects, rt.coerce,
		rt.satisfies(process.version, "^6.12.0 || >=8.0.0")),
	ot = ["RS256", "RS384", "RS512", "ES256", "ES384", "ES512"],
	it = ["RS256", "RS384", "RS512"],
	st = ["HS256", "HS384", "HS512"];
nt && (ot.splice(3, 0, "PS256", "PS384", "PS512"), it.splice(3, 0, "PS256", "PS384", "PS512"));
var at = /^\s+|\s+$/g,
	ct = /^[-+]0x[0-9a-f]+$/i,
	ut = /^0b[01]+$/i,
	ft = /^0o[0-7]+$/i,
	dt = /^(?:0|[1-9]\d*)$/,
	pt = parseInt;

function lt(e) {
	return e != e
}

function mt(e, t) {
	return function(e, t) {
		for (var r = -1, n = e ? e.length : 0, o = Array(n); ++r < n;) o[r] = t(e[r], r, e);
		return o
	}(t, (function(t) {
		return e[t]
	}))
}
var ht, gt, yt = Object.prototype,
	wt = yt.hasOwnProperty,
	vt = yt.toString,
	bt = yt.propertyIsEnumerable,
	_t = (ht = Object.keys, gt = Object, function(e) {
		return ht(gt(e))
	}),
	St = Math.max;

function xt(e, t) {
	var r = kt(e) || function(e) {
			return function(e) {
				return Tt(e) && Pt(e)
			}(e) && wt.call(e, "callee") && (!bt.call(e, "callee") || "[object Arguments]" == vt.call(e))
		}(e) ? function(e, t) {
			for (var r = -1, n = Array(e); ++r < e;) n[r] = t(r);
			return n
		}(e.length, String) : [],
		n = r.length,
		o = !!n;
	for (var i in e) !t && !wt.call(e, i) || o && ("length" == i || jt(i, n)) || r.push(i);
	return r
}

function Et(e) {
	if (r = (t = e) && t.constructor, n = "function" == typeof r && r.prototype || yt, t !== n) return _t(e);
	var t, r, n, o = [];
	for (var i in Object(e)) wt.call(e, i) && "constructor" != i && o.push(i);
	return o
}

function jt(e, t) {
	return !!(t = null == t ? 9007199254740991 : t) && ("number" == typeof e || dt.test(e)) && e > -1 && e % 1 == 0 && e <
		t
}
var kt = Array.isArray;

function Pt(e) {
	return null != e && function(e) {
		return "number" == typeof e && e > -1 && e % 1 == 0 && e <= 9007199254740991
	}(e.length) && ! function(e) {
		var t = Ot(e) ? vt.call(e) : "";
		return "[object Function]" == t || "[object GeneratorFunction]" == t
	}(e)
}

function Ot(e) {
	var t = typeof e;
	return !!e && ("object" == t || "function" == t)
}

function Tt(e) {
	return !!e && "object" == typeof e
}
var It = function(e, t, r, n) {
		var o;
		e = Pt(e) ? e : (o = e) ? mt(o, function(e) {
			return Pt(e) ? xt(e) : Et(e)
		}(o)) : [], r = r && !n ? function(e) {
			var t = function(e) {
					if (!e) return 0 === e ? e : 0;
					if ((e = function(e) {
							if ("number" == typeof e) return e;
							if (function(e) {
									return "symbol" == typeof e || Tt(e) && "[object Symbol]" == vt.call(e)
								}(e)) return NaN;
							if (Ot(e)) {
								var t = "function" == typeof e.valueOf ? e.valueOf() : e;
								e = Ot(t) ? t + "" : t
							}
							if ("string" != typeof e) return 0 === e ? e : +e;
							e = e.replace(at, "");
							var r = ut.test(e);
							return r || ft.test(e) ? pt(e.slice(2), r ? 2 : 8) : ct.test(e) ? NaN : +e
						}(e)) === 1 / 0 || e === -1 / 0) {
						return 17976931348623157e292 * (e < 0 ? -1 : 1)
					}
					return e == e ? e : 0
				}(e),
				r = t % 1;
			return t == t ? r ? t - r : t : 0
		}(r) : 0;
		var i = e.length;
		return r < 0 && (r = St(i + r, 0)),
			function(e) {
				return "string" == typeof e || !kt(e) && Tt(e) && "[object String]" == vt.call(e)
			}(e) ? r <= i && e.indexOf(t, r) > -1 : !!i && function(e, t, r) {
				if (t != t) return function(e, t, r, n) {
					for (var o = e.length, i = r + (n ? 1 : -1); n ? i-- : ++i < o;)
						if (t(e[i], i, e)) return i;
					return -1
				}(e, lt, r);
				for (var n = r - 1, o = e.length; ++n < o;)
					if (e[n] === t) return n;
				return -1
			}(e, t, r) > -1
	},
	Rt = Object.prototype.toString;
var At = function(e) {
		return !0 === e || !1 === e || function(e) {
			return !!e && "object" == typeof e
		}(e) && "[object Boolean]" == Rt.call(e)
	},
	Ct = /^\s+|\s+$/g,
	Dt = /^[-+]0x[0-9a-f]+$/i,
	$t = /^0b[01]+$/i,
	Bt = /^0o[0-7]+$/i,
	Mt = parseInt,
	Nt = Object.prototype.toString;

function Lt(e) {
	var t = typeof e;
	return !!e && ("object" == t || "function" == t)
}
var Kt = function(e) {
		return "number" == typeof e && e == function(e) {
			var t = function(e) {
					if (!e) return 0 === e ? e : 0;
					if ((e = function(e) {
							if ("number" == typeof e) return e;
							if (function(e) {
									return "symbol" == typeof e || function(e) {
										return !!e && "object" == typeof e
									}(e) && "[object Symbol]" == Nt.call(e)
								}(e)) return NaN;
							if (Lt(e)) {
								var t = "function" == typeof e.valueOf ? e.valueOf() : e;
								e = Lt(t) ? t + "" : t
							}
							if ("string" != typeof e) return 0 === e ? e : +e;
							e = e.replace(Ct, "");
							var r = $t.test(e);
							return r || Bt.test(e) ? Mt(e.slice(2), r ? 2 : 8) : Dt.test(e) ? NaN : +e
						}(e)) === 1 / 0 || e === -1 / 0) {
						return 17976931348623157e292 * (e < 0 ? -1 : 1)
					}
					return e == e ? e : 0
				}(e),
				r = t % 1;
			return t == t ? r ? t - r : t : 0
		}(e)
	},
	Vt = Object.prototype.toString;
var qt = function(e) {
	return "number" == typeof e || function(e) {
		return !!e && "object" == typeof e
	}(e) && "[object Number]" == Vt.call(e)
};
var Ut = Function.prototype,
	Ht = Object.prototype,
	Ft = Ut.toString,
	Gt = Ht.hasOwnProperty,
	Jt = Ft.call(Object),
	zt = Ht.toString,
	Wt = function(e, t) {
		return function(r) {
			return e(t(r))
		}
	}(Object.getPrototypeOf, Object);
var Zt = function(e) {
		if (! function(e) {
				return !!e && "object" == typeof e
			}(e) || "[object Object]" != zt.call(e) || function(e) {
				var t = !1;
				if (null != e && "function" != typeof e.toString) try {
					t = !!(e + "")
				} catch (e) {}
				return t
			}(e)) return !1;
		var t = Wt(e);
		if (null === t) return !0;
		var r = Gt.call(t, "constructor") && t.constructor;
		return "function" == typeof r && r instanceof r && Ft.call(r) == Jt
	},
	Yt = Object.prototype.toString,
	Xt = Array.isArray;
var Qt = function(e) {
		return "string" == typeof e || !Xt(e) && function(e) {
			return !!e && "object" == typeof e
		}(e) && "[object String]" == Yt.call(e)
	},
	er = /^\s+|\s+$/g,
	tr = /^[-+]0x[0-9a-f]+$/i,
	rr = /^0b[01]+$/i,
	nr = /^0o[0-7]+$/i,
	or = parseInt,
	ir = Object.prototype.toString;

function sr(e, t) {
	var r;
	if ("function" != typeof t) throw new TypeError("Expected a function");
	return e = function(e) {
			var t = function(e) {
					if (!e) return 0 === e ? e : 0;
					if ((e = function(e) {
							if ("number" == typeof e) return e;
							if (function(e) {
									return "symbol" == typeof e || function(e) {
										return !!e && "object" == typeof e
									}(e) && "[object Symbol]" == ir.call(e)
								}(e)) return NaN;
							if (ar(e)) {
								var t = "function" == typeof e.valueOf ? e.valueOf() : e;
								e = ar(t) ? t + "" : t
							}
							if ("string" != typeof e) return 0 === e ? e : +e;
							e = e.replace(er, "");
							var r = rr.test(e);
							return r || nr.test(e) ? or(e.slice(2), r ? 2 : 8) : tr.test(e) ? NaN : +e
						}(e)) === 1 / 0 || e === -1 / 0) {
						return 17976931348623157e292 * (e < 0 ? -1 : 1)
					}
					return e == e ? e : 0
				}(e),
				r = t % 1;
			return t == t ? r ? t - r : t : 0
		}(e),
		function() {
			return --e > 0 && (r = t.apply(this, arguments)), e <= 1 && (t = void 0), r
		}
}

function ar(e) {
	var t = typeof e;
	return !!e && ("object" == t || "function" == t)
}
var cr = function(e) {
		return sr(2, e)
	},
	ur = ["RS256", "RS384", "RS512", "ES256", "ES384", "ES512", "HS256", "HS384", "HS512", "none"];
nt && ur.splice(3, 0, "PS256", "PS384", "PS512");
var fr = {
		expiresIn: {
			isValid: function(e) {
				return Kt(e) || Qt(e) && e
			},
			message: '"expiresIn" should be a number of seconds or string representing a timespan'
		},
		notBefore: {
			isValid: function(e) {
				return Kt(e) || Qt(e) && e
			},
			message: '"notBefore" should be a number of seconds or string representing a timespan'
		},
		audience: {
			isValid: function(e) {
				return Qt(e) || Array.isArray(e)
			},
			message: '"audience" must be a string or array'
		},
		algorithm: {
			isValid: It.bind(null, ur),
			message: '"algorithm" must be a valid string enum value'
		},
		header: {
			isValid: Zt,
			message: '"header" must be an object'
		},
		encoding: {
			isValid: Qt,
			message: '"encoding" must be a string'
		},
		issuer: {
			isValid: Qt,
			message: '"issuer" must be a string'
		},
		subject: {
			isValid: Qt,
			message: '"subject" must be a string'
		},
		jwtid: {
			isValid: Qt,
			message: '"jwtid" must be a string'
		},
		noTimestamp: {
			isValid: At,
			message: '"noTimestamp" must be a boolean'
		},
		keyid: {
			isValid: Qt,
			message: '"keyid" must be a string'
		},
		mutatePayload: {
			isValid: At,
			message: '"mutatePayload" must be a boolean'
		}
	},
	dr = {
		iat: {
			isValid: qt,
			message: '"iat" should be a number of seconds'
		},
		exp: {
			isValid: qt,
			message: '"exp" should be a number of seconds'
		},
		nbf: {
			isValid: qt,
			message: '"nbf" should be a number of seconds'
		}
	};

function pr(e, t, r, n) {
	if (!Zt(r)) throw new Error('Expected "' + n + '" to be a plain object.');
	Object.keys(r).forEach((function(o) {
		var i = e[o];
		if (i) {
			if (!i.isValid(r[o])) throw new Error(i.message)
		} else if (!t) throw new Error('"' + o + '" is not allowed in "' + n + '"')
	}))
}
var lr = {
		audience: "aud",
		issuer: "iss",
		subject: "sub",
		jwtid: "jti"
	},
	mr = ["expiresIn", "notBefore", "noTimestamp", "audience", "issuer", "subject", "jwtid"],
	hr = function(e, t, r, n) {
		var o;
		if ("function" != typeof r || n || (n = r, r = {}), r || (r = {}), r = Object.assign({}, r), o = n || function(e, t) {
				if (e) throw e;
				return t
			}, r.clockTimestamp && "number" != typeof r.clockTimestamp) return o(new He("clockTimestamp must be a number"));
		if (void 0 !== r.nonce && ("string" != typeof r.nonce || "" === r.nonce.trim())) return o(new He(
			"nonce must be a non-empty string"));
		var i = r.clockTimestamp || Math.floor(Date.now() / 1e3);
		if (!e) return o(new He("jwt must be provided"));
		if ("string" != typeof e) return o(new He("jwt must be a string"));
		var s, a = e.split(".");
		if (3 !== a.length) return o(new He("jwt malformed"));
		try {
			s = qe(e, {
				complete: !0
			})
		} catch (e) {
			return o(e)
		}
		if (!s) return o(new He("invalid token"));
		var c, u = s.header;
		if ("function" == typeof t) {
			if (!n) return o(new He("verify must be called asynchronous if secret or public key is provided as a callback"));
			c = t
		} else c = function(e, r) {
			return r(null, t)
		};
		return c(u, (function(t, n) {
			if (t) return o(new He("error in secret or public key callback: " + t.message));
			var c, f = "" !== a[2].trim();
			if (!f && n) return o(new He("jwt signature is required"));
			if (f && !n) return o(new He("secret or public key must be provided"));
			if (f || r.algorithms || (r.algorithms = ["none"]), r.algorithms || (r.algorithms = ~n.toString().indexOf(
					"BEGIN CERTIFICATE") || ~n.toString().indexOf("BEGIN PUBLIC KEY") ? ot : ~n.toString().indexOf(
					"BEGIN RSA PUBLIC KEY") ? it : st), !~r.algorithms.indexOf(s.header.alg)) return o(new He("invalid algorithm"));
			try {
				c = Ve.verify(e, s.header.alg, n)
			} catch (e) {
				return o(e)
			}
			if (!c) return o(new He("invalid signature"));
			var d = s.payload;
			if (void 0 !== d.nbf && !r.ignoreNotBefore) {
				if ("number" != typeof d.nbf) return o(new He("invalid nbf value"));
				if (d.nbf > i + (r.clockTolerance || 0)) return o(new Ge("jwt not active", new Date(1e3 * d.nbf)))
			}
			if (void 0 !== d.exp && !r.ignoreExpiration) {
				if ("number" != typeof d.exp) return o(new He("invalid exp value"));
				if (i >= d.exp + (r.clockTolerance || 0)) return o(new ze("jwt expired", new Date(1e3 * d.exp)))
			}
			if (r.audience) {
				var p = Array.isArray(r.audience) ? r.audience : [r.audience];
				if (!(Array.isArray(d.aud) ? d.aud : [d.aud]).some((function(e) {
						return p.some((function(t) {
							return t instanceof RegExp ? t.test(e) : t === e
						}))
					}))) return o(new He("jwt audience invalid. expected: " + p.join(" or ")))
			}
			if (r.issuer && ("string" == typeof r.issuer && d.iss !== r.issuer || Array.isArray(r.issuer) && -1 === r.issuer.indexOf(
					d.iss))) return o(new He("jwt issuer invalid. expected: " + r.issuer));
			if (r.subject && d.sub !== r.subject) return o(new He("jwt subject invalid. expected: " + r.subject));
			if (r.jwtid && d.jti !== r.jwtid) return o(new He("jwt jwtid invalid. expected: " + r.jwtid));
			if (r.nonce && d.nonce !== r.nonce) return o(new He("jwt nonce invalid. expected: " + r.nonce));
			if (r.maxAge) {
				if ("number" != typeof d.iat) return o(new He("iat required when maxAge is specified"));
				var l = tt(r.maxAge, d.iat);
				if (void 0 === l) return o(new He(
					'"maxAge" should be a number of seconds or string representing a timespan eg: "1d", "20h", 60'));
				if (i >= l + (r.clockTolerance || 0)) return o(new ze("maxAge exceeded", new Date(1e3 * l)))
			}
			if (!0 === r.complete) {
				var m = s.signature;
				return o(null, {
					header: u,
					payload: d,
					signature: m
				})
			}
			return o(null, d)
		}))
	},
	gr = function(e, t, r, n) {
		"function" == typeof r ? (n = r, r = {}) : r = r || {};
		var o = "object" == typeof e && !Buffer.isBuffer(e),
			i = Object.assign({
				alg: r.algorithm || "HS256",
				typ: o ? "JWT" : void 0,
				kid: r.keyid
			}, r.header);

		function s(e) {
			if (n) return n(e);
			throw e
		}
		if (!t && "none" !== r.algorithm) return s(new Error("secretOrPrivateKey must have a value"));
		if (void 0 === e) return s(new Error("payload is required"));
		if (o) {
			try {
				! function(e) {
					pr(dr, !0, e, "payload")
				}(e)
			} catch (e) {
				return s(e)
			}
			r.mutatePayload || (e = Object.assign({}, e))
		} else {
			var a = mr.filter((function(e) {
				return void 0 !== r[e]
			}));
			if (a.length > 0) return s(new Error("invalid " + a.join(",") + " option for " + typeof e + " payload"))
		}
		if (void 0 !== e.exp && void 0 !== r.expiresIn) return s(new Error(
			'Bad "options.expiresIn" option the payload already has an "exp" property.'));
		if (void 0 !== e.nbf && void 0 !== r.notBefore) return s(new Error(
			'Bad "options.notBefore" option the payload already has an "nbf" property.'));
		try {
			! function(e) {
				pr(fr, !1, e, "options")
			}(r)
		} catch (e) {
			return s(e)
		}
		var c = e.iat || Math.floor(Date.now() / 1e3);
		if (r.noTimestamp ? delete e.iat : o && (e.iat = c), void 0 !== r.notBefore) {
			try {
				e.nbf = tt(r.notBefore, c)
			} catch (e) {
				return s(e)
			}
			if (void 0 === e.nbf) return s(new Error(
				'"notBefore" should be a number of seconds or string representing a timespan eg: "1d", "20h", 60'))
		}
		if (void 0 !== r.expiresIn && "object" == typeof e) {
			try {
				e.exp = tt(r.expiresIn, c)
			} catch (e) {
				return s(e)
			}
			if (void 0 === e.exp) return s(new Error(
				'"expiresIn" should be a number of seconds or string representing a timespan eg: "1d", "20h", 60'))
		}
		Object.keys(lr).forEach((function(t) {
			var n = lr[t];
			if (void 0 !== r[t]) {
				if (void 0 !== e[n]) return s(new Error('Bad "options.' + t + '" option. The payload already has an "' + n +
					'" property.'));
				e[n] = r[t]
			}
		}));
		var u = r.encoding || "utf8";
		if ("function" != typeof n) return Ve.sign({
			header: i,
			payload: e,
			secret: t,
			encoding: u
		});
		n = n && cr(n), Ve.createSign({
			header: i,
			privateKey: t,
			payload: e,
			encoding: u
		}).once("error", n).once("done", (function(e) {
			n(null, e)
		}))
	};
const yr = uniCloud.database().command;

function wr() {
	const e = n.createHash("md5"),
		t = /MicroMessenger/i.test(__ctx__.CLIENTUA) ? __ctx__.CLIENTUA.replace(/(MicroMessenger\S+).*/i, "$1") : __ctx__.CLIENTUA;
	return e.update(t), e.digest("hex")
}

function vr({
	uid: e,
	needPermission: t
}) {
	const r = m(),
		n = {
			uid: e
		};
	t && (n.needPermission = t), r.bindTokenToDevice && (n.clientId = wr());
	return {
		token: gr(n, r.tokenSecret, {
			expiresIn: r.tokenExpiresIn
		}),
		tokenExpired: Date.now() + 1e3 * r.tokenExpiresIn
	}
}
async function br(e) {
	const t = m();
	try {
		const r = hr(e, t.tokenSecret);
		if (t.bindTokenToDevice && r.clientId !== wr()) return {
			code: 30201,
			msg: "token不合法，请重新登录"
		};
		const {
			uid: n,
			needPermission: o
		} = r, i = await u.doc(n).get();
		if (!i.data || 0 === i.data.length || !i.data[0].token) return {
			code: 30202,
			msg: "token不合法，请重新登录"
		};
		const s = i.data[0];
		if (1 === s.status) return {
			code: 10001,
			msg: "账号已禁用"
		};
		let a = s.token;
		if ("string" == typeof a && (a = [a]), -1 === a.indexOf(e)) return {
			code: 30202,
			msg: "token不合法，请重新登录"
		};
		const c = {
			code: 0,
			msg: "token校验通过",
			uid: n,
			role: s.role || [],
			permission: [],
			userInfo: s
		};
		if (c.role.length > 0 && o) {
			const e = await d.where({
					role_id: yr.in(c.role)
				}).get(),
				t = [];
			e.data.forEach(e => {
				Array.prototype.push.apply(t, e.permission)
			}), c.permission = A(t)
		}
		if (t.tokenExpiresThreshold && r.exp - Date.now() / 1e3 < t.tokenExpiresThreshold) {
			const e = vr({
					uid: n,
					needPermission: o
				}),
				t = _r(a);
			return a = a.filter(e => -1 === t.indexOf(e)), a.push(e.token), await u.doc(n).update({
				token: a
			}), { ...c,
				...e
			}
		}
		return I("checkToken payload", r), c
	} catch (e) {
		return "TokenExpiredError" === e.name ? {
			code: 30203,
			msg: "token已过期，请重新登录",
			err: e
		} : {
			code: 30204,
			msg: "非法token",
			err: e
		}
	}
}

function _r(e) {
	const t = m(),
		r = [];
	return e.forEach(e => {
		try {
			hr(e, t.tokenSecret)
		} catch (t) {
			r.push(e)
		}
	}), r
}
async function Sr(e, t = {}) {
	if (1 === e.status) return {
		code: 10001,
		msg: "账号已禁用"
	};
	let r = e.token || [];
	"string" == typeof r && (r = [r]);
	const n = _r(r);
	r = r.filter(e => -1 === n.indexOf(e));
	const {
		token: o,
		tokenExpired: i
	} = vr({
		uid: e._id,
		needPermission: t.needPermission
	});
	return r.push(o), e.token = r, await u.doc(e._id).update({
		last_login_date: Date.now(),
		last_login_ip: __ctx__.CLIENTIP,
		token: r,
		...t.extraData
	}), {
		code: 0,
		user: e,
		token: o,
		tokenExpired: i,
		loginResult: {
			code: 0,
			msg: "登录成功",
			token: o,
			uid: e._id,
			username: e.username,
			type: "login",
			userInfo: e,
			tokenExpired: i
		}
	}
}
async function xr({
	name: e,
	url: t,
	data: r,
	options: n,
	defaultOptions: o
}) {
	let i = {};
	const s = O(Object.assign({}, r));
	s && s.access_token && delete s.access_token;
	try {
		n = Object.assign({}, o, n, {
			data: s
		}), i = await uniCloud.httpclient.request(t, n)
	} catch (t) {
		return function(e, t) {
			throw new g({
				code: t.code || -2,
				message: t.message || e + " fail"
			})
		}(e, t)
	}
	let a = i.data;
	const c = i.headers["content-type"];
	if (!Buffer.isBuffer(a) || 0 !== c.indexOf("text/plain") && 0 !== c.indexOf("application/json")) Buffer.isBuffer(a) &&
		(a = {
			buffer: a,
			contentType: c
		});
	else try {
		a = JSON.parse(a.toString())
	} catch (e) {
		a = a.toString()
	}
	return P(function(e, t) {
		if (t.errcode) throw new g({
			code: t.errcode || -2,
			message: t.errmsg || e + " fail"
		});
		return delete t.errcode, delete t.errmsg, { ...t,
			errMsg: e + " ok",
			errCode: 0
		}
	}(e, a || {
		errCode: -2,
		errMsg: "Request failed"
	}))
}

function Er(e, t) {
	let r = "";
	if (t && t.accessToken) {
		r = `${e.indexOf("?")>-1?"&":"?"}access_token=${t.accessToken}`
	}
	return `${e}${r}`
}
class jr {
	constructor(e) {
		this.options = Object.assign({
			baseUrl: "https://api.weixin.qq.com",
			timeout: 5e3
		}, e)
	}
	async _requestWxOpenapi({
		name: e,
		url: t,
		data: r,
		options: n
	}) {
		const o = {
			method: "GET",
			dataType: "json",
			dataAsQueryString: !0,
			timeout: this.options.timeout
		};
		return await xr({
			name: "auth." + e,
			url: `${this.options.baseUrl}${Er(t,r)}`,
			data: r,
			options: n,
			defaultOptions: o
		})
	}
	async code2Session(e) {
		return await this._requestWxOpenapi({
			name: "code2Session",
			url: "/sns/jscode2session",
			data: {
				grant_type: "authorization_code",
				appid: this.options.appId,
				secret: this.options.secret,
				js_code: e
			}
		})
	}
	async getOauthAccessToken(e) {
		return await this._requestWxOpenapi({
			name: "getOauthAccessToken",
			url: "/sns/oauth2/access_token",
			data: {
				grant_type: "authorization_code",
				appid: this.options.appId,
				secret: this.options.secret,
				code: e
			}
		})
	}
}
const kr = {
	RSA: "RSA-SHA1",
	RSA2: "RSA-SHA256"
};
var Pr = {
	code2Session: {
		returnValue: {
			openid: "userId"
		}
	}
};
class Or extends class {
	constructor(e = {}) {
		if (!e.appId) throw new Error("appId required");
		if (!e.privateKey) throw new Error("privateKey required");
		const t = {
			gateway: "https://openapi.alipay.com/gateway.do",
			timeout: 5e3,
			charset: "utf-8",
			version: "1.0",
			signType: "RSA2",
			timeOffset: -(new Date).getTimezoneOffset() / 60,
			keyType: "PKCS8"
		};
		e.sandbox && (e.gateway = "https://openapi.alipaydev.com/gateway.do"), this.options = Object.assign({}, t, e);
		const r = "PKCS8" === this.options.keyType ? "PRIVATE KEY" : "RSA PRIVATE KEY";
		this.options.privateKey = this._formatKey(this.options.privateKey, r), this.options.alipayPublicKey && (this.options
			.alipayPublicKey = this._formatKey(this.options.alipayPublicKey, "PUBLIC KEY"))
	}
	_formatKey(e, t) {
		return `-----BEGIN ${t}-----\n${e}\n-----END ${t}-----`
	}
	_formatUrl(e, t) {
		let r = e;
		const n = ["app_id", "method", "format", "charset", "sign_type", "sign", "timestamp", "version", "notify_url",
			"return_url", "auth_token", "app_auth_token"
		];
		for (const e in t)
			if (n.indexOf(e) > -1) {
				const n = encodeURIComponent(t[e]);
				r = `${r}${r.includes("?")?"&":"?"}${e}=${n}`, delete t[e]
			} return {
			execParams: t,
			url: r
		}
	}
	_getSign(e, t) {
		const r = t.bizContent || null;
		delete t.bizContent;
		const o = Object.assign({
			method: e,
			appId: this.options.appId,
			charset: this.options.charset,
			version: this.options.version,
			signType: this.options.signType,
			timestamp: T((i = this.options.timeOffset, new Date(Date.now() + 6e4 * ((new Date).getTimezoneOffset() + 60 * (i ||
				0)))))
		}, t);
		var i;
		r && (o.bizContent = JSON.stringify(O(r)));
		const s = O(o),
			a = Object.keys(s).sort().map(e => {
				let t = s[e];
				return "[object String]" !== Array.prototype.toString.call(t) && (t = JSON.stringify(t)), `${e}=${t}`
			}).join("&"),
			c = n.createSign(kr[this.options.signType]).update(a, "utf8").sign(this.options.privateKey, "base64");
		return Object.assign(s, {
			sign: c
		})
	}
	async _exec(e, t = {}, r = {}) {
		const n = this._getSign(e, t),
			{
				url: o,
				execParams: i
			} = this._formatUrl(this.options.gateway, n),
			{
				status: s,
				data: a
			} = await uniCloud.httpclient.request(o, {
				method: "POST",
				data: i,
				dataType: "text",
				timeout: this.options.timeout
			});
		if (200 !== s) throw new Error("request fail");
		const c = JSON.parse(a),
			u = e.replace(/\./g, "_") + "_response",
			f = c[u],
			d = c.error_response;
		if (f) {
			if (!r.validateSign || this._checkResponseSign(a, u)) {
				if (!f.code || "10000" === f.code) {
					return {
						errCode: 0,
						errMsg: f.msg || "",
						...P(f)
					}
				}
				const e = f.sub_code ? `${f.sub_code} ${f.sub_msg}` : "" + (f.msg || "unkonwn error");
				throw new Error(e)
			}
			throw new Error("返回结果签名错误")
		}
		if (d) throw new Error(d.sub_msg || d.msg || "接口返回错误");
		throw new Error("request fail")
	}
	_checkResponseSign(e, t) {
		if (!this.options.alipayPublicKey || "" === this.options.alipayPublicKey) return console.warn(
			"options.alipayPublicKey is empty"), !0;
		if (!e) return !1;
		const r = this._getSignStr(e, t),
			o = JSON.parse(e).sign,
			i = n.createVerify(kr[this.options.signType]);
		return i.update(r, "utf8"), i.verify(this.options.alipayPublicKey, o, "base64")
	}
	_getSignStr(e, t) {
		let r = e.trim();
		const n = e.indexOf(t + '"'),
			o = e.lastIndexOf('"sign"');
		return r = r.substr(n + t.length + 1), r = r.substr(0, o), r = r.replace(/^[^{]*{/g, "{"), r = r.replace(
			/\}([^}]*)$/g, "}"), r
	}
	_notifyRSACheck(e, t, r) {
		const o = Object.keys(e).sort().filter(e => e).map(t => {
			let r = e[t];
			return "[object String]" !== Array.prototype.toString.call(r) && (r = JSON.stringify(r)),
				`${t}=${decodeURIComponent(r)}`
		}).join("&");
		return n.createVerify(kr[r]).update(o, "utf8").verify(this.options.alipayPublicKey, t, "base64")
	}
	_checkNotifySign(e) {
		const t = e.sign;
		if (!this.options.alipayPublicKey || !t) return !1;
		const r = e.sign_type || this.options.signType || "RSA2",
			n = { ...e
			};
		delete n.sign, n.sign_type = r;
		return !!this._notifyRSACheck(n, t, r) || (delete n.sign_type, this._notifyRSACheck(n, t, r))
	}
	_verifyNotify(e) {
		if (!e.headers) throw new Error("通知格式不正确");
		let t;
		for (const r in e.headers) "content-type" === r.toLowerCase() && (t = e.headers[r]);
		if (!1 !== e.isBase64Encoded && -1 === t.indexOf("application/x-www-form-urlencoded")) throw new Error("通知格式不正确");
		const r = a.parse(e.body);
		if (this._checkNotifySign(r)) return P(r);
		throw new Error("通知验签未通过")
	}
} {
	constructor(e) {
		super(e), this._protocols = Pr
	}
	async code2Session(e) {
		return await this._exec("alipay.system.oauth.token", {
			grantType: "authorization_code",
			code: e
		})
	}
}
var Tr = function(e = {}) {
		return e.clientType = e.clientType || __ctx__.PLATFORM, e.appId = e.appid, e.secret = e.appsecret, D(jr, e)
	},
	Ir = function(e = {}) {
		return e.clientType = e.clientType || __ctx__.PLATFORM, e.appId = e.appid, D(Or, e)
	};

function Rr({
	platform: e
}) {
	const t = m(e),
		r = e || __ctx__.PLATFORM;
	if (!t.oauth || !t.oauth.alipay) throw new Error(`请在公用模块uni-id的config.json或init方法中添加${r}平台支付宝登录配置项`);
	["appid", "privateKey"].forEach(e => {
		if (!t.oauth.alipay[e]) throw new Error(`请在公用模块uni-id的config.json或init方法中添加配置项：${r}.oauth.alipay.${e}`)
	});
	return Ir(t.oauth.alipay)
}
async function Ar(e, t = {}) {
	const r = (await u.add({ ...e,
			register_date: Date.now(),
			register_ip: __ctx__.CLIENTIP
		})).id,
		{
			token: n,
			tokenExpired: o
		} = vr({
			uid: r,
			needPermission: t.needPermission
		});
	return await u.doc(r).update({
		token: [n]
	}), {
		token: n,
		tokenExpired: o,
		uid: r,
		type: "register"
	}
}
async function Cr(e, t = {}) {
	let r;
	const {
		my_invite_code: n
	} = e;
	if (!m().autoSetInviteCode && !n) return r = await Ar(e, t), {
		code: 0,
		msg: "注册成功",
		...r
	};
	const o = await N({
		inviteCode: n
	});
	return o.code > 0 ? o : (e.my_invite_code = o.inviteCode, r = await Ar(e, t), {
		code: 0,
		msg: "注册成功",
		...r
	})
}
const Dr = uniCloud.database();
async function $r({
	mobile: e,
	email: t,
	code: r,
	expiresIn: n,
	type: o
}) {
	if (!e && !t || e && t) return {
		code: 50101,
		msg: "手机号和邮箱必须且只能给定其中一个"
	};
	r || (r = R()), n || (n = 180);
	const i = Date.now(),
		s = {
			mobile: e,
			email: t,
			type: o,
			code: r,
			state: 0,
			ip: __ctx__.CLIENTIP,
			created_at: i,
			expired_at: i + 1e3 * n
		};
	return I("addRes", await f.add(s)), {
		code: 0,
		mobile: e,
		email: t
	}
}
async function Br({
	mobile: e,
	email: t,
	code: r,
	type: n
}) {
	if (!e && !t || e && t) return {
		code: 50201,
		msg: "手机号和邮箱必须且只能给定其中一个"
	};
	const o = Dr.command,
		i = Date.now(),
		s = {
			mobile: e,
			email: t,
			type: n,
			code: r,
			state: 0,
			expired_at: o.gt(i)
		},
		a = await f.where(s).orderBy("created_at", "desc").limit(1).get();
	if (I("verifyRecord:", a), a && a.data && a.data.length > 0) {
		const e = a.data[0];
		return I("upRes", await f.doc(e._id).update({
			state: 1
		})), {
			code: 0,
			msg: "验证通过"
		}
	}
	return {
		code: 50202,
		msg: "验证码错误或已失效"
	}
}

function Mr({
	platform: e
}) {
	const t = m(e),
		r = e || __ctx__.PLATFORM;
	if (!t.oauth || !t.oauth.weixin) throw new Error(`请在公用模块uni-id的config.json或init方法中添加${r}平台微信登录配置项`);
	["appid", "appsecret"].forEach(e => {
		if (!t.oauth.weixin[e]) throw new Error(`请在公用模块uni-id的config.json或init方法中添加配置项：${r}.oauth.weixin.${e}`)
	});
	return Tr(t.oauth.weixin)
}
const Nr = uniCloud.database();
const Lr = uniCloud.database();
const Kr = uniCloud.database();
const Vr = uniCloud.database();
const qr = uniCloud.database().command;
const Ur = uniCloud.database();
const Hr = uniCloud.database();
const Fr = uniCloud.database();
const Gr = uniCloud.database();
const Jr = uniCloud.database();
exports.acceptInvite = async function({
	uid: e,
	inviteCode: t
}) {
	const r = await u.where({
		_id: B.neq(e),
		inviter_uid: B.not(B.all([e])),
		my_invite_code: t
	}).get();
	if (1 !== r.data.length) return {
		code: 80501,
		msg: "邀请码无效"
	};
	const n = [r.data[0]._id].concat(r.data[0].inviter_uid || []),
		o = await u.doc(e).field({
			my_invite_code: !0,
			inviter_uid: !0
		}).get();
	if (0 === o.data.length) return {
		code: 80502,
		msg: "uid错误用户不存在"
	};
	if (o.data[0].inviter_uid && o.data[0].inviter_uid.length > 0) return {
		code: 80503,
		msg: "邀请码不可修改"
	};
	const i = Date.now();
	return await u.doc(e).update({
		inviter_uid: n,
		invite_time: i
	}), await u.where({
		inviter_uid: e
	}).update({
		inviter_uid: B.push(n)
	}), {
		code: 0,
		msg: "邀请码填写成功"
	}
}, exports.addPermission = async function({
	permissionID: e,
	permissionName: t,
	comment: r
}) {
	return await p.add({
		permission_id: e,
		permission_name: t,
		comment: r,
		create_date: Date.now()
	}), {
		code: 0,
		msg: "权限新增成功"
	}
}, exports.addRole = async function({
	roleID: e,
	roleName: t,
	comment: r,
	permission: n = []
}) {
	return await d.add({
		role_id: e,
		role_name: t,
		comment: r,
		permission: n,
		create_date: Date.now()
	}), {
		code: 0,
		msg: "角色新增成功"
	}
}, exports.bindAlipay = async function({
	uid: e,
	code: t,
	platform: r
}) {
	const n = r || __ctx__.PLATFORM,
		{
			openid: o
		} = await Rr({
			platform: n
		}).code2Session(t);
	if (!o) return {
		code: 60401,
		msg: "获取openid失败"
	};
	const i = await u.where({
		ali_openid: o
	}).get();
	return i && i.data && i.data.length > 0 ? {
		code: 60402,
		msg: "支付宝绑定失败，此账号已被绑定"
	} : (await u.doc(e).update({
		ali_openid: o
	}), {
		code: 0,
		msg: "绑定成功"
	})
}, exports.bindEmail = async function({
	uid: e,
	email: t,
	code: r
}) {
	const n = await u.where({
		email: t,
		email_confirmed: 1
	}).count();
	if (n && n.total > 0) return {
		code: 60201,
		msg: "此邮箱已被绑定"
	};
	if (r) {
		const e = await Br({
			email: t,
			code: r,
			type: "bind"
		});
		if (0 !== e.code) return e
	}
	return I("bindEmail -> upRes", await u.doc(e).update({
		email: t,
		email_confirmed: 1
	})), {
		code: 0,
		msg: "邮箱绑定成功"
	}
}, exports.bindMobile = async function({
	uid: e,
	mobile: t,
	code: r
}) {
	const n = await u.where({
		mobile: t,
		mobile_confirmed: 1
	}).count();
	if (n && n.total > 0) return {
		code: 60101,
		msg: "此手机号已被绑定"
	};
	if (r) {
		const e = await Br({
			mobile: t,
			code: r,
			type: "bind"
		});
		if (0 !== e.code) return e
	}
	return I("bindMobile -> upRes", await u.doc(e).update({
		mobile: t,
		mobile_confirmed: 1
	})), {
		code: 0,
		msg: "手机号码绑定成功"
	}
}, exports.bindPermission = async function({
	roleID: e,
	permissionList: t,
	reset: r = !1
}) {
	const n = {};
	return "string" == typeof t && (t = [t]), n.permission = r ? t : qr.push(t), await d.where({
		role_id: e
	}).update(n), {
		code: 0,
		msg: "权限绑定成功"
	}
}, exports.bindRole = async function({
	uid: e,
	roleList: t,
	reset: r = !1
}) {
	const n = {};
	return "string" == typeof t && (t = [t]), n.role = r ? t : qr.push(t), await u.doc(e).update(n), {
		code: 0,
		msg: "角色绑定成功"
	}
}, exports.bindWeixin = async function({
	uid: e,
	code: t,
	platform: r
}) {
	const n = r || __ctx__.PLATFORM,
		{
			openid: o,
			unionid: i
		} = await Mr({
			platform: n
		})["mp-weixin" === n ? "code2Session" : "getOauthAccessToken"](t);
	if (!o) return {
		code: 60301,
		msg: "获取openid失败"
	};
	const s = Ur.command,
		a = [{
			wx_openid: {
				[n]: o
			}
		}];
	i && a.push({
		wx_unionid: i
	});
	const c = await u.where(s.or(...a)).get();
	if (c && c.data && c.data.length > 0) return {
		code: 60302,
		msg: "微信绑定失败，此微信账号已被绑定"
	};
	const f = {
		wx_openid: {
			[n]: o
		}
	};
	return i && (f.wx_unionid = i), await u.doc(e).update(f), {
		code: 0,
		msg: "绑定成功"
	}
}, exports.checkToken = br, exports.code2SessionAlipay = async function(e) {
	let t = e;
	"string" == typeof e && (t = {
		code: e
	});
	try {
		const e = t.platform || __ctx__.PLATFORM,
			r = await Rr({
				platform: e
			}).code2Session(t.code);
		return r.openid ? {
			code: 0,
			msg: "",
			...r
		} : {
			code: 80701,
			msg: "获取openid失败"
		}
	} catch (e) {
		return {
			code: 80702,
			msg: e.message
		}
	}
}, exports.code2SessionWeixin = async function(e) {
	let t = e;
	"string" == typeof e && (t = {
		code: e
	});
	try {
		const e = t.platform || __ctx__.PLATFORM,
			r = await Mr({
				platform: e
			})["mp-weixin" === e ? "code2Session" : "getOauthAccessToken"](t.code);
		return r.openid ? {
			code: 0,
			msg: "",
			...r
		} : {
			code: 80601,
			msg: "获取openid失败"
		}
	} catch (e) {
		return {
			code: 80602,
			msg: e.message
		}
	}
}, exports.deletePermission = async function({
	permissionID: e
}) {
	return await p.where({
		permission_id: e
	}).remove(), await d.where({
		permission: e
	}).update({
		role: qr.pull(e)
	}), {
		code: 0,
		msg: "权限删除成功"
	}
}, exports.deleteRole = async function({
	roleID: e
}) {
	return await d.where({
		role_id: e
	}).remove(), await u.where({
		role: e
	}).update({
		role: qr.pull(e)
	}), {
		code: 0,
		msg: "角色删除成功"
	}
}, exports.encryptPwd = h, exports.getInvitedUser = async function({
	uid: e,
	level: t = 1,
	limit: r = 20,
	offset: n = 0,
	needTotal: o = !1
}) {
	const i = {
		code: 0,
		msg: "获取邀请列表成功",
		invitedUser: (await u.where({
			["inviter_uid." + (t - 1)]: e
		}).field({
			_id: !0,
			username: !0,
			mobile: !0,
			invite_time: !0
		}).orderBy("invite_time", "desc").skip(n).limit(r).get()).data
	};
	if (o) {
		const r = await u.where({
			["inviter_uid." + (t - 1)]: e
		}).count();
		i.total = r.total
	}
	return i
}, exports.getPermissionByRole = async function({
	roleID: e
}) {
	if (!e) return {
		code: "GetPermissionByRole_ParameterError",
		msg: "角色ID不能为空"
	};
	const t = await d.where({
		role_id: e
	}).get();
	return 0 === t.data.length ? {
		code: "getPermissionByRole_RoleNotExist",
		msg: "角色不存在"
	} : {
		code: 0,
		msg: "获取权限成功",
		permission: t.data[0].permission || []
	}
}, exports.getPermissionByUid = async function({
	uid: e
}) {
	const t = await u.aggregate().match({
			_id: e
		}).unwind("role").lookup({
			from: "uni-id-roles",
			localField: "role",
			foreignField: "role_id",
			as: "roleDetail"
		}).unwind("roleDetail").replaceRoot({
			newRoot: "roleDetail"
		}).end(),
		r = [];
	return t.data.forEach(e => {
		Array.prototype.push.apply(r, e.permission)
	}), {
		code: 0,
		msg: "获取权限成功",
		permission: A(r)
	}
}, exports.getPermissionList = async function({
	limit: e,
	offset: t,
	needTotal: r = !0
}) {
	const n = {
		code: 0,
		msg: "获取权限列表成功",
		permissionList: (await p.skip(t).limit(e).get()).data
	};
	if (r) {
		const {
			total: e
		} = await p.where({
			_id: qr.exists(!0)
		}).count();
		n.total = e
	}
	return n
}, exports.getRoleByUid = async function({
	uid: e
}) {
	if (!e) return {
		code: "GetUserRole_UserIdError",
		msg: "用户Id不能为空"
	};
	const t = await u.doc(e).get();
	return 0 === t.data.length ? {
		code: "GetUserRole_UserNotExist",
		msg: "用户不存在"
	} : {
		code: 0,
		msg: "获取角色成功",
		role: t.data[0].role || []
	}
}, exports.getRoleList = async function({
	limit: e,
	offset: t,
	needTotal: r = !0
}) {
	const n = {
		code: 0,
		msg: "获取角色列表成功",
		roleList: (await d.skip(t).limit(e).get()).data
	};
	if (r) {
		const {
			total: e
		} = await d.where({
			_id: qr.exists(!0)
		}).count();
		n.total = e
	}
	return n
}, exports.getUserInfo = async function({
	uid: e,
	field: t
}) {
	const r = {};
	if (t && t.length)
		for (let e = 0; e < t.length; e++) r[t[e]] = !0;
	let n;
	return n = t && t.length ? await u.doc(e).field(r).get() : await u.doc(e).get(), 0 === n.data.length ?
		{
			code: 80301,
			msg: "未查询到用户信息"
		} : {
			code: 0,
			msg: "获取用户信息成功",
			userInfo: n.data[0]
		}
}, exports.init = function(e) {
	l = e
}, exports.login = async function({
	username: e,
	password: t,
	queryField: r = [],
	needPermission: n
}) {
	const o = Lr.command,
		i = [];
	r && r.length || (r = ["username"]);
	const s = {
		email: {
			email_confirmed: 1
		},
		mobile: {
			mobile_confirmed: 1
		}
	};
	r.forEach(t => {
		i.push({
			[t]: e,
			...s[t]
		})
	});
	const a = await u.where(o.or(...i)).limit(1).get(),
		c = __ctx__.CLIENTIP,
		{
			passwordErrorLimit: f,
			passwordErrorRetryTime: d
		} = m();
	if (I("userInDB:", a), 0 === a.data.length) return {
		code: 10101,
		msg: "用户不存在"
	};
	const p = a.data[0],
		l = p.password;
	let g = p.login_ip_limit || [];
	g = g.filter(e => e.last_error_time > Date.now() - 1e3 * d);
	let y = g.find(e => e.ip === c);
	if (y && y.error_times >= f) return {
		code: 10103,
		msg: `密码错误次数过多，请${$(y.last_error_time+1e3*d)}再试。`
	};
	if (h(t) === l) {
		const e = g.indexOf(y);
		e > -1 && g.splice(e, 1);
		const t = {
				login_ip_limit: g
			},
			r = await Sr(p, {
				needPermission: n,
				extraData: t
			});
		if (0 !== r.code) return r;
		const {
			loginResult: o
		} = r;
		return { ...o
		}
	}
	return y ? (y.error_times++, y.last_error_time = Date.now()) : (y = {
		ip: c,
		error_times: 1,
		last_error_time: Date.now()
	}, g.push(y)), await u.doc(p._id).update({
		login_ip_limit: g
	}), {
		code: 10102,
		msg: "密码错误"
	}
}, exports.loginByAlipay = async function(e) {
	let t = e;
	"string" == typeof e && (t = {
		code: e
	});
	const r = t.needPermission,
		n = t.platform || __ctx__.PLATFORM,
		{
			openid: o
		} = await Rr({
			platform: n
		}).code2Session(t.code);
	if (!o) return {
		code: 10501,
		msg: "获取openid失败"
	};
	const i = await u.where({
		ali_openid: o
	}).get();
	if (i && i.data && i.data.length > 0) {
		const e = i.data[0],
			t = await Sr(e, {
				needPermission: r
			});
		if (0 !== t.code) return t;
		const {
			user: n,
			loginResult: s
		} = t;
		return { ...s,
			openid: o,
			mobileConfirmed: 1 === n.mobile_confirmed,
			emailConfirmed: 1 === n.email_confirmed
		}
	} {
		const e = {
			ali_openid: o
		};
		e.my_invite_code = t.myInviteCode;
		const n = await Cr(e, {
			needPermission: r
		});
		return 0 !== n.code ? n : { ...n,
			openid: o,
			mobileConfirmed: !1,
			emailConfirmed: !1
		}
	}
}, exports.loginByEmail = async function({
	email: e,
	code: t,
	password: r,
	myInviteCode: n,
	type: o,
	needPermission: i
}) {
	const s = await Br({
		email: e,
		code: t,
		type: o || "login"
	});
	if (0 !== s.code) return s;
	const a = {
			email: e,
			email_confirmed: 1
		},
		c = await u.where(a).get();
	if (I("userInDB:", c), c && c.data && c.data.length > 0) {
		if ("register" === o) return {
			code: 10301,
			msg: "此邮箱已注册"
		};
		const t = c.data[0],
			r = await Sr(t, {
				needPermission: i
			});
		if (0 !== r.code) return r;
		const {
			loginResult: n
		} = r;
		return { ...n,
			email: e
		}
	} {
		if ("login" === o) return {
			code: 10302,
			msg: "此邮箱尚未注册"
		};
		const t = {
			email: e,
			email_confirmed: 1
		};
		r && (t.password = h(r)), t.my_invite_code = n;
		const s = await Cr(t, {
			needPermission: i
		});
		return 0 !== s.code ? s : { ...s,
			email: e
		}
	}
}, exports.loginBySms = async function({
	mobile: e,
	code: t,
	password: r,
	inviteCode: n,
	myInviteCode: o,
	type: i,
	needPermission: s
}) {
	const a = m();
	if (a.forceInviteCode && !i) throw new Error("[loginBySms]强制使用邀请码注册时，需指明type为register还是login");
	const c = await Br({
		mobile: e,
		code: t,
		type: i || "login"
	});
	if (0 !== c.code) return c;
	const f = {
			mobile: e,
			mobile_confirmed: 1
		},
		d = await u.where(f).get();
	if (d && d.data && d.data.length > 0) {
		if ("register" === i) return {
			code: 10201,
			msg: "此手机号已注册"
		};
		const t = d.data[0],
			r = await Sr(t, {
				needPermission: s
			});
		if (0 !== r.code) return r;
		const {
			loginResult: n
		} = r;
		return { ...n,
			mobile: e
		}
	} {
		const t = Date.now();
		if ("login" === i) return {
			code: 10203,
			msg: "此手机号尚未注册"
		};
		const c = {
			mobile: e,
			mobile_confirmed: 1,
			register_ip: __ctx__.CLIENTIP,
			register_date: t
		};
		if (r && (c.password = h(r)), n) {
			const e = await u.where({
				my_invite_code: n
			}).get();
			if (1 !== e.data.length) return {
				code: 10202,
				msg: "邀请码无效"
			};
			c.inviter_uid = [e.data[0]._id].concat(e.data[0].inviter_uid || []), c.invite_time = t
		} else if (a.forceInviteCode) return {
			code: 10202,
			msg: "邀请码无效"
		};
		c.my_invite_code = o;
		const f = await Cr(c, {
			needPermission: s
		});
		return 0 !== f.code ? f : { ...f,
			mobile: e
		}
	}
}, exports.loginByWeixin = async function(e) {
	let t = e;
	"string" == typeof e && (t = {
		code: e
	});
	const r = t.needPermission,
		n = t.platform || __ctx__.PLATFORM,
		{
			openid: o,
			unionid: i,
			sessionKey: s
		} = await Mr({
			platform: n
		})["mp-weixin" === n ? "code2Session" : "getOauthAccessToken"](t.code);
	if (!o) return {
		code: 10401,
		msg: "获取openid失败"
	};
	const a = Nr.command,
		c = [{
			wx_openid: {
				[n]: o
			}
		}];
	i && c.push({
		wx_unionid: i
	});
	const f = await u.where(a.or(...c)).get();
	if (f && f.data && f.data.length > 0) {
		const e = f.data[0],
			t = {
				wx_openid: {
					[n]: o
				}
			};
		i && (t.wx_unionid = i);
		const a = await Sr(e, {
			needPermission: r,
			extraData: t
		});
		if (0 !== a.code) return a;
		const {
			user: c,
			loginResult: u
		} = a;
		return { ...u,
			openid: o,
			unionid: i,
			sessionKey: s,
			mobileConfirmed: 1 === c.mobile_confirmed,
			emailConfirmed: 1 === c.email_confirmed
		}
	} {
		const e = {
				wx_openid: {
					[n]: o
				},
				wx_unionid: i
			},
			a = t.myInviteCode;
		e.my_invite_code = a;
		const c = await Cr(e, {
			needPermission: r
		});
		return 0 !== c.code ? c : { ...c,
			openid: o,
			unionid: i,
			sessionKey: s,
			mobileConfirmed: !1,
			emailConfirmed: !1
		}
	}
}, exports.logout = async function(e) {
	const t = await br(e);
	if (t.code && t.code > 0) return t;
	const r = Vr.command;
	return await u.doc(t.uid).update({
		token: r.pull(e)
	}), {
		code: 0,
		msg: "退出成功"
	}
}, exports.register = async function(e) {
	const t = [],
		r = [{
			name: "username",
			desc: "用户名"
		}, {
			name: "email",
			desc: "邮箱",
			extraCond: {
				email_confirmed: 1
			}
		}, {
			name: "mobile",
			desc: "手机号",
			extraCond: {
				mobile_confirmed: 1
			}
		}],
		n = e.needPermission;
	if (void 0 !== n && delete e.needPermission, r.forEach(r => {
			const n = r.name;
			e[n] && e[n].trim() && t.push({
				[n]: e[n],
				...r.extraCond
			})
		}), 0 === t.length) return {
		code: 20101,
		msg: "用户名、邮箱、手机号不可同时为空"
	};
	const {
		username: o,
		email: i,
		mobile: s,
		myInviteCode: a
	} = e, c = Kr.command, f = await u.where(c.or(...t)).get();
	if (f && f.data.length > 0) {
		const t = f.data[0];
		for (let n = 0; n < r.length; n++) {
			const o = r[n];
			let i = !0;
			if (o.extraCond && (i = Object.keys(o.extraCond).every(e => t[e] === o.extraCond[e])), t[
					o.name] === e[o.name] && i) return {
				code: 20102,
				msg: o.desc + "已存在"
			}
		}
	}
	e.password = h(e.password), e.my_invite_code = a;
	const d = await Cr(e, {
		needPermission: n
	});
	return 0 !== d.code ? d : { ...d,
		username: o,
		email: i,
		mobile: s
	}
}, exports.resetPwd = async function({
	uid: e,
	password: t
}) {
	return I("upRes", await u.doc(e).update({
		password: h(t),
		token: []
	})), {
		code: 0,
		msg: "密码重置成功"
	}
}, exports.sendSmsCode = async function({
	mobile: e,
	code: t,
	type: r,
	templateId: n
}) {
	if (!e) throw new Error("手机号码不可为空");
	if (t || (t = R()), !r) throw new Error("验证码类型不可为空");
	const o = m();
	let i = o && o.service && o.service.sms;
	if (!i) throw new Error("请在config.json或init方法中配置service.sms下短信相关参数");
	i = Object.assign({
		codeExpiresIn: 300
	}, i);
	const s = ["smsKey", "smsSecret"];
	if (!n && i.name) throw new Error(
		"不传入templateId时应在config.json或init方法内service.sms下配置name字段以正确使用uniID_code模板");
	for (let e = 0, t = s.length; e < t; e++) {
		const t = s[e];
		if (!i[t]) throw new Error("请在config.json或init方法中service.sms下配置" + t)
	}
	const {
		name: a,
		smsKey: c,
		smsSecret: u,
		codeExpiresIn: f
	} = i;
	let d;
	switch (r) {
		case "login":
			d = "登录";
			break;
		default:
			d = "验证手机号"
	}
	try {
		const o = {
			name: a,
			code: t,
			action: d,
			expMinute: "" + Math.round(f / 60)
		};
		a && (o.name = a), await uniCloud.sendSms({
			smsKey: c,
			smsSecret: u,
			phone: e,
			templateId: n || "uniID_code",
			data: o
		});
		const i = await $r({
			mobile: e,
			code: t,
			expiresIn: f,
			type: r
		});
		return i.code >= 0 ? i : {
			code: 0,
			msg: "验证码发送成功"
		}
	} catch (e) {
		return {
			code: 50301,
			msg: "验证码发送失败, " + e.message
		}
	}
}, exports.setAvatar = async function(e) {
	return I("setAvatar -> upRes", await u.doc(e.uid).update({
		avatar: e.avatar
	})), {
		code: 0,
		msg: "头像设置成功"
	}
}, exports.setUserInviteCode = async function({
	uid: e,
	myInviteCode: t
}) {
	const r = await N({
		inviteCode: t
	});
	return r.code > 0 ? r : (await u.doc(e).update({
		my_invite_code: r.inviteCode
	}), {
		code: 0,
		msg: "邀请码设置成功",
		myInviteCode: r.inviteCode
	})
}, exports.setVerifyCode = $r, exports.unbindAlipay = async function(e) {
	const t = Hr.command,
		r = await u.doc(e).update({
			ali_openid: t.remove()
		});
	return I("upRes:", r), 1 === r.updated ? {
		code: 0,
		msg: "支付宝解绑成功"
	} : {
		code: 70401,
		msg: "支付宝解绑失败，请稍后再试"
	}
}, exports.unbindEmail = async function({
	uid: e,
	email: t,
	code: r
}) {
	if (r) {
		const e = await Br({
			email: t,
			code: r,
			type: "unbind"
		});
		if (0 !== e.code) return e
	}
	const n = Fr.command;
	return 1 === (await u.where({
		_id: e,
		email: t
	}).update({
		email: n.remove(),
		email_confirmed: n.remove()
	})).updated ? {
		code: 0,
		msg: "邮箱解绑成功"
	} : {
		code: 70201,
		msg: "邮箱解绑失败，请稍后再试"
	}
}, exports.unbindMobile = async function({
	uid: e,
	mobile: t,
	code: r
}) {
	if (r) {
		const e = await Br({
			mobile: t,
			code: r,
			type: "unbind"
		});
		if (0 !== e.code) return e
	}
	const n = Gr.command;
	return 1 === (await u.where({
		_id: e,
		mobile: t
	}).update({
		mobile: n.remove(),
		mobile_confirmed: n.remove()
	})).updated ? {
		code: 0,
		msg: "手机号解绑成功"
	} : {
		code: 70101,
		msg: "手机号解绑失败，请稍后再试"
	}
}, exports.unbindPermission = async function({
	roleID: e,
	permissionList: t
}) {
	return "string" == typeof t && (t = [t]), await d.where({
		role_id: e
	}).update({
		permission: qr.pull(qr.in(t))
	}), {
		code: 0,
		msg: "权限解绑成功"
	}
}, exports.unbindRole = async function({
	uid: e,
	roleList: t
}) {
	return "string" == typeof t && (t = [t]), await u.doc(e).update({
		role: qr.pull(qr.in(t))
	}), {
		code: 0,
		msg: "角色解绑成功"
	}
}, exports.unbindWeixin = async function(e) {
	const t = Jr.command,
		r = await u.doc(e).update({
			wx_openid: t.remove(),
			wx_unionid: t.remove()
		});
	return I("upRes:", r), 1 === r.updated ? {
		code: 0,
		msg: "微信解绑成功"
	} : {
		code: 70301,
		msg: "微信解绑失败，请稍后再试"
	}
}, exports.updatePermission = async function({
	permissionID: e,
	permissionName: t,
	comment: r
}) {
	return e ? (await p.where({
		permission_id: e
	}).update({
		permission_name: t,
		comment: r
	}), {
		code: 0,
		msg: "权限更新成功"
	}) : {
		code: "UpdatePermission_ParameterError",
		msg: "参数错误，permissionID不能为空"
	}
}, exports.updatePwd = async function(e) {
	const t = await u.doc(e.uid).get();
	if (t && t.data && t.data.length > 0) {
		const r = t.data[0].password;
		if (h(e.oldPassword) === r) {
			return I("upRes", await u.doc(t.data[0]._id).update({
				password: h(e.newPassword),
				token: []
			})), {
				code: 0,
				msg: "修改成功"
			}
		}
		return {
			code: 40202,
			msg: "旧密码错误"
		}
	}
	return {
		code: 40201,
		msg: "用户不存在"
	}
}, exports.updateRole = async function({
	roleID: e,
	roleName: t,
	comment: r,
	permission: n
}) {
	return e ? (await d.where({
		role_id: e
	}).update({
		role_name: t,
		comment: r,
		permission: n
	}), {
		code: 0,
		msg: "角色更新成功"
	}) : {
		code: "UpdateRole_ParameterError",
		msg: "参数错误，roleID不能为空"
	}
}, exports.updateUser = async function(e) {
	const t = e.uid;
	return t ? (delete e.uid, I("update -> upRes", await u.doc(t).update(e)), {
		code: 0,
		msg: "修改成功"
	}) : {
		code: 80101,
		msg: "缺少uid参数"
	}
}, exports.verifyCode = Br;
