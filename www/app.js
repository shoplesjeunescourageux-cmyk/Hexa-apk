var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
window.__main = function() {
  window.__ok = 1;
  const SUPABASE_URL = "https://suykgfwijmmiezxcggqo.supabase.co", SUPABASE_KEY = "sb_publishable_E82U1Tz2aTKL_ajaNxfXgA_h54LUux7";
  const $ = (s) => document.querySelector(s), $$ = (s) => document.querySelectorAll(s);
  const esc = (s) => String(s != null ? s : "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
  window.onerror = (m) => {
    const d = document.createElement("div");
    d.className = "errbar";
    d.textContent = "Erreur : " + m;
    document.body.appendChild(d);
  };
  window.onunhandledrejection = (e) => window.onerror(String(e.reason && e.reason.message || e.reason));
  if (typeof supabase === "undefined") {
    window.onerror("la biblioth\xE8que Supabase ne s'est pas charg\xE9e");
    $("#boot").hidden = true;
    return;
  }
  const sb = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
  let me = null, P = {}, st = {}, FR = [], FP = [], peer = null, img = null, aud = null, rec = null, drec = null, sign = false, geo = null, mine = /* @__PURE__ */ new Set(), nb = { bd: 0, bf: 0 };
  setTimeout(() => {
    if ($("#app").hidden && $("#auth").hidden) {
      $("#boot").hidden = true;
      $("#auth").hidden = false;
    }
  }, 3e3);
  const logo = (s) => `<svg width="${s}" height="${s}" viewBox="0 0 200 200"><circle cx="100" cy="100" r="92" fill="none" stroke="#1e6bff" stroke-width="5" stroke-dasharray="90 20"/><circle cx="100" cy="100" r="82" fill="none" stroke="#12b76a" stroke-width="4" stroke-dasharray="60 25"/><circle cx="100" cy="100" r="72" fill="none" stroke="#e5383b" stroke-width="3" stroke-dasharray="30 20"/><polygon points="100,22 172,100 100,178 28,100" fill="#b9f2ff" stroke="#4ab8d8" stroke-width="3"/><polygon points="100,22 128,100 100,100 72,100" fill="#fff" opacity=".5"/><path d="M78 70v60M122 70v60M78 100h44" stroke="#1e6bff" stroke-width="13" stroke-linecap="round" fill="none"/><polygon points="100,2 108,12 100,22 92,12" fill="#1e6bff"/><polygon points="198,100 188,108 178,100 188,92" fill="#e5383b"/><polygon points="100,198 92,188 100,178 108,188" fill="#12b76a"/><polygon points="2,100 12,92 22,100 12,108" fill="#b9f2ff"/></svg>`;
  $("#lgb").innerHTML = logo(120);
  $("#lgs").innerHTML = logo(32);
  const AV = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 10'%3E%3Crect width='10' height='10' fill='%23cfd8ff'/%3E%3Ccircle cx='5' cy='4' r='2' fill='%231e6bff'/%3E%3Cellipse cx='5' cy='9' rx='3.5' ry='2.5' fill='%231e6bff'/%3E%3C/svg%3E";
  const av = (u, id, c = "av") => `<img class="${c}" ${id ? `data-u="${id}"` : ""} src="${esc(u || AV)}">`;
  const small = (f, m, q = 0.7) => new Promise((r) => {
    const i = new Image();
    i.onload = () => {
      const k = Math.min(1, m / Math.max(i.width, i.height)), c = document.createElement("canvas");
      c.width = i.width * k;
      c.height = i.height * k;
      c.getContext("2d").drawImage(i, 0, 0, c.width, c.height);
      c.toBlob(r, "image/jpeg", q);
    };
    i.src = URL.createObjectURL(f);
  });
  const up = async (b, file, ext) => {
    const p = `${me.id}/${Date.now()}.${ext}`;
    const { error } = await sb.storage.from(b).upload(p, file);
    if (error) throw error;
    return sb.storage.from(b).getPublicUrl(p).data.publicUrl;
  };
  const mdNow = () => {
    const t = /* @__PURE__ */ new Date();
    return String(t.getMonth() + 1).padStart(2, "0") + "-" + String(t.getDate()).padStart(2, "0");
  };
  const mdFr = (m) => {
    if (!m) return "";
    const [a, b] = m.split("-");
    return new Date(2e3, a - 1, +b).toLocaleDateString("fr", { day: "numeric", month: "long" });
  };
  function badge(id, n) {
    nb[id] = n ? nb[id] + n : 0;
    const e = $("#" + id);
    e.textContent = nb[id];
    e.hidden = !nb[id];
    document.title = (nb.bd + nb.bf ? `(${nb.bd + nb.bf}) ` : "") + "Hexa";
  }
  function note(k, t) {
    if (st[k] === false) return;
    const e = $("#ts");
    e.textContent = t;
    e.style.display = "block";
    setTimeout(() => e.style.display = "none", 3500);
    try {
      if (document.hidden && Notification.permission == "granted") new Notification("Hexa", { body: t });
    } catch (x) {
    }
  }
  const CD = ["Bas-Uele", "\xC9quateur", "Haut-Katanga", "Haut-Lomami", "Haut-Uele", "Ituri", "Kasa\xEF", "Kasa\xEF-Central", "Kasa\xEF-Oriental", "Kinshasa", "Kongo-Central", "Kwango", "Kwilu", "Lomami", "Lualaba", "Mai-Ndombe", "Maniema", "Mongala", "Nord-Kivu", "Nord-Ubangi", "Sankuru", "Sud-Kivu", "Sud-Ubangi", "Tanganyika", "Tshopo", "Tshuapa"];
  const rn = (() => {
    try {
      return new Intl.DisplayNames(["fr"], { type: "region" });
    } catch (e) {
      return null;
    }
  })();
  const cname = (i, n) => {
    if (i === "CD") return "RD Congo";
    try {
      return rn && rn.of(i) || n;
    } catch (e) {
      return n;
    }
  };
  function geoSel(cid, pid, c0, p0) {
    const cs = $("#" + cid), ps = $("#" + pid);
    if (!geo) {
      for (const e of [cs, ps]) {
        const i = document.createElement("input");
        i.id = e.id;
        i.placeholder = e.dataset.ph || "";
        e.replaceWith(i);
      }
      $("#" + cid).value = c0 || "";
      $("#" + pid).value = p0 || "";
      return;
    }
    const L = geo.c.map(([i, n]) => [i, cname(i, n)]).sort((a, b) => a[1].localeCompare(b[1], "fr"));
    cs.innerHTML = '<option value="">\u2014 Pays \u2014</option>' + L.map(([i, n]) => `<option value="${i}">${esc(n)}</option>`).join("");
    const fill = (s) => {
      const l = cs.value === "CD" ? CD : geo.s[cs.value] || [];
      ps.innerHTML = '<option value="">' + (cs.value ? l.length ? "\u2014 Province / r\xE9gion \u2014" : "Non applicable" : "\u2014 Choisir d'abord le pays \u2014") + "</option>" + l.map((n) => `<option>${esc(n)}</option>`).join("");
      if (s) ps.value = s;
    };
    cs.onchange = () => fill();
    if (c0) cs.value = c0;
    fill(p0);
  }
  const gc = (id) => {
    const e = $("#" + id);
    return e.tagName == "SELECT" ? { iso: e.value, name: e.value ? e.selectedOptions[0].text : "" } : { iso: "", name: e.value.trim() };
  };
  async function loadGeo() {
    try {
      geo = await (await fetch("geo.json")).json();
    } catch (e) {
      geo = null;
    }
  }
  $("#tg").onclick = (e) => {
    e.preventDefault();
    sign = !sign;
    $("#su").hidden = !sign;
    $("#ok").textContent = sign ? "Cr\xE9er mon compte" : "Se connecter";
    $("#tg").textContent = sign ? "J'ai d\xE9j\xE0 un compte" : "Pas de compte ? Cr\xE9er mon compte";
  };
  $("#rph").onchange = async (e) => {
    const f = e.target.files[0];
    if (f) {
      window.avb = await small(f, 200);
      $("#pav").src = URL.createObjectURL(avb);
    }
  };
  $("#ok").onclick = async () => {
    const v = (n) => $("#" + n).value.trim(), er = $("#er");
    er.textContent = "";
    const email = v("em"), password = $("#pw").value;
    if (!email || password.length < 8) return er.textContent = "E-mail et mot de passe (8 caract\xE8res min.) requis.";
    if (sign) {
      const c = gc("f7"), p = gc("f8");
      if (!v("f1") || !v("f2") || !v("f5") || !c.name || !v("f11") || !v("f10")) return er.textContent = "Remplissez les champs marqu\xE9s *";
      const d = { prenom: v("f1"), nom: v("f2"), postnom: v("f3"), sexe: v("f4"), naissance: v("f5"), nationalite: v("f6"), iso: c.iso, province: p.name, adresse: v("f9"), tel: v("f10") };
      const { data, error } = await sb.auth.signUp({ email, password, options: { data: { name: d.prenom + " " + d.nom, country: c.name, city: v("f11"), details: d } } });
      if (error) return er.textContent = error.message;
      if (!data.session) return er.textContent = "Compte cr\xE9\xE9. Confirmez votre e-mail puis connectez-vous.";
      if (window.avb) {
        try {
          localStorage.setItem("hx_av", await new Promise((r) => {
            const f = new FileReader();
            f.onload = () => r(f.result);
            f.readAsDataURL(avb);
          }));
        } catch (e) {
        }
      }
    } else {
      const { error } = await sb.auth.signInWithPassword({ email, password });
      if (error) return er.textContent = "Identifiants incorrects.";
    }
    start();
  };
  $("#out").onclick = async () => {
    await sb.auth.signOut();
    location.reload();
  };
  const VIEWS = ["news", "feed", "vid", "dm", "me"];
  function go(v) {
    $$("nav button").forEach((x) => x.classList.toggle("on", x.dataset.v == v));
    VIEWS.forEach((x) => $("#v-" + x).hidden = x != v);
    if (v == "dm") {
      people();
      badge("bd", 0);
    }
    if (v == "me") {
      drawMe();
      friends();
      badge("bf", 0);
    }
    if (v == "vid") loadVideos();
    if (v == "feed") loadPosts();
  }
  $$("nav button").forEach((b) => b.onclick = () => go(b.dataset.v));
  async function start() {
    await loadGeo();
    geoSel("f7", "f8");
    let session = null;
    try {
      session = (await sb.auth.getSession()).data.session;
    } catch (e) {
      window.onerror("Session : " + e.message);
    }
    $("#boot").hidden = true;
    if (!session) {
      $("#auth").hidden = false;
      return;
    }
    me = session.user;
    $("#auth").hidden = true;
    $("#app").hidden = false;
    let { data: p } = await sb.from("profiles").select("*").eq("id", me.id).single();
    P = p || {};
    const a = localStorage.getItem("hx_av");
    if (a && p) {
      try {
        const u = await up("avatars", await (await fetch(a)).blob(), "jpg");
        await sb.from("profiles").update({ avatar: u }).eq("id", me.id);
        P.avatar = u;
        localStorage.removeItem("hx_av");
      } catch (e) {
      }
    }
    st = __spreadValues({ msg: true, ami: true, com: true, anniv: true, vid: true }, P.settings || {});
    $("#who").textContent = P.name || "";
    chips();
    loadNews("Monde");
    await loadFriends();
    birthdays();
    loadPosts();
    sb.channel("hx").on("postgres_changes", { event: "*", schema: "public", table: "posts" }, (m) => {
      if (m.eventType == "INSERT" && m.new.video && m.new.user_id != me.id) note("vid", "\u{1F3AC} Nouvelle vid\xE9o");
      loadPosts();
      if (!$("#v-vid").hidden) loadVideos();
    }).on("postgres_changes", { event: "INSERT", schema: "public", table: "messages", filter: `receiver=eq.${me.id}` }, (m) => {
      if (peer == m.new.sender && !$("#v-dm").hidden) loadDm();
      else {
        note("msg", "\u{1F4AC} Nouveau message");
        badge("bd", 1);
      }
    }).on("postgres_changes", { event: "INSERT", schema: "public", table: "friends", filter: `b=eq.${me.id}` }, () => {
      note("ami", "\u{1F44B} Nouvelle invitation d'ami");
      badge("bf", 1);
      loadFriends();
    }).on("postgres_changes", { event: "UPDATE", schema: "public", table: "friends", filter: `a=eq.${me.id}` }, () => {
      note("ami", "\u2705 Une invitation a \xE9t\xE9 accept\xE9e");
      loadFriends();
    }).on("postgres_changes", { event: "INSERT", schema: "public", table: "comments" }, (m) => {
      if (mine.has(m.new.post_id) && m.new.user_id != me.id) note("com", "\u{1F4AC} Nouveau commentaire sur votre publication");
    }).on("postgres_changes", { event: "INSERT", schema: "public", table: "likes" }, (m) => {
      if (mine.has(m.new.post_id) && m.new.user_id != me.id) note("com", "\u{1F49C} Quelqu'un aime votre publication");
    }).subscribe();
  }
  const FEEDS = { Monde: "https://www.france24.com/fr/rss", Afrique: "https://www.rfi.fr/fr/afrique/rss", Europe: "https://www.rfi.fr/fr/europe/rss", Am\u00E9riques: "https://www.rfi.fr/fr/ameriques/rss", "Asie-Pacifique": "https://www.rfi.fr/fr/asie-pacifique/rss", "Moyen-Orient": "https://www.rfi.fr/fr/moyen-orient/rss" };
  function chips() {
    $("#chips").innerHTML = Object.keys(FEEDS).map((k, i) => `<button class="${i ? "" : "on"}">${k}</button>`).join("");
    $$("#chips button").forEach((b) => b.onclick = () => {
      $$("#chips button").forEach((x) => x.classList.toggle("on", x === b));
      loadNews(b.textContent);
    });
  }
  async function loadNews(c) {
    const n = $("#news");
    n.innerHTML = '<p class="t" style="text-align:center">Chargement\u2026</p>';
    const k = "hx_n_" + c;
    let it;
    try {
      const s = JSON.parse(sessionStorage.getItem(k) || "null");
      if (s && Date.now() - s.t < 6e5) it = s.i;
    } catch (e) {
    }
    if (!it) {
      try {
        const j = await (await fetch("https://api.rss2json.com/v1/api.json?rss_url=" + encodeURIComponent(FEEDS[c]))).json();
        it = (j.items || []).slice(0, 15).map((x) => ({ t: x.title, l: x.link, d: x.pubDate, i: x.thumbnail || x.enclosure && x.enclosure.link || "" }));
        sessionStorage.setItem(k, JSON.stringify({ t: Date.now(), i: it }));
      } catch (e) {
        return n.innerHTML = '<p class="t" style="text-align:center">Actualit\xE9s indisponibles.</p>';
      }
    }
    n.innerHTML = it.map((x, i) => `<div class="c">${x.i ? `<img class="p" style="margin:0 0 8px" loading="lazy" src="${esc(x.i)}">` : ""}<b>${esc(x.t)}</b><div class="t">${esc(c)} \xB7 ${esc((x.d || "").slice(0, 10))}</div><div class="r"><a href="${esc(x.l)}" target="_blank" rel="noopener" style="color:var(--bl)">Lire l'article</a><button class="g" data-s="${i}">\u2197 Partager</button></div></div>`).join("");
    n.querySelectorAll("[data-s]").forEach((b) => b.onclick = async () => {
      const x = it[b.dataset.s];
      await sb.from("posts").insert({ body: x.t + "\n" + x.l, activity: "\u{1F4F0} Actualit\xE9", image: x.i || null });
      b.textContent = "\u2714 Partag\xE9";
    });
  }
  $("#ph").onchange = async (e) => {
    const f = e.target.files[0];
    if (f) {
      img = await small(f, 900);
      $("#pv").textContent = "Photo pr\xEAte \u2714";
    }
  };
  $("#mic").onclick = async () => {
    if (rec) {
      rec.stop();
      return;
    }
    try {
      const s = await navigator.mediaDevices.getUserMedia({ audio: true }), ch = [];
      rec = new MediaRecorder(s);
      rec.ondataavailable = (e) => ch.push(e.data);
      rec.onstop = () => {
        aud = new Blob(ch, { type: "audio/webm" });
        s.getTracks().forEach((t) => t.stop());
        rec = null;
        $("#mic").textContent = "\u{1F3A4} Vocal \u2714";
      };
      rec.start();
      $("#mic").textContent = "\u23F9 Stop";
    } catch (e) {
      alert("Micro non autoris\xE9.");
    }
  };
  $("#pub").onclick = async () => {
    const body = $("#tx").value.trim();
    if (!body && !img && !aud) return;
    $("#pub").disabled = true;
    try {
      await sb.from("posts").insert({ body, activity: $("#act").value || null, image: img ? await up("media", img, "jpg") : null, audio: aud ? await up("media", aud, "webm") : null });
      $("#tx").value = "";
      img = aud = null;
      $("#pv").textContent = "";
      $("#mic").textContent = "\u{1F3A4} Vocal";
    } catch (e) {
      alert("\xC9chec : " + e.message);
    }
    $("#pub").disabled = false;
  };
  const SEL = "*,profiles(name,avatar),likes(user_id),comments(count)";
  function card(p) {
    var _a;
    const L = p.likes.some((l) => l.user_id == me.id), pr = p.profiles || {};
    return `<div class="c"><div>${av(pr.avatar, p.user_id)}<b>${esc(pr.name)}</b> <span class="t">${new Date(p.created_at).toLocaleString("fr")}</span></div>${p.activity ? `<div class="t" style="margin-top:4px">${esc(p.activity)}</div>` : ""}${p.body ? `<div style="white-space:pre-wrap;margin-top:6px">${esc(p.body)}</div>` : ""}${p.image ? `<img class="p" loading="lazy" src="${esc(p.image)}">` : ""}${p.video ? `<video class="p" src="${esc(p.video)}" controls playsinline loop muted preload="metadata"></video>` : ""}${p.audio ? `<audio controls src="${esc(p.audio)}" style="width:100%;margin-top:8px"></audio>` : ""}<div class="r"><div id="c${p.id}" style="width:100%"></div><button class="g" data-l="${p.id}" data-on="${L}">${L ? "\u{1F49C}" : "\u{1F90D}"} ${p.likes.length}</button><button class="g" data-c="${p.id}">\u{1F4AC} ${((_a = p.comments[0]) == null ? void 0 : _a.count) || 0}</button><button class="g" data-r="${p.id}">\u{1F6A9}</button>${p.user_id == me.id ? `<button class="g" data-d="${p.id}">\u{1F5D1}\uFE0F</button>` : ""}</div></div>`;
  }
  function wire(box, reload) {
    box.querySelectorAll("[data-l]").forEach((b) => b.onclick = async () => {
      const id = b.dataset.l;
      b.dataset.on == "true" ? await sb.from("likes").delete().match({ post_id: id, user_id: me.id }) : await sb.from("likes").insert({ post_id: id });
      reload();
    });
    box.querySelectorAll("[data-d]").forEach((b) => b.onclick = () => confirm("Supprimer ?") && sb.from("posts").delete().eq("id", b.dataset.d).then(reload));
    box.querySelectorAll("[data-r]").forEach((b) => b.onclick = async () => {
      const r = prompt("Motif du signalement ?");
      if (r) {
        await sb.from("reports").insert({ post_id: b.dataset.r, reason: r });
        alert("Merci, signalement envoy\xE9.");
      }
    });
    box.querySelectorAll("[data-u]").forEach((b) => b.onclick = () => openProfile(b.dataset.u));
    box.querySelectorAll("[data-c]").forEach((b) => b.onclick = async () => {
      const bx = $("#c" + b.dataset.c);
      if (bx.innerHTML) {
        bx.innerHTML = "";
        return;
      }
      const { data } = await sb.from("comments").select("*,profiles(name)").eq("post_id", b.dataset.c).order("created_at");
      bx.innerHTML = (data || []).map((c) => {
        var _a;
        return `<div class="t" style="margin-top:6px"><b>${esc((_a = c.profiles) == null ? void 0 : _a.name)}</b> ${esc(c.body)}</div>`;
      }).join("") + `<div class="r"><input style="flex:1;width:auto" placeholder="Votre commentaire\u2026"><button>OK</button></div>`;
      bx.querySelector("button").onclick = async () => {
        const v = bx.querySelector("input").value.trim();
        if (v) {
          await sb.from("comments").insert({ post_id: b.dataset.c, body: v });
          reload();
        }
      };
    });
  }
  async function loadPosts() {
    const { data } = await sb.from("posts").select(SEL).order("created_at", { ascending: false }).limit(40);
    (data || []).forEach((p) => {
      if (p.user_id == me.id) mine.add(p.id);
    });
    $("#posts").innerHTML = (data || []).map(card).join("") || '<p class="t" style="text-align:center">Aucune publication. Soyez le premier !</p>';
    wire($("#posts"), loadPosts);
  }
  let io = null;
  async function loadVideos() {
    const { data } = await sb.from("posts").select(SEL).not("video", "is", null).order("created_at", { ascending: false }).limit(30);
    (data || []).forEach((p) => {
      if (p.user_id == me.id) mine.add(p.id);
    });
    $("#vids").innerHTML = (data || []).map(card).join("") || '<p class="t" style="text-align:center">Aucune vid\xE9o pour le moment.</p>';
    wire($("#vids"), loadVideos);
    if (io) io.disconnect();
    io = new IntersectionObserver((es) => es.forEach((e) => {
      const v = e.target;
      if (e.isIntersecting) v.play().catch(() => {
      });
      else v.pause();
    }), { threshold: 0.6 });
    $$("#vids video").forEach((v) => io.observe(v));
  }
  $("#vf").onchange = async (e) => {
    const f = e.target.files[0];
    e.target.value = "";
    if (!f) return;
    if (f.size > 25 * 1048576) return alert("Vid\xE9o trop lourde (25 Mo maximum).");
    const d = await new Promise((r) => {
      const v = document.createElement("video");
      v.preload = "metadata";
      v.onloadedmetadata = () => r(v.duration);
      v.onerror = () => r(0);
      v.src = URL.createObjectURL(f);
    });
    if (d > 61) return alert("Vid\xE9o trop longue (60 secondes maximum).");
    $("#vst").textContent = "Envoi en cours\u2026";
    try {
      const u = await up("media", f, (f.name.split(".").pop() || "mp4").toLowerCase());
      await sb.from("posts").insert({ body: $("#vc").value.trim(), video: u, activity: "\u{1F3AC} Vid\xE9o" });
      $("#vc").value = "";
      loadVideos();
    } catch (x) {
      alert("\xC9chec : " + x.message);
    }
    $("#vst").textContent = "";
  };
  async function loadFriends() {
    const { data: f } = await sb.from("friends").select("*");
    FR = f || [];
    const ids = FR.filter((x) => x.status == "accepted").map((x) => x.a == me.id ? x.b : x.a);
    if (!ids.length) {
      FP = [];
      return;
    }
    const { data } = await sb.from("profiles").select("id,name,avatar,bday").in("id", ids);
    FP = data || [];
  }
  async function friends() {
    await loadFriends();
    const q = ($("#fs").value || "").trim().replace(/[,%()]/g, "");
    let qq = sb.from("profiles").select("id,name,country,avatar").neq("id", me.id);
    if (q) qq = qq.or(`name.ilike.%${q}%,country.ilike.%${q}%,city.ilike.%${q}%`);
    const { data: u } = await qq.order("name").limit(100);
    const stt = (id) => FR.find((x) => x.a == id || x.b == id);
    $("#fr").innerHTML = (u || []).map((x) => {
      const r = stt(x.id);
      let a;
      if (!r) a = `<button data-a="${x.id}">Inviter</button>`;
      else if (r.status == "accepted") a = '<span class="t">\u2714 Ami</span>';
      else if (r.a == me.id) a = '<span class="t">Invitation envoy\xE9e</span>';
      else a = `<button data-k="${x.id}">Accepter</button><button class="g" data-x="${x.id}">Refuser</button>`;
      return `<div class="r sp">${av(x.avatar, x.id)}<span style="flex:1"><b>${esc(x.name)}</b><br><span class="t">${esc(x.country)}</span></span>${a}</div>`;
    }).join("") || '<p class="t">Aucun membre trouv\xE9.</p>';
    const b = $("#fr");
    b.querySelectorAll("[data-a]").forEach((e) => e.onclick = async () => {
      await sb.from("friends").insert({ b: e.dataset.a });
      friends();
    });
    b.querySelectorAll("[data-k]").forEach((e) => e.onclick = async () => {
      await sb.from("friends").update({ status: "accepted" }).match({ a: e.dataset.k, b: me.id });
      friends();
    });
    b.querySelectorAll("[data-x]").forEach((e) => e.onclick = async () => {
      await sb.from("friends").delete().match({ a: e.dataset.x, b: me.id });
      friends();
    });
    b.querySelectorAll("[data-u]").forEach((e) => e.onclick = () => openProfile(e.dataset.u));
  }
  let ft;
  $("#fs").oninput = () => {
    clearTimeout(ft);
    ft = setTimeout(friends, 350);
  };
  function people() {
    $("#who2").innerHTML = '<option value="">Choisir un ami\u2026</option>' + FP.map((u) => `<option value="${u.id}">${esc(u.name)}</option>`).join("");
    $("#dmn").textContent = FP.length ? "Vous pouvez \xE9crire \xE0 vos amis (invitation accept\xE9e)." : "Invitez quelqu'un dans \xAB Moi \xBB > Amis : il doit accepter avant que vous puissiez discuter.";
    $("#who2").onchange = () => {
      peer = $("#who2").value || null;
      loadDm();
    };
  }
  async function loadDm() {
    if (!peer) {
      $("#dm").innerHTML = "";
      return;
    }
    const { data } = await sb.from("messages").select("*").or(`and(sender.eq.${me.id},receiver.eq.${peer}),and(sender.eq.${peer},receiver.eq.${me.id})`).order("created_at").limit(100);
    $("#dm").innerHTML = (data || []).map((m) => `<div class="msg ${m.sender == me.id ? "me" : ""}">${esc(m.body)}${m.audio ? `<audio controls src="${esc(m.audio)}" style="width:100%"></audio>` : ""}</div>`).join("");
    $("#dm").scrollTop = 1e9;
  }
  async function send(o) {
    const { error } = await sb.from("messages").insert(__spreadValues({ receiver: peer }, o));
    if (error) alert("Message refus\xE9 : seul un ami peut recevoir vos messages.");
    loadDm();
  }
  $("#dms").onclick = async () => {
    const b = $("#dmt").value.trim();
    if (!b || !peer) return;
    $("#dmt").value = "";
    send({ body: b });
  };
  $("#dmic").onclick = async () => {
    if (drec) {
      drec.stop();
      return;
    }
    if (!peer) return alert("Choisissez un ami.");
    try {
      const s = await navigator.mediaDevices.getUserMedia({ audio: true }), ch = [];
      drec = new MediaRecorder(s);
      drec.ondataavailable = (e) => ch.push(e.data);
      drec.onstop = async () => {
        s.getTracks().forEach((t) => t.stop());
        drec = null;
        $("#dmic").textContent = "\u{1F3A4}";
        try {
          send({ audio: await up("media", new Blob(ch, { type: "audio/webm" }), "webm") });
        } catch (e) {
          alert("\xC9chec : " + e.message);
        }
      };
      drec.start();
      $("#dmic").textContent = "\u23F9";
    } catch (e) {
      alert("Micro non autoris\xE9.");
    }
  };
  function birthdays() {
    const t = mdNow();
    let h = "";
    if (P.bday === t) h += `<div class="c bn"><b>\u{1F382} Joyeux anniversaire ${esc((P.name || "").split(" ")[0])} !</b><div class="t">Toute la communaut\xE9 Hexa vous souhaite une merveilleuse journ\xE9e.</div></div>`;
    const bd = FP.filter((x) => x.bday === t);
    if (bd.length) h += `<div class="c bn"><b>\u{1F382} Anniversaire aujourd'hui</b>${bd.map((x) => `<div class="r sp">${av(x.avatar, x.id)}<span style="flex:1">${esc(x.name)}</span><button data-w="${x.id}">Souhaiter \u{1F389}</button></div>`).join("")}</div>`;
    $("#bday").innerHTML = h;
    $$("#bday [data-w]").forEach((b) => b.onclick = async () => {
      peer = b.dataset.w;
      await send({ body: "\u{1F382} Joyeux anniversaire ! \u{1F389}" });
      b.textContent = "\u2714 Envoy\xE9";
      b.disabled = true;
    });
    if (P.bday === t) note("anniv", "\u{1F382} Joyeux anniversaire !");
    else if (bd.length) note("anniv", "\u{1F382} Anniversaire aujourd'hui : " + bd.map((x) => x.name.split(" ")[0]).join(", "));
  }
  const LK = { fb: ["Facebook", (v) => /^http/.test(v) ? v : "https://facebook.com/" + v.replace(/^@/, "")], ig: ["Instagram", (v) => /^http/.test(v) ? v : "https://instagram.com/" + v.replace(/^@/, "")], wa: ["WhatsApp", (v) => "https://wa.me/" + v.replace(/\D/g, "")], tt: ["TikTok", (v) => /^http/.test(v) ? v : "https://tiktok.com/@" + v.replace(/^@/, "")], x: ["X", (v) => /^http/.test(v) ? v : "https://x.com/" + v.replace(/^@/, "")], yt: ["YouTube", (v) => /^http/.test(v) ? v : "https://youtube.com/@" + v.replace(/^@/, "")] };
  function pHTML(p) {
    const x = p.extra || {}, l = p.links || {}, line = (i, t) => t ? `<div style="margin-top:4px">${i} ${esc(t)}</div>` : "";
    const loc = [p.city, p.province || (p.details || {}).province, p.country].filter(Boolean).join(", ");
    return `<div class="r">${av(p.avatar, "", "av big")}<div style="flex:1"><h3 style="margin:0;font-size:20px">${esc(p.name)}</h3><div class="t">${esc(loc)}</div></div></div>${p.bio ? `<p style="white-space:pre-wrap">${esc(p.bio)}</p>` : ""}${line("\u{1F382}", p.bday ? "Anniversaire : " + mdFr(p.bday) : "")}${line("\u{1F4BC}", [x.job, x.work].filter(Boolean).join(" \xB7 "))}${line("\u{1F393}", x.school)}${line("\u{1F3E0}", [x.origin_province, x.origin_country].filter(Boolean).join(", ") && "Originaire de " + [x.origin_province, x.origin_country].filter(Boolean).join(", "))}${line("\u2764\uFE0F", x.rel)}${line("\u{1F5E3}\uFE0F", x.lang)}${line("\u2B50", x.int)}${x.web ? `<a class="lk" target="_blank" rel="noopener" href="${esc(/^http/.test(x.web) ? x.web : "https://" + x.web)}">\u{1F310} Site web</a>` : ""}<div>${Object.keys(LK).filter((k) => l[k]).map((k) => `<a class="lk" target="_blank" rel="noopener" href="${esc(LK[k][1](l[k]))}">${LK[k][0]}</a>`).join("")}</div>`;
  }
  async function openProfile(id) {
    if (id == me.id) {
      go("me");
      return;
    }
    const { data: p } = await sb.from("profiles").select("*").eq("id", id).single();
    if (!p) return;
    const { count } = await sb.from("posts").select("id", { count: "exact", head: true }).eq("user_id", id);
    const r = FR.find((x) => x.a == id || x.b == id);
    const pf = $("#pf");
    pf.hidden = false;
    pf.innerHTML = `<div class="c"><button class="g" id="pfx">\u2190 Retour</button>${pHTML(p)}<p class="t">${count || 0} publication(s)</p><div class="r">${r && r.status == "accepted" ? `<button id="pfm">\u{1F4AC} Message</button>` : r ? `<span class="t">Invitation en attente</span>` : `<button id="pfa">Inviter comme ami</button>`}</div></div>`;
    $("#pfx").onclick = () => pf.hidden = true;
    if ($("#pfa")) $("#pfa").onclick = async () => {
      await sb.from("friends").insert({ b: id });
      pf.hidden = true;
      loadFriends();
    };
    if ($("#pfm")) $("#pfm").onclick = () => {
      pf.hidden = true;
      go("dm");
      $("#who2").value = id;
      peer = id;
      loadDm();
    };
  }
  function drawMe() {
    $("#myp").innerHTML = pHTML(P);
    const x = P.extra || {}, l = P.links || {}, s = (i, v) => {
      $("#" + i).value = v || "";
    };
    s("e_bio", P.bio);
    s("e_city", P.city);
    s("e_job", x.job);
    s("e_work", x.work);
    s("e_school", x.school);
    s("e_rel", x.rel);
    s("e_lang", x.lang);
    s("e_int", x.int);
    s("e_web", x.web);
    for (const k in LK) s("l_" + k, l[k]);
    if (!$("#e_c").dataset.ok) {
      $("#e_c").dataset.ok = 1;
      geoSel("e_c", "e_p", (P.details || {}).iso, P.province || (P.details || {}).province);
      geoSel("o_c", "o_p", x.origin_iso, x.origin_province);
    }
    $("#nst").innerHTML = [["msg", "\u{1F4AC} Messages priv\xE9s"], ["ami", "\u{1F465} Invitations d'amis"], ["com", "\u{1F49C} Commentaires et j'aime"], ["anniv", "\u{1F382} Anniversaires"], ["vid", "\u{1F3AC} Nouvelles vid\xE9os"]].map(([k, t]) => `<label class="sw"><span>${t}</span><input type="checkbox" data-n="${k}" ${st[k] === false ? "" : "checked"}></label>`).join("");
    $$("#nst input").forEach((i) => i.onchange = async () => {
      st[i.dataset.n] = i.checked;
      await sb.from("profiles").update({ settings: st }).eq("id", me.id);
    });
  }
  $("#nt").onclick = async () => {
    try {
      const r = await Notification.requestPermission();
      $("#nt").textContent = r == "granted" ? "\u{1F514} Notifications activ\xE9es" : "\u{1F515} Notifications refus\xE9es";
    } catch (e) {
    }
  };
  $("#e_save").onclick = async () => {
    const v = (i) => $("#" + i).value.trim(), c = gc("e_c"), p = gc("e_p"), oc = gc("o_c"), op = gc("o_p"), links = {};
    for (const k in LK) if (v("l_" + k)) links[k] = v("l_" + k);
    const upd = { bio: v("e_bio"), city: v("e_city"), country: c.name || P.country, province: p.name, links, extra: { job: v("e_job"), work: v("e_work"), school: v("e_school"), rel: v("e_rel"), lang: v("e_lang"), int: v("e_int"), web: v("e_web"), origin_country: oc.name, origin_iso: oc.iso, origin_province: op.name }, details: __spreadProps(__spreadValues({}, P.details || {}), { iso: c.iso || (P.details || {}).iso }) };
    const f = $("#e_av").files[0];
    try {
      if (f) upd.avatar = await up("avatars", await small(f, 200), "jpg");
      const { error } = await sb.from("profiles").update(upd).eq("id", me.id);
      if (error) throw error;
      Object.assign(P, upd);
      $("#e_av").value = "";
      drawMe();
      alert("Profil enregistr\xE9 \u2714");
    } catch (e) {
      alert("\xC9chec : " + e.message);
    }
  };
  start();
};
