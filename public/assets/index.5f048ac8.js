const Jo = function () {
  const t = document.createElement("link").relList
  if (t && t.supports && t.supports("modulepreload")) return
  for (const r of document.querySelectorAll('link[rel="modulepreload"]')) s(r)
  new MutationObserver(r => {
    for (const i of r)
      if (i.type === "childList")
        for (const o of i.addedNodes)
          o.tagName === "LINK" && o.rel === "modulepreload" && s(o)
  }).observe(document, { childList: !0, subtree: !0 })
  function n(r) {
    const i = {}
    return (
      r.integrity && (i.integrity = r.integrity),
      r.referrerpolicy && (i.referrerPolicy = r.referrerpolicy),
      r.crossorigin === "use-credentials"
        ? (i.credentials = "include")
        : r.crossorigin === "anonymous"
        ? (i.credentials = "omit")
        : (i.credentials = "same-origin"),
      i
    )
  }
  function s(r) {
    if (r.ep) return
    r.ep = !0
    const i = n(r)
    fetch(r.href, i)
  }
}
Jo()
function $s(e, t) {
  const n = Object.create(null),
    s = e.split(",")
  for (let r = 0; r < s.length; r++) n[s[r]] = !0
  return t ? r => !!n[r.toLowerCase()] : r => !!n[r]
}
const Xo =
    "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",
  Qo = $s(Xo)
function hi(e) {
  return !!e || e === ""
}
function Hs(e) {
  if (F(e)) {
    const t = {}
    for (let n = 0; n < e.length; n++) {
      const s = e[n],
        r = me(s) ? ec(s) : Hs(s)
      if (r) for (const i in r) t[i] = r[i]
    }
    return t
  } else {
    if (me(e)) return e
    if (ge(e)) return e
  }
}
const Zo = /;(?![^(]*\))/g,
  Go = /:(.+)/
function ec(e) {
  const t = {}
  return (
    e.split(Zo).forEach(n => {
      if (n) {
        const s = n.split(Go)
        s.length > 1 && (t[s[0].trim()] = s[1].trim())
      }
    }),
    t
  )
}
function Fn(e) {
  let t = ""
  if (me(e)) t = e
  else if (F(e))
    for (let n = 0; n < e.length; n++) {
      const s = Fn(e[n])
      s && (t += s + " ")
    }
  else if (ge(e)) for (const n in e) e[n] && (t += n + " ")
  return t.trim()
}
const tc = e =>
    me(e)
      ? e
      : e == null
      ? ""
      : F(e) || (ge(e) && (e.toString === mi || !U(e.toString)))
      ? JSON.stringify(e, di, 2)
      : String(e),
  di = (e, t) =>
    t && t.__v_isRef
      ? di(e, t.value)
      : Nt(t)
      ? {
          [`Map(${t.size})`]: [...t.entries()].reduce(
            (n, [s, r]) => ((n[`${s} =>`] = r), n),
            {}
          ),
        }
      : pi(t)
      ? { [`Set(${t.size})`]: [...t.values()] }
      : ge(t) && !F(t) && !yi(t)
      ? String(t)
      : t,
  re = {},
  kt = [],
  qe = () => {},
  nc = () => !1,
  sc = /^on[^a-z]/,
  $n = e => sc.test(e),
  Us = e => e.startsWith("onUpdate:"),
  _e = Object.assign,
  Ds = (e, t) => {
    const n = e.indexOf(t)
    n > -1 && e.splice(n, 1)
  },
  rc = Object.prototype.hasOwnProperty,
  W = (e, t) => rc.call(e, t),
  F = Array.isArray,
  Nt = e => Hn(e) === "[object Map]",
  pi = e => Hn(e) === "[object Set]",
  U = e => typeof e == "function",
  me = e => typeof e == "string",
  Ks = e => typeof e == "symbol",
  ge = e => e !== null && typeof e == "object",
  gi = e => ge(e) && U(e.then) && U(e.catch),
  mi = Object.prototype.toString,
  Hn = e => mi.call(e),
  ic = e => Hn(e).slice(8, -1),
  yi = e => Hn(e) === "[object Object]",
  js = e => me(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e,
  Cn = $s(
    ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
  ),
  Un = e => {
    const t = Object.create(null)
    return n => t[n] || (t[n] = e(n))
  },
  oc = /-(\w)/g,
  Lt = Un(e => e.replace(oc, (t, n) => (n ? n.toUpperCase() : ""))),
  cc = /\B([A-Z])/g,
  Ht = Un(e => e.replace(cc, "-$1").toLowerCase()),
  _i = Un(e => e.charAt(0).toUpperCase() + e.slice(1)),
  ns = Un(e => (e ? `on${_i(e)}` : "")),
  rn = (e, t) => !Object.is(e, t),
  xn = (e, t) => {
    for (let n = 0; n < e.length; n++) e[n](t)
  },
  kn = (e, t, n) => {
    Object.defineProperty(e, t, { configurable: !0, enumerable: !1, value: n })
  },
  as = e => {
    const t = parseFloat(e)
    return isNaN(t) ? e : t
  }
let pr
const lc = () =>
  pr ||
  (pr =
    typeof globalThis != "undefined"
      ? globalThis
      : typeof self != "undefined"
      ? self
      : typeof window != "undefined"
      ? window
      : typeof global != "undefined"
      ? global
      : {})
let Ke
class bi {
  constructor(t = !1) {
    ;(this.active = !0),
      (this.effects = []),
      (this.cleanups = []),
      !t &&
        Ke &&
        ((this.parent = Ke),
        (this.index = (Ke.scopes || (Ke.scopes = [])).push(this) - 1))
  }
  run(t) {
    if (this.active) {
      const n = Ke
      try {
        return (Ke = this), t()
      } finally {
        Ke = n
      }
    }
  }
  on() {
    Ke = this
  }
  off() {
    Ke = this.parent
  }
  stop(t) {
    if (this.active) {
      let n, s
      for (n = 0, s = this.effects.length; n < s; n++) this.effects[n].stop()
      for (n = 0, s = this.cleanups.length; n < s; n++) this.cleanups[n]()
      if (this.scopes)
        for (n = 0, s = this.scopes.length; n < s; n++) this.scopes[n].stop(!0)
      if (this.parent && !t) {
        const r = this.parent.scopes.pop()
        r &&
          r !== this &&
          ((this.parent.scopes[this.index] = r), (r.index = this.index))
      }
      this.active = !1
    }
  }
}
function vi(e) {
  return new bi(e)
}
function uc(e, t = Ke) {
  t && t.active && t.effects.push(e)
}
const qs = e => {
    const t = new Set(e)
    return (t.w = 0), (t.n = 0), t
  },
  wi = e => (e.w & ft) > 0,
  Ei = e => (e.n & ft) > 0,
  ac = ({ deps: e }) => {
    if (e.length) for (let t = 0; t < e.length; t++) e[t].w |= ft
  },
  fc = e => {
    const { deps: t } = e
    if (t.length) {
      let n = 0
      for (let s = 0; s < t.length; s++) {
        const r = t[s]
        wi(r) && !Ei(r) ? r.delete(e) : (t[n++] = r), (r.w &= ~ft), (r.n &= ~ft)
      }
      t.length = n
    }
  },
  fs = new WeakMap()
let Yt = 0,
  ft = 1
const hs = 30
let Le
const bt = Symbol(""),
  ds = Symbol("")
class Vs {
  constructor(t, n = null, s) {
    ;(this.fn = t),
      (this.scheduler = n),
      (this.active = !0),
      (this.deps = []),
      (this.parent = void 0),
      uc(this, s)
  }
  run() {
    if (!this.active) return this.fn()
    let t = Le,
      n = lt
    for (; t; ) {
      if (t === this) return
      t = t.parent
    }
    try {
      return (
        (this.parent = Le),
        (Le = this),
        (lt = !0),
        (ft = 1 << ++Yt),
        Yt <= hs ? ac(this) : gr(this),
        this.fn()
      )
    } finally {
      Yt <= hs && fc(this),
        (ft = 1 << --Yt),
        (Le = this.parent),
        (lt = n),
        (this.parent = void 0),
        this.deferStop && this.stop()
    }
  }
  stop() {
    Le === this
      ? (this.deferStop = !0)
      : this.active &&
        (gr(this), this.onStop && this.onStop(), (this.active = !1))
  }
}
function gr(e) {
  const { deps: t } = e
  if (t.length) {
    for (let n = 0; n < t.length; n++) t[n].delete(e)
    t.length = 0
  }
}
let lt = !0
const Ci = []
function Ut() {
  Ci.push(lt), (lt = !1)
}
function Dt() {
  const e = Ci.pop()
  lt = e === void 0 ? !0 : e
}
function Se(e, t, n) {
  if (lt && Le) {
    let s = fs.get(e)
    s || fs.set(e, (s = new Map()))
    let r = s.get(n)
    r || s.set(n, (r = qs())), xi(r)
  }
}
function xi(e, t) {
  let n = !1
  Yt <= hs ? Ei(e) || ((e.n |= ft), (n = !wi(e))) : (n = !e.has(Le)),
    n && (e.add(Le), Le.deps.push(e))
}
function Ge(e, t, n, s, r, i) {
  const o = fs.get(e)
  if (!o) return
  let c = []
  if (t === "clear") c = [...o.values()]
  else if (n === "length" && F(e))
    o.forEach((l, a) => {
      ;(a === "length" || a >= s) && c.push(l)
    })
  else
    switch ((n !== void 0 && c.push(o.get(n)), t)) {
      case "add":
        F(e)
          ? js(n) && c.push(o.get("length"))
          : (c.push(o.get(bt)), Nt(e) && c.push(o.get(ds)))
        break
      case "delete":
        F(e) || (c.push(o.get(bt)), Nt(e) && c.push(o.get(ds)))
        break
      case "set":
        Nt(e) && c.push(o.get(bt))
        break
    }
  if (c.length === 1) c[0] && ps(c[0])
  else {
    const l = []
    for (const a of c) a && l.push(...a)
    ps(qs(l))
  }
}
function ps(e, t) {
  const n = F(e) ? e : [...e]
  for (const s of n) s.computed && mr(s)
  for (const s of n) s.computed || mr(s)
}
function mr(e, t) {
  ;(e !== Le || e.allowRecurse) && (e.scheduler ? e.scheduler() : e.run())
}
const hc = $s("__proto__,__v_isRef,__isVue"),
  Ri = new Set(
    Object.getOwnPropertyNames(Symbol)
      .filter(e => e !== "arguments" && e !== "caller")
      .map(e => Symbol[e])
      .filter(Ks)
  ),
  dc = zs(),
  pc = zs(!1, !0),
  gc = zs(!0),
  yr = mc()
function mc() {
  const e = {}
  return (
    ["includes", "indexOf", "lastIndexOf"].forEach(t => {
      e[t] = function (...n) {
        const s = Q(this)
        for (let i = 0, o = this.length; i < o; i++) Se(s, "get", i + "")
        const r = s[t](...n)
        return r === -1 || r === !1 ? s[t](...n.map(Q)) : r
      }
    }),
    ["push", "pop", "shift", "unshift", "splice"].forEach(t => {
      e[t] = function (...n) {
        Ut()
        const s = Q(this)[t].apply(this, n)
        return Dt(), s
      }
    }),
    e
  )
}
function zs(e = !1, t = !1) {
  return function (s, r, i) {
    if (r === "__v_isReactive") return !e
    if (r === "__v_isReadonly") return e
    if (r === "__v_isShallow") return t
    if (r === "__v_raw" && i === (e ? (t ? Nc : Ti) : t ? Pi : Oi).get(s))
      return s
    const o = F(s)
    if (!e && o && W(yr, r)) return Reflect.get(yr, r, i)
    const c = Reflect.get(s, r, i)
    return (Ks(r) ? Ri.has(r) : hc(r)) || (e || Se(s, "get", r), t)
      ? c
      : ae(c)
      ? o && js(r)
        ? c
        : c.value
      : ge(c)
      ? e
        ? ki(c)
        : Kt(c)
      : c
  }
}
const yc = Ai(),
  _c = Ai(!0)
function Ai(e = !1) {
  return function (n, s, r, i) {
    let o = n[s]
    if (on(o) && ae(o) && !ae(r)) return !1
    if (
      !e &&
      !on(r) &&
      (gs(r) || ((r = Q(r)), (o = Q(o))), !F(n) && ae(o) && !ae(r))
    )
      return (o.value = r), !0
    const c = F(n) && js(s) ? Number(s) < n.length : W(n, s),
      l = Reflect.set(n, s, r, i)
    return (
      n === Q(i) && (c ? rn(r, o) && Ge(n, "set", s, r) : Ge(n, "add", s, r)), l
    )
  }
}
function bc(e, t) {
  const n = W(e, t)
  e[t]
  const s = Reflect.deleteProperty(e, t)
  return s && n && Ge(e, "delete", t, void 0), s
}
function vc(e, t) {
  const n = Reflect.has(e, t)
  return (!Ks(t) || !Ri.has(t)) && Se(e, "has", t), n
}
function wc(e) {
  return Se(e, "iterate", F(e) ? "length" : bt), Reflect.ownKeys(e)
}
const Si = { get: dc, set: yc, deleteProperty: bc, has: vc, ownKeys: wc },
  Ec = {
    get: gc,
    set(e, t) {
      return !0
    },
    deleteProperty(e, t) {
      return !0
    },
  },
  Cc = _e({}, Si, { get: pc, set: _c }),
  Ws = e => e,
  Dn = e => Reflect.getPrototypeOf(e)
function mn(e, t, n = !1, s = !1) {
  e = e.__v_raw
  const r = Q(e),
    i = Q(t)
  n || (t !== i && Se(r, "get", t), Se(r, "get", i))
  const { has: o } = Dn(r),
    c = s ? Ws : n ? Xs : cn
  if (o.call(r, t)) return c(e.get(t))
  if (o.call(r, i)) return c(e.get(i))
  e !== r && e.get(t)
}
function yn(e, t = !1) {
  const n = this.__v_raw,
    s = Q(n),
    r = Q(e)
  return (
    t || (e !== r && Se(s, "has", e), Se(s, "has", r)),
    e === r ? n.has(e) : n.has(e) || n.has(r)
  )
}
function _n(e, t = !1) {
  return (
    (e = e.__v_raw), !t && Se(Q(e), "iterate", bt), Reflect.get(e, "size", e)
  )
}
function _r(e) {
  e = Q(e)
  const t = Q(this)
  return Dn(t).has.call(t, e) || (t.add(e), Ge(t, "add", e, e)), this
}
function br(e, t) {
  t = Q(t)
  const n = Q(this),
    { has: s, get: r } = Dn(n)
  let i = s.call(n, e)
  i || ((e = Q(e)), (i = s.call(n, e)))
  const o = r.call(n, e)
  return (
    n.set(e, t), i ? rn(t, o) && Ge(n, "set", e, t) : Ge(n, "add", e, t), this
  )
}
function vr(e) {
  const t = Q(this),
    { has: n, get: s } = Dn(t)
  let r = n.call(t, e)
  r || ((e = Q(e)), (r = n.call(t, e))), s && s.call(t, e)
  const i = t.delete(e)
  return r && Ge(t, "delete", e, void 0), i
}
function wr() {
  const e = Q(this),
    t = e.size !== 0,
    n = e.clear()
  return t && Ge(e, "clear", void 0, void 0), n
}
function bn(e, t) {
  return function (s, r) {
    const i = this,
      o = i.__v_raw,
      c = Q(o),
      l = t ? Ws : e ? Xs : cn
    return (
      !e && Se(c, "iterate", bt), o.forEach((a, f) => s.call(r, l(a), l(f), i))
    )
  }
}
function vn(e, t, n) {
  return function (...s) {
    const r = this.__v_raw,
      i = Q(r),
      o = Nt(i),
      c = e === "entries" || (e === Symbol.iterator && o),
      l = e === "keys" && o,
      a = r[e](...s),
      f = n ? Ws : t ? Xs : cn
    return (
      !t && Se(i, "iterate", l ? ds : bt),
      {
        next() {
          const { value: p, done: d } = a.next()
          return d
            ? { value: p, done: d }
            : { value: c ? [f(p[0]), f(p[1])] : f(p), done: d }
        },
        [Symbol.iterator]() {
          return this
        },
      }
    )
  }
}
function tt(e) {
  return function (...t) {
    return e === "delete" ? !1 : this
  }
}
function xc() {
  const e = {
      get(i) {
        return mn(this, i)
      },
      get size() {
        return _n(this)
      },
      has: yn,
      add: _r,
      set: br,
      delete: vr,
      clear: wr,
      forEach: bn(!1, !1),
    },
    t = {
      get(i) {
        return mn(this, i, !1, !0)
      },
      get size() {
        return _n(this)
      },
      has: yn,
      add: _r,
      set: br,
      delete: vr,
      clear: wr,
      forEach: bn(!1, !0),
    },
    n = {
      get(i) {
        return mn(this, i, !0)
      },
      get size() {
        return _n(this, !0)
      },
      has(i) {
        return yn.call(this, i, !0)
      },
      add: tt("add"),
      set: tt("set"),
      delete: tt("delete"),
      clear: tt("clear"),
      forEach: bn(!0, !1),
    },
    s = {
      get(i) {
        return mn(this, i, !0, !0)
      },
      get size() {
        return _n(this, !0)
      },
      has(i) {
        return yn.call(this, i, !0)
      },
      add: tt("add"),
      set: tt("set"),
      delete: tt("delete"),
      clear: tt("clear"),
      forEach: bn(!0, !0),
    }
  return (
    ["keys", "values", "entries", Symbol.iterator].forEach(i => {
      ;(e[i] = vn(i, !1, !1)),
        (n[i] = vn(i, !0, !1)),
        (t[i] = vn(i, !1, !0)),
        (s[i] = vn(i, !0, !0))
    }),
    [e, n, t, s]
  )
}
const [Rc, Ac, Sc, Oc] = xc()
function Ys(e, t) {
  const n = t ? (e ? Oc : Sc) : e ? Ac : Rc
  return (s, r, i) =>
    r === "__v_isReactive"
      ? !e
      : r === "__v_isReadonly"
      ? e
      : r === "__v_raw"
      ? s
      : Reflect.get(W(n, r) && r in s ? n : s, r, i)
}
const Pc = { get: Ys(!1, !1) },
  Tc = { get: Ys(!1, !0) },
  kc = { get: Ys(!0, !1) },
  Oi = new WeakMap(),
  Pi = new WeakMap(),
  Ti = new WeakMap(),
  Nc = new WeakMap()
function Ic(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2
    default:
      return 0
  }
}
function Lc(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : Ic(ic(e))
}
function Kt(e) {
  return on(e) ? e : Js(e, !1, Si, Pc, Oi)
}
function Bc(e) {
  return Js(e, !1, Cc, Tc, Pi)
}
function ki(e) {
  return Js(e, !0, Ec, kc, Ti)
}
function Js(e, t, n, s, r) {
  if (!ge(e) || (e.__v_raw && !(t && e.__v_isReactive))) return e
  const i = r.get(e)
  if (i) return i
  const o = Lc(e)
  if (o === 0) return e
  const c = new Proxy(e, o === 2 ? s : n)
  return r.set(e, c), c
}
function ut(e) {
  return on(e) ? ut(e.__v_raw) : !!(e && e.__v_isReactive)
}
function on(e) {
  return !!(e && e.__v_isReadonly)
}
function gs(e) {
  return !!(e && e.__v_isShallow)
}
function Ni(e) {
  return ut(e) || on(e)
}
function Q(e) {
  const t = e && e.__v_raw
  return t ? Q(t) : e
}
function Bt(e) {
  return kn(e, "__v_skip", !0), e
}
const cn = e => (ge(e) ? Kt(e) : e),
  Xs = e => (ge(e) ? ki(e) : e)
function Ii(e) {
  lt && Le && ((e = Q(e)), xi(e.dep || (e.dep = qs())))
}
function Li(e, t) {
  ;(e = Q(e)), e.dep && ps(e.dep)
}
function ae(e) {
  return !!(e && e.__v_isRef === !0)
}
function Me(e) {
  return Bi(e, !1)
}
function Mc(e) {
  return Bi(e, !0)
}
function Bi(e, t) {
  return ae(e) ? e : new Fc(e, t)
}
class Fc {
  constructor(t, n) {
    ;(this.__v_isShallow = n),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this._rawValue = n ? t : Q(t)),
      (this._value = n ? t : cn(t))
  }
  get value() {
    return Ii(this), this._value
  }
  set value(t) {
    ;(t = this.__v_isShallow ? t : Q(t)),
      rn(t, this._rawValue) &&
        ((this._rawValue = t),
        (this._value = this.__v_isShallow ? t : cn(t)),
        Li(this))
  }
}
function vt(e) {
  return ae(e) ? e.value : e
}
const $c = {
  get: (e, t, n) => vt(Reflect.get(e, t, n)),
  set: (e, t, n, s) => {
    const r = e[t]
    return ae(r) && !ae(n) ? ((r.value = n), !0) : Reflect.set(e, t, n, s)
  },
}
function Mi(e) {
  return ut(e) ? e : new Proxy(e, $c)
}
function Hc(e) {
  const t = F(e) ? new Array(e.length) : {}
  for (const n in e) t[n] = Dc(e, n)
  return t
}
class Uc {
  constructor(t, n, s) {
    ;(this._object = t),
      (this._key = n),
      (this._defaultValue = s),
      (this.__v_isRef = !0)
  }
  get value() {
    const t = this._object[this._key]
    return t === void 0 ? this._defaultValue : t
  }
  set value(t) {
    this._object[this._key] = t
  }
}
function Dc(e, t, n) {
  const s = e[t]
  return ae(s) ? s : new Uc(e, t, n)
}
class Kc {
  constructor(t, n, s, r) {
    ;(this._setter = n),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this._dirty = !0),
      (this.effect = new Vs(t, () => {
        this._dirty || ((this._dirty = !0), Li(this))
      })),
      (this.effect.computed = this),
      (this.effect.active = this._cacheable = !r),
      (this.__v_isReadonly = s)
  }
  get value() {
    const t = Q(this)
    return (
      Ii(t),
      (t._dirty || !t._cacheable) &&
        ((t._dirty = !1), (t._value = t.effect.run())),
      t._value
    )
  }
  set value(t) {
    this._setter(t)
  }
}
function jc(e, t, n = !1) {
  let s, r
  const i = U(e)
  return (
    i ? ((s = e), (r = qe)) : ((s = e.get), (r = e.set)),
    new Kc(s, r, i || !r, n)
  )
}
function at(e, t, n, s) {
  let r
  try {
    r = s ? e(...s) : e()
  } catch (i) {
    Kn(i, t, n)
  }
  return r
}
function Te(e, t, n, s) {
  if (U(e)) {
    const i = at(e, t, n, s)
    return (
      i &&
        gi(i) &&
        i.catch(o => {
          Kn(o, t, n)
        }),
      i
    )
  }
  const r = []
  for (let i = 0; i < e.length; i++) r.push(Te(e[i], t, n, s))
  return r
}
function Kn(e, t, n, s) {
  if ((t && t.vnode, t)) {
    let r = t.parent
    const i = t.proxy,
      o = n
    for (; r; ) {
      const l = r.ec
      if (l) {
        for (let a = 0; a < l.length; a++) if (l[a](e, i, o) === !1) return
      }
      r = r.parent
    }
    const c = t.appContext.config.errorHandler
    if (c) {
      at(c, null, 10, [e, i, o])
      return
    }
  }
  qc(e)
}
function qc(e, t, n, s) {
  console.error(e)
}
let Nn = !1,
  ms = !1
const Re = []
let Xe = 0
const Qt = []
let Jt = null,
  St = 0
const Zt = []
let rt = null,
  Ot = 0
const Fi = Promise.resolve()
let Qs = null,
  ys = null
function Zs(e) {
  const t = Qs || Fi
  return e ? t.then(this ? e.bind(this) : e) : t
}
function Vc(e) {
  let t = Xe + 1,
    n = Re.length
  for (; t < n; ) {
    const s = (t + n) >>> 1
    ln(Re[s]) < e ? (t = s + 1) : (n = s)
  }
  return t
}
function $i(e) {
  ;(!Re.length || !Re.includes(e, Nn && e.allowRecurse ? Xe + 1 : Xe)) &&
    e !== ys &&
    (e.id == null ? Re.push(e) : Re.splice(Vc(e.id), 0, e), Hi())
}
function Hi() {
  !Nn && !ms && ((ms = !0), (Qs = Fi.then(Ki)))
}
function zc(e) {
  const t = Re.indexOf(e)
  t > Xe && Re.splice(t, 1)
}
function Ui(e, t, n, s) {
  F(e)
    ? n.push(...e)
    : (!t || !t.includes(e, e.allowRecurse ? s + 1 : s)) && n.push(e),
    Hi()
}
function Wc(e) {
  Ui(e, Jt, Qt, St)
}
function Yc(e) {
  Ui(e, rt, Zt, Ot)
}
function jn(e, t = null) {
  if (Qt.length) {
    for (
      ys = t, Jt = [...new Set(Qt)], Qt.length = 0, St = 0;
      St < Jt.length;
      St++
    )
      Jt[St]()
    ;(Jt = null), (St = 0), (ys = null), jn(e, t)
  }
}
function Di(e) {
  if ((jn(), Zt.length)) {
    const t = [...new Set(Zt)]
    if (((Zt.length = 0), rt)) {
      rt.push(...t)
      return
    }
    for (rt = t, rt.sort((n, s) => ln(n) - ln(s)), Ot = 0; Ot < rt.length; Ot++)
      rt[Ot]()
    ;(rt = null), (Ot = 0)
  }
}
const ln = e => (e.id == null ? 1 / 0 : e.id)
function Ki(e) {
  ;(ms = !1), (Nn = !0), jn(e), Re.sort((n, s) => ln(n) - ln(s))
  const t = qe
  try {
    for (Xe = 0; Xe < Re.length; Xe++) {
      const n = Re[Xe]
      n && n.active !== !1 && at(n, null, 14)
    }
  } finally {
    ;(Xe = 0),
      (Re.length = 0),
      Di(),
      (Nn = !1),
      (Qs = null),
      (Re.length || Qt.length || Zt.length) && Ki(e)
  }
}
function Jc(e, t, ...n) {
  if (e.isUnmounted) return
  const s = e.vnode.props || re
  let r = n
  const i = t.startsWith("update:"),
    o = i && t.slice(7)
  if (o && o in s) {
    const f = `${o === "modelValue" ? "model" : o}Modifiers`,
      { number: p, trim: d } = s[f] || re
    d && (r = n.map(b => b.trim())), p && (r = n.map(as))
  }
  let c,
    l = s[(c = ns(t))] || s[(c = ns(Lt(t)))]
  !l && i && (l = s[(c = ns(Ht(t)))]), l && Te(l, e, 6, r)
  const a = s[c + "Once"]
  if (a) {
    if (!e.emitted) e.emitted = {}
    else if (e.emitted[c]) return
    ;(e.emitted[c] = !0), Te(a, e, 6, r)
  }
}
function ji(e, t, n = !1) {
  const s = t.emitsCache,
    r = s.get(e)
  if (r !== void 0) return r
  const i = e.emits
  let o = {},
    c = !1
  if (!U(e)) {
    const l = a => {
      const f = ji(a, t, !0)
      f && ((c = !0), _e(o, f))
    }
    !n && t.mixins.length && t.mixins.forEach(l),
      e.extends && l(e.extends),
      e.mixins && e.mixins.forEach(l)
  }
  return !i && !c
    ? (s.set(e, null), null)
    : (F(i) ? i.forEach(l => (o[l] = null)) : _e(o, i), s.set(e, o), o)
}
function qn(e, t) {
  return !e || !$n(t)
    ? !1
    : ((t = t.slice(2).replace(/Once$/, "")),
      W(e, t[0].toLowerCase() + t.slice(1)) || W(e, Ht(t)) || W(e, t))
}
let Fe = null,
  Vn = null
