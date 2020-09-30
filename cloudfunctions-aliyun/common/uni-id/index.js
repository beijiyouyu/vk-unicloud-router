"use strict";

function e(e) {
	return e && "object" == typeof e && "default" in e ? e.default : e
}
var t = e(require("fs")),
	r = e(require("path")),
	n = e(require("crypto")),
	i = e(require("buffer")),
	o = e(require("stream")),
	s = e(require("util")),
	a = e(require("querystring"));
class c extends Error {
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
const u = Object.prototype.toString,
	f = Object.prototype.hasOwnProperty;

function d(e, t) {
	return f.call(e, t)
}

function l(e) {
	return "[object Object]" === u.call(e)
}

function p(e) {
	return "function" == typeof e
}
const m = /_(\w)/g,
	h = /[A-Z]/g;

function g(e) {
	return e.replace(m, (e, t) => t ? t.toUpperCase() : "")
}

function y(e) {
	return e.replace(h, e => "_" + e.toLowerCase())
}

function w(e, t) {
	let r, n;
	switch (t) {
		case "snake2camel":
			n = g, r = m;
			break;
		case "camel2snake":
			n = y, r = h
	}
	for (const i in e)
		if (d(e, i) && r.test(i)) {
			const r = n(i);
			e[r] = e[i], delete e[i], l(e[r]) ? e[r] = w(e[r], t) : Array.isArray(e[r]) && (e[r] = e[r].map(e => w(e, t)))
		} return e
}

function v(e) {
	return w(e, "snake2camel")
}

function b(e) {
	return w(e, "camel2snake")
}

function _(e) {
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

function S() {
	"development" === process.env.NODE_ENV && console.log(...arguments)
}

function E(e = 6) {
	let t = "";
	for (let r = 0; r < e; r++) t += Math.floor(10 * Math.random());
	return t
}

function x(e) {
	return Array.from(new Set(e))
}

function j(e = {}, t) {
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
	if (l(t))
		for (const i in t) {
			const o = t[i];
			p(o) && -1 === r.indexOf(i) ? e[i] = o(e) : "string" == typeof o && -1 === r.indexOf(i) && (e[i] = e[o], n.shouldDelete
				.add(o))
		} else p(t) && (e = t(e));
	if (n.shouldDelete)
		for (const t of n.shouldDelete) delete e[t];
	return t._post && (e = t._post(e)), e
}

function k(e, t) {
	const r = new e(t);
	return new Proxy(r, {
		get: function(e, t) {
			if ("function" == typeof e[t] && 0 !== t.indexOf("_") && e._protocols && e._protocols[t]) {
				const r = e._protocols[t];
				return async function(n) {
					n = j(n, r.args);
					let i = await e[t](n);
					return i = j(i, r.returnValue), i
				}
			}
			return e[t]
		}
	})
}

function P(e) {
	let t, r, n = e - Date.now(),
		i = "后";
	n < 0 && (i = "前", n = -n);
	const o = Math.floor(n / 1e3),
		s = Math.floor(o / 60),
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
			t = o, r = "秒"
	}
	return `${t}${r}${i}`
}

function O(e) {
	return async function() {
		const t = await e(...arguments);
		return l(t) && t.msg && (t.message = t.msg), t
	}
}
const T = uniCloud.database(),
	I = T.collection("uni-id-users"),
	R = T.collection("uni-verify"),
	A = T.collection("uni-id-roles"),
	C = T.collection("uni-id-permissions");
let D = {};
try {
	D = JSON.parse(t.readFileSync(r.resolve(__dirname, "config.json")))
} catch (e) {}

function $(e) {
	const t = Object.assign(D, D[e || __ctx__.PLATFORM]) || {},
		r = Object.assign({
			bindTokenToDevice: !0
		}, t);
	return ["passwordSecret", "tokenSecret", "tokenExpiresIn", "passwordErrorLimit", "passwordErrorRetryTime"].forEach(e => {
		if (!r || !r[e]) throw new Error("请在公用模块uni-id的config.json或init方法中内添加配置项：" + e)
	}), r
}

function B(e) {
	const t = $(),
		r = n.createHmac("sha1", t.passwordSecret.toString("ascii"));
	return r.update(e), r.digest("hex")
}
const N = uniCloud.database().command;

function M(e = 6) {
	const t = ["2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "J", "K", "L", "M", "N",
		"P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"
	];
	let r = "";
	for (let n = 0; n < e; n++) r += t[Math.floor(Math.random() * t.length)];
	return r
}
async function L({
	inviteCode: e
}) {
	let t, r = 10;
	e ? (r = 1, t = e) : t = M();
	let n = !1;
	try {
		for (; r > 0 && !n;) {
			r -= 1;
			if (0 === (await I.where({
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

function K(e, t) {
	return e(t = {
		exports: {}
	}, t.exports), t.exports
}
var V = K((function(e, t) {
		var r = i.Buffer;

		function n(e, t) {
			for (var r in e) t[r] = e[r]
		}

		function o(e, t, n) {
			return r(e, t, n)
		}
		r.from && r.alloc && r.allocUnsafe && r.allocUnsafeSlow ? e.exports = i : (n(i, t), t.Buffer = o), o.prototype =
			Object.create(r.prototype), n(r, o), o.from = function(e, t, n) {
				if ("number" == typeof e) throw new TypeError("Argument must not be a number");
				return r(e, t, n)
			}, o.alloc = function(e, t, n) {
				if ("number" != typeof e) throw new TypeError("Argument must be a number");
				var i = r(e);
				return void 0 !== t ? "string" == typeof n ? i.fill(t, n) : i.fill(t) : i.fill(0), i
			}, o.allocUnsafe = function(e) {
				if ("number" != typeof e) throw new TypeError("Argument must be a number");
				return r(e)
			}, o.allocUnsafeSlow = function(e) {
				if ("number" != typeof e) throw new TypeError("Argument must be a number");
				return i.SlowBuffer(e)
			}
	})),
	q = (V.Buffer, V.Buffer);

function U(e) {
	if (this.buffer = null, this.writable = !0, this.readable = !0, !e) return this.buffer = q.alloc(0), this;
	if ("function" == typeof e.pipe) return this.buffer = q.alloc(0), e.pipe(this), this;
	if (e.length || "object" == typeof e) return this.buffer = e, this.writable = !1, process.nextTick(function() {
		this.emit("end", e), this.readable = !1, this.emit("close")
	}.bind(this)), this;
	throw new TypeError("Unexpected data type (" + typeof e + ")")
}
s.inherits(U, o), U.prototype.write = function(e) {
	this.buffer = q.concat([this.buffer, q.from(e)]), this.emit("data", e)
}, U.prototype.end = function(e) {
	e && this.write(e), this.emit("end", e), this.emit("close"), this.writable = !1, this.readable = !1
};
var H = U,
	F = i.Buffer,
	G = i.SlowBuffer,
	J = z;

function z(e, t) {
	if (!F.isBuffer(e) || !F.isBuffer(t)) return !1;
	if (e.length !== t.length) return !1;
	for (var r = 0, n = 0; n < e.length; n++) r |= e[n] ^ t[n];
	return 0 === r
}
z.install = function() {
	F.prototype.equal = G.prototype.equal = function(e) {
		return z(this, e)
	}
};
var W = F.prototype.equal,
	Z = G.prototype.equal;

function Y(e) {
	return (e / 8 | 0) + (e % 8 == 0 ? 0 : 1)
}
z.restore = function() {
	F.prototype.equal = W, G.prototype.equal = Z
};
var X = {
	ES256: Y(256),
	ES384: Y(384),
	ES512: Y(521)
};
var Q = function(e) {
		var t = X[e];
		if (t) return t;
		throw new Error('Unknown algorithm "' + e + '"')
	},
	ee = V.Buffer;

function te(e) {
	if (ee.isBuffer(e)) return e;
	if ("string" == typeof e) return ee.from(e, "base64");
	throw new TypeError("ECDSA signature must be a Base64 string or a Buffer")
}

function re(e, t, r) {
	for (var n = 0; t + n < r && 0 === e[t + n];) ++n;
	return e[t + n] >= 128 && --n, n
}
var ne = {
		derToJose: function(e, t) {
			e = te(e);
			var r = Q(t),
				n = r + 1,
				i = e.length,
				o = 0;
			if (48 !== e[o++]) throw new Error('Could not find expected "seq"');
			var s = e[o++];
			if (129 === s && (s = e[o++]), i - o < s) throw new Error('"seq" specified length of "' + s + '", only "' + (i - o) +
				'" remaining');
			if (2 !== e[o++]) throw new Error('Could not find expected "int" for "r"');
			var a = e[o++];
			if (i - o - 2 < a) throw new Error('"r" specified length of "' + a + '", only "' + (i - o - 2) + '" available');
			if (n < a) throw new Error('"r" specified length of "' + a + '", max of "' + n + '" is acceptable');
			var c = o;
			if (o += a, 2 !== e[o++]) throw new Error('Could not find expected "int" for "s"');
			var u = e[o++];
			if (i - o !== u) throw new Error('"s" specified length of "' + u + '", expected "' + (i - o) + '"');
			if (n < u) throw new Error('"s" specified length of "' + u + '", max of "' + n + '" is acceptable');
			var f = o;
			if ((o += u) !== i) throw new Error('Expected to consume entire buffer, but "' + (i - o) + '" bytes remain');
			var d = r - a,
				l = r - u,
				p = ee.allocUnsafe(d + a + l + u);
			for (o = 0; o < d; ++o) p[o] = 0;
			e.copy(p, o, c + Math.max(-d, 0), c + a);
			for (var m = o = r; o < m + l; ++o) p[o] = 0;
			return e.copy(p, o, f + Math.max(-l, 0), f + u), p = (p = p.toString("base64")).replace(/=/g, "").replace(/\+/g,
				"-").replace(/\//g, "_")
		},
		joseToDer: function(e, t) {
			e = te(e);
			var r = Q(t),
				n = e.length;
			if (n !== 2 * r) throw new TypeError('"' + t + '" signatures must be "' + 2 * r + '" bytes, saw "' + n + '"');
			var i = re(e, 0, r),
				o = re(e, r, e.length),
				s = r - i,
				a = r - o,
				c = 2 + s + 1 + 1 + a,
				u = c < 128,
				f = ee.allocUnsafe((u ? 2 : 3) + c),
				d = 0;
			return f[d++] = 48, u ? f[d++] = c : (f[d++] = 129, f[d++] = 255 & c), f[d++] = 2, f[d++] = s, i < 0 ? (f[d++] = 0,
					d += e.copy(f, d, 0, r)) : d += e.copy(f, d, i, r), f[d++] = 2, f[d++] = a, o < 0 ? (f[d++] = 0, e.copy(f, d, r)) :
				e.copy(f, d, r + o), f
		}
	},
	ie = V.Buffer,
	oe = "secret must be a string or buffer",
	se = "key must be a string or a buffer",
	ae = "function" == typeof n.createPublicKey;

function ce(e) {
	if (!ie.isBuffer(e) && "string" != typeof e) {
		if (!ae) throw le(se);
		if ("object" != typeof e) throw le(se);
		if ("string" != typeof e.type) throw le(se);
		if ("string" != typeof e.asymmetricKeyType) throw le(se);
		if ("function" != typeof e.export) throw le(se)
	}
}

function ue(e) {
	if (!ie.isBuffer(e) && "string" != typeof e && "object" != typeof e) throw le(
		"key must be a string, a buffer or an object")
}

function fe(e) {
	return e.replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_")
}

function de(e) {
	var t = 4 - (e = e.toString()).length % 4;
	if (4 !== t)
		for (var r = 0; r < t; ++r) e += "=";
	return e.replace(/\-/g, "+").replace(/_/g, "/")
}

function le(e) {
	var t = [].slice.call(arguments, 1),
		r = s.format.bind(s, e).apply(null, t);
	return new TypeError(r)
}

function pe(e) {
	var t;
	return t = e, ie.isBuffer(t) || "string" == typeof t || (e = JSON.stringify(e)), e
}

function me(e) {
	return function(t, r) {
		! function(e) {
			if (!ie.isBuffer(e)) {
				if ("string" == typeof e) return e;
				if (!ae) throw le(oe);
				if ("object" != typeof e) throw le(oe);
				if ("secret" !== e.type) throw le(oe);
				if ("function" != typeof e.export) throw le(oe)
			}
		}(r), t = pe(t);
		var i = n.createHmac("sha" + e, r);
		return fe((i.update(t), i.digest("base64")))
	}
}

function he(e) {
	return function(t, r, n) {
		var i = me(e)(t, n);
		return J(ie.from(r), ie.from(i))
	}
}

function ge(e) {
	return function(t, r) {
		ue(r), t = pe(t);
		var i = n.createSign("RSA-SHA" + e);
		return fe((i.update(t), i.sign(r, "base64")))
	}
}

function ye(e) {
	return function(t, r, i) {
		ce(i), t = pe(t), r = de(r);
		var o = n.createVerify("RSA-SHA" + e);
		return o.update(t), o.verify(i, r, "base64")
	}
}

function we(e) {
	return function(t, r) {
		ue(r), t = pe(t);
		var i = n.createSign("RSA-SHA" + e);
		return fe((i.update(t), i.sign({
			key: r,
			padding: n.constants.RSA_PKCS1_PSS_PADDING,
			saltLength: n.constants.RSA_PSS_SALTLEN_DIGEST
		}, "base64")))
	}
}

function ve(e) {
	return function(t, r, i) {
		ce(i), t = pe(t), r = de(r);
		var o = n.createVerify("RSA-SHA" + e);
		return o.update(t), o.verify({
			key: i,
			padding: n.constants.RSA_PKCS1_PSS_PADDING,
			saltLength: n.constants.RSA_PSS_SALTLEN_DIGEST
		}, r, "base64")
	}
}

function be(e) {
	var t = ge(e);
	return function() {
		var r = t.apply(null, arguments);
		return r = ne.derToJose(r, "ES" + e)
	}
}

function _e(e) {
	var t = ye(e);
	return function(r, n, i) {
		return n = ne.joseToDer(n, "ES" + e).toString("base64"), t(r, n, i)
	}
}

function Se() {
	return function() {
		return ""
	}
}

function Ee() {
	return function(e, t) {
		return "" === t
	}
}
ae && (se += " or a KeyObject", oe += "or a KeyObject");
var xe = function(e) {
		var t = {
				hs: me,
				rs: ge,
				ps: we,
				es: be,
				none: Se
			},
			r = {
				hs: he,
				rs: ye,
				ps: ve,
				es: _e,
				none: Ee
			},
			n = e.match(/^(RS|PS|ES|HS)(256|384|512)$|^(none)$/i);
		if (!n) throw le(
			'"%s" is not a valid algorithm.\n  Supported algorithms are:\n  "HS256", "HS384", "HS512", "RS256", "RS384", "RS512", "PS256", "PS384", "PS512", "ES256", "ES384", "ES512" and "none".',
			e);
		var i = (n[1] || n[3]).toLowerCase(),
			o = n[2];
		return {
			sign: t[i](o),
			verify: r[i](o)
		}
	},
	je = i.Buffer,
	ke = function(e) {
		return "string" == typeof e ? e : "number" == typeof e || je.isBuffer(e) ? e.toString() : JSON.stringify(e)
	},
	Pe = V.Buffer;

function Oe(e, t) {
	return Pe.from(e, t).toString("base64").replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_")
}

function Te(e) {
	var t = e.header,
		r = e.payload,
		n = e.secret || e.privateKey,
		i = e.encoding,
		o = xe(t.alg),
		a = function(e, t, r) {
			r = r || "utf8";
			var n = Oe(ke(e), "binary"),
				i = Oe(ke(t), r);
			return s.format("%s.%s", n, i)
		}(t, r, i),
		c = o.sign(a, n);
	return s.format("%s.%s", a, c)
}

function Ie(e) {
	var t = e.secret || e.privateKey || e.key,
		r = new H(t);
	this.readable = !0, this.header = e.header, this.encoding = e.encoding, this.secret = this.privateKey = this.key = r,
		this.payload = new H(e.payload), this.secret.once("close", function() {
			!this.payload.writable && this.readable && this.sign()
		}.bind(this)), this.payload.once("close", function() {
			!this.secret.writable && this.readable && this.sign()
		}.bind(this))
}
s.inherits(Ie, o), Ie.prototype.sign = function() {
	try {
		var e = Te({
			header: this.header,
			payload: this.payload.buffer,
			secret: this.secret.buffer,
			encoding: this.encoding
		});
		return this.emit("done", e), this.emit("data", e), this.emit("end"), this.readable = !1, e
	} catch (e) {
		this.readable = !1, this.emit("error", e), this.emit("close")
	}
}, Ie.sign = Te;
var Re = Ie,
	Ae = V.Buffer,
	Ce = /^[a-zA-Z0-9\-_]+?\.[a-zA-Z0-9\-_]+?\.([a-zA-Z0-9\-_]+)?$/;

function De(e) {
	if (function(e) {
			return "[object Object]" === Object.prototype.toString.call(e)
		}(e)) return e;
	try {
		return JSON.parse(e)
	} catch (e) {
		return
	}
}

function $e(e) {
	var t = e.split(".", 1)[0];
	return De(Ae.from(t, "base64").toString("binary"))
}

function Be(e) {
	return e.split(".")[2]
}

function Ne(e) {
	return Ce.test(e) && !!$e(e)
}

function Me(e, t, r) {
	if (!t) {
		var n = new Error("Missing algorithm parameter for jws.verify");
		throw n.code = "MISSING_ALGORITHM", n
	}
	var i = Be(e = ke(e)),
		o = function(e) {
			return e.split(".", 2).join(".")
		}(e);
	return xe(t).verify(o, i, r)
}

function Le(e, t) {
	if (t = t || {}, !Ne(e = ke(e))) return null;
	var r = $e(e);
	if (!r) return null;
	var n = function(e, t) {
		t = t || "utf8";
		var r = e.split(".")[1];
		return Ae.from(r, "base64").toString(t)
	}(e);
	return ("JWT" === r.typ || t.json) && (n = JSON.parse(n, t.encoding)), {
		header: r,
		payload: n,
		signature: Be(e)
	}
}

function Ke(e) {
	var t = (e = e || {}).secret || e.publicKey || e.key,
		r = new H(t);
	this.readable = !0, this.algorithm = e.algorithm, this.encoding = e.encoding, this.secret = this.publicKey = this.key =
		r, this.signature = new H(e.signature), this.secret.once("close", function() {
			!this.signature.writable && this.readable && this.verify()
		}.bind(this)), this.signature.once("close", function() {
			!this.secret.writable && this.readable && this.verify()
		}.bind(this))
}
s.inherits(Ke, o), Ke.prototype.verify = function() {
	try {
		var e = Me(this.signature.buffer, this.algorithm, this.key.buffer),
			t = Le(this.signature.buffer, this.encoding);
		return this.emit("done", e, t), this.emit("data", e), this.emit("end"), this.readable = !1, e
	} catch (e) {
		this.readable = !1, this.emit("error", e), this.emit("close")
	}
}, Ke.decode = Le, Ke.isValid = Ne, Ke.verify = Me;
var Ve = Ke,
	qe = {
		ALGORITHMS: ["HS256", "HS384", "HS512", "RS256", "RS384", "RS512", "PS256", "PS384", "PS512", "ES256", "ES384",
			"ES512"
		],
		sign: Re.sign,
		verify: Ve.verify,
		decode: Ve.decode,
		isValid: Ve.isValid,
		createSign: function(e) {
			return new Re(e)
		},
		createVerify: function(e) {
			return new Ve(e)
		}
	},
	Ue = function(e, t) {
		t = t || {};
		var r = qe.decode(e, t);
		if (!r) return null;
		var n = r.payload;
		if ("string" == typeof n) try {
			var i = JSON.parse(n);
			null !== i && "object" == typeof i && (n = i)
		} catch (e) {}
		return !0 === t.complete ? {
			header: r.header,
			payload: n,
			signature: r.signature
		} : n
	},
	He = function(e, t) {
		Error.call(this, e), Error.captureStackTrace && Error.captureStackTrace(this, this.constructor), this.name =
			"JsonWebTokenError", this.message = e, t && (this.inner = t)
	};
(He.prototype = Object.create(Error.prototype)).constructor = He;
var Fe = He,
	Ge = function(e, t) {
		Fe.call(this, e), this.name = "NotBeforeError", this.date = t
	};
(Ge.prototype = Object.create(Fe.prototype)).constructor = Ge;
var Je = Ge,
	ze = function(e, t) {
		Fe.call(this, e), this.name = "TokenExpiredError", this.expiredAt = t
	};
(ze.prototype = Object.create(Fe.prototype)).constructor = ze;
var We = ze,
	Ze = 1e3,
	Ye = 60 * Ze,
	Xe = 60 * Ye,
	Qe = 24 * Xe,
	et = function(e, t) {
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
					return r * Qe;
				case "hours":
				case "hour":
				case "hrs":
				case "hr":
				case "h":
					return r * Xe;
				case "minutes":
				case "minute":
				case "mins":
				case "min":
				case "m":
					return r * Ye;
				case "seconds":
				case "second":
				case "secs":
				case "sec":
				case "s":
					return r * Ze;
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
			if (t >= Qe) return tt(e, t, Qe, "day");
			if (t >= Xe) return tt(e, t, Xe, "hour");
			if (t >= Ye) return tt(e, t, Ye, "minute");
			if (t >= Ze) return tt(e, t, Ze, "second");
			return e + " ms"
		}(e) : function(e) {
			var t = Math.abs(e);
			if (t >= Qe) return Math.round(e / Qe) + "d";
			if (t >= Xe) return Math.round(e / Xe) + "h";
			if (t >= Ye) return Math.round(e / Ye) + "m";
			if (t >= Ze) return Math.round(e / Ze) + "s";
			return e + "ms"
		}(e);
		throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(e))
	};

function tt(e, t, r, n) {
	var i = t >= 1.5 * r;
	return Math.round(e / r) + " " + n + (i ? "s" : "")
}
var rt = function(e, t) {
		var r = t || Math.floor(Date.now() / 1e3);
		if ("string" == typeof e) {
			var n = et(e);
			if (void 0 === n) return;
			return Math.floor(r + n / 1e3)
		}
		return "number" == typeof e ? r + e : void 0
	},
	nt = K((function(e, t) {
		var r;
		t = e.exports = G, r = "object" == typeof process && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(
			process.env.NODE_DEBUG) ? function() {
			var e = Array.prototype.slice.call(arguments, 0);
			e.unshift("SEMVER"), console.log.apply(console, e)
		} : function() {}, t.SEMVER_SPEC_VERSION = "2.0.0";
		var n = Number.MAX_SAFE_INTEGER || 9007199254740991,
			i = t.re = [],
			o = t.src = [],
			s = 0,
			a = s++;
		o[a] = "0|[1-9]\\d*";
		var c = s++;
		o[c] = "[0-9]+";
		var u = s++;
		o[u] = "\\d*[a-zA-Z-][a-zA-Z0-9-]*";
		var f = s++;
		o[f] = "(" + o[a] + ")\\.(" + o[a] + ")\\.(" + o[a] + ")";
		var d = s++;
		o[d] = "(" + o[c] + ")\\.(" + o[c] + ")\\.(" + o[c] + ")";
		var l = s++;
		o[l] = "(?:" + o[a] + "|" + o[u] + ")";
		var p = s++;
		o[p] = "(?:" + o[c] + "|" + o[u] + ")";
		var m = s++;
		o[m] = "(?:-(" + o[l] + "(?:\\." + o[l] + ")*))";
		var h = s++;
		o[h] = "(?:-?(" + o[p] + "(?:\\." + o[p] + ")*))";
		var g = s++;
		o[g] = "[0-9A-Za-z-]+";
		var y = s++;
		o[y] = "(?:\\+(" + o[g] + "(?:\\." + o[g] + ")*))";
		var w = s++,
			v = "v?" + o[f] + o[m] + "?" + o[y] + "?";
		o[w] = "^" + v + "$";
		var b = "[v=\\s]*" + o[d] + o[h] + "?" + o[y] + "?",
			_ = s++;
		o[_] = "^" + b + "$";
		var S = s++;
		o[S] = "((?:<|>)?=?)";
		var E = s++;
		o[E] = o[c] + "|x|X|\\*";
		var x = s++;
		o[x] = o[a] + "|x|X|\\*";
		var j = s++;
		o[j] = "[v=\\s]*(" + o[x] + ")(?:\\.(" + o[x] + ")(?:\\.(" + o[x] + ")(?:" + o[m] + ")?" + o[y] + "?)?)?";
		var k = s++;
		o[k] = "[v=\\s]*(" + o[E] + ")(?:\\.(" + o[E] + ")(?:\\.(" + o[E] + ")(?:" + o[h] + ")?" + o[y] + "?)?)?";
		var P = s++;
		o[P] = "^" + o[S] + "\\s*" + o[j] + "$";
		var O = s++;
		o[O] = "^" + o[S] + "\\s*" + o[k] + "$";
		var T = s++;
		o[T] = "(?:^|[^\\d])(\\d{1,16})(?:\\.(\\d{1,16}))?(?:\\.(\\d{1,16}))?(?:$|[^\\d])";
		var I = s++;
		o[I] = "(?:~>?)";
		var R = s++;
		o[R] = "(\\s*)" + o[I] + "\\s+", i[R] = new RegExp(o[R], "g");
		var A = s++;
		o[A] = "^" + o[I] + o[j] + "$";
		var C = s++;
		o[C] = "^" + o[I] + o[k] + "$";
		var D = s++;
		o[D] = "(?:\\^)";
		var $ = s++;
		o[$] = "(\\s*)" + o[D] + "\\s+", i[$] = new RegExp(o[$], "g");
		var B = s++;
		o[B] = "^" + o[D] + o[j] + "$";
		var N = s++;
		o[N] = "^" + o[D] + o[k] + "$";
		var M = s++;
		o[M] = "^" + o[S] + "\\s*(" + b + ")$|^$";
		var L = s++;
		o[L] = "^" + o[S] + "\\s*(" + v + ")$|^$";
		var K = s++;
		o[K] = "(\\s*)" + o[S] + "\\s*(" + b + "|" + o[j] + ")", i[K] = new RegExp(o[K], "g");
		var V = s++;
		o[V] = "^\\s*(" + o[j] + ")\\s+-\\s+(" + o[j] + ")\\s*$";
		var q = s++;
		o[q] = "^\\s*(" + o[k] + ")\\s+-\\s+(" + o[k] + ")\\s*$";
		var U = s++;
		o[U] = "(<|>)?=?\\s*\\*";
		for (var H = 0; H < 35; H++) r(H, o[H]), i[H] || (i[H] = new RegExp(o[H]));

		function F(e, t) {
			if (t && "object" == typeof t || (t = {
					loose: !!t,
					includePrerelease: !1
				}), e instanceof G) return e;
			if ("string" != typeof e) return null;
			if (e.length > 256) return null;
			if (!(t.loose ? i[_] : i[w]).test(e)) return null;
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
			var o = e.trim().match(t.loose ? i[_] : i[w]);
			if (!o) throw new TypeError("Invalid Version: " + e);
			if (this.raw = e, this.major = +o[1], this.minor = +o[2], this.patch = +o[3], this.major > n || this.major < 0)
				throw new TypeError("Invalid major version");
			if (this.minor > n || this.minor < 0) throw new TypeError("Invalid minor version");
			if (this.patch > n || this.patch < 0) throw new TypeError("Invalid patch version");
			o[4] ? this.prerelease = o[4].split(".").map((function(e) {
				if (/^[0-9]+$/.test(e)) {
					var t = +e;
					if (t >= 0 && t < n) return t
				}
				return e
			})) : this.prerelease = [], this.build = o[5] ? o[5].split(".") : [], this.format()
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
					i = e.prerelease[t];
				if (r("prerelease compare", t, n, i), void 0 === n && void 0 === i) return 0;
				if (void 0 === i) return 1;
				if (void 0 === n) return -1;
				if (n !== i) return z(n, i)
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
				i = "";
			if (r.prerelease.length || n.prerelease.length) {
				i = "pre";
				var o = "prerelease"
			}
			for (var s in r)
				if (("major" === s || "minor" === s || "patch" === s) && r[s] !== n[s]) return i + s;
			return o
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
			r("comparator", e, t), this.options = t, this.loose = !!t.loose, this.parse(e), this.semver === ie ? this.value =
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
		var ie = {};

		function oe(e, t) {
			if (t && "object" == typeof t || (t = {
					loose: !!t,
					includePrerelease: !1
				}), e instanceof oe) return e.loose === !!t.loose && e.includePrerelease === !!t.includePrerelease ? e : new oe(e
				.raw, t);
			if (e instanceof ne) return new oe(e.value, t);
			if (!(this instanceof oe)) return new oe(e, t);
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

		function ae(e, t, r, n, i, o, s, a, c, u, f, d, l) {
			return ((t = se(r) ? "" : se(n) ? ">=" + r + ".0.0" : se(i) ? ">=" + r + "." + n + ".0" : ">=" + t) + " " + (a =
				se(c) ? "" : se(u) ? "<" + (+c + 1) + ".0.0" : se(f) ? "<" + c + "." + (+u + 1) + ".0" : d ? "<=" + c + "." + u +
				"." + f + "-" + d : "<=" + a)).trim()
		}

		function ce(e, t, n) {
			for (var i = 0; i < e.length; i++)
				if (!e[i].test(t)) return !1;
			if (t.prerelease.length && !n.includePrerelease) {
				for (i = 0; i < e.length; i++)
					if (r(e[i].semver), e[i].semver !== ie && e[i].semver.prerelease.length > 0) {
						var o = e[i].semver;
						if (o.major === t.major && o.minor === t.minor && o.patch === t.patch) return !0
					} return !1
			}
			return !0
		}

		function ue(e, t, r) {
			try {
				t = new oe(t, r)
			} catch (e) {
				return !1
			}
			return t.test(e)
		}

		function fe(e, t, r, n) {
			var i, o, s, a, c;
			switch (e = new G(e, n), t = new oe(t, n), r) {
				case ">":
					i = Z, o = te, s = Y, a = ">", c = ">=";
					break;
				case "<":
					i = Y, o = ee, s = Z, a = "<", c = "<=";
					break;
				default:
					throw new TypeError('Must provide a hilo val of "<" or ">"')
			}
			if (ue(e, t, n)) return !1;
			for (var u = 0; u < t.set.length; ++u) {
				var f = t.set[u],
					d = null,
					l = null;
				if (f.forEach((function(e) {
						e.semver === ie && (e = new ne(">=0.0.0")), d = d || e, l = l || e, i(e.semver, d.semver, n) ? d = e : s(e.semver,
							l.semver, n) && (l = e)
					})), d.operator === a || d.operator === c) return !1;
				if ((!l.operator || l.operator === a) && o(e, l.semver)) return !1;
				if (l.operator === c && s(e, l.semver)) return !1
			}
			return !0
		}
		ne.prototype.parse = function(e) {
			var t = this.options.loose ? i[M] : i[L],
				r = e.match(t);
			if (!r) throw new TypeError("Invalid comparator: " + e);
			this.operator = r[1], "=" === this.operator && (this.operator = ""), r[2] ? this.semver = new G(r[2], this.options
				.loose) : this.semver = ie
		}, ne.prototype.toString = function() {
			return this.value
		}, ne.prototype.test = function(e) {
			return r("Comparator.test", e, this.options.loose), this.semver === ie || ("string" == typeof e && (e = new G(e,
				this.options)), re(e, this.operator, this.semver, this.options))
		}, ne.prototype.intersects = function(e, t) {
			if (!(e instanceof ne)) throw new TypeError("a Comparator is required");
			var r;
			if (t && "object" == typeof t || (t = {
					loose: !!t,
					includePrerelease: !1
				}), "" === this.operator) return r = new oe(e.value, t), ue(this.value, r, t);
			if ("" === e.operator) return r = new oe(this.value, t), ue(e.semver, r, t);
			var n = !(">=" !== this.operator && ">" !== this.operator || ">=" !== e.operator && ">" !== e.operator),
				i = !("<=" !== this.operator && "<" !== this.operator || "<=" !== e.operator && "<" !== e.operator),
				o = this.semver.version === e.semver.version,
				s = !(">=" !== this.operator && "<=" !== this.operator || ">=" !== e.operator && "<=" !== e.operator),
				a = re(this.semver, "<", e.semver, t) && (">=" === this.operator || ">" === this.operator) && ("<=" === e.operator ||
					"<" === e.operator),
				c = re(this.semver, ">", e.semver, t) && ("<=" === this.operator || "<" === this.operator) && (">=" === e.operator ||
					">" === e.operator);
			return n || i || o && s || a || c
		}, t.Range = oe, oe.prototype.format = function() {
			return this.range = this.set.map((function(e) {
				return e.join(" ").trim()
			})).join("||").trim(), this.range
		}, oe.prototype.toString = function() {
			return this.range
		}, oe.prototype.parseRange = function(e) {
			var t = this.options.loose;
			e = e.trim();
			var n = t ? i[q] : i[V];
			e = e.replace(n, ae), r("hyphen replace", e), e = e.replace(i[K], "$1$2$3"), r("comparator trim", e, i[K]), e = (
				e = (e = e.replace(i[R], "$1~")).replace(i[$], "$1^")).split(/\s+/).join(" ");
			var o = t ? i[M] : i[L],
				s = e.split(" ").map((function(e) {
					return function(e, t) {
						return r("comp", e, t), e = function(e, t) {
							return e.trim().split(/\s+/).map((function(e) {
								return function(e, t) {
									r("caret", e, t);
									var n = t.loose ? i[N] : i[B];
									return e.replace(n, (function(t, n, i, o, s) {
										var a;
										return r("caret", e, t, n, i, o, s), se(n) ? a = "" : se(i) ? a = ">=" + n + ".0.0 <" + (+n + 1) +
											".0.0" : se(o) ? a = "0" === n ? ">=" + n + "." + i + ".0 <" + n + "." + (+i + 1) + ".0" :
											">=" + n + "." + i + ".0 <" + (+n + 1) + ".0.0" : s ? (r("replaceCaret pr", s), a = "0" === n ?
												"0" === i ? ">=" + n + "." + i + "." + o + "-" + s + " <" + n + "." + i + "." + (+o + 1) :
												">=" + n + "." + i + "." + o + "-" + s + " <" + n + "." + (+i + 1) + ".0" : ">=" + n + "." +
												i + "." + o + "-" + s + " <" + (+n + 1) + ".0.0") : (r("no pr"), a = "0" === n ? "0" === i ?
												">=" + n + "." + i + "." + o + " <" + n + "." + i + "." + (+o + 1) : ">=" + n + "." + i + "." +
												o + " <" + n + "." + (+i + 1) + ".0" : ">=" + n + "." + i + "." + o + " <" + (+n + 1) +
												".0.0"), r("caret return", a), a
									}))
								}(e, t)
							})).join(" ")
						}(e, t), r("caret", e), e = function(e, t) {
							return e.trim().split(/\s+/).map((function(e) {
								return function(e, t) {
									var n = t.loose ? i[C] : i[A];
									return e.replace(n, (function(t, n, i, o, s) {
										var a;
										return r("tilde", e, t, n, i, o, s), se(n) ? a = "" : se(i) ? a = ">=" + n + ".0.0 <" + (+n + 1) +
											".0.0" : se(o) ? a = ">=" + n + "." + i + ".0 <" + n + "." + (+i + 1) + ".0" : s ? (r(
													"replaceTilde pr", s), a = ">=" + n + "." + i + "." + o + "-" + s + " <" + n + "." + (+i + 1) +
												".0") : a = ">=" + n + "." + i + "." + o + " <" + n + "." + (+i + 1) + ".0", r("tilde return",
												a), a
									}))
								}(e, t)
							})).join(" ")
						}(e, t), r("tildes", e), e = function(e, t) {
							return r("replaceXRanges", e, t), e.split(/\s+/).map((function(e) {
								return function(e, t) {
									e = e.trim();
									var n = t.loose ? i[O] : i[P];
									return e.replace(n, (function(t, n, i, o, s, a) {
										r("xRange", e, t, n, i, o, s, a);
										var c = se(i),
											u = c || se(o),
											f = u || se(s);
										return "=" === n && f && (n = ""), c ? t = ">" === n || "<" === n ? "<0.0.0" : "*" : n && f ? (
												u && (o = 0), s = 0, ">" === n ? (n = ">=", u ? (i = +i + 1, o = 0, s = 0) : (o = +o + 1, s =
													0)) : "<=" === n && (n = "<", u ? i = +i + 1 : o = +o + 1), t = n + i + "." + o + "." + s) :
											u ? t = ">=" + i + ".0.0 <" + (+i + 1) + ".0.0" : f && (t = ">=" + i + "." + o + ".0 <" + i +
												"." + (+o + 1) + ".0"), r("xRange return", t), t
									}))
								}(e, t)
							})).join(" ")
						}(e, t), r("xrange", e), e = function(e, t) {
							return r("replaceStars", e, t), e.trim().replace(i[U], "")
						}(e, t), r("stars", e), e
					}(e, this.options)
				}), this).join(" ").split(/\s+/);
			return this.options.loose && (s = s.filter((function(e) {
				return !!e.match(o)
			}))), s = s.map((function(e) {
				return new ne(e, this.options)
			}), this)
		}, oe.prototype.intersects = function(e, t) {
			if (!(e instanceof oe)) throw new TypeError("a Range is required");
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
			return new oe(e, t).set.map((function(e) {
				return e.map((function(e) {
					return e.value
				})).join(" ").trim().split(" ")
			}))
		}, oe.prototype.test = function(e) {
			if (!e) return !1;
			"string" == typeof e && (e = new G(e, this.options));
			for (var t = 0; t < this.set.length; t++)
				if (ce(this.set[t], e, this.options)) return !0;
			return !1
		}, t.satisfies = ue, t.maxSatisfying = function(e, t, r) {
			var n = null,
				i = null;
			try {
				var o = new oe(t, r)
			} catch (e) {
				return null
			}
			return e.forEach((function(e) {
				o.test(e) && (n && -1 !== i.compare(e) || (i = new G(n = e, r)))
			})), n
		}, t.minSatisfying = function(e, t, r) {
			var n = null,
				i = null;
			try {
				var o = new oe(t, r)
			} catch (e) {
				return null
			}
			return e.forEach((function(e) {
				o.test(e) && (n && 1 !== i.compare(e) || (i = new G(n = e, r)))
			})), n
		}, t.minVersion = function(e, t) {
			e = new oe(e, t);
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
				return new oe(e, t).range || "*"
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
			return e = new oe(e, r), t = new oe(t, r), e.intersects(t)
		}, t.coerce = function(e) {
			if (e instanceof G) return e;
			if ("string" != typeof e) return null;
			var t = e.match(i[T]);
			if (null == t) return null;
			return F(t[1] + "." + (t[2] || "0") + "." + (t[3] || "0"))
		}
	})),
	it = (nt.SEMVER_SPEC_VERSION, nt.re, nt.src, nt.parse, nt.valid, nt.clean, nt.SemVer, nt.inc, nt.diff, nt.compareIdentifiers,
		nt.rcompareIdentifiers, nt.major, nt.minor, nt.patch, nt.compare, nt.compareLoose, nt.rcompare, nt.sort, nt.rsort, nt
		.gt, nt.lt, nt.eq, nt.neq, nt.gte, nt.lte, nt.cmp, nt.Comparator, nt.Range, nt.toComparators, nt.satisfies, nt.maxSatisfying,
		nt.minSatisfying, nt.minVersion, nt.validRange, nt.ltr, nt.gtr, nt.outside, nt.prerelease, nt.intersects, nt.coerce,
		nt.satisfies(process.version, "^6.12.0 || >=8.0.0")),
	ot = ["RS256", "RS384", "RS512", "ES256", "ES384", "ES512"],
	st = ["RS256", "RS384", "RS512"],
	at = ["HS256", "HS384", "HS512"];
it && (ot.splice(3, 0, "PS256", "PS384", "PS512"), st.splice(3, 0, "PS256", "PS384", "PS512"));
var ct = /^\s+|\s+$/g,
	ut = /^[-+]0x[0-9a-f]+$/i,
	ft = /^0b[01]+$/i,
	dt = /^0o[0-7]+$/i,
	lt = /^(?:0|[1-9]\d*)$/,
	pt = parseInt;

function mt(e) {
	return e != e
}

function ht(e, t) {
	return function(e, t) {
		for (var r = -1, n = e ? e.length : 0, i = Array(n); ++r < n;) i[r] = t(e[r], r, e);
		return i
	}(t, (function(t) {
		return e[t]
	}))
}
var gt, yt, wt = Object.prototype,
	vt = wt.hasOwnProperty,
	bt = wt.toString,
	_t = wt.propertyIsEnumerable,
	St = (gt = Object.keys, yt = Object, function(e) {
		return gt(yt(e))
	}),
	Et = Math.max;

function xt(e, t) {
	var r = Pt(e) || function(e) {
			return function(e) {
				return It(e) && Ot(e)
			}(e) && vt.call(e, "callee") && (!_t.call(e, "callee") || "[object Arguments]" == bt.call(e))
		}(e) ? function(e, t) {
			for (var r = -1, n = Array(e); ++r < e;) n[r] = t(r);
			return n
		}(e.length, String) : [],
		n = r.length,
		i = !!n;
	for (var o in e) !t && !vt.call(e, o) || i && ("length" == o || kt(o, n)) || r.push(o);
	return r
}

function jt(e) {
	if (r = (t = e) && t.constructor, n = "function" == typeof r && r.prototype || wt, t !== n) return St(e);
	var t, r, n, i = [];
	for (var o in Object(e)) vt.call(e, o) && "constructor" != o && i.push(o);
	return i
}

function kt(e, t) {
	return !!(t = null == t ? 9007199254740991 : t) && ("number" == typeof e || lt.test(e)) && e > -1 && e % 1 == 0 && e <
		t
}
var Pt = Array.isArray;

function Ot(e) {
	return null != e && function(e) {
		return "number" == typeof e && e > -1 && e % 1 == 0 && e <= 9007199254740991
	}(e.length) && ! function(e) {
		var t = Tt(e) ? bt.call(e) : "";
		return "[object Function]" == t || "[object GeneratorFunction]" == t
	}(e)
}

function Tt(e) {
	var t = typeof e;
	return !!e && ("object" == t || "function" == t)
}

function It(e) {
	return !!e && "object" == typeof e
}
var Rt = function(e, t, r, n) {
		var i;
		e = Ot(e) ? e : (i = e) ? ht(i, function(e) {
			return Ot(e) ? xt(e) : jt(e)
		}(i)) : [], r = r && !n ? function(e) {
			var t = function(e) {
					if (!e) return 0 === e ? e : 0;
					if ((e = function(e) {
							if ("number" == typeof e) return e;
							if (function(e) {
									return "symbol" == typeof e || It(e) && "[object Symbol]" == bt.call(e)
								}(e)) return NaN;
							if (Tt(e)) {
								var t = "function" == typeof e.valueOf ? e.valueOf() : e;
								e = Tt(t) ? t + "" : t
							}
							if ("string" != typeof e) return 0 === e ? e : +e;
							e = e.replace(ct, "");
							var r = ft.test(e);
							return r || dt.test(e) ? pt(e.slice(2), r ? 2 : 8) : ut.test(e) ? NaN : +e
						}(e)) === 1 / 0 || e === -1 / 0) {
						return 17976931348623157e292 * (e < 0 ? -1 : 1)
					}
					return e == e ? e : 0
				}(e),
				r = t % 1;
			return t == t ? r ? t - r : t : 0
		}(r) : 0;
		var o = e.length;
		return r < 0 && (r = Et(o + r, 0)),
			function(e) {
				return "string" == typeof e || !Pt(e) && It(e) && "[object String]" == bt.call(e)
			}(e) ? r <= o && e.indexOf(t, r) > -1 : !!o && function(e, t, r) {
				if (t != t) return function(e, t, r, n) {
					for (var i = e.length, o = r + (n ? 1 : -1); n ? o-- : ++o < i;)
						if (t(e[o], o, e)) return o;
					return -1
				}(e, mt, r);
				for (var n = r - 1, i = e.length; ++n < i;)
					if (e[n] === t) return n;
				return -1
			}(e, t, r) > -1
	},
	At = Object.prototype.toString;
var Ct = function(e) {
		return !0 === e || !1 === e || function(e) {
			return !!e && "object" == typeof e
		}(e) && "[object Boolean]" == At.call(e)
	},
	Dt = /^\s+|\s+$/g,
	$t = /^[-+]0x[0-9a-f]+$/i,
	Bt = /^0b[01]+$/i,
	Nt = /^0o[0-7]+$/i,
	Mt = parseInt,
	Lt = Object.prototype.toString;

function Kt(e) {
	var t = typeof e;
	return !!e && ("object" == t || "function" == t)
}
var Vt = function(e) {
		return "number" == typeof e && e == function(e) {
			var t = function(e) {
					if (!e) return 0 === e ? e : 0;
					if ((e = function(e) {
							if ("number" == typeof e) return e;
							if (function(e) {
									return "symbol" == typeof e || function(e) {
										return !!e && "object" == typeof e
									}(e) && "[object Symbol]" == Lt.call(e)
								}(e)) return NaN;
							if (Kt(e)) {
								var t = "function" == typeof e.valueOf ? e.valueOf() : e;
								e = Kt(t) ? t + "" : t
							}
							if ("string" != typeof e) return 0 === e ? e : +e;
							e = e.replace(Dt, "");
							var r = Bt.test(e);
							return r || Nt.test(e) ? Mt(e.slice(2), r ? 2 : 8) : $t.test(e) ? NaN : +e
						}(e)) === 1 / 0 || e === -1 / 0) {
						return 17976931348623157e292 * (e < 0 ? -1 : 1)
					}
					return e == e ? e : 0
				}(e),
				r = t % 1;
			return t == t ? r ? t - r : t : 0
		}(e)
	},
	qt = Object.prototype.toString;
var Ut = function(e) {
	return "number" == typeof e || function(e) {
		return !!e && "object" == typeof e
	}(e) && "[object Number]" == qt.call(e)
};
var Ht = Function.prototype,
	Ft = Object.prototype,
	Gt = Ht.toString,
	Jt = Ft.hasOwnProperty,
	zt = Gt.call(Object),
	Wt = Ft.toString,
	Zt = function(e, t) {
		return function(r) {
			return e(t(r))
		}
	}(Object.getPrototypeOf, Object);
var Yt = function(e) {
		if (! function(e) {
				return !!e && "object" == typeof e
			}(e) || "[object Object]" != Wt.call(e) || function(e) {
				var t = !1;
				if (null != e && "function" != typeof e.toString) try {
					t = !!(e + "")
				} catch (e) {}
				return t
			}(e)) return !1;
		var t = Zt(e);
		if (null === t) return !0;
		var r = Jt.call(t, "constructor") && t.constructor;
		return "function" == typeof r && r instanceof r && Gt.call(r) == zt
	},
	Xt = Object.prototype.toString,
	Qt = Array.isArray;
var er = function(e) {
		return "string" == typeof e || !Qt(e) && function(e) {
			return !!e && "object" == typeof e
		}(e) && "[object String]" == Xt.call(e)
	},
	tr = /^\s+|\s+$/g,
	rr = /^[-+]0x[0-9a-f]+$/i,
	nr = /^0b[01]+$/i,
	ir = /^0o[0-7]+$/i,
	or = parseInt,
	sr = Object.prototype.toString;

function ar(e, t) {
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
									}(e) && "[object Symbol]" == sr.call(e)
								}(e)) return NaN;
							if (cr(e)) {
								var t = "function" == typeof e.valueOf ? e.valueOf() : e;
								e = cr(t) ? t + "" : t
							}
							if ("string" != typeof e) return 0 === e ? e : +e;
							e = e.replace(tr, "");
							var r = nr.test(e);
							return r || ir.test(e) ? or(e.slice(2), r ? 2 : 8) : rr.test(e) ? NaN : +e
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

function cr(e) {
	var t = typeof e;
	return !!e && ("object" == t || "function" == t)
}
var ur = function(e) {
		return ar(2, e)
	},
	fr = ["RS256", "RS384", "RS512", "ES256", "ES384", "ES512", "HS256", "HS384", "HS512", "none"];
it && fr.splice(3, 0, "PS256", "PS384", "PS512");
var dr = {
		expiresIn: {
			isValid: function(e) {
				return Vt(e) || er(e) && e
			},
			message: '"expiresIn" should be a number of seconds or string representing a timespan'
		},
		notBefore: {
			isValid: function(e) {
				return Vt(e) || er(e) && e
			},
			message: '"notBefore" should be a number of seconds or string representing a timespan'
		},
		audience: {
			isValid: function(e) {
				return er(e) || Array.isArray(e)
			},
			message: '"audience" must be a string or array'
		},
		algorithm: {
			isValid: Rt.bind(null, fr),
			message: '"algorithm" must be a valid string enum value'
		},
		header: {
			isValid: Yt,
			message: '"header" must be an object'
		},
		encoding: {
			isValid: er,
			message: '"encoding" must be a string'
		},
		issuer: {
			isValid: er,
			message: '"issuer" must be a string'
		},
		subject: {
			isValid: er,
			message: '"subject" must be a string'
		},
		jwtid: {
			isValid: er,
			message: '"jwtid" must be a string'
		},
		noTimestamp: {
			isValid: Ct,
			message: '"noTimestamp" must be a boolean'
		},
		keyid: {
			isValid: er,
			message: '"keyid" must be a string'
		},
		mutatePayload: {
			isValid: Ct,
			message: '"mutatePayload" must be a boolean'
		}
	},
	lr = {
		iat: {
			isValid: Ut,
			message: '"iat" should be a number of seconds'
		},
		exp: {
			isValid: Ut,
			message: '"exp" should be a number of seconds'
		},
		nbf: {
			isValid: Ut,
			message: '"nbf" should be a number of seconds'
		}
	};

function pr(e, t, r, n) {
	if (!Yt(r)) throw new Error('Expected "' + n + '" to be a plain object.');
	Object.keys(r).forEach((function(i) {
		var o = e[i];
		if (o) {
			if (!o.isValid(r[i])) throw new Error(o.message)
		} else if (!t) throw new Error('"' + i + '" is not allowed in "' + n + '"')
	}))
}
var mr = {
		audience: "aud",
		issuer: "iss",
		subject: "sub",
		jwtid: "jti"
	},
	hr = ["expiresIn", "notBefore", "noTimestamp", "audience", "issuer", "subject", "jwtid"],
	gr = function(e, t, r, n) {
		var i;
		if ("function" != typeof r || n || (n = r, r = {}), r || (r = {}), r = Object.assign({}, r), i = n || function(e, t) {
				if (e) throw e;
				return t
			}, r.clockTimestamp && "number" != typeof r.clockTimestamp) return i(new Fe("clockTimestamp must be a number"));
		if (void 0 !== r.nonce && ("string" != typeof r.nonce || "" === r.nonce.trim())) return i(new Fe(
			"nonce must be a non-empty string"));
		var o = r.clockTimestamp || Math.floor(Date.now() / 1e3);
		if (!e) return i(new Fe("jwt must be provided"));
		if ("string" != typeof e) return i(new Fe("jwt must be a string"));
		var s, a = e.split(".");
		if (3 !== a.length) return i(new Fe("jwt malformed"));
		try {
			s = Ue(e, {
				complete: !0
			})
		} catch (e) {
			return i(e)
		}
		if (!s) return i(new Fe("invalid token"));
		var c, u = s.header;
		if ("function" == typeof t) {
			if (!n) return i(new Fe("verify must be called asynchronous if secret or public key is provided as a callback"));
			c = t
		} else c = function(e, r) {
			return r(null, t)
		};
		return c(u, (function(t, n) {
			if (t) return i(new Fe("error in secret or public key callback: " + t.message));
			var c, f = "" !== a[2].trim();
			if (!f && n) return i(new Fe("jwt signature is required"));
			if (f && !n) return i(new Fe("secret or public key must be provided"));
			if (f || r.algorithms || (r.algorithms = ["none"]), r.algorithms || (r.algorithms = ~n.toString().indexOf(
					"BEGIN CERTIFICATE") || ~n.toString().indexOf("BEGIN PUBLIC KEY") ? ot : ~n.toString().indexOf(
					"BEGIN RSA PUBLIC KEY") ? st : at), !~r.algorithms.indexOf(s.header.alg)) return i(new Fe("invalid algorithm"));
			try {
				c = qe.verify(e, s.header.alg, n)
			} catch (e) {
				return i(e)
			}
			if (!c) return i(new Fe("invalid signature"));
			var d = s.payload;
			if (void 0 !== d.nbf && !r.ignoreNotBefore) {
				if ("number" != typeof d.nbf) return i(new Fe("invalid nbf value"));
				if (d.nbf > o + (r.clockTolerance || 0)) return i(new Je("jwt not active", new Date(1e3 * d.nbf)))
			}
			if (void 0 !== d.exp && !r.ignoreExpiration) {
				if ("number" != typeof d.exp) return i(new Fe("invalid exp value"));
				if (o >= d.exp + (r.clockTolerance || 0)) return i(new We("jwt expired", new Date(1e3 * d.exp)))
			}
			if (r.audience) {
				var l = Array.isArray(r.audience) ? r.audience : [r.audience];
				if (!(Array.isArray(d.aud) ? d.aud : [d.aud]).some((function(e) {
						return l.some((function(t) {
							return t instanceof RegExp ? t.test(e) : t === e
						}))
					}))) return i(new Fe("jwt audience invalid. expected: " + l.join(" or ")))
			}
			if (r.issuer && ("string" == typeof r.issuer && d.iss !== r.issuer || Array.isArray(r.issuer) && -1 === r.issuer.indexOf(
					d.iss))) return i(new Fe("jwt issuer invalid. expected: " + r.issuer));
			if (r.subject && d.sub !== r.subject) return i(new Fe("jwt subject invalid. expected: " + r.subject));
			if (r.jwtid && d.jti !== r.jwtid) return i(new Fe("jwt jwtid invalid. expected: " + r.jwtid));
			if (r.nonce && d.nonce !== r.nonce) return i(new Fe("jwt nonce invalid. expected: " + r.nonce));
			if (r.maxAge) {
				if ("number" != typeof d.iat) return i(new Fe("iat required when maxAge is specified"));
				var p = rt(r.maxAge, d.iat);
				if (void 0 === p) return i(new Fe(
					'"maxAge" should be a number of seconds or string representing a timespan eg: "1d", "20h", 60'));
				if (o >= p + (r.clockTolerance || 0)) return i(new We("maxAge exceeded", new Date(1e3 * p)))
			}
			if (!0 === r.complete) {
				var m = s.signature;
				return i(null, {
					header: u,
					payload: d,
					signature: m
				})
			}
			return i(null, d)
		}))
	},
	yr = function(e, t, r, n) {
		"function" == typeof r ? (n = r, r = {}) : r = r || {};
		var i = "object" == typeof e && !Buffer.isBuffer(e),
			o = Object.assign({
				alg: r.algorithm || "HS256",
				typ: i ? "JWT" : void 0,
				kid: r.keyid
			}, r.header);

		function s(e) {
			if (n) return n(e);
			throw e
		}
		if (!t && "none" !== r.algorithm) return s(new Error("secretOrPrivateKey must have a value"));
		if (void 0 === e) return s(new Error("payload is required"));
		if (i) {
			try {
				! function(e) {
					pr(lr, !0, e, "payload")
				}(e)
			} catch (e) {
				return s(e)
			}
			r.mutatePayload || (e = Object.assign({}, e))
		} else {
			var a = hr.filter((function(e) {
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
				pr(dr, !1, e, "options")
			}(r)
		} catch (e) {
			return s(e)
		}
		var c = e.iat || Math.floor(Date.now() / 1e3);
		if (r.noTimestamp ? delete e.iat : i && (e.iat = c), void 0 !== r.notBefore) {
			try {
				e.nbf = rt(r.notBefore, c)
			} catch (e) {
				return s(e)
			}
			if (void 0 === e.nbf) return s(new Error(
				'"notBefore" should be a number of seconds or string representing a timespan eg: "1d", "20h", 60'))
		}
		if (void 0 !== r.expiresIn && "object" == typeof e) {
			try {
				e.exp = rt(r.expiresIn, c)
			} catch (e) {
				return s(e)
			}
			if (void 0 === e.exp) return s(new Error(
				'"expiresIn" should be a number of seconds or string representing a timespan eg: "1d", "20h", 60'))
		}
		Object.keys(mr).forEach((function(t) {
			var n = mr[t];
			if (void 0 !== r[t]) {
				if (void 0 !== e[n]) return s(new Error('Bad "options.' + t + '" option. The payload already has an "' + n +
					'" property.'));
				e[n] = r[t]
			}
		}));
		var u = r.encoding || "utf8";
		if ("function" != typeof n) return qe.sign({
			header: o,
			payload: e,
			secret: t,
			encoding: u
		});
		n = n && ur(n), qe.createSign({
			header: o,
			privateKey: t,
			payload: e,
			encoding: u
		}).once("error", n).once("done", (function(e) {
			n(null, e)
		}))
	};
const wr = uniCloud.database().command;

function vr() {
	const e = n.createHash("md5"),
		t = /MicroMessenger/i.test(__ctx__.CLIENTUA) ? __ctx__.CLIENTUA.replace(/(MicroMessenger\S+).*/i, "$1") : __ctx__.CLIENTUA;
	return e.update(t), e.digest("hex")
}

function br({
	uid: e,
	needPermission: t
}) {
	const r = $(),
		n = {
			uid: e
		};
	t && (n.needPermission = t), r.bindTokenToDevice && (n.clientId = vr());
	return {
		token: yr(n, r.tokenSecret, {
			expiresIn: r.tokenExpiresIn
		}),
		tokenExpired: Date.now() + 1e3 * r.tokenExpiresIn
	}
}
async function _r(e) {
	const t = $();
	try {
		const r = gr(e, t.tokenSecret);
		if (t.bindTokenToDevice && r.clientId !== vr()) return {
			code: 30201,
			msg: "token不合法，请重新登录"
		};
		const {
			uid: n,
			needPermission: i
		} = r, o = await I.doc(n).get();
		if (!o.data || 0 === o.data.length || !o.data[0].token) return {
			code: 30202,
			msg: "token不合法，请重新登录"
		};
		const s = o.data[0];
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
		if (c.role.length > 0 && i)
			if (c.role.includes("admin")) {
				const e = await C.limit(1e4).get();
				c.permission = e.data.map(e => e.permission_id)
			} else {
				const e = await A.where({
						role_id: wr.in(c.role)
					}).get(),
					t = [];
				e.data.forEach(e => {
					Array.prototype.push.apply(t, e.permission)
				}), c.permission = x(t)
			} if (t.tokenExpiresThreshold && r.exp - Date.now() / 1e3 < t.tokenExpiresThreshold) {
			const e = br({
					uid: n,
					needPermission: i
				}),
				t = Sr(a);
			return a = a.filter(e => -1 === t.indexOf(e)), a.push(e.token), await I.doc(n).update({
				token: a
			}), { ...c,
				...e
			}
		}
		return S("checkToken payload", r), c
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

function Sr(e) {
	const t = $(),
		r = [];
	return e.forEach(e => {
		try {
			gr(e, t.tokenSecret)
		} catch (t) {
			r.push(e)
		}
	}), r
}
async function Er(e, t = {}) {
	if (1 === e.status) return {
		code: 10001,
		msg: "账号已禁用"
	};
	let r = e.token || [];
	"string" == typeof r && (r = [r]);
	const n = Sr(r);
	r = r.filter(e => -1 === n.indexOf(e));
	const {
		token: i,
		tokenExpired: o
	} = br({
		uid: e._id,
		needPermission: t.needPermission
	});
	return r.push(i), e.token = r, await I.doc(e._id).update({
		last_login_date: Date.now(),
		last_login_ip: __ctx__.CLIENTIP,
		token: r,
		...t.extraData
	}), {
		code: 0,
		user: e,
		token: i,
		tokenExpired: o,
		loginResult: {
			code: 0,
			msg: "登录成功",
			token: i,
			uid: e._id,
			username: e.username,
			type: "login",
			userInfo: e,
			tokenExpired: o
		}
	}
}
async function xr({
	name: e,
	url: t,
	data: r,
	options: n,
	defaultOptions: i
}) {
	let o = {};
	const s = b(Object.assign({}, r));
	s && s.access_token && delete s.access_token;
	try {
		n = Object.assign({}, i, n, {
			data: s
		}), o = await uniCloud.httpclient.request(t, n)
	} catch (t) {
		return function(e, t) {
			throw new c({
				code: t.code || -2,
				message: t.message || e + " fail"
			})
		}(e, t)
	}
	let a = o.data;
	const u = o.headers["content-type"];
	if (!Buffer.isBuffer(a) || 0 !== u.indexOf("text/plain") && 0 !== u.indexOf("application/json")) Buffer.isBuffer(a) &&
		(a = {
			buffer: a,
			contentType: u
		});
	else try {
		a = JSON.parse(a.toString())
	} catch (e) {
		a = a.toString()
	}
	return v(function(e, t) {
		if (t.errcode) throw new c({
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

function jr(e, t) {
	let r = "";
	if (t && t.accessToken) {
		r = `${e.indexOf("?")>-1?"&":"?"}access_token=${t.accessToken}`
	}
	return `${e}${r}`
}
class kr {
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
		const i = {
			method: "GET",
			dataType: "json",
			dataAsQueryString: !0,
			timeout: this.options.timeout
		};
		return await xr({
			name: "auth." + e,
			url: `${this.options.baseUrl}${jr(t,r)}`,
			data: r,
			options: n,
			defaultOptions: i
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
const Pr = {
	RSA: "RSA-SHA1",
	RSA2: "RSA-SHA256"
};
var Or = {
	code2Session: {
		returnValue: {
			openid: "userId"
		}
	}
};
class Tr extends class {
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
		const i = Object.assign({
			method: e,
			appId: this.options.appId,
			charset: this.options.charset,
			version: this.options.version,
			signType: this.options.signType,
			timestamp: _((o = this.options.timeOffset, new Date(Date.now() + 6e4 * ((new Date).getTimezoneOffset() + 60 * (o ||
				0)))))
		}, t);
		var o;
		r && (i.bizContent = JSON.stringify(b(r)));
		const s = b(i),
			a = Object.keys(s).sort().map(e => {
				let t = s[e];
				return "[object String]" !== Array.prototype.toString.call(t) && (t = JSON.stringify(t)), `${e}=${t}`
			}).join("&"),
			c = n.createSign(Pr[this.options.signType]).update(a, "utf8").sign(this.options.privateKey, "base64");
		return Object.assign(s, {
			sign: c
		})
	}
	async _exec(e, t = {}, r = {}) {
		const n = this._getSign(e, t),
			{
				url: i,
				execParams: o
			} = this._formatUrl(this.options.gateway, n),
			{
				status: s,
				data: a
			} = await uniCloud.httpclient.request(i, {
				method: "POST",
				data: o,
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
						...v(f)
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
			i = JSON.parse(e).sign,
			o = n.createVerify(Pr[this.options.signType]);
		return o.update(r, "utf8"), o.verify(this.options.alipayPublicKey, i, "base64")
	}
	_getSignStr(e, t) {
		let r = e.trim();
		const n = e.indexOf(t + '"'),
			i = e.lastIndexOf('"sign"');
		return r = r.substr(n + t.length + 1), r = r.substr(0, i), r = r.replace(/^[^{]*{/g, "{"), r = r.replace(
			/\}([^}]*)$/g, "}"), r
	}
	_notifyRSACheck(e, t, r) {
		const i = Object.keys(e).sort().filter(e => e).map(t => {
			let r = e[t];
			return "[object String]" !== Array.prototype.toString.call(r) && (r = JSON.stringify(r)),
				`${t}=${decodeURIComponent(r)}`
		}).join("&");
		return n.createVerify(Pr[r]).update(i, "utf8").verify(this.options.alipayPublicKey, t, "base64")
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
		if (this._checkNotifySign(r)) return v(r);
		throw new Error("通知验签未通过")
	}
} {
	constructor(e) {
		super(e), this._protocols = Or
	}
	async code2Session(e) {
		return await this._exec("alipay.system.oauth.token", {
			grantType: "authorization_code",
			code: e
		})
	}
}
var Ir = function(e = {}) {
		return e.clientType = e.clientType || __ctx__.PLATFORM, e.appId = e.appid, e.secret = e.appsecret, k(kr, e)
	},
	Rr = function(e = {}) {
		return e.clientType = e.clientType || __ctx__.PLATFORM, e.appId = e.appid, k(Tr, e)
	};

function Ar({
	platform: e
}) {
	const t = $(e),
		r = e || __ctx__.PLATFORM;
	if (!t.oauth || !t.oauth.alipay) throw new Error(`请在公用模块uni-id的config.json或init方法中添加${r}平台支付宝登录配置项`);
	["appid", "privateKey"].forEach(e => {
		if (!t.oauth.alipay[e]) throw new Error(`请在公用模块uni-id的config.json或init方法中添加配置项：${r}.oauth.alipay.${e}`)
	});
	return Rr(t.oauth.alipay)
}
async function Cr(e, t = {}) {
	const r = (await I.add({ ...e,
			register_date: Date.now(),
			register_ip: __ctx__.CLIENTIP
		})).id,
		{
			token: n,
			tokenExpired: i
		} = br({
			uid: r,
			needPermission: t.needPermission
		});
	return await I.doc(r).update({
		token: [n]
	}), {
		token: n,
		tokenExpired: i,
		uid: r,
		type: "register"
	}
}
async function Dr(e, t = {}) {
	let r;
	const {
		my_invite_code: n
	} = e;
	if (!$().autoSetInviteCode && !n) return r = await Cr(e, t), {
		code: 0,
		msg: "注册成功",
		...r
	};
	const i = await L({
		inviteCode: n
	});
	return i.code > 0 ? i : (e.my_invite_code = i.inviteCode, r = await Cr(e, t), {
		code: 0,
		msg: "注册成功",
		...r
	})
}
const $r = uniCloud.database();
async function Br({
	mobile: e,
	email: t,
	code: r,
	expiresIn: n,
	type: i
}) {
	if (!e && !t || e && t) return {
		code: 50101,
		msg: "手机号和邮箱必须且只能给定其中一个"
	};
	r || (r = E()), n || (n = 180);
	const o = Date.now(),
		s = {
			mobile: e,
			email: t,
			type: i,
			code: r,
			state: 0,
			ip: __ctx__.CLIENTIP,
			created_at: o,
			expired_at: o + 1e3 * n
		};
	return S("addRes", await R.add(s)), {
		code: 0,
		mobile: e,
		email: t
	}
}
async function Nr({
	mobile: e,
	email: t,
	code: r,
	type: n
}) {
	if (!e && !t || e && t) return {
		code: 50201,
		msg: "手机号和邮箱必须且只能给定其中一个"
	};
	const i = $r.command,
		o = Date.now(),
		s = {
			mobile: e,
			email: t,
			type: n,
			code: r,
			state: 0,
			expired_at: i.gt(o)
		},
		a = await R.where(s).orderBy("created_at", "desc").limit(1).get();
	if (S("verifyRecord:", a), a && a.data && a.data.length > 0) {
		const e = a.data[0];
		return S("upRes", await R.doc(e._id).update({
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
	const t = $(e),
		r = e || __ctx__.PLATFORM;
	if (!t.oauth || !t.oauth.weixin) throw new Error(`请在公用模块uni-id的config.json或init方法中添加${r}平台微信登录配置项`);
	["appid", "appsecret"].forEach(e => {
		if (!t.oauth.weixin[e]) throw new Error(`请在公用模块uni-id的config.json或init方法中添加配置项：${r}.oauth.weixin.${e}`)
	});
	return Ir(t.oauth.weixin)
}
const Lr = uniCloud.database();
const Kr = uniCloud.database();
const Vr = uniCloud.database();
const qr = uniCloud.database();
const Ur = uniCloud.database().command;
const Hr = uniCloud.database();
const Fr = uniCloud.database();
const Gr = uniCloud.database();
const Jr = uniCloud.database();
const zr = uniCloud.database();
var Wr = Object.freeze({
	__proto__: null,
	getUserInfo: async function({
		uid: e,
		field: t
	}) {
		const r = {};
		if (t && t.length)
			for (let e = 0; e < t.length; e++) r[t[e]] = !0;
		let n;
		return n = t && t.length ? await I.doc(e).field(r).get() : await I.doc(e).get(), 0 === n.data.length ? {
			code: 80301,
			msg: "未查询到用户信息"
		} : {
			code: 0,
			msg: "获取用户信息成功",
			userInfo: n.data[0]
		}
	},
	resetPwd: async function({
		uid: e,
		password: t
	}) {
		return S("upRes", await I.doc(e).update({
			password: B(t),
			token: []
		})), {
			code: 0,
			msg: "密码重置成功"
		}
	},
	setAvatar: async function(e) {
		return S("setAvatar -> upRes", await I.doc(e.uid).update({
			avatar: e.avatar
		})), {
			code: 0,
			msg: "头像设置成功"
		}
	},
	updatePwd: async function(e) {
		const t = await I.doc(e.uid).get();
		if (t && t.data && t.data.length > 0) {
			const r = t.data[0].password;
			if (B(e.oldPassword) === r) {
				return S("upRes", await I.doc(t.data[0]._id).update({
					password: B(e.newPassword),
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
	},
	updateUser: async function(e) {
		const t = e.uid;
		return t ? (delete e.uid, S("update -> upRes", await I.doc(t).update(e)), {
			code: 0,
			msg: "修改成功"
		}) : {
			code: 80101,
			msg: "缺少uid参数"
		}
	},
	acceptInvite: async function({
		uid: e,
		inviteCode: t
	}) {
		const r = await I.where({
			_id: N.neq(e),
			inviter_uid: N.not(N.all([e])),
			my_invite_code: t
		}).get();
		if (1 !== r.data.length) return {
			code: 80501,
			msg: "邀请码无效"
		};
		const n = [r.data[0]._id].concat(r.data[0].inviter_uid || []),
			i = await I.doc(e).field({
				my_invite_code: !0,
				inviter_uid: !0
			}).get();
		if (0 === i.data.length) return {
			code: 80502,
			msg: "uid错误用户不存在"
		};
		if (i.data[0].inviter_uid && i.data[0].inviter_uid.length > 0) return {
			code: 80503,
			msg: "邀请码不可修改"
		};
		const o = Date.now();
		return await I.doc(e).update({
			inviter_uid: n,
			invite_time: o
		}), await I.where({
			inviter_uid: e
		}).update({
			inviter_uid: N.push(n)
		}), {
			code: 0,
			msg: "邀请码填写成功"
		}
	},
	getInvitedUser: async function({
		uid: e,
		level: t = 1,
		limit: r = 20,
		offset: n = 0,
		needTotal: i = !1
	}) {
		const o = {
			code: 0,
			msg: "获取邀请列表成功",
			invitedUser: (await I.where({
				["inviter_uid." + (t - 1)]: e
			}).field({
				_id: !0,
				username: !0,
				mobile: !0,
				invite_time: !0
			}).orderBy("invite_time", "desc").skip(n).limit(r).get()).data
		};
		if (i) {
			const r = await I.where({
				["inviter_uid." + (t - 1)]: e
			}).count();
			o.total = r.total
		}
		return o
	},
	setUserInviteCode: async function({
		uid: e,
		myInviteCode: t
	}) {
		const r = await L({
			inviteCode: t
		});
		return r.code > 0 ? r : (await I.doc(e).update({
			my_invite_code: r.inviteCode
		}), {
			code: 0,
			msg: "邀请码设置成功",
			myInviteCode: r.inviteCode
		})
	},
	loginByAlipay: async function(e) {
		let t = e;
		"string" == typeof e && (t = {
			code: e
		});
		const r = t.needPermission,
			n = t.platform || __ctx__.PLATFORM,
			{
				openid: i
			} = await Ar({
				platform: n
			}).code2Session(t.code);
		if (!i) return {
			code: 10501,
			msg: "获取openid失败"
		};
		const o = await I.where({
			ali_openid: i
		}).get();
		if (o && o.data && o.data.length > 0) {
			const e = o.data[0],
				t = await Er(e, {
					needPermission: r
				});
			if (0 !== t.code) return t;
			const {
				user: n,
				loginResult: s
			} = t;
			return { ...s,
				openid: i,
				mobileConfirmed: 1 === n.mobile_confirmed,
				emailConfirmed: 1 === n.email_confirmed
			}
		} {
			const e = {
				ali_openid: i
			};
			e.my_invite_code = t.myInviteCode;
			const n = await Dr(e, {
				needPermission: r
			});
			return 0 !== n.code ? n : { ...n,
				openid: i,
				mobileConfirmed: !1,
				emailConfirmed: !1
			}
		}
	},
	loginByEmail: async function({
		email: e,
		code: t,
		password: r,
		myInviteCode: n,
		type: i,
		needPermission: o
	}) {
		const s = await Nr({
			email: e,
			code: t,
			type: i || "login"
		});
		if (0 !== s.code) return s;
		const a = {
				email: e,
				email_confirmed: 1
			},
			c = await I.where(a).get();
		if (S("userInDB:", c), c && c.data && c.data.length > 0) {
			if ("register" === i) return {
				code: 10301,
				msg: "此邮箱已注册"
			};
			const t = c.data[0],
				r = await Er(t, {
					needPermission: o
				});
			if (0 !== r.code) return r;
			const {
				loginResult: n
			} = r;
			return { ...n,
				email: e
			}
		} {
			if ("login" === i) return {
				code: 10302,
				msg: "此邮箱尚未注册"
			};
			const t = {
				email: e,
				email_confirmed: 1
			};
			r && (t.password = B(r)), t.my_invite_code = n;
			const s = await Dr(t, {
				needPermission: o
			});
			return 0 !== s.code ? s : { ...s,
				email: e
			}
		}
	},
	loginBySms: async function({
		mobile: e,
		code: t,
		password: r,
		inviteCode: n,
		myInviteCode: i,
		type: o,
		needPermission: s
	}) {
		const a = $();
		if (a.forceInviteCode && !o) throw new Error("[loginBySms]强制使用邀请码注册时，需指明type为register还是login");
		const c = await Nr({
			mobile: e,
			code: t,
			type: o || "login"
		});
		if (0 !== c.code) return c;
		const u = {
				mobile: e,
				mobile_confirmed: 1
			},
			f = await I.where(u).get();
		if (f && f.data && f.data.length > 0) {
			if ("register" === o) return {
				code: 10201,
				msg: "此手机号已注册"
			};
			const t = f.data[0],
				r = await Er(t, {
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
			if ("login" === o) return {
				code: 10203,
				msg: "此手机号尚未注册"
			};
			const c = {
				mobile: e,
				mobile_confirmed: 1,
				register_ip: __ctx__.CLIENTIP,
				register_date: t
			};
			if (r && (c.password = B(r)), n) {
				const e = await I.where({
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
			c.my_invite_code = i;
			const u = await Dr(c, {
				needPermission: s
			});
			return 0 !== u.code ? u : { ...u,
				mobile: e
			}
		}
	},
	loginByWeixin: async function(e) {
		let t = e;
		"string" == typeof e && (t = {
			code: e
		});
		const r = t.needPermission,
			n = t.platform || __ctx__.PLATFORM,
			{
				openid: i,
				unionid: o,
				sessionKey: s
			} = await Mr({
				platform: n
			})["mp-weixin" === n ? "code2Session" : "getOauthAccessToken"](t.code);
		if (!i) return {
			code: 10401,
			msg: "获取openid失败"
		};
		const a = Lr.command,
			c = [{
				wx_openid: {
					[n]: i
				}
			}];
		o && c.push({
			wx_unionid: o
		});
		const u = await I.where(a.or(...c)).get();
		if (u && u.data && u.data.length > 0) {
			const e = u.data[0],
				t = {
					wx_openid: {
						[n]: i
					}
				};
			o && (t.wx_unionid = o);
			const a = await Er(e, {
				needPermission: r,
				extraData: t
			});
			if (0 !== a.code) return a;
			const {
				user: c,
				loginResult: f
			} = a;
			return { ...f,
				openid: i,
				unionid: o,
				sessionKey: s,
				mobileConfirmed: 1 === c.mobile_confirmed,
				emailConfirmed: 1 === c.email_confirmed
			}
		} {
			const e = {
					wx_openid: {
						[n]: i
					},
					wx_unionid: o
				},
				a = t.myInviteCode;
			e.my_invite_code = a;
			const c = await Dr(e, {
				needPermission: r
			});
			return 0 !== c.code ? c : { ...c,
				openid: i,
				unionid: o,
				sessionKey: s,
				mobileConfirmed: !1,
				emailConfirmed: !1
			}
		}
	},
	login: async function({
		username: e,
		password: t,
		queryField: r = [],
		needPermission: n
	}) {
		const i = Kr.command,
			o = [];
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
			o.push({
				[t]: e,
				...s[t]
			})
		});
		const a = await I.where(i.or(...o)).limit(1).get(),
			c = __ctx__.CLIENTIP,
			{
				passwordErrorLimit: u,
				passwordErrorRetryTime: f
			} = $();
		if (S("userInDB:", a), 0 === a.data.length) return {
			code: 10101,
			msg: "用户不存在"
		};
		const d = a.data[0],
			l = d.password;
		let p = d.login_ip_limit || [];
		p = p.filter(e => e.last_error_time > Date.now() - 1e3 * f);
		let m = p.find(e => e.ip === c);
		if (m && m.error_times >= u) return {
			code: 10103,
			msg: `密码错误次数过多，请${P(m.last_error_time+1e3*f)}再试。`
		};
		if (B(t) === l) {
			const e = p.indexOf(m);
			e > -1 && p.splice(e, 1);
			const t = {
					login_ip_limit: p
				},
				r = await Er(d, {
					needPermission: n,
					extraData: t
				});
			if (0 !== r.code) return r;
			const {
				loginResult: i
			} = r;
			return { ...i
			}
		}
		return m ? (m.error_times++, m.last_error_time = Date.now()) : (m = {
			ip: c,
			error_times: 1,
			last_error_time: Date.now()
		}, p.push(m)), await I.doc(d._id).update({
			login_ip_limit: p
		}), {
			code: 10102,
			msg: "密码错误"
		}
	},
	register: async function(e) {
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
			username: i,
			email: o,
			mobile: s,
			myInviteCode: a
		} = e, c = Vr.command, u = await I.where(c.or(...t)).get();
		if (u && u.data.length > 0) {
			const t = u.data[0];
			for (let n = 0; n < r.length; n++) {
				const i = r[n];
				let o = !0;
				if (i.extraCond && (o = Object.keys(i.extraCond).every(e => t[e] === i.extraCond[e])), t[i.name] === e[i.name] &&
					o) return {
					code: 20102,
					msg: i.desc + "已存在"
				}
			}
		}
		e.password = B(e.password), e.my_invite_code = a;
		const f = await Dr(e, {
			needPermission: n
		});
		return 0 !== f.code ? f : { ...f,
			username: i,
			email: o,
			mobile: s
		}
	},
	logout: async function(e) {
		const t = await _r(e);
		if (t.code && t.code > 0) return t;
		const r = qr.command;
		return await I.doc(t.uid).update({
			token: r.pull(e)
		}), {
			code: 0,
			msg: "退出成功"
		}
	},
	getRoleByUid: async function({
		uid: e
	}) {
		if (!e) return {
			code: "GetUserRole_UserIdError",
			msg: "用户Id不能为空"
		};
		const t = await I.doc(e).get();
		return 0 === t.data.length ? {
			code: "GetUserRole_UserNotExist",
			msg: "用户不存在"
		} : {
			code: 0,
			msg: "获取角色成功",
			role: t.data[0].role || []
		}
	},
	getPermissionByRole: async function({
		roleID: e
	}) {
		if (!e) return {
			code: "GetPermissionByRole_ParameterError",
			msg: "角色ID不能为空"
		};
		if ("admin" === e) {
			return {
				code: 0,
				msg: "获取权限成功",
				permission: (await C.limit(1e4).get()).data.map(e => e.permission_id)
			}
		}
		const t = await A.where({
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
	},
	getPermissionByUid: async function({
		uid: e
	}) {
		const t = await I.aggregate().match({
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
			permission: x(r)
		}
	},
	bindRole: async function({
		uid: e,
		roleList: t,
		reset: r = !1
	}) {
		const n = {};
		return "string" == typeof t && (t = [t]), n.role = r ? t : Ur.push(t), await I.doc(e).update(n), {
			code: 0,
			msg: "角色绑定成功"
		}
	},
	bindPermission: async function({
		roleID: e,
		permissionList: t,
		reset: r = !1
	}) {
		const n = {};
		return "string" == typeof t && (t = [t]), n.permission = r ? t : Ur.push(t), await A.where({
			role_id: e
		}).update(n), {
			code: 0,
			msg: "权限绑定成功"
		}
	},
	unbindRole: async function({
		uid: e,
		roleList: t
	}) {
		return "string" == typeof t && (t = [t]), await I.doc(e).update({
			role: Ur.pull(Ur.in(t))
		}), {
			code: 0,
			msg: "角色解绑成功"
		}
	},
	unbindPermission: async function({
		roleID: e,
		permissionList: t
	}) {
		return "string" == typeof t && (t = [t]), await A.where({
			role_id: e
		}).update({
			permission: Ur.pull(Ur.in(t))
		}), {
			code: 0,
			msg: "权限解绑成功"
		}
	},
	addRole: async function({
		roleID: e,
		roleName: t,
		comment: r,
		permission: n = []
	}) {
		return await A.add({
			role_id: e,
			role_name: t,
			comment: r,
			permission: n,
			create_date: Date.now()
		}), {
			code: 0,
			msg: "角色新增成功"
		}
	},
	addPermission: async function({
		permissionID: e,
		permissionName: t,
		comment: r
	}) {
		return await C.add({
			permission_id: e,
			permission_name: t,
			comment: r,
			create_date: Date.now()
		}), {
			code: 0,
			msg: "权限新增成功"
		}
	},
	getRoleList: async function({
		limit: e = 20,
		offset: t = 0,
		needTotal: r = !0
	}) {
		const n = {
			code: 0,
			msg: "获取角色列表成功",
			roleList: (await A.skip(t).limit(e).get()).data
		};
		if (r) {
			const {
				total: e
			} = await A.where({
				_id: Ur.exists(!0)
			}).count();
			n.total = e
		}
		return n
	},
	updateRole: async function({
		roleID: e,
		roleName: t,
		comment: r,
		permission: n
	}) {
		return e ? (await A.where({
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
	},
	deleteRole: async function({
		roleID: e
	}) {
		return await A.where({
			role_id: e
		}).remove(), await I.where({
			role: e
		}).update({
			role: Ur.pull(e)
		}), {
			code: 0,
			msg: "角色删除成功"
		}
	},
	getPermissionList: async function({
		limit: e = 20,
		offset: t = 0,
		needTotal: r = !0
	}) {
		const n = {
			code: 0,
			msg: "获取权限列表成功",
			permissionList: (await C.skip(t).limit(e).get()).data
		};
		if (r) {
			const {
				total: e
			} = await C.where({
				_id: Ur.exists(!0)
			}).count();
			n.total = e
		}
		return n
	},
	updatePermission: async function({
		permissionID: e,
		permissionName: t,
		comment: r
	}) {
		return e ? (await C.where({
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
	},
	deletePermission: async function({
		permissionID: e
	}) {
		return await C.where({
			permission_id: e
		}).remove(), await A.where({
			permission: e
		}).update({
			role: Ur.pull(e)
		}), {
			code: 0,
			msg: "权限删除成功"
		}
	},
	bindAlipay: async function({
		uid: e,
		code: t,
		platform: r
	}) {
		const n = r || __ctx__.PLATFORM,
			{
				openid: i
			} = await Ar({
				platform: n
			}).code2Session(t);
		if (!i) return {
			code: 60401,
			msg: "获取openid失败"
		};
		const o = await I.where({
			ali_openid: i
		}).get();
		return o && o.data && o.data.length > 0 ? {
			code: 60402,
			msg: "支付宝绑定失败，此账号已被绑定"
		} : (await I.doc(e).update({
			ali_openid: i
		}), {
			code: 0,
			msg: "绑定成功"
		})
	},
	bindEmail: async function({
		uid: e,
		email: t,
		code: r
	}) {
		const n = await I.where({
			email: t,
			email_confirmed: 1
		}).count();
		if (n && n.total > 0) return {
			code: 60201,
			msg: "此邮箱已被绑定"
		};
		if (r) {
			const e = await Nr({
				email: t,
				code: r,
				type: "bind"
			});
			if (0 !== e.code) return e
		}
		return S("bindEmail -> upRes", await I.doc(e).update({
			email: t,
			email_confirmed: 1
		})), {
			code: 0,
			msg: "邮箱绑定成功"
		}
	},
	bindMobile: async function({
		uid: e,
		mobile: t,
		code: r
	}) {
		const n = await I.where({
			mobile: t,
			mobile_confirmed: 1
		}).count();
		if (n && n.total > 0) return {
			code: 60101,
			msg: "此手机号已被绑定"
		};
		if (r) {
			const e = await Nr({
				mobile: t,
				code: r,
				type: "bind"
			});
			if (0 !== e.code) return e
		}
		return S("bindMobile -> upRes", await I.doc(e).update({
			mobile: t,
			mobile_confirmed: 1
		})), {
			code: 0,
			msg: "手机号码绑定成功"
		}
	},
	bindWeixin: async function({
		uid: e,
		code: t,
		platform: r
	}) {
		const n = r || __ctx__.PLATFORM,
			{
				openid: i,
				unionid: o
			} = await Mr({
				platform: n
			})["mp-weixin" === n ? "code2Session" : "getOauthAccessToken"](t);
		if (!i) return {
			code: 60301,
			msg: "获取openid失败"
		};
		const s = Hr.command,
			a = [{
				wx_openid: {
					[n]: i
				}
			}];
		o && a.push({
			wx_unionid: o
		});
		const c = await I.where(s.or(...a)).get();
		if (c && c.data && c.data.length > 0) return {
			code: 60302,
			msg: "微信绑定失败，此微信账号已被绑定"
		};
		const u = {
			wx_openid: {
				[n]: i
			}
		};
		return o && (u.wx_unionid = o), await I.doc(e).update(u), {
			code: 0,
			msg: "绑定成功"
		}
	},
	unbindAlipay: async function(e) {
		const t = Fr.command,
			r = await I.doc(e).update({
				ali_openid: t.remove()
			});
		return S("upRes:", r), 1 === r.updated ? {
			code: 0,
			msg: "支付宝解绑成功"
		} : {
			code: 70401,
			msg: "支付宝解绑失败，请稍后再试"
		}
	},
	unbindEmail: async function({
		uid: e,
		email: t,
		code: r
	}) {
		if (r) {
			const e = await Nr({
				email: t,
				code: r,
				type: "unbind"
			});
			if (0 !== e.code) return e
		}
		const n = Gr.command;
		return 1 === (await I.where({
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
	},
	unbindMobile: async function({
		uid: e,
		mobile: t,
		code: r
	}) {
		if (r) {
			const e = await Nr({
				mobile: t,
				code: r,
				type: "unbind"
			});
			if (0 !== e.code) return e
		}
		const n = Jr.command;
		return 1 === (await I.where({
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
	},
	unbindWeixin: async function(e) {
		const t = zr.command,
			r = await I.doc(e).update({
				wx_openid: t.remove(),
				wx_unionid: t.remove()
			});
		return S("upRes:", r), 1 === r.updated ? {
			code: 0,
			msg: "微信解绑成功"
		} : {
			code: 70301,
			msg: "微信解绑失败，请稍后再试"
		}
	},
	code2SessionAlipay: async function(e) {
		let t = e;
		"string" == typeof e && (t = {
			code: e
		});
		try {
			const e = t.platform || __ctx__.PLATFORM,
				r = await Ar({
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
	},
	code2SessionWeixin: async function(e) {
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
	},
	init: function(e) {
		D = e
	},
	encryptPwd: B,
	checkToken: _r,
	setVerifyCode: Br,
	verifyCode: Nr,
	sendSmsCode: async function({
		mobile: e,
		code: t,
		type: r,
		templateId: n
	}) {
		if (!e) throw new Error("手机号码不可为空");
		if (t || (t = E()), !r) throw new Error("验证码类型不可为空");
		const i = $();
		let o = i && i.service && i.service.sms;
		if (!o) throw new Error("请在config.json或init方法中配置service.sms下短信相关参数");
		o = Object.assign({
			codeExpiresIn: 300
		}, o);
		const s = ["smsKey", "smsSecret"];
		if (!n && o.name) throw new Error("不传入templateId时应在config.json或init方法内service.sms下配置name字段以正确使用uniID_code模板");
		for (let e = 0, t = s.length; e < t; e++) {
			const t = s[e];
			if (!o[t]) throw new Error("请在config.json或init方法中service.sms下配置" + t)
		}
		const {
			name: a,
			smsKey: c,
			smsSecret: u,
			codeExpiresIn: f
		} = o;
		let d;
		switch (r) {
			case "login":
				d = "登录";
				break;
			default:
				d = "验证手机号"
		}
		try {
			const i = {
				name: a,
				code: t,
				action: d,
				expMinute: "" + Math.round(f / 60)
			};
			a && (i.name = a), await uniCloud.sendSms({
				smsKey: c,
				smsSecret: u,
				phone: e,
				templateId: n || "uniID_code",
				data: i
			});
			const o = await Br({
				mobile: e,
				code: t,
				expiresIn: f,
				type: r
			});
			return o.code >= 0 ? o : {
				code: 0,
				msg: "验证码发送成功"
			}
		} catch (e) {
			return {
				code: 50301,
				msg: "验证码发送失败, " + e.message
			}
		}
	}
});
const Zr = ["init", "encryptPwd"],
	Yr = {};
for (const e in Wr) Zr.indexOf(e) > -1 ? Yr[e] = Wr[e] : Yr[e] = O(Wr[e]);
module.exports = Yr;