function In(e) {
  const t = Fe
  return (Fe = e), (Vn = (e && e.type.__scopeId) || null), t
}
function Gs(e) {
  Vn = e
}
function er() {
  Vn = null
}
function Xc(e, t = Fe, n) {
  if (!t || e._n) return e
  const s = (...r) => {
    s._d && kr(-1)
    const i = In(t),
      o = e(...r)
    return In(i), s._d && kr(1), o
  }
  return (s._n = !0), (s._c = !0), (s._d = !0), s
}
function ss(e) {
  const {
    type: t,
    vnode: n,
    proxy: s,
    withProxy: r,
    props: i,
    propsOptions: [o],
    slots: c,
    attrs: l,
    emit: a,
    render: f,
    renderCache: p,
    data: d,
    setupState: b,
    ctx: x,
    inheritAttrs: N,
  } = e
  let O, S
  const M = In(e)
  try {
    if (n.shapeFlag & 4) {
      const V = r || s
      ;(O = je(f.call(V, V, p, i, b, d, x))), (S = l)
    } else {
      const V = t
      ;(O = je(
        V.length > 1 ? V(i, { attrs: l, slots: c, emit: a }) : V(i, null)
      )),
        (S = t.props ? l : Qc(l))
    }
  } catch (V) {
    ;(en.length = 0), Kn(V, e, 1), (O = Ae(Ze))
  }
  let j = O
  if (S && N !== !1) {
    const V = Object.keys(S),
      { shapeFlag: J } = j
    V.length && J & 7 && (o && V.some(Us) && (S = Zc(S, o)), (j = ht(j, S)))
  }
  return (
    n.dirs && ((j = ht(j)), (j.dirs = j.dirs ? j.dirs.concat(n.dirs) : n.dirs)),
    n.transition && (j.transition = n.transition),
    (O = j),
    In(M),
    O
  )
}
const Qc = e => {
    let t
    for (const n in e)
      (n === "class" || n === "style" || $n(n)) && ((t || (t = {}))[n] = e[n])
    return t
  },
  Zc = (e, t) => {
    const n = {}
    for (const s in e) (!Us(s) || !(s.slice(9) in t)) && (n[s] = e[s])
    return n
  }
function Gc(e, t, n) {
  const { props: s, children: r, component: i } = e,
    { props: o, children: c, patchFlag: l } = t,
    a = i.emitsOptions
  if (t.dirs || t.transition) return !0
  if (n && l >= 0) {
    if (l & 1024) return !0
    if (l & 16) return s ? Er(s, o, a) : !!o
    if (l & 8) {
      const f = t.dynamicProps
      for (let p = 0; p < f.length; p++) {
        const d = f[p]
        if (o[d] !== s[d] && !qn(a, d)) return !0
      }
    }
  } else
    return (r || c) && (!c || !c.$stable)
      ? !0
      : s === o
      ? !1
      : s
      ? o
        ? Er(s, o, a)
        : !0
      : !!o
  return !1
}
function Er(e, t, n) {
  const s = Object.keys(t)
  if (s.length !== Object.keys(e).length) return !0
  for (let r = 0; r < s.length; r++) {
    const i = s[r]
    if (t[i] !== e[i] && !qn(n, i)) return !0
  }
  return !1
}
function el({ vnode: e, parent: t }, n) {
  for (; t && t.subTree === e; ) ((e = t.vnode).el = n), (t = t.parent)
}
const tl = e => e.__isSuspense
function nl(e, t) {
  t && t.pendingBranch
    ? F(e)
      ? t.effects.push(...e)
      : t.effects.push(e)
    : Yc(e)
}
function Rn(e, t) {
  if (ye) {
    let n = ye.provides
    const s = ye.parent && ye.parent.provides
    s === n && (n = ye.provides = Object.create(s)), (n[e] = t)
  }
}
function Ve(e, t, n = !1) {
  const s = ye || Fe
  if (s) {
    const r =
      s.parent == null
        ? s.vnode.appContext && s.vnode.appContext.provides
        : s.parent.provides
    if (r && e in r) return r[e]
    if (arguments.length > 1) return n && U(t) ? t.call(s.proxy) : t
  }
}
const Cr = {}
function Gt(e, t, n) {
  return qi(e, t, n)
}
function qi(
  e,
  t,
  { immediate: n, deep: s, flush: r, onTrack: i, onTrigger: o } = re
) {
  const c = ye
  let l,
    a = !1,
    f = !1
  if (
    (ae(e)
      ? ((l = () => e.value), (a = gs(e)))
      : ut(e)
      ? ((l = () => e), (s = !0))
      : F(e)
      ? ((f = !0),
        (a = e.some(S => ut(S) || gs(S))),
        (l = () =>
          e.map(S => {
            if (ae(S)) return S.value
            if (ut(S)) return _t(S)
            if (U(S)) return at(S, c, 2)
          })))
      : U(e)
      ? t
        ? (l = () => at(e, c, 2))
        : (l = () => {
            if (!(c && c.isUnmounted)) return p && p(), Te(e, c, 3, [d])
          })
      : (l = qe),
    t && s)
  ) {
    const S = l
    l = () => _t(S())
  }
  let p,
    d = S => {
      p = O.onStop = () => {
        at(S, c, 4)
      }
    }
  if (fn)
    return (d = qe), t ? n && Te(t, c, 3, [l(), f ? [] : void 0, d]) : l(), qe
  let b = f ? [] : Cr
  const x = () => {
    if (!!O.active)
      if (t) {
        const S = O.run()
        ;(s || a || (f ? S.some((M, j) => rn(M, b[j])) : rn(S, b))) &&
          (p && p(), Te(t, c, 3, [S, b === Cr ? void 0 : b, d]), (b = S))
      } else O.run()
  }
  x.allowRecurse = !!t
  let N
  r === "sync"
    ? (N = x)
    : r === "post"
    ? (N = () => we(x, c && c.suspense))
    : (N = () => Wc(x))
  const O = new Vs(l, N)
  return (
    t
      ? n
        ? x()
        : (b = O.run())
      : r === "post"
      ? we(O.run.bind(O), c && c.suspense)
      : O.run(),
    () => {
      O.stop(), c && c.scope && Ds(c.scope.effects, O)
    }
  )
}
function sl(e, t, n) {
  const s = this.proxy,
    r = me(e) ? (e.includes(".") ? Vi(s, e) : () => s[e]) : e.bind(s, s)
  let i
  U(t) ? (i = t) : ((i = t.handler), (n = t))
  const o = ye
  Mt(this)
  const c = qi(r, i.bind(s), n)
  return o ? Mt(o) : Et(), c
}
function Vi(e, t) {
  const n = t.split(".")
  return () => {
    let s = e
    for (let r = 0; r < n.length && s; r++) s = s[n[r]]
    return s
  }
}
function _t(e, t) {
  if (!ge(e) || e.__v_skip || ((t = t || new Set()), t.has(e))) return e
  if ((t.add(e), ae(e))) _t(e.value, t)
  else if (F(e)) for (let n = 0; n < e.length; n++) _t(e[n], t)
  else if (pi(e) || Nt(e))
    e.forEach(n => {
      _t(n, t)
    })
  else if (yi(e)) for (const n in e) _t(e[n], t)
  return e
}
function rl() {
  const e = {
    isMounted: !1,
    isLeaving: !1,
    isUnmounting: !1,
    leavingVNodes: new Map(),
  }
  return (
    Qi(() => {
      e.isMounted = !0
    }),
    Zi(() => {
      e.isUnmounting = !0
    }),
    e
  )
}
const Pe = [Function, Array],
  il = {
    name: "BaseTransition",
    props: {
      mode: String,
      appear: Boolean,
      persisted: Boolean,
      onBeforeEnter: Pe,
      onEnter: Pe,
      onAfterEnter: Pe,
      onEnterCancelled: Pe,
      onBeforeLeave: Pe,
      onLeave: Pe,
      onAfterLeave: Pe,
      onLeaveCancelled: Pe,
      onBeforeAppear: Pe,
      onAppear: Pe,
      onAfterAppear: Pe,
      onAppearCancelled: Pe,
    },
    setup(e, { slots: t }) {
      const n = ir(),
        s = rl()
      let r
      return () => {
        const i = t.default && Wi(t.default(), !0)
        if (!i || !i.length) return
        let o = i[0]
        if (i.length > 1) {
          for (const N of i)
            if (N.type !== Ze) {
              o = N
              break
            }
        }
        const c = Q(e),
          { mode: l } = c
        if (s.isLeaving) return rs(o)
        const a = xr(o)
        if (!a) return rs(o)
        const f = _s(a, c, s, n)
        bs(a, f)
        const p = n.subTree,
          d = p && xr(p)
        let b = !1
        const { getTransitionKey: x } = a.type
        if (x) {
          const N = x()
          r === void 0 ? (r = N) : N !== r && ((r = N), (b = !0))
        }
        if (d && d.type !== Ze && (!mt(a, d) || b)) {
          const N = _s(d, c, s, n)
          if ((bs(d, N), l === "out-in"))
            return (
              (s.isLeaving = !0),
              (N.afterLeave = () => {
                ;(s.isLeaving = !1), n.update()
              }),
              rs(o)
            )
          l === "in-out" &&
            a.type !== Ze &&
            (N.delayLeave = (O, S, M) => {
              const j = zi(s, d)
              ;(j[String(d.key)] = d),
                (O._leaveCb = () => {
                  S(), (O._leaveCb = void 0), delete f.delayedLeave
                }),
                (f.delayedLeave = M)
            })
        }
        return o
      }
    },
  },
  ol = il
function zi(e, t) {
  const { leavingVNodes: n } = e
  let s = n.get(t.type)
  return s || ((s = Object.create(null)), n.set(t.type, s)), s
}
function _s(e, t, n, s) {
  const {
      appear: r,
      mode: i,
      persisted: o = !1,
      onBeforeEnter: c,
      onEnter: l,
      onAfterEnter: a,
      onEnterCancelled: f,
      onBeforeLeave: p,
      onLeave: d,
      onAfterLeave: b,
      onLeaveCancelled: x,
      onBeforeAppear: N,
      onAppear: O,
      onAfterAppear: S,
      onAppearCancelled: M,
    } = t,
    j = String(e.key),
    V = zi(n, e),
    J = (T, z) => {
      T && Te(T, s, 9, z)
    },
    ue = (T, z) => {
      const Z = z[1]
      J(T, z),
        F(T) ? T.every(le => le.length <= 1) && Z() : T.length <= 1 && Z()
    },
    q = {
      mode: i,
      persisted: o,
      beforeEnter(T) {
        let z = c
        if (!n.isMounted)
          if (r) z = N || c
          else return
        T._leaveCb && T._leaveCb(!0)
        const Z = V[j]
        Z && mt(e, Z) && Z.el._leaveCb && Z.el._leaveCb(), J(z, [T])
      },
      enter(T) {
        let z = l,
          Z = a,
          le = f
        if (!n.isMounted)
          if (r) (z = O || l), (Z = S || a), (le = M || f)
          else return
        let he = !1
        const Ee = (T._enterCb = ve => {
          he ||
            ((he = !0),
            ve ? J(le, [T]) : J(Z, [T]),
            q.delayedLeave && q.delayedLeave(),
            (T._enterCb = void 0))
        })
        z ? ue(z, [T, Ee]) : Ee()
      },
      leave(T, z) {
        const Z = String(e.key)
        if ((T._enterCb && T._enterCb(!0), n.isUnmounting)) return z()
        J(p, [T])
        let le = !1
        const he = (T._leaveCb = Ee => {
          le ||
            ((le = !0),
            z(),
            Ee ? J(x, [T]) : J(b, [T]),
            (T._leaveCb = void 0),
            V[Z] === e && delete V[Z])
        })
        ;(V[Z] = e), d ? ue(d, [T, he]) : he()
      },
      clone(T) {
        return _s(T, t, n, s)
      },
    }
  return q
}
function rs(e) {
  if (zn(e)) return (e = ht(e)), (e.children = null), e
}
function xr(e) {
  return zn(e) ? (e.children ? e.children[0] : void 0) : e
}
function bs(e, t) {
  e.shapeFlag & 6 && e.component
    ? bs(e.component.subTree, t)
    : e.shapeFlag & 128
    ? ((e.ssContent.transition = t.clone(e.ssContent)),
      (e.ssFallback.transition = t.clone(e.ssFallback)))
    : (e.transition = t)
}
function Wi(e, t = !1, n) {
  let s = [],
    r = 0
  for (let i = 0; i < e.length; i++) {
    let o = e[i]
    const c = n == null ? o.key : String(n) + String(o.key != null ? o.key : i)
    o.type === Ie
      ? (o.patchFlag & 128 && r++, (s = s.concat(Wi(o.children, t, c))))
      : (t || o.type !== Ze) && s.push(c != null ? ht(o, { key: c }) : o)
  }
  if (r > 1) for (let i = 0; i < s.length; i++) s[i].patchFlag = -2
  return s
}
function Yi(e) {
  return U(e) ? { setup: e, name: e.name } : e
}
const An = e => !!e.type.__asyncLoader,
  zn = e => e.type.__isKeepAlive
function cl(e, t) {
  Ji(e, "a", t)
}
function ll(e, t) {
  Ji(e, "da", t)
}
function Ji(e, t, n = ye) {
  const s =
    e.__wdc ||
    (e.__wdc = () => {
      let r = n
      for (; r; ) {
        if (r.isDeactivated) return
        r = r.parent
      }
      return e()
    })
  if ((Wn(t, s, n), n)) {
    let r = n.parent
    for (; r && r.parent; ) zn(r.parent.vnode) && ul(s, t, n, r), (r = r.parent)
  }
}
function ul(e, t, n, s) {
  const r = Wn(t, e, s, !0)
  tr(() => {
    Ds(s[t], r)
  }, n)
}
function Wn(e, t, n = ye, s = !1) {
  if (n) {
    const r = n[e] || (n[e] = []),
      i =
        t.__weh ||
        (t.__weh = (...o) => {
          if (n.isUnmounted) return
          Ut(), Mt(n)
          const c = Te(t, n, e, o)
          return Et(), Dt(), c
        })
    return s ? r.unshift(i) : r.push(i), i
  }
}
const et =
    e =>
    (t, n = ye) =>
      (!fn || e === "sp") && Wn(e, t, n),
  Xi = et("bm"),
  Qi = et("m"),
  al = et("bu"),
  fl = et("u"),
  Zi = et("bum"),
  tr = et("um"),
  hl = et("sp"),
  dl = et("rtg"),
  pl = et("rtc")
function gl(e, t = ye) {
  Wn("ec", e, t)
}
function un(e, t) {
  const n = Fe
  if (n === null) return e
  const s = Jn(n) || n.proxy,
    r = e.dirs || (e.dirs = [])
  for (let i = 0; i < t.length; i++) {
    let [o, c, l, a = re] = t[i]
    U(o) && (o = { mounted: o, updated: o }),
      o.deep && _t(c),
      r.push({
        dir: o,
        instance: s,
        value: c,
        oldValue: void 0,
        arg: l,
        modifiers: a,
      })
  }
  return e
}
function dt(e, t, n, s) {
  const r = e.dirs,
    i = t && t.dirs
  for (let o = 0; o < r.length; o++) {
    const c = r[o]
    i && (c.oldValue = i[o].value)
    let l = c.dir[s]
    l && (Ut(), Te(l, n, 8, [e.el, c, e, t]), Dt())
  }
}
const ml = Symbol()
function yl(e, t, n, s) {
  let r
  const i = n && n[s]
  if (F(e) || me(e)) {
    r = new Array(e.length)
    for (let o = 0, c = e.length; o < c; o++)
      r[o] = t(e[o], o, void 0, i && i[o])
  } else if (typeof e == "number") {
    r = new Array(e)
    for (let o = 0; o < e; o++) r[o] = t(o + 1, o, void 0, i && i[o])
  } else if (ge(e))
    if (e[Symbol.iterator])
      r = Array.from(e, (o, c) => t(o, c, void 0, i && i[c]))
    else {
      const o = Object.keys(e)
      r = new Array(o.length)
      for (let c = 0, l = o.length; c < l; c++) {
        const a = o[c]
        r[c] = t(e[a], a, c, i && i[c])
      }
    }
  else r = []
  return n && (n[s] = r), r
}
const vs = e => (e ? (ao(e) ? Jn(e) || e.proxy : vs(e.parent)) : null),
  Ln = _e(Object.create(null), {
    $: e => e,
    $el: e => e.vnode.el,
    $data: e => e.data,
    $props: e => e.props,
    $attrs: e => e.attrs,
    $slots: e => e.slots,
    $refs: e => e.refs,
    $parent: e => vs(e.parent),
    $root: e => vs(e.root),
    $emit: e => e.emit,
    $options: e => eo(e),
    $forceUpdate: e => e.f || (e.f = () => $i(e.update)),
    $nextTick: e => e.n || (e.n = Zs.bind(e.proxy)),
    $watch: e => sl.bind(e),
  }),
  _l = {
    get({ _: e }, t) {
      const {
        ctx: n,
        setupState: s,
        data: r,
        props: i,
        accessCache: o,
        type: c,
        appContext: l,
      } = e
      let a
      if (t[0] !== "$") {
        const b = o[t]
        if (b !== void 0)
          switch (b) {
            case 1:
              return s[t]
            case 2:
              return r[t]
            case 4:
              return n[t]
            case 3:
              return i[t]
          }
        else {
          if (s !== re && W(s, t)) return (o[t] = 1), s[t]
          if (r !== re && W(r, t)) return (o[t] = 2), r[t]
          if ((a = e.propsOptions[0]) && W(a, t)) return (o[t] = 3), i[t]
          if (n !== re && W(n, t)) return (o[t] = 4), n[t]
          ws && (o[t] = 0)
        }
      }
      const f = Ln[t]
      let p, d
      if (f) return t === "$attrs" && Se(e, "get", t), f(e)
      if ((p = c.__cssModules) && (p = p[t])) return p
      if (n !== re && W(n, t)) return (o[t] = 4), n[t]
      if (((d = l.config.globalProperties), W(d, t))) return d[t]
    },
    set({ _: e }, t, n) {
      const { data: s, setupState: r, ctx: i } = e
      return r !== re && W(r, t)
        ? ((r[t] = n), !0)
        : s !== re && W(s, t)
        ? ((s[t] = n), !0)
        : W(e.props, t) || (t[0] === "$" && t.slice(1) in e)
        ? !1
        : ((i[t] = n), !0)
    },
    has(
      {
        _: {
          data: e,
          setupState: t,
          accessCache: n,
          ctx: s,
          appContext: r,
          propsOptions: i,
        },
      },
      o
    ) {
      let c
      return (
        !!n[o] ||
        (e !== re && W(e, o)) ||
        (t !== re && W(t, o)) ||
        ((c = i[0]) && W(c, o)) ||
        W(s, o) ||
        W(Ln, o) ||
        W(r.config.globalProperties, o)
      )
    },
    defineProperty(e, t, n) {
      return (
        n.get != null
          ? (e._.accessCache[t] = 0)
          : W(n, "value") && this.set(e, t, n.value, null),
        Reflect.defineProperty(e, t, n)
      )
    },
  }
let ws = !0
function bl(e) {
  const t = eo(e),
    n = e.proxy,
    s = e.ctx
  ;(ws = !1), t.beforeCreate && Rr(t.beforeCreate, e, "bc")
  const {
    data: r,
    computed: i,
    methods: o,
    watch: c,
    provide: l,
    inject: a,
    created: f,
    beforeMount: p,
    mounted: d,
    beforeUpdate: b,
    updated: x,
    activated: N,
    deactivated: O,
    beforeDestroy: S,
    beforeUnmount: M,
    destroyed: j,
    unmounted: V,
    render: J,
    renderTracked: ue,
    renderTriggered: q,
    errorCaptured: T,
    serverPrefetch: z,
    expose: Z,
    inheritAttrs: le,
    components: he,
    directives: Ee,
    filters: ve,
  } = t
  if ((a && vl(a, s, null, e.appContext.config.unwrapInjectedRef), o))
    for (const ie in o) {
      const G = o[ie]
      U(G) && (s[ie] = G.bind(n))
    }
  if (r) {
    const ie = r.call(n, n)
    ge(ie) && (e.data = Kt(ie))
  }
  if (((ws = !0), i))
    for (const ie in i) {
      const G = i[ie],
        Ce = U(G) ? G.bind(n, n) : U(G.get) ? G.get.bind(n, n) : qe,
        Ct = !U(G) && U(G.set) ? G.set.bind(n) : qe,
        Ye = Be({ get: Ce, set: Ct })
      Object.defineProperty(s, ie, {
        enumerable: !0,
        configurable: !0,
        get: () => Ye.value,
        set: He => (Ye.value = He),
      })
    }
  if (c) for (const ie in c) Gi(c[ie], s, n, ie)
  if (l) {
    const ie = U(l) ? l.call(n) : l
    Reflect.ownKeys(ie).forEach(G => {
      Rn(G, ie[G])
    })
  }
  f && Rr(f, e, "c")
  function pe(ie, G) {
    F(G) ? G.forEach(Ce => ie(Ce.bind(n))) : G && ie(G.bind(n))
  }
  if (
    (pe(Xi, p),
    pe(Qi, d),
    pe(al, b),
    pe(fl, x),
    pe(cl, N),
    pe(ll, O),
    pe(gl, T),
    pe(pl, ue),
    pe(dl, q),
    pe(Zi, M),
    pe(tr, V),
    pe(hl, z),
    F(Z))
  )
    if (Z.length) {
      const ie = e.exposed || (e.exposed = {})
      Z.forEach(G => {
        Object.defineProperty(ie, G, {
          get: () => n[G],
          set: Ce => (n[G] = Ce),
        })
      })
    } else e.exposed || (e.exposed = {})
  J && e.render === qe && (e.render = J),
    le != null && (e.inheritAttrs = le),
    he && (e.components = he),
    Ee && (e.directives = Ee)
}
function vl(e, t, n, s = !1) {
  F(e) && (e = Es(e))
  for (const r in e) {
    const i = e[r]
    let o
    ge(i)
      ? "default" in i
        ? (o = Ve(i.from || r, i.default, !0))
        : (o = Ve(i.from || r))
      : (o = Ve(i)),
      ae(o) && s
        ? Object.defineProperty(t, r, {
            enumerable: !0,
            configurable: !0,
            get: () => o.value,
            set: c => (o.value = c),
          })
        : (t[r] = o)
  }
}
function Rr(e, t, n) {
  Te(F(e) ? e.map(s => s.bind(t.proxy)) : e.bind(t.proxy), t, n)
}
function Gi(e, t, n, s) {
  const r = s.includes(".") ? Vi(n, s) : () => n[s]
  if (me(e)) {
    const i = t[e]
    U(i) && Gt(r, i)
  } else if (U(e)) Gt(r, e.bind(n))
  else if (ge(e))
    if (F(e)) e.forEach(i => Gi(i, t, n, s))
    else {
      const i = U(e.handler) ? e.handler.bind(n) : t[e.handler]
      U(i) && Gt(r, i, e)
    }
}
function eo(e) {
  const t = e.type,
    { mixins: n, extends: s } = t,
    {
      mixins: r,
      optionsCache: i,
      config: { optionMergeStrategies: o },
    } = e.appContext,
    c = i.get(t)
  let l
  return (
    c
      ? (l = c)
      : !r.length && !n && !s
      ? (l = t)
      : ((l = {}), r.length && r.forEach(a => Bn(l, a, o, !0)), Bn(l, t, o)),
    i.set(t, l),
    l
  )
}
function Bn(e, t, n, s = !1) {
  const { mixins: r, extends: i } = t
  i && Bn(e, i, n, !0), r && r.forEach(o => Bn(e, o, n, !0))
  for (const o in t)
    if (!(s && o === "expose")) {
      const c = wl[o] || (n && n[o])
      e[o] = c ? c(e[o], t[o]) : t[o]
    }
  return e
}
const wl = {
  data: Ar,
  props: gt,
  emits: gt,
  methods: gt,
  computed: gt,
  beforeCreate: be,
  created: be,
  beforeMount: be,
  mounted: be,
  beforeUpdate: be,
  updated: be,
  beforeDestroy: be,
  beforeUnmount: be,
  destroyed: be,
  unmounted: be,
  activated: be,
  deactivated: be,
  errorCaptured: be,
  serverPrefetch: be,
  components: gt,
  directives: gt,
  watch: Cl,
  provide: Ar,
  inject: El,
}
function Ar(e, t) {
  return t
    ? e
      ? function () {
          return _e(
            U(e) ? e.call(this, this) : e,
            U(t) ? t.call(this, this) : t
          )
        }
      : t
    : e
}
function El(e, t) {
  return gt(Es(e), Es(t))
}
function Es(e) {
  if (F(e)) {
    const t = {}
    for (let n = 0; n < e.length; n++) t[e[n]] = e[n]
    return t
  }
  return e
}
function be(e, t) {
  return e ? [...new Set([].concat(e, t))] : t
}
function gt(e, t) {
  return e ? _e(_e(Object.create(null), e), t) : t
}
function Cl(e, t) {
  if (!e) return t
  if (!t) return e
  const n = _e(Object.create(null), e)
  for (const s in t) n[s] = be(e[s], t[s])
  return n
}
function xl(e, t, n, s = !1) {
  const r = {},
    i = {}
  kn(i, Yn, 1), (e.propsDefaults = Object.create(null)), to(e, t, r, i)
  for (const o in e.propsOptions[0]) o in r || (r[o] = void 0)
  n ? (e.props = s ? r : Bc(r)) : e.type.props ? (e.props = r) : (e.props = i),
    (e.attrs = i)
}
function Rl(e, t, n, s) {
  const {
      props: r,
      attrs: i,
      vnode: { patchFlag: o },
    } = e,
    c = Q(r),
    [l] = e.propsOptions
  let a = !1
  if ((s || o > 0) && !(o & 16)) {
    if (o & 8) {
      const f = e.vnode.dynamicProps
      for (let p = 0; p < f.length; p++) {
        let d = f[p]
        if (qn(e.emitsOptions, d)) continue
        const b = t[d]
        if (l)
          if (W(i, d)) b !== i[d] && ((i[d] = b), (a = !0))
          else {
            const x = Lt(d)
            r[x] = Cs(l, c, x, b, e, !1)
          }
        else b !== i[d] && ((i[d] = b), (a = !0))
      }
    }
  } else {
    to(e, t, r, i) && (a = !0)
    let f
    for (const p in c)
      (!t || (!W(t, p) && ((f = Ht(p)) === p || !W(t, f)))) &&
        (l
          ? n &&
            (n[p] !== void 0 || n[f] !== void 0) &&
            (r[p] = Cs(l, c, p, void 0, e, !0))
          : delete r[p])
    if (i !== c)
      for (const p in i) (!t || (!W(t, p) && !0)) && (delete i[p], (a = !0))
  }
  a && Ge(e, "set", "$attrs")
}
function to(e, t, n, s) {
  const [r, i] = e.propsOptions
  let o = !1,
    c
  if (t)
    for (let l in t) {
      if (Cn(l)) continue
      const a = t[l]
      let f
      r && W(r, (f = Lt(l)))
        ? !i || !i.includes(f)
          ? (n[f] = a)
          : ((c || (c = {}))[f] = a)
        : qn(e.emitsOptions, l) ||
          ((!(l in s) || a !== s[l]) && ((s[l] = a), (o = !0)))
    }
  if (i) {
    const l = Q(n),
      a = c || re
    for (let f = 0; f < i.length; f++) {
      const p = i[f]
      n[p] = Cs(r, l, p, a[p], e, !W(a, p))
    }
  }
  return o
}
function Cs(e, t, n, s, r, i) {
  const o = e[n]
  if (o != null) {
    const c = W(o, "default")
    if (c && s === void 0) {
      const l = o.default
      if (o.type !== Function && U(l)) {
        const { propsDefaults: a } = r
        n in a ? (s = a[n]) : (Mt(r), (s = a[n] = l.call(null, t)), Et())
      } else s = l
    }
    o[0] && (i && !c ? (s = !1) : o[1] && (s === "" || s === Ht(n)) && (s = !0))
  }
  return s
}
function no(e, t, n = !1) {
  const s = t.propsCache,
    r = s.get(e)
  if (r) return r
  const i = e.props,
    o = {},
    c = []
  let l = !1
  if (!U(e)) {
    const f = p => {
      l = !0
      const [d, b] = no(p, t, !0)
      _e(o, d), b && c.push(...b)
    }
    !n && t.mixins.length && t.mixins.forEach(f),
      e.extends && f(e.extends),
      e.mixins && e.mixins.forEach(f)
  }
  if (!i && !l) return s.set(e, kt), kt
  if (F(i))
    for (let f = 0; f < i.length; f++) {
      const p = Lt(i[f])
      Sr(p) && (o[p] = re)
    }
  else if (i)
    for (const f in i) {
      const p = Lt(f)
      if (Sr(p)) {
        const d = i[f],
          b = (o[p] = F(d) || U(d) ? { type: d } : d)
        if (b) {
          const x = Tr(Boolean, b.type),
            N = Tr(String, b.type)
          ;(b[0] = x > -1),
            (b[1] = N < 0 || x < N),
            (x > -1 || W(b, "default")) && c.push(p)
        }
      }
    }
  const a = [o, c]
  return s.set(e, a), a
}
function Sr(e) {
  return e[0] !== "$"
}
function Or(e) {
  const t = e && e.toString().match(/^\s*function (\w+)/)
  return t ? t[1] : e === null ? "null" : ""
}
function Pr(e, t) {
  return Or(e) === Or(t)
}
function Tr(e, t) {
  return F(t) ? t.findIndex(n => Pr(n, e)) : U(t) && Pr(t, e) ? 0 : -1
}
const so = e => e[0] === "_" || e === "$stable",
  nr = e => (F(e) ? e.map(je) : [je(e)]),
  Al = (e, t, n) => {
    if (t._n) return t
    const s = Xc((...r) => nr(t(...r)), n)
    return (s._c = !1), s
  },
  ro = (e, t, n) => {
    const s = e._ctx
    for (const r in e) {
      if (so(r)) continue
      const i = e[r]
      if (U(i)) t[r] = Al(r, i, s)
      else if (i != null) {
        const o = nr(i)
        t[r] = () => o
      }
    }
  },
  io = (e, t) => {
    const n = nr(t)
    e.slots.default = () => n
  },
  Sl = (e, t) => {
    if (e.vnode.shapeFlag & 32) {
      const n = t._
      n ? ((e.slots = Q(t)), kn(t, "_", n)) : ro(t, (e.slots = {}))
    } else (e.slots = {}), t && io(e, t)
    kn(e.slots, Yn, 1)
  },
  Ol = (e, t, n) => {
    const { vnode: s, slots: r } = e
    let i = !0,
      o = re
    if (s.shapeFlag & 32) {
      const c = t._
      c
        ? n && c === 1
          ? (i = !1)
          : (_e(r, t), !n && c === 1 && delete r._)
        : ((i = !t.$stable), ro(t, r)),
        (o = t)
    } else t && (io(e, t), (o = { default: 1 }))
    if (i) for (const c in r) !so(c) && !(c in o) && delete r[c]
  }
function oo() {
  return {
    app: null,
    config: {
      isNativeTag: nc,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {},
    },
    mixins: [],
    components: {},
    directives: {},
    provides: Object.create(null),
    optionsCache: new WeakMap(),
    propsCache: new WeakMap(),
    emitsCache: new WeakMap(),
  }
}
let Pl = 0
function Tl(e, t) {
  return function (s, r = null) {
    U(s) || (s = Object.assign({}, s)), r != null && !ge(r) && (r = null)
    const i = oo(),
      o = new Set()
    let c = !1
    const l = (i.app = {
      _uid: Pl++,
      _component: s,
      _props: r,
      _container: null,
      _context: i,
      _instance: null,
      version: Jl,
      get config() {
        return i.config
      },
      set config(a) {},
      use(a, ...f) {
        return (
          o.has(a) ||
            (a && U(a.install)
              ? (o.add(a), a.install(l, ...f))
              : U(a) && (o.add(a), a(l, ...f))),
          l
        )
      },
      mixin(a) {
        return i.mixins.includes(a) || i.mixins.push(a), l
      },
      component(a, f) {
        return f ? ((i.components[a] = f), l) : i.components[a]
      },
      directive(a, f) {
        return f ? ((i.directives[a] = f), l) : i.directives[a]
      },
      mount(a, f, p) {
        if (!c) {
          const d = Ae(s, r)
          return (
            (d.appContext = i),
            f && t ? t(d, a) : e(d, a, p),
            (c = !0),
            (l._container = a),
            (a.__vue_app__ = l),
            Jn(d.component) || d.component.proxy
          )
        }
      },
      unmount() {
        c && (e(null, l._container), delete l._container.__vue_app__)
      },
      provide(a, f) {
        return (i.provides[a] = f), l
      },
    })
    return l
  }
}
function xs(e, t, n, s, r = !1) {
  if (F(e)) {
    e.forEach((d, b) => xs(d, t && (F(t) ? t[b] : t), n, s, r))
    return
  }
  if (An(s) && !r) return
  const i = s.shapeFlag & 4 ? Jn(s.component) || s.component.proxy : s.el,
    o = r ? null : i,
    { i: c, r: l } = e,
    a = t && t.r,
    f = c.refs === re ? (c.refs = {}) : c.refs,
    p = c.setupState
  if (
    (a != null &&
      a !== l &&
      (me(a)
        ? ((f[a] = null), W(p, a) && (p[a] = null))
        : ae(a) && (a.value = null)),
    U(l))
  )
    at(l, c, 12, [o, f])
  else {
    const d = me(l),
      b = ae(l)
    if (d || b) {
      const x = () => {
        if (e.f) {
          const N = d ? f[l] : l.value
          r
            ? F(N) && Ds(N, i)
            : F(N)
            ? N.includes(i) || N.push(i)
            : d
            ? ((f[l] = [i]), W(p, l) && (p[l] = f[l]))
            : ((l.value = [i]), e.k && (f[e.k] = l.value))
        } else
          d
            ? ((f[l] = o), W(p, l) && (p[l] = o))
            : ae(l) && ((l.value = o), e.k && (f[e.k] = o))
      }
      o ? ((x.id = -1), we(x, n)) : x()
    }
  }
}
const we = nl
function kl(e) {
  return Nl(e)
}
function Nl(e, t) {
  const n = lc()
  n.__VUE__ = !0
  const {
      insert: s,
      remove: r,
      patchProp: i,
      createElement: o,
      createText: c,
      createComment: l,
      setText: a,
      setElementText: f,
      parentNode: p,
      nextSibling: d,
      setScopeId: b = qe,
      cloneNode: x,
      insertStaticContent: N,
    } = e,
    O = (
      u,
      h,
      g,
      _ = null,
      y = null,
      E = null,
      A = !1,
      w = null,
      C = !!h.dynamicChildren
    ) => {
      if (u === h) return
      u && !mt(u, h) && ((_ = I(u)), Oe(u, y, E, !0), (u = null)),
        h.patchFlag === -2 && ((C = !1), (h.dynamicChildren = null))
      const { type: v, ref: L, shapeFlag: P } = h
      switch (v) {
        case sr:
          S(u, h, g, _)
          break
        case Ze:
          M(u, h, g, _)
          break
        case is:
          u == null && j(h, g, _, A)
          break
        case Ie:
          Ee(u, h, g, _, y, E, A, w, C)
          break
        default:
          P & 1
            ? ue(u, h, g, _, y, E, A, w, C)
            : P & 6
            ? ve(u, h, g, _, y, E, A, w, C)
            : (P & 64 || P & 128) && v.process(u, h, g, _, y, E, A, w, C, oe)
      }
      L != null && y && xs(L, u && u.ref, E, h || u, !h)
    },
    S = (u, h, g, _) => {
      if (u == null) s((h.el = c(h.children)), g, _)
      else {
        const y = (h.el = u.el)
        h.children !== u.children && a(y, h.children)
      }
    },
    M = (u, h, g, _) => {
      u == null ? s((h.el = l(h.children || "")), g, _) : (h.el = u.el)
    },
    j = (u, h, g, _) => {
      ;[u.el, u.anchor] = N(u.children, h, g, _, u.el, u.anchor)
    },
    V = ({ el: u, anchor: h }, g, _) => {
      let y
      for (; u && u !== h; ) (y = d(u)), s(u, g, _), (u = y)
      s(h, g, _)
    },
    J = ({ el: u, anchor: h }) => {
      let g
      for (; u && u !== h; ) (g = d(u)), r(u), (u = g)
      r(h)
    },
    ue = (u, h, g, _, y, E, A, w, C) => {
      ;(A = A || h.type === "svg"),
        u == null ? q(h, g, _, y, E, A, w, C) : Z(u, h, y, E, A, w, C)
    },
    q = (u, h, g, _, y, E, A, w) => {
      let C, v
      const {
        type: L,
        props: P,
        shapeFlag: B,
        transition: $,
        patchFlag: X,
        dirs: te,
      } = u
      if (u.el && x !== void 0 && X === -1) C = u.el = x(u.el)
      else {
        if (
          ((C = u.el = o(u.type, E, P && P.is, P)),
          B & 8
            ? f(C, u.children)
            : B & 16 &&
              z(u.children, C, null, _, y, E && L !== "foreignObject", A, w),
          te && dt(u, null, _, "created"),
          P)
        ) {
          for (const ce in P)
            ce !== "value" &&
              !Cn(ce) &&
              i(C, ce, null, P[ce], E, u.children, _, y, R)
          "value" in P && i(C, "value", null, P.value),
            (v = P.onVnodeBeforeMount) && De(v, _, u)
        }
        T(C, u, u.scopeId, A, _)
      }
      te && dt(u, null, _, "beforeMount")
      const ne = (!y || (y && !y.pendingBranch)) && $ && !$.persisted
      ne && $.beforeEnter(C),
        s(C, h, g),
        ((v = P && P.onVnodeMounted) || ne || te) &&
          we(() => {
            v && De(v, _, u), ne && $.enter(C), te && dt(u, null, _, "mounted")
          }, y)
    },
    T = (u, h, g, _, y) => {
      if ((g && b(u, g), _)) for (let E = 0; E < _.length; E++) b(u, _[E])
      if (y) {
        let E = y.subTree
        if (h === E) {
          const A = y.vnode
          T(u, A, A.scopeId, A.slotScopeIds, y.parent)
        }
      }
    },
    z = (u, h, g, _, y, E, A, w, C = 0) => {
      for (let v = C; v < u.length; v++) {
        const L = (u[v] = w ? it(u[v]) : je(u[v]))
        O(null, L, h, g, _, y, E, A, w)
      }
    },
    Z = (u, h, g, _, y, E, A) => {
      const w = (h.el = u.el)
      let { patchFlag: C, dynamicChildren: v, dirs: L } = h
      C |= u.patchFlag & 16
      const P = u.props || re,
        B = h.props || re
      let $
      g && pt(g, !1),
        ($ = B.onVnodeBeforeUpdate) && De($, g, h, u),
        L && dt(h, u, g, "beforeUpdate"),
        g && pt(g, !0)
      const X = y && h.type !== "foreignObject"
      if (
        (v
          ? le(u.dynamicChildren, v, w, g, _, X, E)
          : A || Ce(u, h, w, null, g, _, X, E, !1),
        C > 0)
      ) {
        if (C & 16) he(w, h, P, B, g, _, y)
        else if (
          (C & 2 && P.class !== B.class && i(w, "class", null, B.class, y),
          C & 4 && i(w, "style", P.style, B.style, y),
          C & 8)
        ) {
          const te = h.dynamicProps
          for (let ne = 0; ne < te.length; ne++) {
            const ce = te[ne],
              ke = P[ce],
              xt = B[ce]
            ;(xt !== ke || ce === "value") &&
              i(w, ce, ke, xt, y, u.children, g, _, R)
          }
        }
        C & 1 && u.children !== h.children && f(w, h.children)
      } else !A && v == null && he(w, h, P, B, g, _, y)
      ;(($ = B.onVnodeUpdated) || L) &&
        we(() => {
          $ && De($, g, h, u), L && dt(h, u, g, "updated")
        }, _)
    },
    le = (u, h, g, _, y, E, A) => {
      for (let w = 0; w < h.length; w++) {
        const C = u[w],
          v = h[w],
          L =
            C.el && (C.type === Ie || !mt(C, v) || C.shapeFlag & 70)
              ? p(C.el)
              : g
        O(C, v, L, null, _, y, E, A, !0)
      }
    },
    he = (u, h, g, _, y, E, A) => {
      if (g !== _) {
        for (const w in _) {
          if (Cn(w)) continue
          const C = _[w],
            v = g[w]
          C !== v && w !== "value" && i(u, w, v, C, A, h.children, y, E, R)
        }
        if (g !== re)
          for (const w in g)
            !Cn(w) && !(w in _) && i(u, w, g[w], null, A, h.children, y, E, R)
        "value" in _ && i(u, "value", g.value, _.value)
      }
    },
    Ee = (u, h, g, _, y, E, A, w, C) => {
      const v = (h.el = u ? u.el : c("")),
        L = (h.anchor = u ? u.anchor : c(""))
      let { patchFlag: P, dynamicChildren: B, slotScopeIds: $ } = h
      $ && (w = w ? w.concat($) : $),
        u == null
          ? (s(v, g, _), s(L, g, _), z(h.children, g, L, y, E, A, w, C))
          : P > 0 && P & 64 && B && u.dynamicChildren
          ? (le(u.dynamicChildren, B, g, y, E, A, w),
            (h.key != null || (y && h === y.subTree)) && co(u, h, !0))
          : Ce(u, h, g, L, y, E, A, w, C)
    },
    ve = (u, h, g, _, y, E, A, w, C) => {
      ;(h.slotScopeIds = w),
        u == null
          ? h.shapeFlag & 512
            ? y.ctx.activate(h, g, _, A, C)
            : de(h, g, _, y, E, A, C)
          : pe(u, h, C)
    },
    de = (u, h, g, _, y, E, A) => {
      const w = (u.component = jl(u, _, y))
      if ((zn(u) && (w.ctx.renderer = oe), ql(w), w.asyncDep)) {
        if ((y && y.registerDep(w, ie), !u.el)) {
          const C = (w.subTree = Ae(Ze))
          M(null, C, h, g)
        }
        return
      }
      ie(w, u, h, g, y, E, A)
    },
    pe = (u, h, g) => {
      const _ = (h.component = u.component)
      if (Gc(u, h, g))
        if (_.asyncDep && !_.asyncResolved) {
          G(_, h, g)
          return
        } else (_.next = h), zc(_.update), _.update()
      else (h.el = u.el), (_.vnode = h)
    },
    ie = (u, h, g, _, y, E, A) => {
      const w = () => {
          if (u.isMounted) {
            let { next: L, bu: P, u: B, parent: $, vnode: X } = u,
              te = L,
              ne
            pt(u, !1),
              L ? ((L.el = X.el), G(u, L, A)) : (L = X),
              P && xn(P),
              (ne = L.props && L.props.onVnodeBeforeUpdate) && De(ne, $, L, X),
              pt(u, !0)
            const ce = ss(u),
              ke = u.subTree
            ;(u.subTree = ce),
              O(ke, ce, p(ke.el), I(ke), u, y, E),
              (L.el = ce.el),
              te === null && el(u, ce.el),
              B && we(B, y),
              (ne = L.props && L.props.onVnodeUpdated) &&
                we(() => De(ne, $, L, X), y)
          } else {
            let L
            const { el: P, props: B } = h,
              { bm: $, m: X, parent: te } = u,
              ne = An(h)
            if (
              (pt(u, !1),
              $ && xn($),
              !ne && (L = B && B.onVnodeBeforeMount) && De(L, te, h),
              pt(u, !0),
              P && H)
            ) {
              const ce = () => {
                ;(u.subTree = ss(u)), H(P, u.subTree, u, y, null)
              }
              ne
                ? h.type.__asyncLoader().then(() => !u.isUnmounted && ce())
                : ce()
            } else {
              const ce = (u.subTree = ss(u))
              O(null, ce, g, _, u, y, E), (h.el = ce.el)
            }
            if ((X && we(X, y), !ne && (L = B && B.onVnodeMounted))) {
              const ce = h
              we(() => De(L, te, ce), y)
            }
            ;(h.shapeFlag & 256 ||
              (te && An(te.vnode) && te.vnode.shapeFlag & 256)) &&
              u.a &&
              we(u.a, y),
              (u.isMounted = !0),
              (h = g = _ = null)
          }
        },
        C = (u.effect = new Vs(w, () => $i(v), u.scope)),
        v = (u.update = () => C.run())
      ;(v.id = u.uid), pt(u, !0), v()
    },
    G = (u, h, g) => {
      h.component = u
      const _ = u.vnode.props
      ;(u.vnode = h),
        (u.next = null),
        Rl(u, h.props, _, g),
        Ol(u, h.children, g),
        Ut(),
        jn(void 0, u.update),
        Dt()
    },
    Ce = (u, h, g, _, y, E, A, w, C = !1) => {
      const v = u && u.children,
        L = u ? u.shapeFlag : 0,
        P = h.children,
        { patchFlag: B, shapeFlag: $ } = h
      if (B > 0) {
        if (B & 128) {
          Ye(v, P, g, _, y, E, A, w, C)
          return
        } else if (B & 256) {
          Ct(v, P, g, _, y, E, A, w, C)
          return
        }
      }
      $ & 8
        ? (L & 16 && R(v, y, E), P !== v && f(g, P))
        : L & 16
        ? $ & 16
          ? Ye(v, P, g, _, y, E, A, w, C)
          : R(v, y, E, !0)
        : (L & 8 && f(g, ""), $ & 16 && z(P, g, _, y, E, A, w, C))
    },
    Ct = (u, h, g, _, y, E, A, w, C) => {
      ;(u = u || kt), (h = h || kt)
      const v = u.length,
        L = h.length,
        P = Math.min(v, L)
      let B
      for (B = 0; B < P; B++) {
        const $ = (h[B] = C ? it(h[B]) : je(h[B]))
        O(u[B], $, g, null, y, E, A, w, C)
      }
      v > L ? R(u, y, E, !0, !1, P) : z(h, g, _, y, E, A, w, C, P)
    },
    Ye = (u, h, g, _, y, E, A, w, C) => {
      let v = 0
      const L = h.length
      let P = u.length - 1,
        B = L - 1
      for (; v <= P && v <= B; ) {
        const $ = u[v],
          X = (h[v] = C ? it(h[v]) : je(h[v]))
        if (mt($, X)) O($, X, g, null, y, E, A, w, C)
        else break
        v++
      }
      for (; v <= P && v <= B; ) {
        const $ = u[P],
          X = (h[B] = C ? it(h[B]) : je(h[B]))
        if (mt($, X)) O($, X, g, null, y, E, A, w, C)
        else break
        P--, B--
      }
      if (v > P) {
        if (v <= B) {
          const $ = B + 1,
            X = $ < L ? h[$].el : _
          for (; v <= B; )
            O(null, (h[v] = C ? it(h[v]) : je(h[v])), g, X, y, E, A, w, C), v++
        }
      } else if (v > B) for (; v <= P; ) Oe(u[v], y, E, !0), v++
      else {
        const $ = v,
          X = v,
          te = new Map()
        for (v = X; v <= B; v++) {
          const xe = (h[v] = C ? it(h[v]) : je(h[v]))
          xe.key != null && te.set(xe.key, v)
        }
        let ne,
          ce = 0
        const ke = B - X + 1
        let xt = !1,
          fr = 0
        const Vt = new Array(ke)
        for (v = 0; v < ke; v++) Vt[v] = 0
        for (v = $; v <= P; v++) {
          const xe = u[v]
          if (ce >= ke) {
            Oe(xe, y, E, !0)
            continue
          }
          let Ue
          if (xe.key != null) Ue = te.get(xe.key)
          else
            for (ne = X; ne <= B; ne++)
              if (Vt[ne - X] === 0 && mt(xe, h[ne])) {
                Ue = ne
                break
              }
          Ue === void 0
            ? Oe(xe, y, E, !0)
            : ((Vt[Ue - X] = v + 1),
              Ue >= fr ? (fr = Ue) : (xt = !0),
              O(xe, h[Ue], g, null, y, E, A, w, C),
              ce++)
        }
        const hr = xt ? Il(Vt) : kt
        for (ne = hr.length - 1, v = ke - 1; v >= 0; v--) {
          const xe = X + v,
            Ue = h[xe],
            dr = xe + 1 < L ? h[xe + 1].el : _
          Vt[v] === 0
            ? O(null, Ue, g, dr, y, E, A, w, C)
            : xt && (ne < 0 || v !== hr[ne] ? He(Ue, g, dr, 2) : ne--)
        }
      }
    },
    He = (u, h, g, _, y = null) => {
      const { el: E, type: A, transition: w, children: C, shapeFlag: v } = u
      if (v & 6) {
        He(u.component.subTree, h, g, _)
        return
      }
      if (v & 128) {
        u.suspense.move(h, g, _)
        return
      }
      if (v & 64) {
        A.move(u, h, g, oe)
        return
      }
      if (A === Ie) {
        s(E, h, g)
        for (let P = 0; P < C.length; P++) He(C[P], h, g, _)
        s(u.anchor, h, g)
        return
      }
      if (A === is) {
        V(u, h, g)
        return
      }
      if (_ !== 2 && v & 1 && w)
        if (_ === 0) w.beforeEnter(E), s(E, h, g), we(() => w.enter(E), y)
        else {
          const { leave: P, delayLeave: B, afterLeave: $ } = w,
            X = () => s(E, h, g),
            te = () => {
              P(E, () => {
                X(), $ && $()
              })
            }
          B ? B(E, X, te) : te()
        }
      else s(E, h, g)
    },
    Oe = (u, h, g, _ = !1, y = !1) => {
      const {
        type: E,
        props: A,
        ref: w,
        children: C,
        dynamicChildren: v,
        shapeFlag: L,
        patchFlag: P,
        dirs: B,
      } = u
      if ((w != null && xs(w, null, g, u, !0), L & 256)) {
        h.ctx.deactivate(u)
        return
      }
      const $ = L & 1 && B,
        X = !An(u)
      let te
      if ((X && (te = A && A.onVnodeBeforeUnmount) && De(te, h, u), L & 6))
        k(u.component, g, _)
      else {
        if (L & 128) {
          u.suspense.unmount(g, _)
          return
        }
        $ && dt(u, null, h, "beforeUnmount"),
          L & 64
            ? u.type.remove(u, h, g, y, oe, _)
            : v && (E !== Ie || (P > 0 && P & 64))
            ? R(v, h, g, !1, !0)
            : ((E === Ie && P & 384) || (!y && L & 16)) && R(C, h, g),
          _ && ts(u)
      }
      ;((X && (te = A && A.onVnodeUnmounted)) || $) &&
        we(() => {
          te && De(te, h, u), $ && dt(u, null, h, "unmounted")
        }, g)
    },
    ts = u => {
      const { type: h, el: g, anchor: _, transition: y } = u
      if (h === Ie) {
        m(g, _)
        return
      }
      if (h === is) {
        J(u)
        return
      }
      const E = () => {
        r(g), y && !y.persisted && y.afterLeave && y.afterLeave()
      }
      if (u.shapeFlag & 1 && y && !y.persisted) {
        const { leave: A, delayLeave: w } = y,
          C = () => A(g, E)
        w ? w(u.el, E, C) : C()
      } else E()
    },
    m = (u, h) => {
      let g
      for (; u !== h; ) (g = d(u)), r(u), (u = g)
      r(h)
    },
    k = (u, h, g) => {
      const { bum: _, scope: y, update: E, subTree: A, um: w } = u
      _ && xn(_),
        y.stop(),
        E && ((E.active = !1), Oe(A, u, h, g)),
        w && we(w, h),
        we(() => {
          u.isUnmounted = !0
        }, h),
        h &&
          h.pendingBranch &&
          !h.isUnmounted &&
          u.asyncDep &&
          !u.asyncResolved &&
          u.suspenseId === h.pendingId &&
          (h.deps--, h.deps === 0 && h.resolve())
    },
    R = (u, h, g, _ = !1, y = !1, E = 0) => {
      for (let A = E; A < u.length; A++) Oe(u[A], h, g, _, y)
    },
    I = u =>
      u.shapeFlag & 6
        ? I(u.component.subTree)
        : u.shapeFlag & 128
        ? u.suspense.next()
        : d(u.anchor || u.el),
    ee = (u, h, g) => {
      u == null
        ? h._vnode && Oe(h._vnode, null, null, !0)
        : O(h._vnode || null, u, h, null, null, null, g),
        Di(),
        (h._vnode = u)
    },
    oe = {
      p: O,
      um: Oe,
      m: He,
      r: ts,
      mt: de,
      mc: z,
      pc: Ce,
      pbc: le,
      n: I,
      o: e,
    }
  let D, H
  return t && ([D, H] = t(oe)), { render: ee, hydrate: D, createApp: Tl(ee, D) }
}
function pt({ effect: e, update: t }, n) {
  e.allowRecurse = t.allowRecurse = n
}
function co(e, t, n = !1) {
  const s = e.children,
    r = t.children
  if (F(s) && F(r))
    for (let i = 0; i < s.length; i++) {
      const o = s[i]
      let c = r[i]
      c.shapeFlag & 1 &&
        !c.dynamicChildren &&
        ((c.patchFlag <= 0 || c.patchFlag === 32) &&
          ((c = r[i] = it(r[i])), (c.el = o.el)),
        n || co(o, c))
    }
}
function Il(e) {
  const t = e.slice(),
    n = [0]
  let s, r, i, o, c
  const l = e.length
  for (s = 0; s < l; s++) {
    const a = e[s]
    if (a !== 0) {
      if (((r = n[n.length - 1]), e[r] < a)) {
        ;(t[s] = r), n.push(s)
        continue
      }
      for (i = 0, o = n.length - 1; i < o; )
        (c = (i + o) >> 1), e[n[c]] < a ? (i = c + 1) : (o = c)
      a < e[n[i]] && (i > 0 && (t[s] = n[i - 1]), (n[i] = s))
    }
  }
  for (i = n.length, o = n[i - 1]; i-- > 0; ) (n[i] = o), (o = t[o])
  return n
}
const Ll = e => e.__isTeleport,
  Ie = Symbol(void 0),
  sr = Symbol(void 0),
  Ze = Symbol(void 0),
  is = Symbol(void 0),
  en = []
let $e = null
function wt(e = !1) {
  en.push(($e = e ? null : []))
}
function Bl() {
  en.pop(), ($e = en[en.length - 1] || null)
}
let an = 1
function kr(e) {
  an += e
}
function lo(e) {
  return (
    (e.dynamicChildren = an > 0 ? $e || kt : null),
    Bl(),
    an > 0 && $e && $e.push(e),
    e
  )
}
function It(e, t, n, s, r, i) {
  return lo(K(e, t, n, s, r, i, !0))
}
function Ml(e, t, n, s, r) {
  return lo(Ae(e, t, n, s, r, !0))
}
function Rs(e) {
  return e ? e.__v_isVNode === !0 : !1
}
function mt(e, t) {
  return e.type === t.type && e.key === t.key
}
const Yn = "__vInternal",
  uo = ({ key: e }) => (e != null ? e : null),
  Sn = ({ ref: e, ref_key: t, ref_for: n }) =>
    e != null
      ? me(e) || ae(e) || U(e)
        ? { i: Fe, r: e, k: t, f: !!n }
        : e
      : null
function K(
  e,
  t = null,
  n = null,
  s = 0,
  r = null,
  i = e === Ie ? 0 : 1,
  o = !1,
  c = !1
) {
  const l = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && uo(t),
    ref: t && Sn(t),
    scopeId: Vn,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: i,
    patchFlag: s,
    dynamicProps: r,
    dynamicChildren: null,
    appContext: null,
  }
  return (
    c
      ? (rr(l, n), i & 128 && e.normalize(l))
      : n && (l.shapeFlag |= me(n) ? 8 : 16),
    an > 0 &&
      !o &&
      $e &&
      (l.patchFlag > 0 || i & 6) &&
      l.patchFlag !== 32 &&
      $e.push(l),
    l
  )
}
const Ae = Fl
function Fl(e, t = null, n = null, s = 0, r = null, i = !1) {
  if (((!e || e === ml) && (e = Ze), Rs(e))) {
    const c = ht(e, t, !0)
    return (
      n && rr(c, n),
      an > 0 &&
        !i &&
        $e &&
        (c.shapeFlag & 6 ? ($e[$e.indexOf(e)] = c) : $e.push(c)),
      (c.patchFlag |= -2),
      c
    )
  }
  if ((Yl(e) && (e = e.__vccOpts), t)) {
    t = $l(t)
    let { class: c, style: l } = t
    c && !me(c) && (t.class = Fn(c)),
      ge(l) && (Ni(l) && !F(l) && (l = _e({}, l)), (t.style = Hs(l)))
  }
  const o = me(e) ? 1 : tl(e) ? 128 : Ll(e) ? 64 : ge(e) ? 4 : U(e) ? 2 : 0
  return K(e, t, n, s, r, o, i, !0)
}
function $l(e) {
  return e ? (Ni(e) || Yn in e ? _e({}, e) : e) : null
}
function ht(e, t, n = !1) {
  const { props: s, ref: r, patchFlag: i, children: o } = e,
    c = t ? Ul(s || {}, t) : s
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: c,
    key: c && uo(c),
    ref:
      t && t.ref ? (n && r ? (F(r) ? r.concat(Sn(t)) : [r, Sn(t)]) : Sn(t)) : r,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: o,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    patchFlag: t && e.type !== Ie ? (i === -1 ? 16 : i | 16) : i,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: e.transition,
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && ht(e.ssContent),
    ssFallback: e.ssFallback && ht(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
  }
}
function Hl(e = " ", t = 0) {
  return Ae(sr, null, e, t)
}
function je(e) {
  return e == null || typeof e == "boolean"
    ? Ae(Ze)
    : F(e)
    ? Ae(Ie, null, e.slice())
    : typeof e == "object"
    ? it(e)
    : Ae(sr, null, String(e))
}
function it(e) {
  return e.el === null || e.memo ? e : ht(e)
}
function rr(e, t) {
  let n = 0
  const { shapeFlag: s } = e
  if (t == null) t = null
  else if (F(t)) n = 16
  else if (typeof t == "object")
    if (s & 65) {
      const r = t.default
      r && (r._c && (r._d = !1), rr(e, r()), r._c && (r._d = !0))
      return
    } else {
      n = 32
      const r = t._
      !r && !(Yn in t)
        ? (t._ctx = Fe)
        : r === 3 &&
          Fe &&
          (Fe.slots._ === 1 ? (t._ = 1) : ((t._ = 2), (e.patchFlag |= 1024)))
    }
  else
    U(t)
      ? ((t = { default: t, _ctx: Fe }), (n = 32))
      : ((t = String(t)), s & 64 ? ((n = 16), (t = [Hl(t)])) : (n = 8))
  ;(e.children = t), (e.shapeFlag |= n)
}
function Ul(...e) {
  const t = {}
  for (let n = 0; n < e.length; n++) {
    const s = e[n]
    for (const r in s)
      if (r === "class")
        t.class !== s.class && (t.class = Fn([t.class, s.class]))
      else if (r === "style") t.style = Hs([t.style, s.style])
      else if ($n(r)) {
        const i = t[r],
          o = s[r]
        o &&
          i !== o &&
          !(F(i) && i.includes(o)) &&
          (t[r] = i ? [].concat(i, o) : o)
      } else r !== "" && (t[r] = s[r])
  }
  return t
}
function De(e, t, n, s = null) {
  Te(e, t, 7, [n, s])
}
const Dl = oo()
let Kl = 0
function jl(e, t, n) {
  const s = e.type,
    r = (t ? t.appContext : e.appContext) || Dl,
    i = {
      uid: Kl++,
      vnode: e,
      type: s,
      parent: t,
      appContext: r,
      root: null,
      next: null,
      subTree: null,
      effect: null,
      update: null,
      scope: new bi(!0),
      render: null,
      proxy: null,
      exposed: null,
      exposeProxy: null,
      withProxy: null,
      provides: t ? t.provides : Object.create(r.provides),
      accessCache: null,
      renderCache: [],
      components: null,
      directives: null,
      propsOptions: no(s, r),
      emitsOptions: ji(s, r),
      emit: null,
      emitted: null,
      propsDefaults: re,
      inheritAttrs: s.inheritAttrs,
      ctx: re,
      data: re,
      props: re,
      attrs: re,
      slots: re,
      refs: re,
      setupState: re,
      setupContext: null,
      suspense: n,
      suspenseId: n ? n.pendingId : 0,
      asyncDep: null,
      asyncResolved: !1,
      isMounted: !1,
      isUnmounted: !1,
      isDeactivated: !1,
      bc: null,
      c: null,
      bm: null,
      m: null,
      bu: null,
      u: null,
      um: null,
      bum: null,
      da: null,
      a: null,
      rtg: null,
      rtc: null,
      ec: null,
      sp: null,
    }
  return (
    (i.ctx = { _: i }),
    (i.root = t ? t.root : i),
    (i.emit = Jc.bind(null, i)),
    e.ce && e.ce(i),
    i
  )
}
let ye = null
const ir = () => ye || Fe,
  Mt = e => {
    ;(ye = e), e.scope.on()
  },
  Et = () => {
    ye && ye.scope.off(), (ye = null)
  }
function ao(e) {
  return e.vnode.shapeFlag & 4
}
let fn = !1
function ql(e, t = !1) {
  fn = t
  const { props: n, children: s } = e.vnode,
    r = ao(e)
  xl(e, n, r, t), Sl(e, s)
  const i = r ? Vl(e, t) : void 0
  return (fn = !1), i
}
function Vl(e, t) {
  const n = e.type
  ;(e.accessCache = Object.create(null)), (e.proxy = Bt(new Proxy(e.ctx, _l)))
  const { setup: s } = n
  if (s) {
    const r = (e.setupContext = s.length > 1 ? Wl(e) : null)
    Mt(e), Ut()
    const i = at(s, e, 0, [e.props, r])
    if ((Dt(), Et(), gi(i))) {
      if ((i.then(Et, Et), t))
        return i
          .then(o => {
            Nr(e, o, t)
          })
          .catch(o => {
            Kn(o, e, 0)
          })
      e.asyncDep = i
    } else Nr(e, i, t)
  } else fo(e, t)
}
function Nr(e, t, n) {
  U(t)
    ? e.type.__ssrInlineRender
      ? (e.ssrRender = t)
      : (e.render = t)
    : ge(t) && (e.setupState = Mi(t)),
    fo(e, n)
}
let Ir
function fo(e, t, n) {
  const s = e.type
  if (!e.render) {
    if (!t && Ir && !s.render) {
      const r = s.template
      if (r) {
        const { isCustomElement: i, compilerOptions: o } = e.appContext.config,
          { delimiters: c, compilerOptions: l } = s,
          a = _e(_e({ isCustomElement: i, delimiters: c }, o), l)
        s.render = Ir(r, a)
      }
    }
    e.render = s.render || qe
  }
  Mt(e), Ut(), bl(e), Dt(), Et()
}
function zl(e) {
  return new Proxy(e.attrs, {
    get(t, n) {
      return Se(e, "get", "$attrs"), t[n]
    },
  })
}
function Wl(e) {
  const t = s => {
    e.exposed = s || {}
  }
  let n
  return {
    get attrs() {
      return n || (n = zl(e))
    },
    slots: e.slots,
    emit: e.emit,
    expose: t,
  }
}
function Jn(e) {
  if (e.exposed)
    return (
      e.exposeProxy ||
      (e.exposeProxy = new Proxy(Mi(Bt(e.exposed)), {
        get(t, n) {
          if (n in t) return t[n]
          if (n in Ln) return Ln[n](e)
        },
      }))
    )
}
function Yl(e) {
  return U(e) && "__vccOpts" in e
}
const Be = (e, t) => jc(e, t, fn)
function ho(e, t, n) {
  const s = arguments.length
  return s === 2
    ? ge(t) && !F(t)
      ? Rs(t)
        ? Ae(e, null, [t])
        : Ae(e, t)
      : Ae(e, null, t)
    : (s > 3
        ? (n = Array.prototype.slice.call(arguments, 2))
        : s === 3 && Rs(n) && (n = [n]),
      Ae(e, t, n))
}
const Jl = "3.2.36",
  Xl = "http://www.w3.org/2000/svg",
  yt = typeof document != "undefined" ? document : null,
  Lr = yt && yt.createElement("template"),
  Ql = {
    insert: (e, t, n) => {
      t.insertBefore(e, n || null)
    },
    remove: e => {
      const t = e.parentNode
      t && t.removeChild(e)
    },
    createElement: (e, t, n, s) => {
      const r = t
        ? yt.createElementNS(Xl, e)
        : yt.createElement(e, n ? { is: n } : void 0)
      return (
        e === "select" &&
          s &&
          s.multiple != null &&
          r.setAttribute("multiple", s.multiple),
        r
      )
    },
    createText: e => yt.createTextNode(e),
    createComment: e => yt.createComment(e),
    setText: (e, t) => {
      e.nodeValue = t
    },
    setElementText: (e, t) => {
      e.textContent = t
    },
    parentNode: e => e.parentNode,
    nextSibling: e => e.nextSibling,
    querySelector: e => yt.querySelector(e),
    setScopeId(e, t) {
      e.setAttribute(t, "")
    },
    cloneNode(e) {
      const t = e.cloneNode(!0)
      return "_value" in e && (t._value = e._value), t
    },
    insertStaticContent(e, t, n, s, r, i) {
      const o = n ? n.previousSibling : t.lastChild
      if (r && (r === i || r.nextSibling))
        for (
          ;
          t.insertBefore(r.cloneNode(!0), n),
            !(r === i || !(r = r.nextSibling));

        );
      else {
        Lr.innerHTML = s ? `<svg>${e}</svg>` : e
        const c = Lr.content
        if (s) {
          const l = c.firstChild
          for (; l.firstChild; ) c.appendChild(l.firstChild)
          c.removeChild(l)
        }
        t.insertBefore(c, n)
      }
      return [
        o ? o.nextSibling : t.firstChild,
        n ? n.previousSibling : t.lastChild,
      ]
    },
  }
function Zl(e, t, n) {
  const s = e._vtc
  s && (t = (t ? [t, ...s] : [...s]).join(" ")),
    t == null
      ? e.removeAttribute("class")
      : n
      ? e.setAttribute("class", t)
      : (e.className = t)
}
function Gl(e, t, n) {
  const s = e.style,
    r = me(n)
  if (n && !r) {
    for (const i in n) As(s, i, n[i])
    if (t && !me(t)) for (const i in t) n[i] == null && As(s, i, "")
  } else {
    const i = s.display
    r ? t !== n && (s.cssText = n) : t && e.removeAttribute("style"),
      "_vod" in e && (s.display = i)
  }
}
const Br = /\s*!important$/
function As(e, t, n) {
  if (F(n)) n.forEach(s => As(e, t, s))
  else if ((n == null && (n = ""), t.startsWith("--"))) e.setProperty(t, n)
  else {
    const s = eu(e, t)
    Br.test(n)
      ? e.setProperty(Ht(s), n.replace(Br, ""), "important")
      : (e[s] = n)
  }
}
const Mr = ["Webkit", "Moz", "ms"],
  os = {}
function eu(e, t) {
  const n = os[t]
  if (n) return n
  let s = Lt(t)
  if (s !== "filter" && s in e) return (os[t] = s)
  s = _i(s)
  for (let r = 0; r < Mr.length; r++) {
    const i = Mr[r] + s
    if (i in e) return (os[t] = i)
  }
  return t
}
const Fr = "http://www.w3.org/1999/xlink"
function tu(e, t, n, s, r) {
  if (s && t.startsWith("xlink:"))
    n == null
      ? e.removeAttributeNS(Fr, t.slice(6, t.length))
      : e.setAttributeNS(Fr, t, n)
  else {
    const i = Qo(t)
    n == null || (i && !hi(n))
      ? e.removeAttribute(t)
      : e.setAttribute(t, i ? "" : n)
  }
}
function nu(e, t, n, s, r, i, o) {
  if (t === "innerHTML" || t === "textContent") {
    s && o(s, r, i), (e[t] = n == null ? "" : n)
    return
  }
  if (t === "value" && e.tagName !== "PROGRESS" && !e.tagName.includes("-")) {
    e._value = n
    const l = n == null ? "" : n
    ;(e.value !== l || e.tagName === "OPTION") && (e.value = l),
      n == null && e.removeAttribute(t)
    return
  }
  let c = !1
  if (n === "" || n == null) {
    const l = typeof e[t]
    l === "boolean"
      ? (n = hi(n))
      : n == null && l === "string"
      ? ((n = ""), (c = !0))
      : l === "number" && ((n = 0), (c = !0))
  }
  try {
    e[t] = n
  } catch {}
  c && e.removeAttribute(t)
}
const [po, su] = (() => {
  let e = Date.now,
    t = !1
  if (typeof window != "undefined") {
    Date.now() > document.createEvent("Event").timeStamp &&
      (e = performance.now.bind(performance))
    const n = navigator.userAgent.match(/firefox\/(\d+)/i)
    t = !!(n && Number(n[1]) <= 53)
  }
  return [e, t]
})()
let Ss = 0
const ru = Promise.resolve(),
  iu = () => {
    Ss = 0
  },
  ou = () => Ss || (ru.then(iu), (Ss = po()))
function Pt(e, t, n, s) {
  e.addEventListener(t, n, s)
}
function cu(e, t, n, s) {
  e.removeEventListener(t, n, s)
}
function lu(e, t, n, s, r = null) {
  const i = e._vei || (e._vei = {}),
    o = i[t]
  if (s && o) o.value = s
  else {
    const [c, l] = uu(t)
    if (s) {
      const a = (i[t] = au(s, r))
      Pt(e, c, a, l)
    } else o && (cu(e, c, o, l), (i[t] = void 0))
  }
}
const $r = /(?:Once|Passive|Capture)$/
function uu(e) {
  let t
  if ($r.test(e)) {
    t = {}
    let n
    for (; (n = e.match($r)); )
      (e = e.slice(0, e.length - n[0].length)), (t[n[0].toLowerCase()] = !0)
  }
  return [Ht(e.slice(2)), t]
}
function au(e, t) {
  const n = s => {
    const r = s.timeStamp || po()
    ;(su || r >= n.attached - 1) && Te(fu(s, n.value), t, 5, [s])
  }
  return (n.value = e), (n.attached = ou()), n
}
function fu(e, t) {
  if (F(t)) {
    const n = e.stopImmediatePropagation
    return (
      (e.stopImmediatePropagation = () => {
        n.call(e), (e._stopped = !0)
      }),
      t.map(s => r => !r._stopped && s && s(r))
    )
  } else return t
}
const Hr = /^on[a-z]/,
  hu = (e, t, n, s, r = !1, i, o, c, l) => {
    t === "class"
      ? Zl(e, s, r)
      : t === "style"
      ? Gl(e, n, s)
      : $n(t)
      ? Us(t) || lu(e, t, n, s, o)
      : (
          t[0] === "."
            ? ((t = t.slice(1)), !0)
            : t[0] === "^"
            ? ((t = t.slice(1)), !1)
            : du(e, t, s, r)
        )
      ? nu(e, t, s, i, o, c, l)
      : (t === "true-value"
          ? (e._trueValue = s)
          : t === "false-value" && (e._falseValue = s),
        tu(e, t, s, r))
  }
function du(e, t, n, s) {
  return s
    ? !!(
        t === "innerHTML" ||
        t === "textContent" ||
        (t in e && Hr.test(t) && U(n))
      )
    : t === "spellcheck" ||
      t === "draggable" ||
      t === "translate" ||
      t === "form" ||
      (t === "list" && e.tagName === "INPUT") ||
      (t === "type" && e.tagName === "TEXTAREA") ||
      (Hr.test(t) && me(n))
    ? !1
    : t in e
}
const pu = {
  name: String,
  type: String,
  css: { type: Boolean, default: !0 },
  duration: [String, Number, Object],
  enterFromClass: String,
  enterActiveClass: String,
  enterToClass: String,
  appearFromClass: String,
  appearActiveClass: String,
  appearToClass: String,
  leaveFromClass: String,
  leaveActiveClass: String,
  leaveToClass: String,
}
ol.props
const Ur = e => {
  const t = e.props["onUpdate:modelValue"] || !1
  return F(t) ? n => xn(t, n) : t
}
function gu(e) {
  e.target.composing = !0
}
function Dr(e) {
  const t = e.target
  t.composing && ((t.composing = !1), t.dispatchEvent(new Event("input")))
}
const hn = {
    created(e, { modifiers: { lazy: t, trim: n, number: s } }, r) {
      e._assign = Ur(r)
      const i = s || (r.props && r.props.type === "number")
      Pt(e, t ? "change" : "input", o => {
        if (o.target.composing) return
        let c = e.value
        n && (c = c.trim()), i && (c = as(c)), e._assign(c)
      }),
        n &&
          Pt(e, "change", () => {
            e.value = e.value.trim()
          }),
        t ||
          (Pt(e, "compositionstart", gu),
          Pt(e, "compositionend", Dr),
          Pt(e, "change", Dr))
    },
    mounted(e, { value: t }) {
      e.value = t == null ? "" : t
    },
    beforeUpdate(
      e,
      { value: t, modifiers: { lazy: n, trim: s, number: r } },
      i
    ) {
      if (
        ((e._assign = Ur(i)),
        e.composing ||
          (document.activeElement === e &&
            e.type !== "range" &&
            (n ||
              (s && e.value.trim() === t) ||
              ((r || e.type === "number") && as(e.value) === t))))
      )
        return
      const o = t == null ? "" : t
      e.value !== o && (e.value = o)
    },
  },
  mu = ["ctrl", "shift", "alt", "meta"],
  yu = {
    stop: e => e.stopPropagation(),
    prevent: e => e.preventDefault(),
    self: e => e.target !== e.currentTarget,
    ctrl: e => !e.ctrlKey,
    shift: e => !e.shiftKey,
    alt: e => !e.altKey,
    meta: e => !e.metaKey,
    left: e => "button" in e && e.button !== 0,
    middle: e => "button" in e && e.button !== 1,
    right: e => "button" in e && e.button !== 2,
    exact: (e, t) => mu.some(n => e[`${n}Key`] && !t.includes(n)),
  },
  go =
    (e, t) =>
    (n, ...s) => {
      for (let r = 0; r < t.length; r++) {
        const i = yu[t[r]]
        if (i && i(n, t)) return
      }
      return e(n, ...s)
    },
  _u = _e({ patchProp: hu }, Ql)
let Kr
function bu() {
  return Kr || (Kr = kl(_u))
}
const vu = (...e) => {
  const t = bu().createApp(...e),
    { mount: n } = t
  return (
    (t.mount = s => {
      const r = wu(s)
      if (!r) return
      const i = t._component
      !U(i) && !i.render && !i.template && (i.template = r.innerHTML),
        (r.innerHTML = "")
      const o = n(r, !1, r instanceof SVGElement)
      return (
        r instanceof Element &&
          (r.removeAttribute("v-cloak"), r.setAttribute("data-v-app", "")),
        o
      )
    }),
    t
  )
}
function wu(e) {
  return me(e) ? document.querySelector(e) : e
}
/*!
 * vue-router v4.0.15
 * (c) 2022 Eduardo San Martin Morote
 * @license MIT
 */ const mo =
    typeof Symbol == "function" && typeof Symbol.toStringTag == "symbol",
  jt = e => (mo ? Symbol(e) : "_vr_" + e),
  Eu = jt("rvlm"),
  jr = jt("rvd"),
  Xn = jt("r"),
  yo = jt("rl"),
  Os = jt("rvl"),
  Tt = typeof window != "undefined"
function Cu(e) {
  return e.__esModule || (mo && e[Symbol.toStringTag] === "Module")
}
const se = Object.assign
function cs(e, t) {
  const n = {}
  for (const s in t) {
    const r = t[s]
    n[s] = Array.isArray(r) ? r.map(e) : e(r)
  }
  return n
}
const tn = () => {},
  xu = /\/$/,
  Ru = e => e.replace(xu, "")
function ls(e, t, n = "/") {
  let s,
    r = {},
    i = "",
    o = ""
  const c = t.indexOf("?"),
    l = t.indexOf("#", c > -1 ? c : 0)
  return (
    c > -1 &&
      ((s = t.slice(0, c)),
      (i = t.slice(c + 1, l > -1 ? l : t.length)),
      (r = e(i))),
    l > -1 && ((s = s || t.slice(0, l)), (o = t.slice(l, t.length))),
    (s = Pu(s != null ? s : t, n)),
    { fullPath: s + (i && "?") + i + o, path: s, query: r, hash: o }
  )
}
function Au(e, t) {
  const n = t.query ? e(t.query) : ""
  return t.path + (n && "?") + n + (t.hash || "")
}
function qr(e, t) {
  return !t || !e.toLowerCase().startsWith(t.toLowerCase())
    ? e
    : e.slice(t.length) || "/"
}
function Su(e, t, n) {
  const s = t.matched.length - 1,
    r = n.matched.length - 1
  return (
    s > -1 &&
    s === r &&
    Ft(t.matched[s], n.matched[r]) &&
    _o(t.params, n.params) &&
    e(t.query) === e(n.query) &&
    t.hash === n.hash
  )
}
function Ft(e, t) {
  return (e.aliasOf || e) === (t.aliasOf || t)
}
function _o(e, t) {
  if (Object.keys(e).length !== Object.keys(t).length) return !1
  for (const n in e) if (!Ou(e[n], t[n])) return !1
  return !0
}
function Ou(e, t) {
  return Array.isArray(e) ? Vr(e, t) : Array.isArray(t) ? Vr(t, e) : e === t
}
function Vr(e, t) {
  return Array.isArray(t)
    ? e.length === t.length && e.every((n, s) => n === t[s])
    : e.length === 1 && e[0] === t
}
function Pu(e, t) {
  if (e.startsWith("/")) return e
  if (!e) return t
  const n = t.split("/"),
    s = e.split("/")
  let r = n.length - 1,
    i,
    o
  for (i = 0; i < s.length; i++)
    if (((o = s[i]), !(r === 1 || o === ".")))
      if (o === "..") r--
      else break
  return (
    n.slice(0, r).join("/") +
    "/" +
    s.slice(i - (i === s.length ? 1 : 0)).join("/")
  )
}
var dn
;(function (e) {
  ;(e.pop = "pop"), (e.push = "push")
})(dn || (dn = {}))
var nn
;(function (e) {
  ;(e.back = "back"), (e.forward = "forward"), (e.unknown = "")
})(nn || (nn = {}))
function Tu(e) {
  if (!e)
    if (Tt) {
      const t = document.querySelector("base")
      ;(e = (t && t.getAttribute("href")) || "/"),
        (e = e.replace(/^\w+:\/\/[^\/]+/, ""))
    } else e = "/"
  return e[0] !== "/" && e[0] !== "#" && (e = "/" + e), Ru(e)
}
const ku = /^[^#]+#/
function Nu(e, t) {
  return e.replace(ku, "#") + t
}
function Iu(e, t) {
  const n = document.documentElement.getBoundingClientRect(),
    s = e.getBoundingClientRect()
  return {
    behavior: t.behavior,
    left: s.left - n.left - (t.left || 0),
    top: s.top - n.top - (t.top || 0),
  }
}
const Qn = () => ({ left: window.pageXOffset, top: window.pageYOffset })
function Lu(e) {
  let t
  if ("el" in e) {
    const n = e.el,
      s = typeof n == "string" && n.startsWith("#"),
      r =
        typeof n == "string"
          ? s
            ? document.getElementById(n.slice(1))
            : document.querySelector(n)
          : n
    if (!r) return
    t = Iu(r, e)
  } else t = e
  "scrollBehavior" in document.documentElement.style
    ? window.scrollTo(t)
    : window.scrollTo(
        t.left != null ? t.left : window.pageXOffset,
        t.top != null ? t.top : window.pageYOffset
      )
}
function zr(e, t) {
  return (history.state ? history.state.position - t : -1) + e
}
const Ps = new Map()
function Bu(e, t) {
  Ps.set(e, t)
}
function Mu(e) {
  const t = Ps.get(e)
  return Ps.delete(e), t
}
let Fu = () => location.protocol + "//" + location.host
function bo(e, t) {
  const { pathname: n, search: s, hash: r } = t,
    i = e.indexOf("#")
  if (i > -1) {
    let c = r.includes(e.slice(i)) ? e.slice(i).length : 1,
      l = r.slice(c)
    return l[0] !== "/" && (l = "/" + l), qr(l, "")
  }
  return qr(n, e) + s + r
}
function $u(e, t, n, s) {
  let r = [],
    i = [],
    o = null
  const c = ({ state: d }) => {
    const b = bo(e, location),
      x = n.value,
      N = t.value
    let O = 0
    if (d) {
      if (((n.value = b), (t.value = d), o && o === x)) {
        o = null
        return
      }
      O = N ? d.position - N.position : 0
    } else s(b)
    r.forEach(S => {
      S(n.value, x, {
        delta: O,
        type: dn.pop,
        direction: O ? (O > 0 ? nn.forward : nn.back) : nn.unknown,
      })
    })
  }
  function l() {
    o = n.value
  }
  function a(d) {
    r.push(d)
    const b = () => {
      const x = r.indexOf(d)
      x > -1 && r.splice(x, 1)
    }
    return i.push(b), b
  }
  function f() {
    const { history: d } = window
    !d.state || d.replaceState(se({}, d.state, { scroll: Qn() }), "")
  }
  function p() {
    for (const d of i) d()
    ;(i = []),
      window.removeEventListener("popstate", c),
      window.removeEventListener("beforeunload", f)
  }
  return (
    window.addEventListener("popstate", c),
    window.addEventListener("beforeunload", f),
    { pauseListeners: l, listen: a, destroy: p }
  )
}
function Wr(e, t, n, s = !1, r = !1) {
  return {
    back: e,
    current: t,
    forward: n,
    replaced: s,
    position: window.history.length,
    scroll: r ? Qn() : null,
  }
}
function Hu(e) {
  const { history: t, location: n } = window,
    s = { value: bo(e, n) },
    r = { value: t.state }
  r.value ||
    i(
      s.value,
      {
        back: null,
        current: s.value,
        forward: null,
        position: t.length - 1,
        replaced: !0,
        scroll: null,
      },
      !0
    )
  function i(l, a, f) {
    const p = e.indexOf("#"),
      d =
        p > -1
          ? (n.host && document.querySelector("base") ? e : e.slice(p)) + l
          : Fu() + e + l
    try {
      t[f ? "replaceState" : "pushState"](a, "", d), (r.value = a)
    } catch (b) {
      console.error(b), n[f ? "replace" : "assign"](d)
    }
  }
  function o(l, a) {
    const f = se({}, t.state, Wr(r.value.back, l, r.value.forward, !0), a, {
      position: r.value.position,
    })
    i(l, f, !0), (s.value = l)
  }
  function c(l, a) {
    const f = se({}, r.value, t.state, { forward: l, scroll: Qn() })
    i(f.current, f, !0)
    const p = se({}, Wr(s.value, l, null), { position: f.position + 1 }, a)
    i(l, p, !1), (s.value = l)
  }
  return { location: s, state: r, push: c, replace: o }
}
function Uu(e) {
  e = Tu(e)
  const t = Hu(e),
    n = $u(e, t.state, t.location, t.replace)
  function s(i, o = !0) {
    o || n.pauseListeners(), history.go(i)
  }
  const r = se(
    { location: "", base: e, go: s, createHref: Nu.bind(null, e) },
    t,
    n
  )
  return (
    Object.defineProperty(r, "location", {
      enumerable: !0,
      get: () => t.location.value,
    }),
    Object.defineProperty(r, "state", {
      enumerable: !0,
      get: () => t.state.value,
    }),
    r
  )
}
function Du(e) {
  return typeof e == "string" || (e && typeof e == "object")
}
function vo(e) {
  return typeof e == "string" || typeof e == "symbol"
}
const nt = {
    path: "/",
    name: void 0,
    params: {},
    query: {},
    hash: "",
    fullPath: "/",
    matched: [],
    meta: {},
    redirectedFrom: void 0,
  },
  wo = jt("nf")
var Yr
;(function (e) {
  ;(e[(e.aborted = 4)] = "aborted"),
    (e[(e.cancelled = 8)] = "cancelled"),
    (e[(e.duplicated = 16)] = "duplicated")
})(Yr || (Yr = {}))
function $t(e, t) {
  return se(new Error(), { type: e, [wo]: !0 }, t)
}
function st(e, t) {
  return e instanceof Error && wo in e && (t == null || !!(e.type & t))
}
const Jr = "[^/]+?",
  Ku = { sensitive: !1, strict: !1, start: !0, end: !0 },
  ju = /[.+*?^${}()[\]/\\]/g
function qu(e, t) {
  const n = se({}, Ku, t),
    s = []
  let r = n.start ? "^" : ""
  const i = []
  for (const a of e) {
    const f = a.length ? [] : [90]
    n.strict && !a.length && (r += "/")
    for (let p = 0; p < a.length; p++) {
      const d = a[p]
      let b = 40 + (n.sensitive ? 0.25 : 0)
      if (d.type === 0)
        p || (r += "/"), (r += d.value.replace(ju, "\\$&")), (b += 40)
      else if (d.type === 1) {
        const { value: x, repeatable: N, optional: O, regexp: S } = d
        i.push({ name: x, repeatable: N, optional: O })
        const M = S || Jr
        if (M !== Jr) {
          b += 10
          try {
            new RegExp(`(${M})`)
          } catch (V) {
            throw new Error(
              `Invalid custom RegExp for param "${x}" (${M}): ` + V.message
            )
          }
        }
        let j = N ? `((?:${M})(?:/(?:${M}))*)` : `(${M})`
        p || (j = O && a.length < 2 ? `(?:/${j})` : "/" + j),
          O && (j += "?"),
          (r += j),
          (b += 20),
          O && (b += -8),
          N && (b += -20),
          M === ".*" && (b += -50)
      }
      f.push(b)
    }
    s.push(f)
  }
  if (n.strict && n.end) {
    const a = s.length - 1
    s[a][s[a].length - 1] += 0.7000000000000001
  }
  n.strict || (r += "/?"), n.end ? (r += "$") : n.strict && (r += "(?:/|$)")
  const o = new RegExp(r, n.sensitive ? "" : "i")
  function c(a) {
    const f = a.match(o),
      p = {}
    if (!f) return null
    for (let d = 1; d < f.length; d++) {
      const b = f[d] || "",
        x = i[d - 1]
      p[x.name] = b && x.repeatable ? b.split("/") : b
    }
    return p
  }
  function l(a) {
    let f = "",
      p = !1
    for (const d of e) {
      ;(!p || !f.endsWith("/")) && (f += "/"), (p = !1)
      for (const b of d)
        if (b.type === 0) f += b.value
        else if (b.type === 1) {
          const { value: x, repeatable: N, optional: O } = b,
            S = x in a ? a[x] : ""
          if (Array.isArray(S) && !N)
            throw new Error(
              `Provided param "${x}" is an array but it is not repeatable (* or + modifiers)`
            )
          const M = Array.isArray(S) ? S.join("/") : S
          if (!M)
            if (O)
              d.length < 2 &&
                e.length > 1 &&
                (f.endsWith("/") ? (f = f.slice(0, -1)) : (p = !0))
            else throw new Error(`Missing required param "${x}"`)
          f += M
        }
    }
    return f
  }
  return { re: o, score: s, keys: i, parse: c, stringify: l }
}
function Vu(e, t) {
  let n = 0
  for (; n < e.length && n < t.length; ) {
    const s = t[n] - e[n]
    if (s) return s
    n++
  }
  return e.length < t.length
    ? e.length === 1 && e[0] === 40 + 40
      ? -1
      : 1
    : e.length > t.length
    ? t.length === 1 && t[0] === 40 + 40
      ? 1
      : -1
    : 0
}
function zu(e, t) {
  let n = 0
  const s = e.score,
    r = t.score
  for (; n < s.length && n < r.length; ) {
    const i = Vu(s[n], r[n])
    if (i) return i
    n++
  }
  return r.length - s.length
}
const Wu = { type: 0, value: "" },
  Yu = /[a-zA-Z0-9_]/
function Ju(e) {
  if (!e) return [[]]
  if (e === "/") return [[Wu]]
  if (!e.startsWith("/")) throw new Error(`Invalid path "${e}"`)
  function t(b) {
    throw new Error(`ERR (${n})/"${a}": ${b}`)
  }
  let n = 0,
    s = n
  const r = []
  let i
  function o() {
    i && r.push(i), (i = [])
  }
  let c = 0,
    l,
    a = "",
    f = ""
  function p() {
    !a ||
      (n === 0
        ? i.push({ type: 0, value: a })
        : n === 1 || n === 2 || n === 3
        ? (i.length > 1 &&
            (l === "*" || l === "+") &&
            t(
              `A repeatable param (${a}) must be alone in its segment. eg: '/:ids+.`
            ),
          i.push({
            type: 1,
            value: a,
            regexp: f,
            repeatable: l === "*" || l === "+",
            optional: l === "*" || l === "?",
          }))
        : t("Invalid state to consume buffer"),
      (a = ""))
  }
  function d() {
    a += l
  }
  for (; c < e.length; ) {
    if (((l = e[c++]), l === "\\" && n !== 2)) {
      ;(s = n), (n = 4)
      continue
    }
    switch (n) {
      case 0:
        l === "/" ? (a && p(), o()) : l === ":" ? (p(), (n = 1)) : d()
        break
      case 4:
        d(), (n = s)
        break
      case 1:
        l === "("
          ? (n = 2)
          : Yu.test(l)
          ? d()
          : (p(), (n = 0), l !== "*" && l !== "?" && l !== "+" && c--)
        break
      case 2:
        l === ")"
          ? f[f.length - 1] == "\\"
            ? (f = f.slice(0, -1) + l)
            : (n = 3)
          : (f += l)
        break
      case 3:
        p(), (n = 0), l !== "*" && l !== "?" && l !== "+" && c--, (f = "")
        break
      default:
        t("Unknown state")
        break
    }
  }
  return n === 2 && t(`Unfinished custom RegExp for param "${a}"`), p(), o(), r
}
function Xu(e, t, n) {
  const s = qu(Ju(e.path), n),
    r = se(s, { record: e, parent: t, children: [], alias: [] })
  return t && !r.record.aliasOf == !t.record.aliasOf && t.children.push(r), r
}
function Qu(e, t) {
  const n = [],
    s = new Map()
  t = Qr({ strict: !1, end: !0, sensitive: !1 }, t)
  function r(f) {
    return s.get(f)
  }
  function i(f, p, d) {
    const b = !d,
      x = Gu(f)
    x.aliasOf = d && d.record
    const N = Qr(t, f),
      O = [x]
    if ("alias" in f) {
      const j = typeof f.alias == "string" ? [f.alias] : f.alias
      for (const V of j)
        O.push(
          se({}, x, {
            components: d ? d.record.components : x.components,
            path: V,
            aliasOf: d ? d.record : x,
          })
        )
    }
    let S, M
    for (const j of O) {
      const { path: V } = j
      if (p && V[0] !== "/") {
        const J = p.record.path,
          ue = J[J.length - 1] === "/" ? "" : "/"
        j.path = p.record.path + (V && ue + V)
      }
      if (
        ((S = Xu(j, p, N)),
        d
          ? d.alias.push(S)
          : ((M = M || S),
            M !== S && M.alias.push(S),
            b && f.name && !Xr(S) && o(f.name)),
        "children" in x)
      ) {
        const J = x.children
        for (let ue = 0; ue < J.length; ue++) i(J[ue], S, d && d.children[ue])
      }
      ;(d = d || S), l(S)
    }
    return M
      ? () => {
          o(M)
        }
      : tn
  }
  function o(f) {
    if (vo(f)) {
      const p = s.get(f)
      p &&
        (s.delete(f),
        n.splice(n.indexOf(p), 1),
        p.children.forEach(o),
        p.alias.forEach(o))
    } else {
      const p = n.indexOf(f)
      p > -1 &&
        (n.splice(p, 1),
        f.record.name && s.delete(f.record.name),
        f.children.forEach(o),
        f.alias.forEach(o))
    }
  }
  function c() {
    return n
  }
  function l(f) {
    let p = 0
    for (
      ;
      p < n.length &&
      zu(f, n[p]) >= 0 &&
      (f.record.path !== n[p].record.path || !Eo(f, n[p]));

    )
      p++
    n.splice(p, 0, f), f.record.name && !Xr(f) && s.set(f.record.name, f)
  }
  function a(f, p) {
    let d,
      b = {},
      x,
      N
    if ("name" in f && f.name) {
      if (((d = s.get(f.name)), !d)) throw $t(1, { location: f })
      ;(N = d.record.name),
        (b = se(
          Zu(
            p.params,
            d.keys.filter(M => !M.optional).map(M => M.name)
          ),
          f.params
        )),
        (x = d.stringify(b))
    } else if ("path" in f)
      (x = f.path),
        (d = n.find(M => M.re.test(x))),
        d && ((b = d.parse(x)), (N = d.record.name))
    else {
      if (((d = p.name ? s.get(p.name) : n.find(M => M.re.test(p.path))), !d))
        throw $t(1, { location: f, currentLocation: p })
      ;(N = d.record.name),
        (b = se({}, p.params, f.params)),
        (x = d.stringify(b))
    }
    const O = []
    let S = d
    for (; S; ) O.unshift(S.record), (S = S.parent)
    return { name: N, path: x, params: b, matched: O, meta: ta(O) }
  }
  return (
    e.forEach(f => i(f)),
    {
      addRoute: i,
      resolve: a,
      removeRoute: o,
      getRoutes: c,
      getRecordMatcher: r,
    }
  )
}
function Zu(e, t) {
  const n = {}
  for (const s of t) s in e && (n[s] = e[s])
  return n
}
function Gu(e) {
  return {
    path: e.path,
    redirect: e.redirect,
    name: e.name,
    meta: e.meta || {},
    aliasOf: void 0,
    beforeEnter: e.beforeEnter,
    props: ea(e),
    children: e.children || [],
    instances: {},
    leaveGuards: new Set(),
    updateGuards: new Set(),
    enterCallbacks: {},
    components:
      "components" in e ? e.components || {} : { default: e.component },
  }
}
function ea(e) {
  const t = {},
    n = e.props || !1
  if ("component" in e) t.default = n
  else for (const s in e.components) t[s] = typeof n == "boolean" ? n : n[s]
  return t
}
function Xr(e) {
  for (; e; ) {
    if (e.record.aliasOf) return !0
    e = e.parent
  }
  return !1
}
function ta(e) {
  return e.reduce((t, n) => se(t, n.meta), {})
}
function Qr(e, t) {
  const n = {}
  for (const s in e) n[s] = s in t ? t[s] : e[s]
  return n
}
function Eo(e, t) {
  return t.children.some(n => n === e || Eo(e, n))
}
const Co = /#/g,
  na = /&/g,
  sa = /\//g,
  ra = /=/g,
  ia = /\?/g,
  xo = /\+/g,
  oa = /%5B/g,
  ca = /%5D/g,
  Ro = /%5E/g,
  la = /%60/g,
  Ao = /%7B/g,
  ua = /%7C/g,
  So = /%7D/g,
  aa = /%20/g
function or(e) {
  return encodeURI("" + e)
    .replace(ua, "|")
    .replace(oa, "[")
    .replace(ca, "]")
}
function fa(e) {
  return or(e).replace(Ao, "{").replace(So, "}").replace(Ro, "^")
}
function Ts(e) {
  return or(e)
    .replace(xo, "%2B")
    .replace(aa, "+")
    .replace(Co, "%23")
    .replace(na, "%26")
    .replace(la, "`")
    .replace(Ao, "{")
    .replace(So, "}")
    .replace(Ro, "^")
}
function ha(e) {
  return Ts(e).replace(ra, "%3D")
}
function da(e) {
  return or(e).replace(Co, "%23").replace(ia, "%3F")
}
function pa(e) {
  return e == null ? "" : da(e).replace(sa, "%2F")
}
function Mn(e) {
  try {
    return decodeURIComponent("" + e)
  } catch {}
  return "" + e
}
function ga(e) {
  const t = {}
  if (e === "" || e === "?") return t
  const s = (e[0] === "?" ? e.slice(1) : e).split("&")
  for (let r = 0; r < s.length; ++r) {
    const i = s[r].replace(xo, " "),
      o = i.indexOf("="),
      c = Mn(o < 0 ? i : i.slice(0, o)),
      l = o < 0 ? null : Mn(i.slice(o + 1))
    if (c in t) {
      let a = t[c]
      Array.isArray(a) || (a = t[c] = [a]), a.push(l)
    } else t[c] = l
  }
  return t
}
function Zr(e) {
  let t = ""
  for (let n in e) {
    const s = e[n]
    if (((n = ha(n)), s == null)) {
      s !== void 0 && (t += (t.length ? "&" : "") + n)
      continue
    }
    ;(Array.isArray(s) ? s.map(i => i && Ts(i)) : [s && Ts(s)]).forEach(i => {
      i !== void 0 &&
        ((t += (t.length ? "&" : "") + n), i != null && (t += "=" + i))
    })
  }
  return t
}
function ma(e) {
  const t = {}
  for (const n in e) {
    const s = e[n]
    s !== void 0 &&
      (t[n] = Array.isArray(s)
        ? s.map(r => (r == null ? null : "" + r))
        : s == null
        ? s
        : "" + s)
  }
  return t
}
function zt() {
  let e = []
  function t(s) {
    return (
      e.push(s),
      () => {
        const r = e.indexOf(s)
        r > -1 && e.splice(r, 1)
      }
    )
  }
  function n() {
    e = []
  }
  return { add: t, list: () => e, reset: n }
}
function ot(e, t, n, s, r) {
  const i = s && (s.enterCallbacks[r] = s.enterCallbacks[r] || [])
  return () =>
    new Promise((o, c) => {
      const l = p => {
          p === !1
            ? c($t(4, { from: n, to: t }))
            : p instanceof Error
            ? c(p)
            : Du(p)
            ? c($t(2, { from: t, to: p }))
            : (i &&
                s.enterCallbacks[r] === i &&
                typeof p == "function" &&
                i.push(p),
              o())
        },
        a = e.call(s && s.instances[r], t, n, l)
      let f = Promise.resolve(a)
      e.length < 3 && (f = f.then(l)), f.catch(p => c(p))
    })
}
function us(e, t, n, s) {
  const r = []
  for (const i of e)
    for (const o in i.components) {
      let c = i.components[o]
      if (!(t !== "beforeRouteEnter" && !i.instances[o]))
        if (ya(c)) {
          const a = (c.__vccOpts || c)[t]
          a && r.push(ot(a, n, s, i, o))
        } else {
          let l = c()
          r.push(() =>
            l.then(a => {
              if (!a)
                return Promise.reject(
                  new Error(`Couldn't resolve component "${o}" at "${i.path}"`)
                )
              const f = Cu(a) ? a.default : a
              i.components[o] = f
              const d = (f.__vccOpts || f)[t]
              return d && ot(d, n, s, i, o)()
            })
          )
        }
    }
  return r
}
function ya(e) {
  return (
    typeof e == "object" ||
    "displayName" in e ||
    "props" in e ||
    "__vccOpts" in e
  )
}
function Gr(e) {
  const t = Ve(Xn),
    n = Ve(yo),
    s = Be(() => t.resolve(vt(e.to))),
    r = Be(() => {
      const { matched: l } = s.value,
        { length: a } = l,
        f = l[a - 1],
        p = n.matched
      if (!f || !p.length) return -1
      const d = p.findIndex(Ft.bind(null, f))
      if (d > -1) return d
      const b = ei(l[a - 2])
      return a > 1 && ei(f) === b && p[p.length - 1].path !== b
        ? p.findIndex(Ft.bind(null, l[a - 2]))
        : d
    }),
    i = Be(() => r.value > -1 && wa(n.params, s.value.params)),
    o = Be(
      () =>
        r.value > -1 &&
        r.value === n.matched.length - 1 &&
        _o(n.params, s.value.params)
    )
  function c(l = {}) {
    return va(l)
      ? t[vt(e.replace) ? "replace" : "push"](vt(e.to)).catch(tn)
      : Promise.resolve()
  }
  return {
    route: s,
    href: Be(() => s.value.href),
    isActive: i,
    isExactActive: o,
    navigate: c,
  }
}
const _a = Yi({
    name: "RouterLink",
    props: {
      to: { type: [String, Object], required: !0 },
      replace: Boolean,
      activeClass: String,
      exactActiveClass: String,
      custom: Boolean,
      ariaCurrentValue: { type: String, default: "page" },
    },
    useLink: Gr,
    setup(e, { slots: t }) {
      const n = Kt(Gr(e)),
        { options: s } = Ve(Xn),
        r = Be(() => ({
          [ti(e.activeClass, s.linkActiveClass, "router-link-active")]:
            n.isActive,
          [ti(
            e.exactActiveClass,
            s.linkExactActiveClass,
            "router-link-exact-active"
          )]: n.isExactActive,
        }))
      return () => {
        const i = t.default && t.default(n)
        return e.custom
          ? i
          : ho(
              "a",
              {
                "aria-current": n.isExactActive ? e.ariaCurrentValue : null,
                href: n.href,
                onClick: n.navigate,
                class: r.value,
              },
              i
            )
      }
    },
  }),
  ba = _a
function va(e) {
  if (
    !(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) &&
    !e.defaultPrevented &&
    !(e.button !== void 0 && e.button !== 0)
  ) {
    if (e.currentTarget && e.currentTarget.getAttribute) {
      const t = e.currentTarget.getAttribute("target")
      if (/\b_blank\b/i.test(t)) return
    }
    return e.preventDefault && e.preventDefault(), !0
  }
}
function wa(e, t) {
  for (const n in t) {
    const s = t[n],
      r = e[n]
    if (typeof s == "string") {
      if (s !== r) return !1
    } else if (
      !Array.isArray(r) ||
      r.length !== s.length ||
      s.some((i, o) => i !== r[o])
    )
      return !1
  }
  return !0
}
function ei(e) {
  return e ? (e.aliasOf ? e.aliasOf.path : e.path) : ""
}
const ti = (e, t, n) => (e != null ? e : t != null ? t : n),
  Ea = Yi({
    name: "RouterView",
    inheritAttrs: !1,
    props: { name: { type: String, default: "default" }, route: Object },
    compatConfig: { MODE: 3 },
    setup(e, { attrs: t, slots: n }) {
      const s = Ve(Os),
        r = Be(() => e.route || s.value),
        i = Ve(jr, 0),
        o = Be(() => r.value.matched[i])
      Rn(jr, i + 1), Rn(Eu, o), Rn(Os, r)
      const c = Me()
      return (
        Gt(
          () => [c.value, o.value, e.name],
          ([l, a, f], [p, d, b]) => {
            a &&
              ((a.instances[f] = l),
              d &&
                d !== a &&
                l &&
                l === p &&
                (a.leaveGuards.size || (a.leaveGuards = d.leaveGuards),
                a.updateGuards.size || (a.updateGuards = d.updateGuards))),
              l &&
                a &&
                (!d || !Ft(a, d) || !p) &&
                (a.enterCallbacks[f] || []).forEach(x => x(l))
          },
          { flush: "post" }
        ),
        () => {
          const l = r.value,
            a = o.value,
            f = a && a.components[e.name],
            p = e.name
          if (!f) return ni(n.default, { Component: f, route: l })
          const d = a.props[e.name],
            b = d
              ? d === !0
                ? l.params
                : typeof d == "function"
                ? d(l)
                : d
              : null,
            N = ho(
              f,
              se({}, b, t, {
                onVnodeUnmounted: O => {
                  O.component.isUnmounted && (a.instances[p] = null)
                },
                ref: c,
              })
            )
          return ni(n.default, { Component: N, route: l }) || N
        }
      )
    },
  })
function ni(e, t) {
  if (!e) return null
  const n = e(t)
  return n.length === 1 ? n[0] : n
}
const Oo = Ea
function Ca(e) {
  const t = Qu(e.routes, e),
    n = e.parseQuery || ga,
    s = e.stringifyQuery || Zr,
    r = e.history,
    i = zt(),
    o = zt(),
    c = zt(),
    l = Mc(nt)
  let a = nt
  Tt &&
    e.scrollBehavior &&
    "scrollRestoration" in history &&
    (history.scrollRestoration = "manual")
  const f = cs.bind(null, m => "" + m),
    p = cs.bind(null, pa),
    d = cs.bind(null, Mn)
  function b(m, k) {
    let R, I
    return (
      vo(m) ? ((R = t.getRecordMatcher(m)), (I = k)) : (I = m), t.addRoute(I, R)
    )
  }
  function x(m) {
    const k = t.getRecordMatcher(m)
    k && t.removeRoute(k)
  }
  function N() {
    return t.getRoutes().map(m => m.record)
  }
  function O(m) {
    return !!t.getRecordMatcher(m)
  }
  function S(m, k) {
    if (((k = se({}, k || l.value)), typeof m == "string")) {
      const H = ls(n, m, k.path),
        u = t.resolve({ path: H.path }, k),
        h = r.createHref(H.fullPath)
      return se(H, u, {
        params: d(u.params),
        hash: Mn(H.hash),
        redirectedFrom: void 0,
        href: h,
      })
    }
    let R
    if ("path" in m) R = se({}, m, { path: ls(n, m.path, k.path).path })
    else {
      const H = se({}, m.params)
      for (const u in H) H[u] == null && delete H[u]
      ;(R = se({}, m, { params: p(m.params) })), (k.params = p(k.params))
    }
    const I = t.resolve(R, k),
      ee = m.hash || ""
    I.params = f(d(I.params))
    const oe = Au(s, se({}, m, { hash: fa(ee), path: I.path })),
      D = r.createHref(oe)
    return se(
      { fullPath: oe, hash: ee, query: s === Zr ? ma(m.query) : m.query || {} },
      I,
      { redirectedFrom: void 0, href: D }
    )
  }
  function M(m) {
    return typeof m == "string" ? ls(n, m, l.value.path) : se({}, m)
  }
  function j(m, k) {
    if (a !== m) return $t(8, { from: k, to: m })
  }
  function V(m) {
    return q(m)
  }
  function J(m) {
    return V(se(M(m), { replace: !0 }))
  }
  function ue(m) {
    const k = m.matched[m.matched.length - 1]
    if (k && k.redirect) {
      const { redirect: R } = k
      let I = typeof R == "function" ? R(m) : R
      return (
        typeof I == "string" &&
          ((I = I.includes("?") || I.includes("#") ? (I = M(I)) : { path: I }),
          (I.params = {})),
        se({ query: m.query, hash: m.hash, params: m.params }, I)
      )
    }
  }
  function q(m, k) {
    const R = (a = S(m)),
      I = l.value,
      ee = m.state,
      oe = m.force,
      D = m.replace === !0,
      H = ue(R)
    if (H) return q(se(M(H), { state: ee, force: oe, replace: D }), k || R)
    const u = R
    u.redirectedFrom = k
    let h
    return (
      !oe &&
        Su(s, I, R) &&
        ((h = $t(16, { to: u, from: I })), Ct(I, I, !0, !1)),
      (h ? Promise.resolve(h) : z(u, I))
        .catch(g => (st(g) ? (st(g, 2) ? g : Ce(g)) : ie(g, u, I)))
        .then(g => {
          if (g) {
            if (st(g, 2))
              return q(
                se(M(g.to), { state: ee, force: oe, replace: D }),
                k || u
              )
          } else g = le(u, I, !0, D, ee)
          return Z(u, I, g), g
        })
    )
  }
  function T(m, k) {
    const R = j(m, k)
    return R ? Promise.reject(R) : Promise.resolve()
  }
  function z(m, k) {
    let R
    const [I, ee, oe] = xa(m, k)
    R = us(I.reverse(), "beforeRouteLeave", m, k)
    for (const H of I)
      H.leaveGuards.forEach(u => {
        R.push(ot(u, m, k))
      })
    const D = T.bind(null, m, k)
    return (
      R.push(D),
      Rt(R)
        .then(() => {
          R = []
          for (const H of i.list()) R.push(ot(H, m, k))
          return R.push(D), Rt(R)
        })
        .then(() => {
          R = us(ee, "beforeRouteUpdate", m, k)
          for (const H of ee)
            H.updateGuards.forEach(u => {
              R.push(ot(u, m, k))
            })
          return R.push(D), Rt(R)
        })
        .then(() => {
          R = []
          for (const H of m.matched)
            if (H.beforeEnter && !k.matched.includes(H))
              if (Array.isArray(H.beforeEnter))
                for (const u of H.beforeEnter) R.push(ot(u, m, k))
              else R.push(ot(H.beforeEnter, m, k))
          return R.push(D), Rt(R)
        })
        .then(
          () => (
            m.matched.forEach(H => (H.enterCallbacks = {})),
            (R = us(oe, "beforeRouteEnter", m, k)),
            R.push(D),
            Rt(R)
          )
        )
        .then(() => {
          R = []
          for (const H of o.list()) R.push(ot(H, m, k))
          return R.push(D), Rt(R)
        })
        .catch(H => (st(H, 8) ? H : Promise.reject(H)))
    )
  }
  function Z(m, k, R) {
    for (const I of c.list()) I(m, k, R)
  }
  function le(m, k, R, I, ee) {
    const oe = j(m, k)
    if (oe) return oe
    const D = k === nt,
      H = Tt ? history.state : {}
    R &&
      (I || D
        ? r.replace(m.fullPath, se({ scroll: D && H && H.scroll }, ee))
        : r.push(m.fullPath, ee)),
      (l.value = m),
      Ct(m, k, R, D),
      Ce()
  }
  let he
  function Ee() {
    he ||
      (he = r.listen((m, k, R) => {
        const I = S(m),
          ee = ue(I)
        if (ee) {
          q(se(ee, { replace: !0 }), I).catch(tn)
          return
        }
        a = I
        const oe = l.value
        Tt && Bu(zr(oe.fullPath, R.delta), Qn()),
          z(I, oe)
            .catch(D =>
              st(D, 12)
                ? D
                : st(D, 2)
                ? (q(D.to, I)
                    .then(H => {
                      st(H, 20) && !R.delta && R.type === dn.pop && r.go(-1, !1)
                    })
                    .catch(tn),
                  Promise.reject())
                : (R.delta && r.go(-R.delta, !1), ie(D, I, oe))
            )
            .then(D => {
              ;(D = D || le(I, oe, !1)),
                D &&
                  (R.delta
                    ? r.go(-R.delta, !1)
                    : R.type === dn.pop && st(D, 20) && r.go(-1, !1)),
                Z(I, oe, D)
            })
            .catch(tn)
      }))
  }
  let ve = zt(),
    de = zt(),
    pe
  function ie(m, k, R) {
    Ce(m)
    const I = de.list()
    return (
      I.length ? I.forEach(ee => ee(m, k, R)) : console.error(m),
      Promise.reject(m)
    )
  }
  function G() {
    return pe && l.value !== nt
      ? Promise.resolve()
      : new Promise((m, k) => {
          ve.add([m, k])
        })
  }
  function Ce(m) {
    return (
      pe ||
        ((pe = !m),
        Ee(),
        ve.list().forEach(([k, R]) => (m ? R(m) : k())),
        ve.reset()),
      m
    )
  }
  function Ct(m, k, R, I) {
    const { scrollBehavior: ee } = e
    if (!Tt || !ee) return Promise.resolve()
    const oe =
      (!R && Mu(zr(m.fullPath, 0))) ||
      ((I || !R) && history.state && history.state.scroll) ||
      null
    return Zs()
      .then(() => ee(m, k, oe))
      .then(D => D && Lu(D))
      .catch(D => ie(D, m, k))
  }
  const Ye = m => r.go(m)
  let He
  const Oe = new Set()
  return {
    currentRoute: l,
    addRoute: b,
    removeRoute: x,
    hasRoute: O,
    getRoutes: N,
    resolve: S,
    options: e,
    push: V,
    replace: J,
    go: Ye,
    back: () => Ye(-1),
    forward: () => Ye(1),
    beforeEach: i.add,
    beforeResolve: o.add,
    afterEach: c.add,
    onError: de.add,
    isReady: G,
    install(m) {
      const k = this
      m.component("RouterLink", ba),
        m.component("RouterView", Oo),
        (m.config.globalProperties.$router = k),
        Object.defineProperty(m.config.globalProperties, "$route", {
          enumerable: !0,
          get: () => vt(l),
        }),
        Tt &&
          !He &&
          l.value === nt &&
          ((He = !0), V(r.location).catch(ee => {}))
      const R = {}
      for (const ee in nt) R[ee] = Be(() => l.value[ee])
      m.provide(Xn, k), m.provide(yo, Kt(R)), m.provide(Os, l)
      const I = m.unmount
      Oe.add(m),
        (m.unmount = function () {
          Oe.delete(m),
            Oe.size < 1 &&
              ((a = nt),
              he && he(),
              (he = null),
              (l.value = nt),
              (He = !1),
              (pe = !1)),
            I()
        })
    },
  }
}
function Rt(e) {
  return e.reduce((t, n) => t.then(() => n()), Promise.resolve())
}
function xa(e, t) {
  const n = [],
    s = [],
    r = [],
    i = Math.max(t.matched.length, e.matched.length)
  for (let o = 0; o < i; o++) {
    const c = t.matched[o]
    c && (e.matched.find(a => Ft(a, c)) ? s.push(c) : n.push(c))
    const l = e.matched[o]
    l && (t.matched.find(a => Ft(a, l)) || r.push(l))
  }
  return [n, s, r]
}
function cr() {
  return Ve(Xn)
}
const Ra = {
  name: "App",
  setup(e) {
    return (t, n) => (wt(), Ml(vt(Oo)))
  },
}
var Zn = (e, t) => {
  const n = e.__vccOpts || e
  for (const [s, r] of t) n[s] = r
  return n
}
const Aa = {},
  Sa = { width: "1.8em", height: "1.8em", viewBox: "0 0 32 32" },
  Oa = K(
    "path",
    {
      d: "m27.45 15.11l-22-11a1 1 0 0 0-1.08.12a1 1 0 0 0-.33 1L7 16L4 26.74A1 1 0 0 0 5 28a1 1 0 0 0 .45-.11l22-11a1 1 0 0 0 0-1.78Zm-20.9 10L8.76 17H18v-2H8.76L6.55 6.89L24.76 16Z",
    },
    null,
    -1
  ),
  Pa = [Oa]
function Ta(e, t) {
  return wt(), It("svg", Sa, Pa)
}
var ka = Zn(Aa, [["render", Ta]]),
  Na = !1
/*!
 * pinia v2.0.14
 * (c) 2022 Eduardo San Martin Morote
 * @license MIT
 */ let Po
const Gn = e => (Po = e),
  To = Symbol()
function ks(e) {
  return (
    e &&
    typeof e == "object" &&
    Object.prototype.toString.call(e) === "[object Object]" &&
    typeof e.toJSON != "function"
  )
}
var sn
;(function (e) {
  ;(e.direct = "direct"),
    (e.patchObject = "patch object"),
    (e.patchFunction = "patch function")
})(sn || (sn = {}))
function Ia() {
  const e = vi(!0),
    t = e.run(() => Me({}))
  let n = [],
    s = []
  const r = Bt({
    install(i) {
      Gn(r),
        (r._a = i),
        i.provide(To, r),
        (i.config.globalProperties.$pinia = r),
        s.forEach(o => n.push(o)),
        (s = [])
    },
    use(i) {
      return !this._a && !Na ? s.push(i) : n.push(i), this
    },
    _p: n,
    _a: null,
    _e: e,
    _s: new Map(),
    state: t,
  })
  return r
}
const ko = () => {}
function si(e, t, n, s = ko) {
  e.push(t)
  const r = () => {
    const i = e.indexOf(t)
    i > -1 && (e.splice(i, 1), s())
  }
  return !n && ir() && tr(r), r
}
function At(e, ...t) {
  e.slice().forEach(n => {
    n(...t)
  })
}
function Ns(e, t) {
  for (const n in t) {
    if (!t.hasOwnProperty(n)) continue
    const s = t[n],
      r = e[n]
    ks(r) && ks(s) && e.hasOwnProperty(n) && !ae(s) && !ut(s)
      ? (e[n] = Ns(r, s))
      : (e[n] = s)
  }
  return e
}
const La = Symbol()
function Ba(e) {
  return !ks(e) || !e.hasOwnProperty(La)
}
const { assign: Je } = Object
function Ma(e) {
  return !!(ae(e) && e.effect)
}
function Fa(e, t, n, s) {
  const { state: r, actions: i, getters: o } = t,
    c = n.state.value[e]
  let l
  function a() {
    c || (n.state.value[e] = r ? r() : {})
    const f = Hc(n.state.value[e])
    return Je(
      f,
      i,
      Object.keys(o || {}).reduce(
        (p, d) => (
          (p[d] = Bt(
            Be(() => {
              Gn(n)
              const b = n._s.get(e)
              return o[d].call(b, b)
            })
          )),
          p
        ),
        {}
      )
    )
  }
  return (
    (l = No(e, a, t, n, s, !0)),
    (l.$reset = function () {
      const p = r ? r() : {}
      this.$patch(d => {
        Je(d, p)
      })
    }),
    l
  )
}
function No(e, t, n = {}, s, r, i) {
  let o
  const c = Je({ actions: {} }, n),
    l = { deep: !0 }
  let a,
    f,
    p = Bt([]),
    d = Bt([]),
    b
  const x = s.state.value[e]
  !i && !x && (s.state.value[e] = {}), Me({})
  let N
  function O(q) {
    let T
    ;(a = f = !1),
      typeof q == "function"
        ? (q(s.state.value[e]),
          (T = { type: sn.patchFunction, storeId: e, events: b }))
        : (Ns(s.state.value[e], q),
          (T = { type: sn.patchObject, payload: q, storeId: e, events: b }))
    const z = (N = Symbol())
    Zs().then(() => {
      N === z && (a = !0)
    }),
      (f = !0),
      At(p, T, s.state.value[e])
  }
  const S = ko
  function M() {
    o.stop(), (p = []), (d = []), s._s.delete(e)
  }
  function j(q, T) {
    return function () {
      Gn(s)
      const z = Array.from(arguments),
        Z = [],
        le = []
      function he(de) {
        Z.push(de)
      }
      function Ee(de) {
        le.push(de)
      }
      At(d, { args: z, name: q, store: J, after: he, onError: Ee })
      let ve
      try {
        ve = T.apply(this && this.$id === e ? this : J, z)
      } catch (de) {
        throw (At(le, de), de)
      }
      return ve instanceof Promise
        ? ve
            .then(de => (At(Z, de), de))
            .catch(de => (At(le, de), Promise.reject(de)))
        : (At(Z, ve), ve)
    }
  }
  const V = {
      _p: s,
      $id: e,
      $onAction: si.bind(null, d),
      $patch: O,
      $reset: S,
      $subscribe(q, T = {}) {
        const z = si(p, q, T.detached, () => Z()),
          Z = o.run(() =>
            Gt(
              () => s.state.value[e],
              le => {
                ;(T.flush === "sync" ? f : a) &&
                  q({ storeId: e, type: sn.direct, events: b }, le)
              },
              Je({}, l, T)
            )
          )
        return z
      },
      $dispose: M,
    },
    J = Kt(Je({}, V))
  s._s.set(e, J)
  const ue = s._e.run(() => ((o = vi()), o.run(() => t())))
  for (const q in ue) {
    const T = ue[q]
    if ((ae(T) && !Ma(T)) || ut(T))
      i ||
        (x && Ba(T) && (ae(T) ? (T.value = x[q]) : Ns(T, x[q])),
        (s.state.value[e][q] = T))
    else if (typeof T == "function") {
      const z = j(q, T)
      ;(ue[q] = z), (c.actions[q] = T)
    }
  }
  return (
    Je(J, ue),
    Je(Q(J), ue),
    Object.defineProperty(J, "$state", {
      get: () => s.state.value[e],
      set: q => {
        O(T => {
          Je(T, q)
        })
      },
    }),
    s._p.forEach(q => {
      Je(
        J,
        o.run(() => q({ store: J, app: s._a, pinia: s, options: c }))
      )
    }),
    x && i && n.hydrate && n.hydrate(J.$state, x),
    (a = !0),
    (f = !0),
    J
  )
}
function $a(e, t, n) {
  let s, r
  const i = typeof t == "function"
  typeof e == "string" ? ((s = e), (r = i ? n : t)) : ((r = e), (s = e.id))
  function o(c, l) {
    const a = ir()
    return (
      (c = c || (a && Ve(To))),
      c && Gn(c),
      (c = Po),
      c._s.has(s) || (i ? No(s, t, r, c) : Fa(s, r, c)),
      c._s.get(s)
    )
  }
  return (o.$id = s), o
}
const Io = $a("user", {
    state: () => ({ user: JSON.parse(localStorage.getItem("user")) }),
    actions: {
      toggleUserLoggedInState(e) {
        ;(this.user = e), localStorage.setItem("user", JSON.stringify(e))
      },
    },
  }),
  We = Object.create(null)
We.open = "0"
We.close = "1"
We.ping = "2"
We.pong = "3"
We.message = "4"
We.upgrade = "5"
We.noop = "6"
const On = Object.create(null)
Object.keys(We).forEach(e => {
  On[We[e]] = e
})
const Ha = { type: "error", data: "parser error" },
  Ua =
    typeof Blob == "function" ||
    (typeof Blob != "undefined" &&
      Object.prototype.toString.call(Blob) === "[object BlobConstructor]"),
  Da = typeof ArrayBuffer == "function",
  Ka = e =>
    typeof ArrayBuffer.isView == "function"
      ? ArrayBuffer.isView(e)
      : e && e.buffer instanceof ArrayBuffer,
  Lo = ({ type: e, data: t }, n, s) =>
    Ua && t instanceof Blob
      ? n
        ? s(t)
        : ri(t, s)
      : Da && (t instanceof ArrayBuffer || Ka(t))
      ? n
        ? s(t)
        : ri(new Blob([t]), s)
      : s(We[e] + (t || "")),
  ri = (e, t) => {
    const n = new FileReader()
    return (
      (n.onload = function () {
        const s = n.result.split(",")[1]
        t("b" + s)
      }),
      n.readAsDataURL(e)
    )
  },
  ii = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
  Xt = typeof Uint8Array == "undefined" ? [] : new Uint8Array(256)
for (let e = 0; e < ii.length; e++) Xt[ii.charCodeAt(e)] = e
const ja = e => {
    let t = e.length * 0.75,
      n = e.length,
      s,
      r = 0,
      i,
      o,
      c,
      l
    e[e.length - 1] === "=" && (t--, e[e.length - 2] === "=" && t--)
    const a = new ArrayBuffer(t),
      f = new Uint8Array(a)
    for (s = 0; s < n; s += 4)
      (i = Xt[e.charCodeAt(s)]),
        (o = Xt[e.charCodeAt(s + 1)]),
        (c = Xt[e.charCodeAt(s + 2)]),
        (l = Xt[e.charCodeAt(s + 3)]),
        (f[r++] = (i << 2) | (o >> 4)),
        (f[r++] = ((o & 15) << 4) | (c >> 2)),
        (f[r++] = ((c & 3) << 6) | (l & 63))
    return a
  },
  qa = typeof ArrayBuffer == "function",
  Bo = (e, t) => {
    if (typeof e != "string") return { type: "message", data: Mo(e, t) }
    const n = e.charAt(0)
    return n === "b"
      ? { type: "message", data: Va(e.substring(1), t) }
      : On[n]
      ? e.length > 1
        ? { type: On[n], data: e.substring(1) }
        : { type: On[n] }
      : Ha
  },
  Va = (e, t) => {
    if (qa) {
      const n = ja(e)
      return Mo(n, t)
    } else return { base64: !0, data: e }
  },
  Mo = (e, t) => {
    switch (t) {
      case "blob":
        return e instanceof ArrayBuffer ? new Blob([e]) : e
      case "arraybuffer":
      default:
        return e
    }
  },
  Fo = String.fromCharCode(30),
  za = (e, t) => {
    const n = e.length,
      s = new Array(n)
    let r = 0
    e.forEach((i, o) => {
      Lo(i, !1, c => {
        ;(s[o] = c), ++r === n && t(s.join(Fo))
      })
    })
  },
  Wa = (e, t) => {
    const n = e.split(Fo),
      s = []
    for (let r = 0; r < n.length; r++) {
      const i = Bo(n[r], t)
      if ((s.push(i), i.type === "error")) break
    }
    return s
  },
  $o = 4
function fe(e) {
  if (e) return Ya(e)
}
function Ya(e) {
  for (var t in fe.prototype) e[t] = fe.prototype[t]
  return e
}
fe.prototype.on = fe.prototype.addEventListener = function (e, t) {
  return (
    (this._callbacks = this._callbacks || {}),
    (this._callbacks["$" + e] = this._callbacks["$" + e] || []).push(t),
    this
  )
}
fe.prototype.once = function (e, t) {
  function n() {
    this.off(e, n), t.apply(this, arguments)
  }
  return (n.fn = t), this.on(e, n), this
}
fe.prototype.off =
  fe.prototype.removeListener =
  fe.prototype.removeAllListeners =
  fe.prototype.removeEventListener =
    function (e, t) {
      if (((this._callbacks = this._callbacks || {}), arguments.length == 0))
        return (this._callbacks = {}), this
      var n = this._callbacks["$" + e]
      if (!n) return this
      if (arguments.length == 1) return delete this._callbacks["$" + e], this
      for (var s, r = 0; r < n.length; r++)
        if (((s = n[r]), s === t || s.fn === t)) {
          n.splice(r, 1)
          break
        }
      return n.length === 0 && delete this._callbacks["$" + e], this
    }
fe.prototype.emit = function (e) {
  this._callbacks = this._callbacks || {}
  for (
    var t = new Array(arguments.length - 1),
      n = this._callbacks["$" + e],
      s = 1;
    s < arguments.length;
    s++
  )
    t[s - 1] = arguments[s]
  if (n) {
    n = n.slice(0)
    for (var s = 0, r = n.length; s < r; ++s) n[s].apply(this, t)
  }
  return this
}
fe.prototype.emitReserved = fe.prototype.emit
fe.prototype.listeners = function (e) {
  return (
    (this._callbacks = this._callbacks || {}), this._callbacks["$" + e] || []
  )
}
fe.prototype.hasListeners = function (e) {
  return !!this.listeners(e).length
}
const ct = (() =>
  typeof self != "undefined"
    ? self
    : typeof window != "undefined"
    ? window
    : Function("return this")())()
function Ho(e, ...t) {
  return t.reduce((n, s) => (e.hasOwnProperty(s) && (n[s] = e[s]), n), {})
}
const Ja = setTimeout,
  Xa = clearTimeout
function es(e, t) {
  t.useNativeTimers
    ? ((e.setTimeoutFn = Ja.bind(ct)), (e.clearTimeoutFn = Xa.bind(ct)))
    : ((e.setTimeoutFn = setTimeout.bind(ct)),
      (e.clearTimeoutFn = clearTimeout.bind(ct)))
}
const Qa = 1.33
function Za(e) {
  return typeof e == "string" ? Ga(e) : Math.ceil((e.byteLength || e.size) * Qa)
}
function Ga(e) {
  let t = 0,
    n = 0
  for (let s = 0, r = e.length; s < r; s++)
    (t = e.charCodeAt(s)),
      t < 128
        ? (n += 1)
        : t < 2048
        ? (n += 2)
        : t < 55296 || t >= 57344
        ? (n += 3)
        : (s++, (n += 4))
  return n
}
class ef extends Error {
  constructor(t, n, s) {
    super(t),
      (this.description = n),
      (this.context = s),
      (this.type = "TransportError")
  }
}
class Uo extends fe {
  constructor(t) {
    super(),
      (this.writable = !1),
      es(this, t),
      (this.opts = t),
      (this.query = t.query),
      (this.readyState = ""),
      (this.socket = t.socket)
  }
  onError(t, n, s) {
    return super.emitReserved("error", new ef(t, n, s)), this
  }
  open() {
    return (
      (this.readyState === "closed" || this.readyState === "") &&
        ((this.readyState = "opening"), this.doOpen()),
      this
    )
  }
  close() {
    return (
      (this.readyState === "opening" || this.readyState === "open") &&
        (this.doClose(), this.onClose()),
      this
    )
  }
  send(t) {
    this.readyState === "open" && this.write(t)
  }
  onOpen() {
    ;(this.readyState = "open"),
      (this.writable = !0),
      super.emitReserved("open")
  }
  onData(t) {
    const n = Bo(t, this.socket.binaryType)
    this.onPacket(n)
  }
  onPacket(t) {
    super.emitReserved("packet", t)
  }
  onClose(t) {
    ;(this.readyState = "closed"), super.emitReserved("close", t)
  }
}
const Do =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_".split(
      ""
    ),
  Is = 64,
  tf = {}
let oi = 0,
  wn = 0,
  ci
function li(e) {
  let t = ""
  do (t = Do[e % Is] + t), (e = Math.floor(e / Is))
  while (e > 0)
  return t
}
function Ko() {
  const e = li(+new Date())
  return e !== ci ? ((oi = 0), (ci = e)) : e + "." + li(oi++)
}
for (; wn < Is; wn++) tf[Do[wn]] = wn
function jo(e) {
  let t = ""
  for (let n in e)
    e.hasOwnProperty(n) &&
      (t.length && (t += "&"),
      (t += encodeURIComponent(n) + "=" + encodeURIComponent(e[n])))
  return t
}
function nf(e) {
  let t = {},
    n = e.split("&")
  for (let s = 0, r = n.length; s < r; s++) {
    let i = n[s].split("=")
    t[decodeURIComponent(i[0])] = decodeURIComponent(i[1])
  }
  return t
}
let qo = !1
try {
  qo =
    typeof XMLHttpRequest != "undefined" &&
    "withCredentials" in new XMLHttpRequest()
} catch {}
const sf = qo
function Vo(e) {
  const t = e.xdomain
  try {
    if (typeof XMLHttpRequest != "undefined" && (!t || sf))
      return new XMLHttpRequest()
  } catch {}
  if (!t)
    try {
      return new ct[["Active"].concat("Object").join("X")]("Microsoft.XMLHTTP")
    } catch {}
}
function rf() {}
const of = (function () {
  return new Vo({ xdomain: !1 }).responseType != null
})()
class cf extends Uo {
  constructor(t) {
    if ((super(t), (this.polling = !1), typeof location != "undefined")) {
      const s = location.protocol === "https:"
      let r = location.port
      r || (r = s ? "443" : "80"),
        (this.xd =
          (typeof location != "undefined" &&
            t.hostname !== location.hostname) ||
          r !== t.port),
        (this.xs = t.secure !== s)
    }
    const n = t && t.forceBase64
    this.supportsBinary = of && !n
  }
  get name() {
    return "polling"
  }
  doOpen() {
    this.poll()
  }
  pause(t) {
    this.readyState = "pausing"
    const n = () => {
      ;(this.readyState = "paused"), t()
    }
    if (this.polling || !this.writable) {
      let s = 0
      this.polling &&
        (s++,
        this.once("pollComplete", function () {
          --s || n()
        })),
        this.writable ||
          (s++,
          this.once("drain", function () {
            --s || n()
          }))
    } else n()
  }
  poll() {
    ;(this.polling = !0), this.doPoll(), this.emitReserved("poll")
  }
  onData(t) {
    const n = s => {
      if (
        (this.readyState === "opening" && s.type === "open" && this.onOpen(),
        s.type === "close")
      )
        return (
          this.onClose({ description: "transport closed by the server" }), !1
        )
      this.onPacket(s)
    }
    Wa(t, this.socket.binaryType).forEach(n),
      this.readyState !== "closed" &&
        ((this.polling = !1),
        this.emitReserved("pollComplete"),
        this.readyState === "open" && this.poll())
  }
  doClose() {
    const t = () => {
      this.write([{ type: "close" }])
    }
    this.readyState === "open" ? t() : this.once("open", t)
  }
  write(t) {
    ;(this.writable = !1),
      za(t, n => {
        this.doWrite(n, () => {
          ;(this.writable = !0), this.emitReserved("drain")
        })
      })
  }
  uri() {
    let t = this.query || {}
    const n = this.opts.secure ? "https" : "http"
    let s = ""
    this.opts.timestampRequests !== !1 && (t[this.opts.timestampParam] = Ko()),
      !this.supportsBinary && !t.sid && (t.b64 = 1),
      this.opts.port &&
        ((n === "https" && Number(this.opts.port) !== 443) ||
          (n === "http" && Number(this.opts.port) !== 80)) &&
        (s = ":" + this.opts.port)
    const r = jo(t),
      i = this.opts.hostname.indexOf(":") !== -1
    return (
      n +
      "://" +
      (i ? "[" + this.opts.hostname + "]" : this.opts.hostname) +
      s +
      this.opts.path +
      (r.length ? "?" + r : "")
    )
  }
  request(t = {}) {
    return (
      Object.assign(t, { xd: this.xd, xs: this.xs }, this.opts),
      new ze(this.uri(), t)
    )
  }
  doWrite(t, n) {
    const s = this.request({ method: "POST", data: t })
    s.on("success", n),
      s.on("error", (r, i) => {
        this.onError("xhr post error", r, i)
      })
  }
  doPoll() {
    const t = this.request()
    t.on("data", this.onData.bind(this)),
      t.on("error", (n, s) => {
        this.onError("xhr poll error", n, s)
      }),
      (this.pollXhr = t)
  }
}
class ze extends fe {
  constructor(t, n) {
    super(),
      es(this, n),
      (this.opts = n),
      (this.method = n.method || "GET"),
      (this.uri = t),
      (this.async = n.async !== !1),
      (this.data = n.data !== void 0 ? n.data : null),
      this.create()
  }
  create() {
    const t = Ho(
      this.opts,
      "agent",
      "pfx",
      "key",
      "passphrase",
      "cert",
      "ca",
      "ciphers",
      "rejectUnauthorized",
      "autoUnref"
    )
    ;(t.xdomain = !!this.opts.xd), (t.xscheme = !!this.opts.xs)
    const n = (this.xhr = new Vo(t))
    try {
      n.open(this.method, this.uri, this.async)
      try {
        if (this.opts.extraHeaders) {
          n.setDisableHeaderCheck && n.setDisableHeaderCheck(!0)
          for (let s in this.opts.extraHeaders)
            this.opts.extraHeaders.hasOwnProperty(s) &&
              n.setRequestHeader(s, this.opts.extraHeaders[s])
        }
      } catch {}
      if (this.method === "POST")
        try {
          n.setRequestHeader("Content-type", "text/plain;charset=UTF-8")
        } catch {}
      try {
        n.setRequestHeader("Accept", "*/*")
      } catch {}
      "withCredentials" in n && (n.withCredentials = this.opts.withCredentials),
        this.opts.requestTimeout && (n.timeout = this.opts.requestTimeout),
        (n.onreadystatechange = () => {
          n.readyState === 4 &&
            (n.status === 200 || n.status === 1223
              ? this.onLoad()
              : this.setTimeoutFn(() => {
                  this.onError(typeof n.status == "number" ? n.status : 0)
                }, 0))
        }),
        n.send(this.data)
    } catch (s) {
      this.setTimeoutFn(() => {
        this.onError(s)
      }, 0)
      return
    }
    typeof document != "undefined" &&
      ((this.index = ze.requestsCount++), (ze.requests[this.index] = this))
  }
  onError(t) {
    this.emitReserved("error", t, this.xhr), this.cleanup(!0)
  }
  cleanup(t) {
    if (!(typeof this.xhr == "undefined" || this.xhr === null)) {
      if (((this.xhr.onreadystatechange = rf), t))
        try {
          this.xhr.abort()
        } catch {}
      typeof document != "undefined" && delete ze.requests[this.index],
        (this.xhr = null)
    }
  }
  onLoad() {
    const t = this.xhr.responseText
    t !== null &&
      (this.emitReserved("data", t),
      this.emitReserved("success"),
      this.cleanup())
  }
  abort() {
    this.cleanup()
  }
}
ze.requestsCount = 0
ze.requests = {}
if (typeof document != "undefined") {
  if (typeof attachEvent == "function") attachEvent("onunload", ui)
  else if (typeof addEventListener == "function") {
    const e = "onpagehide" in ct ? "pagehide" : "unload"
    addEventListener(e, ui, !1)
  }
}
function ui() {
  for (let e in ze.requests)
    ze.requests.hasOwnProperty(e) && ze.requests[e].abort()
}
const lf = (() =>
    typeof Promise == "function" && typeof Promise.resolve == "function"
      ? t => Promise.resolve().then(t)
      : (t, n) => n(t, 0))(),
  En = ct.WebSocket || ct.MozWebSocket,
  ai = !0,
  uf = "arraybuffer",
  fi =
    typeof navigator != "undefined" &&
    typeof navigator.product == "string" &&
    navigator.product.toLowerCase() === "reactnative"
class af extends Uo {
  constructor(t) {
    super(t), (this.supportsBinary = !t.forceBase64)
  }
  get name() {
    return "websocket"
  }
  doOpen() {
    if (!this.check()) return
    const t = this.uri(),
      n = this.opts.protocols,
      s = fi
        ? {}
        : Ho(
            this.opts,
            "agent",
            "perMessageDeflate",
            "pfx",
            "key",
            "passphrase",
            "cert",
            "ca",
            "ciphers",
            "rejectUnauthorized",
            "localAddress",
            "protocolVersion",
            "origin",
            "maxPayload",
            "family",
            "checkServerIdentity"
          )
    this.opts.extraHeaders && (s.headers = this.opts.extraHeaders)
    try {
      this.ws = ai && !fi ? (n ? new En(t, n) : new En(t)) : new En(t, n, s)
    } catch (r) {
      return this.emitReserved("error", r)
    }
    ;(this.ws.binaryType = this.socket.binaryType || uf),
      this.addEventListeners()
  }
  addEventListeners() {
    ;(this.ws.onopen = () => {
      this.opts.autoUnref && this.ws._socket.unref(), this.onOpen()
    }),
      (this.ws.onclose = t =>
        this.onClose({
          description: "websocket connection closed",
          context: t,
        })),
      (this.ws.onmessage = t => this.onData(t.data)),
      (this.ws.onerror = t => this.onError("websocket error", t))
  }
  write(t) {
    this.writable = !1
    for (let n = 0; n < t.length; n++) {
      const s = t[n],
        r = n === t.length - 1
      Lo(s, this.supportsBinary, i => {
        const o = {}
        try {
          ai && this.ws.send(i)
        } catch {}
        r &&
          lf(() => {
            ;(this.writable = !0), this.emitReserved("drain")
          }, this.setTimeoutFn)
      })
    }
  }
  doClose() {
    typeof this.ws != "undefined" && (this.ws.close(), (this.ws = null))
  }
  uri() {
    let t = this.query || {}
    const n = this.opts.secure ? "wss" : "ws"
    let s = ""
    this.opts.port &&
      ((n === "wss" && Number(this.opts.port) !== 443) ||
        (n === "ws" && Number(this.opts.port) !== 80)) &&
      (s = ":" + this.opts.port),
      this.opts.timestampRequests && (t[this.opts.timestampParam] = Ko()),
      this.supportsBinary || (t.b64 = 1)
    const r = jo(t),
      i = this.opts.hostname.indexOf(":") !== -1
    return (
      n +
      "://" +
      (i ? "[" + this.opts.hostname + "]" : this.opts.hostname) +
      s +
      this.opts.path +
      (r.length ? "?" + r : "")
    )
  }
  check() {
    return !!En
  }
}
const ff = { websocket: af, polling: cf },
  hf =
    /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,
  df = [
    "source",
    "protocol",
    "authority",
    "userInfo",
    "user",
    "password",
    "host",
    "port",
    "relative",
    "path",
    "directory",
    "file",
    "query",
    "anchor",
  ]
function Ls(e) {
  const t = e,
    n = e.indexOf("["),
    s = e.indexOf("]")
  n != -1 &&
    s != -1 &&
    (e =
      e.substring(0, n) +
      e.substring(n, s).replace(/:/g, ";") +
      e.substring(s, e.length))
  let r = hf.exec(e || ""),
    i = {},
    o = 14
  for (; o--; ) i[df[o]] = r[o] || ""
  return (
    n != -1 &&
      s != -1 &&
      ((i.source = t),
      (i.host = i.host.substring(1, i.host.length - 1).replace(/;/g, ":")),
      (i.authority = i.authority
        .replace("[", "")
        .replace("]", "")
        .replace(/;/g, ":")),
      (i.ipv6uri = !0)),
    (i.pathNames = pf(i, i.path)),
    (i.queryKey = gf(i, i.query)),
    i
  )
}
function pf(e, t) {
  const n = /\/{2,9}/g,
    s = t.replace(n, "/").split("/")
  return (
    (t.substr(0, 1) == "/" || t.length === 0) && s.splice(0, 1),
    t.substr(t.length - 1, 1) == "/" && s.splice(s.length - 1, 1),
    s
  )
}
function gf(e, t) {
  const n = {}
  return (
    t.replace(/(?:^|&)([^&=]*)=?([^&]*)/g, function (s, r, i) {
      r && (n[r] = i)
    }),
    n
  )
}
class Qe extends fe {
  constructor(t, n = {}) {
    super(),
      t && typeof t == "object" && ((n = t), (t = null)),
      t
        ? ((t = Ls(t)),
          (n.hostname = t.host),
          (n.secure = t.protocol === "https" || t.protocol === "wss"),
          (n.port = t.port),
          t.query && (n.query = t.query))
        : n.host && (n.hostname = Ls(n.host).host),
      es(this, n),
      (this.secure =
        n.secure != null
          ? n.secure
          : typeof location != "undefined" && location.protocol === "https:"),
      n.hostname && !n.port && (n.port = this.secure ? "443" : "80"),
      (this.hostname =
        n.hostname ||
        (typeof location != "undefined" ? location.hostname : "localhost")),
      (this.port =
        n.port ||
        (typeof location != "undefined" && location.port
          ? location.port
          : this.secure
          ? "443"
          : "80")),
      (this.transports = n.transports || ["polling", "websocket"]),
      (this.readyState = ""),
      (this.writeBuffer = []),
      (this.prevBufferLen = 0),
      (this.opts = Object.assign(
        {
          path: "/engine.io",
          agent: !1,
          withCredentials: !1,
          upgrade: !0,
          timestampParam: "t",
          rememberUpgrade: !1,
          rejectUnauthorized: !0,
          perMessageDeflate: { threshold: 1024 },
          transportOptions: {},
          closeOnBeforeunload: !0,
        },
        n
      )),
      (this.opts.path = this.opts.path.replace(/\/$/, "") + "/"),
      typeof this.opts.query == "string" &&
        (this.opts.query = nf(this.opts.query)),
      (this.id = null),
      (this.upgrades = null),
      (this.pingInterval = null),
      (this.pingTimeout = null),
      (this.pingTimeoutTimer = null),
      typeof addEventListener == "function" &&
        (this.opts.closeOnBeforeunload &&
          addEventListener(
            "beforeunload",
            () => {
              this.transport &&
                (this.transport.removeAllListeners(), this.transport.close())
            },
            !1
          ),
        this.hostname !== "localhost" &&
          ((this.offlineEventListener = () => {
            this.onClose("transport close", {
              description: "network connection lost",
            })
          }),
          addEventListener("offline", this.offlineEventListener, !1))),
      this.open()
  }
  createTransport(t) {
    const n = Object.assign({}, this.opts.query)
    ;(n.EIO = $o), (n.transport = t), this.id && (n.sid = this.id)
    const s = Object.assign({}, this.opts.transportOptions[t], this.opts, {
      query: n,
      socket: this,
      hostname: this.hostname,
      secure: this.secure,
      port: this.port,
    })
    return new ff[t](s)
  }
  open() {
    let t
    if (
      this.opts.rememberUpgrade &&
      Qe.priorWebsocketSuccess &&
      this.transports.indexOf("websocket") !== -1
    )
      t = "websocket"
    else if (this.transports.length === 0) {
      this.setTimeoutFn(() => {
        this.emitReserved("error", "No transports available")
      }, 0)
      return
    } else t = this.transports[0]
    this.readyState = "opening"
    try {
      t = this.createTransport(t)
    } catch {
      this.transports.shift(), this.open()
      return
    }
    t.open(), this.setTransport(t)
  }
  setTransport(t) {
    this.transport && this.transport.removeAllListeners(),
      (this.transport = t),
      t
        .on("drain", this.onDrain.bind(this))
        .on("packet", this.onPacket.bind(this))
        .on("error", this.onError.bind(this))
        .on("close", n => this.onClose("transport close", n))
  }
  probe(t) {
    let n = this.createTransport(t),
      s = !1
    Qe.priorWebsocketSuccess = !1
    const r = () => {
      s ||
        (n.send([{ type: "ping", data: "probe" }]),
        n.once("packet", p => {
          if (!s)
            if (p.type === "pong" && p.data === "probe") {
              if (
                ((this.upgrading = !0), this.emitReserved("upgrading", n), !n)
              )
                return
              ;(Qe.priorWebsocketSuccess = n.name === "websocket"),
                this.transport.pause(() => {
                  s ||
                    (this.readyState !== "closed" &&
                      (f(),
                      this.setTransport(n),
                      n.send([{ type: "upgrade" }]),
                      this.emitReserved("upgrade", n),
                      (n = null),
                      (this.upgrading = !1),
                      this.flush()))
                })
            } else {
              const d = new Error("probe error")
              ;(d.transport = n.name), this.emitReserved("upgradeError", d)
            }
        }))
    }
    function i() {
      s || ((s = !0), f(), n.close(), (n = null))
    }
    const o = p => {
      const d = new Error("probe error: " + p)
      ;(d.transport = n.name), i(), this.emitReserved("upgradeError", d)
    }
    function c() {
      o("transport closed")
    }
    function l() {
      o("socket closed")
    }
    function a(p) {
      n && p.name !== n.name && i()
    }
    const f = () => {
      n.removeListener("open", r),
        n.removeListener("error", o),
        n.removeListener("close", c),
        this.off("close", l),
        this.off("upgrading", a)
    }
    n.once("open", r),
      n.once("error", o),
      n.once("close", c),
      this.once("close", l),
      this.once("upgrading", a),
      n.open()
  }
  onOpen() {
    if (
      ((this.readyState = "open"),
      (Qe.priorWebsocketSuccess = this.transport.name === "websocket"),
      this.emitReserved("open"),
      this.flush(),
      this.readyState === "open" && this.opts.upgrade && this.transport.pause)
    ) {
      let t = 0
      const n = this.upgrades.length
      for (; t < n; t++) this.probe(this.upgrades[t])
    }
  }
  onPacket(t) {
    if (
      this.readyState === "opening" ||
      this.readyState === "open" ||
      this.readyState === "closing"
    )
      switch (
        (this.emitReserved("packet", t), this.emitReserved("heartbeat"), t.type)
      ) {
        case "open":
          this.onHandshake(JSON.parse(t.data))
          break
        case "ping":
          this.resetPingTimeout(),
            this.sendPacket("pong"),
            this.emitReserved("ping"),
            this.emitReserved("pong")
          break
        case "error":
          const n = new Error("server error")
          ;(n.code = t.data), this.onError(n)
          break
        case "message":
          this.emitReserved("data", t.data),
            this.emitReserved("message", t.data)
          break
      }
  }
  onHandshake(t) {
    this.emitReserved("handshake", t),
      (this.id = t.sid),
      (this.transport.query.sid = t.sid),
      (this.upgrades = this.filterUpgrades(t.upgrades)),
      (this.pingInterval = t.pingInterval),
      (this.pingTimeout = t.pingTimeout),
      (this.maxPayload = t.maxPayload),
      this.onOpen(),
      this.readyState !== "closed" && this.resetPingTimeout()
  }
  resetPingTimeout() {
    this.clearTimeoutFn(this.pingTimeoutTimer),
      (this.pingTimeoutTimer = this.setTimeoutFn(() => {
        this.onClose("ping timeout")
      }, this.pingInterval + this.pingTimeout)),
      this.opts.autoUnref && this.pingTimeoutTimer.unref()
  }
  onDrain() {
    this.writeBuffer.splice(0, this.prevBufferLen),
      (this.prevBufferLen = 0),
      this.writeBuffer.length === 0 ? this.emitReserved("drain") : this.flush()
  }
  flush() {
    if (
      this.readyState !== "closed" &&
      this.transport.writable &&
      !this.upgrading &&
      this.writeBuffer.length
    ) {
      const t = this.getWritablePackets()
      this.transport.send(t),
        (this.prevBufferLen = t.length),
        this.emitReserved("flush")
    }
  }
  getWritablePackets() {
    if (
      !(
        this.maxPayload &&
        this.transport.name === "polling" &&
        this.writeBuffer.length > 1
      )
    )
      return this.writeBuffer
    let n = 1
    for (let s = 0; s < this.writeBuffer.length; s++) {
      const r = this.writeBuffer[s].data
      if ((r && (n += Za(r)), s > 0 && n > this.maxPayload))
        return this.writeBuffer.slice(0, s)
      n += 2
    }
    return this.writeBuffer
  }
  write(t, n, s) {
    return this.sendPacket("message", t, n, s), this
  }
  send(t, n, s) {
    return this.sendPacket("message", t, n, s), this
  }
  sendPacket(t, n, s, r) {
    if (
      (typeof n == "function" && ((r = n), (n = void 0)),
      typeof s == "function" && ((r = s), (s = null)),
      this.readyState === "closing" || this.readyState === "closed")
    )
      return
    ;(s = s || {}), (s.compress = s.compress !== !1)
    const i = { type: t, data: n, options: s }
    this.emitReserved("packetCreate", i),
      this.writeBuffer.push(i),
      r && this.once("flush", r),
      this.flush()
  }
  close() {
    const t = () => {
        this.onClose("forced close"), this.transport.close()
      },
      n = () => {
        this.off("upgrade", n), this.off("upgradeError", n), t()
      },
      s = () => {
        this.once("upgrade", n), this.once("upgradeError", n)
      }
    return (
      (this.readyState === "opening" || this.readyState === "open") &&
        ((this.readyState = "closing"),
        this.writeBuffer.length
          ? this.once("drain", () => {
              this.upgrading ? s() : t()
            })
          : this.upgrading
          ? s()
          : t()),
      this
    )
  }
  onError(t) {
    ;(Qe.priorWebsocketSuccess = !1),
      this.emitReserved("error", t),
      this.onClose("transport error", t)
  }
  onClose(t, n) {
    ;(this.readyState === "opening" ||
      this.readyState === "open" ||
      this.readyState === "closing") &&
      (this.clearTimeoutFn(this.pingTimeoutTimer),
      this.transport.removeAllListeners("close"),
      this.transport.close(),
      this.transport.removeAllListeners(),
      typeof removeEventListener == "function" &&
        removeEventListener("offline", this.offlineEventListener, !1),
      (this.readyState = "closed"),
      (this.id = null),
      this.emitReserved("close", t, n),
      (this.writeBuffer = []),
      (this.prevBufferLen = 0))
  }
  filterUpgrades(t) {
    const n = []
    let s = 0
    const r = t.length
    for (; s < r; s++) ~this.transports.indexOf(t[s]) && n.push(t[s])
    return n
  }
}
Qe.protocol = $o
Qe.protocol
function mf(e, t = "", n) {
  let s = e
  ;(n = n || (typeof location != "undefined" && location)),
    e == null && (e = n.protocol + "//" + n.host),
    typeof e == "string" &&
      (e.charAt(0) === "/" &&
        (e.charAt(1) === "/" ? (e = n.protocol + e) : (e = n.host + e)),
      /^(https?|wss?):\/\//.test(e) ||
        (typeof n != "undefined"
          ? (e = n.protocol + "//" + e)
          : (e = "https://" + e)),
      (s = Ls(e))),
    s.port ||
      (/^(http|ws)$/.test(s.protocol)
        ? (s.port = "80")
        : /^(http|ws)s$/.test(s.protocol) && (s.port = "443")),
    (s.path = s.path || "/")
  const i = s.host.indexOf(":") !== -1 ? "[" + s.host + "]" : s.host
  return (
    (s.id = s.protocol + "://" + i + ":" + s.port + t),
    (s.href =
      s.protocol + "://" + i + (n && n.port === s.port ? "" : ":" + s.port)),
    s
  )
}
const yf = typeof ArrayBuffer == "function",
  _f = e =>
    typeof ArrayBuffer.isView == "function"
      ? ArrayBuffer.isView(e)
      : e.buffer instanceof ArrayBuffer,
  zo = Object.prototype.toString,
  bf =
    typeof Blob == "function" ||
    (typeof Blob != "undefined" &&
      zo.call(Blob) === "[object BlobConstructor]"),
  vf =
    typeof File == "function" ||
    (typeof File != "undefined" && zo.call(File) === "[object FileConstructor]")
function lr(e) {
  return (
    (yf && (e instanceof ArrayBuffer || _f(e))) ||
    (bf && e instanceof Blob) ||
    (vf && e instanceof File)
  )
}
function Pn(e, t) {
  if (!e || typeof e != "object") return !1
  if (Array.isArray(e)) {
    for (let n = 0, s = e.length; n < s; n++) if (Pn(e[n])) return !0
    return !1
  }
  if (lr(e)) return !0
  if (e.toJSON && typeof e.toJSON == "function" && arguments.length === 1)
    return Pn(e.toJSON(), !0)
  for (const n in e)
    if (Object.prototype.hasOwnProperty.call(e, n) && Pn(e[n])) return !0
  return !1
}
function wf(e) {
  const t = [],
    n = e.data,
    s = e
  return (
    (s.data = Bs(n, t)), (s.attachments = t.length), { packet: s, buffers: t }
  )
}
function Bs(e, t) {
  if (!e) return e
  if (lr(e)) {
    const n = { _placeholder: !0, num: t.length }
    return t.push(e), n
  } else if (Array.isArray(e)) {
    const n = new Array(e.length)
    for (let s = 0; s < e.length; s++) n[s] = Bs(e[s], t)
    return n
  } else if (typeof e == "object" && !(e instanceof Date)) {
    const n = {}
    for (const s in e)
      Object.prototype.hasOwnProperty.call(e, s) && (n[s] = Bs(e[s], t))
    return n
  }
  return e
}
function Ef(e, t) {
  return (e.data = Ms(e.data, t)), (e.attachments = void 0), e
}
function Ms(e, t) {
  if (!e) return e
  if (e && e._placeholder) return t[e.num]
  if (Array.isArray(e)) for (let n = 0; n < e.length; n++) e[n] = Ms(e[n], t)
  else if (typeof e == "object")
    for (const n in e)
      Object.prototype.hasOwnProperty.call(e, n) && (e[n] = Ms(e[n], t))
  return e
}
const Cf = 5
var Y
;(function (e) {
  ;(e[(e.CONNECT = 0)] = "CONNECT"),
    (e[(e.DISCONNECT = 1)] = "DISCONNECT"),
    (e[(e.EVENT = 2)] = "EVENT"),
    (e[(e.ACK = 3)] = "ACK"),
    (e[(e.CONNECT_ERROR = 4)] = "CONNECT_ERROR"),
    (e[(e.BINARY_EVENT = 5)] = "BINARY_EVENT"),
    (e[(e.BINARY_ACK = 6)] = "BINARY_ACK")
})(Y || (Y = {}))
class xf {
  constructor(t) {
    this.replacer = t
  }
  encode(t) {
    return (t.type === Y.EVENT || t.type === Y.ACK) && Pn(t)
      ? ((t.type = t.type === Y.EVENT ? Y.BINARY_EVENT : Y.BINARY_ACK),
        this.encodeAsBinary(t))
      : [this.encodeAsString(t)]
  }
  encodeAsString(t) {
    let n = "" + t.type
    return (
      (t.type === Y.BINARY_EVENT || t.type === Y.BINARY_ACK) &&
        (n += t.attachments + "-"),
      t.nsp && t.nsp !== "/" && (n += t.nsp + ","),
      t.id != null && (n += t.id),
      t.data != null && (n += JSON.stringify(t.data, this.replacer)),
      n
    )
  }
  encodeAsBinary(t) {
    const n = wf(t),
      s = this.encodeAsString(n.packet),
      r = n.buffers
    return r.unshift(s), r
  }
}
class ur extends fe {
  constructor(t) {
    super(), (this.reviver = t)
  }
  add(t) {
    let n
    if (typeof t == "string")
      (n = this.decodeString(t)),
        n.type === Y.BINARY_EVENT || n.type === Y.BINARY_ACK
          ? ((this.reconstructor = new Rf(n)),
            n.attachments === 0 && super.emitReserved("decoded", n))
          : super.emitReserved("decoded", n)
    else if (lr(t) || t.base64)
      if (this.reconstructor)
        (n = this.reconstructor.takeBinaryData(t)),
          n && ((this.reconstructor = null), super.emitReserved("decoded", n))
      else throw new Error("got binary data when not reconstructing a packet")
    else throw new Error("Unknown type: " + t)
  }
  decodeString(t) {
    let n = 0
    const s = { type: Number(t.charAt(0)) }
    if (Y[s.type] === void 0) throw new Error("unknown packet type " + s.type)
    if (s.type === Y.BINARY_EVENT || s.type === Y.BINARY_ACK) {
      const i = n + 1
      for (; t.charAt(++n) !== "-" && n != t.length; );
      const o = t.substring(i, n)
      if (o != Number(o) || t.charAt(n) !== "-")
        throw new Error("Illegal attachments")
      s.attachments = Number(o)
    }
    if (t.charAt(n + 1) === "/") {
      const i = n + 1
      for (; ++n && !(t.charAt(n) === "," || n === t.length); );
      s.nsp = t.substring(i, n)
    } else s.nsp = "/"
    const r = t.charAt(n + 1)
    if (r !== "" && Number(r) == r) {
      const i = n + 1
      for (; ++n; ) {
        const o = t.charAt(n)
        if (o == null || Number(o) != o) {
          --n
          break
        }
        if (n === t.length) break
      }
      s.id = Number(t.substring(i, n + 1))
    }
    if (t.charAt(++n)) {
      const i = this.tryParse(t.substr(n))
      if (ur.isPayloadValid(s.type, i)) s.data = i
      else throw new Error("invalid payload")
    }
    return s
  }
  tryParse(t) {
    try {
      return JSON.parse(t, this.reviver)
    } catch {
      return !1
    }
  }
  static isPayloadValid(t, n) {
    switch (t) {
      case Y.CONNECT:
        return typeof n == "object"
      case Y.DISCONNECT:
        return n === void 0
      case Y.CONNECT_ERROR:
        return typeof n == "string" || typeof n == "object"
      case Y.EVENT:
      case Y.BINARY_EVENT:
        return Array.isArray(n) && n.length > 0
      case Y.ACK:
      case Y.BINARY_ACK:
        return Array.isArray(n)
    }
  }
  destroy() {
    this.reconstructor && this.reconstructor.finishedReconstruction()
  }
}
class Rf {
  constructor(t) {
    ;(this.packet = t), (this.buffers = []), (this.reconPack = t)
  }
  takeBinaryData(t) {
    if (
      (this.buffers.push(t), this.buffers.length === this.reconPack.attachments)
    ) {
      const n = Ef(this.reconPack, this.buffers)
      return this.finishedReconstruction(), n
    }
    return null
  }
  finishedReconstruction() {
    ;(this.reconPack = null), (this.buffers = [])
  }
}
var Af = Object.freeze(
  Object.defineProperty(
    {
      __proto__: null,
      protocol: Cf,
      get PacketType() {
        return Y
      },
      Encoder: xf,
      Decoder: ur,
    },
    Symbol.toStringTag,
    { value: "Module" }
  )
)
function Ne(e, t, n) {
  return (
    e.on(t, n),
    function () {
      e.off(t, n)
    }
  )
}
const Sf = Object.freeze({
  connect: 1,
  connect_error: 1,
  disconnect: 1,
  disconnecting: 1,
  newListener: 1,
  removeListener: 1,
})
class Wo extends fe {
  constructor(t, n, s) {
    super(),
      (this.connected = !1),
      (this.receiveBuffer = []),
      (this.sendBuffer = []),
      (this.ids = 0),
      (this.acks = {}),
      (this.flags = {}),
      (this.io = t),
      (this.nsp = n),
      s && s.auth && (this.auth = s.auth),
      this.io._autoConnect && this.open()
  }
  get disconnected() {
    return !this.connected
  }
  subEvents() {
    if (this.subs) return
    const t = this.io
    this.subs = [
      Ne(t, "open", this.onopen.bind(this)),
      Ne(t, "packet", this.onpacket.bind(this)),
      Ne(t, "error", this.onerror.bind(this)),
      Ne(t, "close", this.onclose.bind(this)),
    ]
  }
  get active() {
    return !!this.subs
  }
  connect() {
    return this.connected
      ? this
      : (this.subEvents(),
        this.io._reconnecting || this.io.open(),
        this.io._readyState === "open" && this.onopen(),
        this)
  }
  open() {
    return this.connect()
  }
  send(...t) {
    return t.unshift("message"), this.emit.apply(this, t), this
  }
  emit(t, ...n) {
    if (Sf.hasOwnProperty(t))
      throw new Error('"' + t + '" is a reserved event name')
    n.unshift(t)
    const s = { type: Y.EVENT, data: n }
    if (
      ((s.options = {}),
      (s.options.compress = this.flags.compress !== !1),
      typeof n[n.length - 1] == "function")
    ) {
      const o = this.ids++,
        c = n.pop()
      this._registerAckCallback(o, c), (s.id = o)
    }
    const r =
      this.io.engine &&
      this.io.engine.transport &&
      this.io.engine.transport.writable
    return (
      (this.flags.volatile && (!r || !this.connected)) ||
        (this.connected
          ? (this.notifyOutgoingListeners(s), this.packet(s))
          : this.sendBuffer.push(s)),
      (this.flags = {}),
      this
    )
  }
  _registerAckCallback(t, n) {
    const s = this.flags.timeout
    if (s === void 0) {
      this.acks[t] = n
      return
    }
    const r = this.io.setTimeoutFn(() => {
      delete this.acks[t]
      for (let i = 0; i < this.sendBuffer.length; i++)
        this.sendBuffer[i].id === t && this.sendBuffer.splice(i, 1)
      n.call(this, new Error("operation has timed out"))
    }, s)
    this.acks[t] = (...i) => {
      this.io.clearTimeoutFn(r), n.apply(this, [null, ...i])
    }
  }
  packet(t) {
    ;(t.nsp = this.nsp), this.io._packet(t)
  }
  onopen() {
    typeof this.auth == "function"
      ? this.auth(t => {
          this.packet({ type: Y.CONNECT, data: t })
        })
      : this.packet({ type: Y.CONNECT, data: this.auth })
  }
  onerror(t) {
    this.connected || this.emitReserved("connect_error", t)
  }
  onclose(t, n) {
    ;(this.connected = !1),
      delete this.id,
      this.emitReserved("disconnect", t, n)
  }
  onpacket(t) {
    if (t.nsp === this.nsp)
      switch (t.type) {
        case Y.CONNECT:
          if (t.data && t.data.sid) {
            const r = t.data.sid
            this.onconnect(r)
          } else
            this.emitReserved(
              "connect_error",
              new Error(
                "It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)"
              )
            )
          break
        case Y.EVENT:
        case Y.BINARY_EVENT:
          this.onevent(t)
          break
        case Y.ACK:
        case Y.BINARY_ACK:
          this.onack(t)
          break
        case Y.DISCONNECT:
          this.ondisconnect()
          break
        case Y.CONNECT_ERROR:
          this.destroy()
          const s = new Error(t.data.message)
          ;(s.data = t.data.data), this.emitReserved("connect_error", s)
          break
      }
  }
  onevent(t) {
    const n = t.data || []
    t.id != null && n.push(this.ack(t.id)),
      this.connected
        ? this.emitEvent(n)
        : this.receiveBuffer.push(Object.freeze(n))
  }
  emitEvent(t) {
    if (this._anyListeners && this._anyListeners.length) {
      const n = this._anyListeners.slice()
      for (const s of n) s.apply(this, t)
    }
    super.emit.apply(this, t)
  }
  ack(t) {
    const n = this
    let s = !1
    return function (...r) {
      s || ((s = !0), n.packet({ type: Y.ACK, id: t, data: r }))
    }
  }
  onack(t) {
    const n = this.acks[t.id]
    typeof n == "function" && (n.apply(this, t.data), delete this.acks[t.id])
  }
  onconnect(t) {
    ;(this.id = t),
      (this.connected = !0),
      this.emitBuffered(),
      this.emitReserved("connect")
  }
  emitBuffered() {
    this.receiveBuffer.forEach(t => this.emitEvent(t)),
      (this.receiveBuffer = []),
      this.sendBuffer.forEach(t => {
        this.notifyOutgoingListeners(t), this.packet(t)
      }),
      (this.sendBuffer = [])
  }
  ondisconnect() {
    this.destroy(), this.onclose("io server disconnect")
  }
  destroy() {
    this.subs && (this.subs.forEach(t => t()), (this.subs = void 0)),
      this.io._destroy(this)
  }
  disconnect() {
    return (
      this.connected && this.packet({ type: Y.DISCONNECT }),
      this.destroy(),
      this.connected && this.onclose("io client disconnect"),
      this
    )
  }
  close() {
    return this.disconnect()
  }
  compress(t) {
    return (this.flags.compress = t), this
  }
  get volatile() {
    return (this.flags.volatile = !0), this
  }
  timeout(t) {
    return (this.flags.timeout = t), this
  }
  onAny(t) {
    return (
      (this._anyListeners = this._anyListeners || []),
      this._anyListeners.push(t),
      this
    )
  }
  prependAny(t) {
    return (
      (this._anyListeners = this._anyListeners || []),
      this._anyListeners.unshift(t),
      this
    )
  }
  offAny(t) {
    if (!this._anyListeners) return this
    if (t) {
      const n = this._anyListeners
      for (let s = 0; s < n.length; s++)
        if (t === n[s]) return n.splice(s, 1), this
    } else this._anyListeners = []
    return this
  }
  listenersAny() {
    return this._anyListeners || []
  }
  onAnyOutgoing(t) {
    return (
      (this._anyOutgoingListeners = this._anyOutgoingListeners || []),
      this._anyOutgoingListeners.push(t),
      this
    )
  }
  prependAnyOutgoing(t) {
    return (
      (this._anyOutgoingListeners = this._anyOutgoingListeners || []),
      this._anyOutgoingListeners.unshift(t),
      this
    )
  }
  offAnyOutgoing(t) {
    if (!this._anyOutgoingListeners) return this
    if (t) {
      const n = this._anyOutgoingListeners
      for (let s = 0; s < n.length; s++)
        if (t === n[s]) return n.splice(s, 1), this
    } else this._anyOutgoingListeners = []
    return this
  }
  listenersAnyOutgoing() {
    return this._anyOutgoingListeners || []
  }
  notifyOutgoingListeners(t) {
    if (this._anyOutgoingListeners && this._anyOutgoingListeners.length) {
      const n = this._anyOutgoingListeners.slice()
      for (const s of n) s.apply(this, t.data)
    }
  }
}
function qt(e) {
  ;(e = e || {}),
    (this.ms = e.min || 100),
    (this.max = e.max || 1e4),
    (this.factor = e.factor || 2),
    (this.jitter = e.jitter > 0 && e.jitter <= 1 ? e.jitter : 0),
    (this.attempts = 0)
}
qt.prototype.duration = function () {
  var e = this.ms * Math.pow(this.factor, this.attempts++)
  if (this.jitter) {
    var t = Math.random(),
      n = Math.floor(t * this.jitter * e)
    e = (Math.floor(t * 10) & 1) == 0 ? e - n : e + n
  }
  return Math.min(e, this.max) | 0
}
qt.prototype.reset = function () {
  this.attempts = 0
}
qt.prototype.setMin = function (e) {
  this.ms = e
}
qt.prototype.setMax = function (e) {
  this.max = e
}
qt.prototype.setJitter = function (e) {
  this.jitter = e
}
class Fs extends fe {
  constructor(t, n) {
    var s
    super(),
      (this.nsps = {}),
      (this.subs = []),
      t && typeof t == "object" && ((n = t), (t = void 0)),
      (n = n || {}),
      (n.path = n.path || "/socket.io"),
      (this.opts = n),
      es(this, n),
      this.reconnection(n.reconnection !== !1),
      this.reconnectionAttempts(n.reconnectionAttempts || 1 / 0),
      this.reconnectionDelay(n.reconnectionDelay || 1e3),
      this.reconnectionDelayMax(n.reconnectionDelayMax || 5e3),
      this.randomizationFactor(
        (s = n.randomizationFactor) !== null && s !== void 0 ? s : 0.5
      ),
      (this.backoff = new qt({
        min: this.reconnectionDelay(),
        max: this.reconnectionDelayMax(),
        jitter: this.randomizationFactor(),
      })),
      this.timeout(n.timeout == null ? 2e4 : n.timeout),
      (this._readyState = "closed"),
      (this.uri = t)
    const r = n.parser || Af
    ;(this.encoder = new r.Encoder()),
      (this.decoder = new r.Decoder()),
      (this._autoConnect = n.autoConnect !== !1),
      this._autoConnect && this.open()
  }
  reconnection(t) {
    return arguments.length
      ? ((this._reconnection = !!t), this)
      : this._reconnection
  }
  reconnectionAttempts(t) {
    return t === void 0
      ? this._reconnectionAttempts
      : ((this._reconnectionAttempts = t), this)
  }
  reconnectionDelay(t) {
    var n
    return t === void 0
      ? this._reconnectionDelay
      : ((this._reconnectionDelay = t),
        (n = this.backoff) === null || n === void 0 || n.setMin(t),
        this)
  }
  randomizationFactor(t) {
    var n
    return t === void 0
      ? this._randomizationFactor
      : ((this._randomizationFactor = t),
        (n = this.backoff) === null || n === void 0 || n.setJitter(t),
        this)
  }
  reconnectionDelayMax(t) {
    var n
    return t === void 0
      ? this._reconnectionDelayMax
      : ((this._reconnectionDelayMax = t),
        (n = this.backoff) === null || n === void 0 || n.setMax(t),
        this)
  }
  timeout(t) {
    return arguments.length ? ((this._timeout = t), this) : this._timeout
  }
  maybeReconnectOnOpen() {
    !this._reconnecting &&
      this._reconnection &&
      this.backoff.attempts === 0 &&
      this.reconnect()
  }
  open(t) {
    if (~this._readyState.indexOf("open")) return this
    this.engine = new Qe(this.uri, this.opts)
    const n = this.engine,
      s = this
    ;(this._readyState = "opening"), (this.skipReconnect = !1)
    const r = Ne(n, "open", function () {
        s.onopen(), t && t()
      }),
      i = Ne(n, "error", o => {
        s.cleanup(),
          (s._readyState = "closed"),
          this.emitReserved("error", o),
          t ? t(o) : s.maybeReconnectOnOpen()
      })
    if (this._timeout !== !1) {
      const o = this._timeout
      o === 0 && r()
      const c = this.setTimeoutFn(() => {
        r(), n.close(), n.emit("error", new Error("timeout"))
      }, o)
      this.opts.autoUnref && c.unref(),
        this.subs.push(function () {
          clearTimeout(c)
        })
    }
    return this.subs.push(r), this.subs.push(i), this
  }
  connect(t) {
    return this.open(t)
  }
  onopen() {
    this.cleanup(), (this._readyState = "open"), this.emitReserved("open")
    const t = this.engine
    this.subs.push(
      Ne(t, "ping", this.onping.bind(this)),
      Ne(t, "data", this.ondata.bind(this)),
      Ne(t, "error", this.onerror.bind(this)),
      Ne(t, "close", this.onclose.bind(this)),
      Ne(this.decoder, "decoded", this.ondecoded.bind(this))
    )
  }
  onping() {
    this.emitReserved("ping")
  }
  ondata(t) {
    this.decoder.add(t)
  }
  ondecoded(t) {
    this.emitReserved("packet", t)
  }
  onerror(t) {
    this.emitReserved("error", t)
  }
  socket(t, n) {
    let s = this.nsps[t]
    return s || ((s = new Wo(this, t, n)), (this.nsps[t] = s)), s
  }
  _destroy(t) {
    const n = Object.keys(this.nsps)
    for (const s of n) if (this.nsps[s].active) return
    this._close()
  }
  _packet(t) {
    const n = this.encoder.encode(t)
    for (let s = 0; s < n.length; s++) this.engine.write(n[s], t.options)
  }
  cleanup() {
    this.subs.forEach(t => t()), (this.subs.length = 0), this.decoder.destroy()
  }
  _close() {
    ;(this.skipReconnect = !0),
      (this._reconnecting = !1),
      this.onclose("forced close"),
      this.engine && this.engine.close()
  }
  disconnect() {
    return this._close()
  }
  onclose(t, n) {
    this.cleanup(),
      this.backoff.reset(),
      (this._readyState = "closed"),
      this.emitReserved("close", t, n),
      this._reconnection && !this.skipReconnect && this.reconnect()
  }
  reconnect() {
    if (this._reconnecting || this.skipReconnect) return this
    const t = this
    if (this.backoff.attempts >= this._reconnectionAttempts)
      this.backoff.reset(),
        this.emitReserved("reconnect_failed"),
        (this._reconnecting = !1)
    else {
      const n = this.backoff.duration()
      this._reconnecting = !0
      const s = this.setTimeoutFn(() => {
        t.skipReconnect ||
          (this.emitReserved("reconnect_attempt", t.backoff.attempts),
          !t.skipReconnect &&
            t.open(r => {
              r
                ? ((t._reconnecting = !1),
                  t.reconnect(),
                  this.emitReserved("reconnect_error", r))
                : t.onreconnect()
            }))
      }, n)
      this.opts.autoUnref && s.unref(),
        this.subs.push(function () {
          clearTimeout(s)
        })
    }
  }
  onreconnect() {
    const t = this.backoff.attempts
    ;(this._reconnecting = !1),
      this.backoff.reset(),
      this.emitReserved("reconnect", t)
  }
}
const Wt = {}
function Tn(e, t) {
  typeof e == "object" && ((t = e), (e = void 0)), (t = t || {})
  const n = mf(e, t.path || "/socket.io"),
    s = n.source,
    r = n.id,
    i = n.path,
    o = Wt[r] && i in Wt[r].nsps,
    c = t.forceNew || t["force new connection"] || t.multiplex === !1 || o
  let l
  return (
    c ? (l = new Fs(s, t)) : (Wt[r] || (Wt[r] = new Fs(s, t)), (l = Wt[r])),
    n.query && !t.query && (t.query = n.queryKey),
    l.socket(n.path, t)
  )
}
Object.assign(Tn, { Manager: Fs, Socket: Wo, io: Tn, connect: Tn })
const Yo = e => (Gs("data-v-01237b32"), (e = e()), er(), e),
  Of = { class: "chat-bg" },
  Pf = Yo(() => K("h2", null, "Chad Chat", -1)),
  Tf = Yo(() => K("span", null, null, -1)),
  kf = { class: "footer" },
  Nf = {
    name: "Home",
    setup(e) {
      const t = cr(),
        n = Io(),
        s = Tn("http://localhost:8080")
      n.user || t.push({ name: "register" })
      const r = async () => {
        const b = await (
          await fetch("http://localhost:8080/api/messages")
        ).json()
        l.value = b
      }
      s.on("connect", () => {
        console.log("Socket: connection established!")
      })
      const i = () => {
          n.toggleUserLoggedInState(null), t.push({ name: "login" })
        },
        o = Me(null),
        c = Me(null),
        l = Me([]),
        a = Me(""),
        f = () => {
          s.emit("send", { userID: n.user._id, message: a.value }),
            (a.value = ""),
            p()
        }
      s.on("recieve", d => {
        l.value.push(d)
      })
      const p = () => {
        var d
        ;(d = o.value) == null || d.scrollIntoView(!1)
      }
      return (
        Xi(r),
        (d, b) => (
          wt(),
          It("section", Of, [
            K("div", { class: "header" }, [
              Pf,
              K("button", { onClick: i }, "Log out"),
            ]),
            K(
              "div",
              { class: "chat-block", ref_key: "chatBlock", ref: c },
              [
                (wt(!0),
                It(
                  Ie,
                  null,
                  yl(
                    l.value,
                    (x, N) => (
                      wt(),
                      It(
                        "div",
                        {
                          class: Fn([
                            x.userID === vt(n).user._id ? "sent" : "recieved",
                          ]),
                        },
                        [K("p", null, tc(x.message), 1), Tf],
                        2
                      )
                    )
                  ),
                  256
                )),
                K(
                  "div",
                  { class: "viewer", ref_key: "view", ref: o },
                  null,
                  512
                ),
              ],
              512
            ),
            K("div", kf, [
              un(
                K(
                  "input",
                  {
                    type: "text",
                    placeholder: "message...",
                    "onUpdate:modelValue": b[0] || (b[0] = x => (a.value = x)),
                  },
                  null,
                  512
                ),
                [[hn, a.value]]
              ),
              K("button", { onClick: f }, [Ae(ka)]),
            ]),
          ])
        )
      )
    },
  }
var If = Zn(Nf, [["__scopeId", "data-v-01237b32"]])
const pn = e => (Gs("data-v-0d1dc3d1"), (e = e()), er(), e),
  Lf = { class: "log-bg" },
  Bf = pn(() => K("h1", null, "The Chad Chat", -1)),
  Mf = pn(() => K("h2", null, "Login", -1)),
  Ff = { class: "form-block" },
  $f = ["onSubmit"],
  Hf = pn(() => K("p", null, "Username", -1)),
  Uf = pn(() => K("p", null, "Password", -1)),
  Df = pn(() => K("button", null, "Login", -1)),
  Kf = {
    name: "Login",
    setup(e) {
      const t = cr(),
        n = Io()
      n.user && t.push({ name: "home" })
      const s = Me(""),
        r = Me(""),
        i = async () => {
          const c = await (
            await fetch("http://localhost:8080/api/users/login", {
              method: "POST",
              headers: { "Content-type": "application/x-www-form-urlencoded" },
              body: new URLSearchParams({
                username: s.value,
                password: r.value,
              }),
            })
          ).json()
          console.log(c), n.toggleUserLoggedInState(c), t.push({ name: "home" })
        }
      return (o, c) => (
        wt(),
        It("section", Lf, [
          Bf,
          Mf,
          K("div", Ff, [
            K(
              "form",
              { onSubmit: go(i, ["prevent"]) },
              [
                K("span", null, [
                  Hf,
                  un(
                    K(
                      "input",
                      {
                        type: "text",
                        "onUpdate:modelValue":
                          c[0] || (c[0] = l => (s.value = l)),
                      },
                      null,
                      512
                    ),
                    [[hn, s.value]]
                  ),
                ]),
                K("span", null, [
                  Uf,
                  un(
                    K(
                      "input",
                      {
                        type: "text",
                        "onUpdate:modelValue":
                          c[1] || (c[1] = l => (r.value = l)),
                      },
                      null,
                      512
                    ),
                    [[hn, r.value]]
                  ),
                ]),
                Df,
              ],
              40,
              $f
            ),
          ]),
        ])
      )
    },
  }
var jf = Zn(Kf, [["__scopeId", "data-v-0d1dc3d1"]])
const gn = e => (Gs("data-v-4bd5fce9"), (e = e()), er(), e),
  qf = { class: "reg-bg" },
  Vf = gn(() => K("h1", null, "The Chad Chat", -1)),
  zf = gn(() => K("h2", null, "Register", -1)),
  Wf = { class: "form-block" },
  Yf = ["onSubmit"],
  Jf = gn(() => K("p", null, "Username", -1)),
  Xf = gn(() => K("p", null, "Password", -1)),
  Qf = gn(() =>
    K(
      "span",
      null,
      [
        K("button", null, "Register"),
        K("a", { href: "/login" }, "Already a user? Login"),
      ],
      -1
    )
  ),
  Zf = {
    name: "Register",
    setup(e) {
      const t = cr(),
        n = Me(""),
        s = Me(""),
        r = async () => {
          const o = await (
            await fetch("http://localhost:8080/api/users/new", {
              method: "POST",
              headers: { "Content-type": "application/x-www-form-urlencoded" },
              body: new URLSearchParams({
                username: n.value,
                password: s.value,
              }),
            })
          ).json()
          console.log(o), t.push({ name: "login" })
        }
      return (i, o) => (
        wt(),
        It("section", qf, [
          Vf,
          zf,
          K("div", Wf, [
            K(
              "form",
              { onSubmit: go(r, ["prevent"]) },
              [
                K("span", null, [
                  Jf,
                  un(
                    K(
                      "input",
                      {
                        type: "text",
                        "onUpdate:modelValue":
                          o[0] || (o[0] = c => (n.value = c)),
                      },
                      null,
                      512
                    ),
                    [[hn, n.value]]
                  ),
                ]),
                K("span", null, [
                  Xf,
                  un(
                    K(
                      "input",
                      {
                        type: "text",
                        "onUpdate:modelValue":
                          o[1] || (o[1] = c => (s.value = c)),
                      },
                      null,
                      512
                    ),
                    [[hn, s.value]]
                  ),
                ]),
                Qf,
              ],
              40,
              Yf
            ),
          ]),
        ])
      )
    },
  }
var Gf = Zn(Zf, [["__scopeId", "data-v-4bd5fce9"]])
const eh = Ca({
    history: Uu("/"),
    routes: [
      { path: "/", name: "home", component: If },
      { path: "/register", name: "register", component: Gf },
      { path: "/login", name: "login", component: jf },
    ],
  }),
  ar = vu(Ra)
ar.use(Ia())
ar.use(eh)
ar.mount("#app")
