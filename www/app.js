window.__main=function(){
window.__ok = 1;
window.onerror = (m) => {
  const d = document.createElement("div");
  d.style.cssText = "position:fixed;top:0;left:0;right:0;background:#e5383b;color:#fff;padding:10px;z-index:99;font-size:13px";
  d.textContent = "Erreur : " + m;
  document.body.appendChild(d);
};
window.onunhandledrejection = (e) => window.onerror(String(e.reason && e.reason.message || e.reason));
if (typeof supabase === "undefined") {
  window.onerror("la biblioth\xE8que Supabase ne s'est pas charg\xE9e");
  document.getElementById("boot").hidden = true;
    return;
}
setTimeout(() => {
  if ($("#app").hidden && $("#auth").hidden) {
    $("#boot").hidden = true;
    $("#auth").hidden = false;
  }
}, 3e3);
const SUPABASE_URL = "https://suykgfwijmmiezxcggqo.supabase.co", SUPABASE_KEY = "sb_publishable_E82U1Tz2aTKL_ajaNxfXgA_h54LUux7";
const sb = supabase.createClient(SUPABASE_URL, SUPABASE_KEY), $ = (s) => document.querySelector(s);
let me = null, img = null, aud = null, rec = null, sign = false, peer = null;
const esc = (s) => String(s != null ? s : "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
const logo = (s) => `<svg width="${s}" height="${s}" viewBox="0 0 200 200"><circle cx="100" cy="100" r="92" fill="none" stroke="#1e6bff" stroke-width="5" stroke-dasharray="90 20"/><circle cx="100" cy="100" r="82" fill="none" stroke="#12b76a" stroke-width="4" stroke-dasharray="60 25"/><circle cx="100" cy="100" r="72" fill="none" stroke="#e5383b" stroke-width="3" stroke-dasharray="30 20"/><polygon points="100,22 172,100 100,178 28,100" fill="#b9f2ff" stroke="#4ab8d8" stroke-width="3"/><polygon points="100,22 128,100 100,100 72,100" fill="#fff" opacity=".5"/><path d="M78 70v60M122 70v60M78 100h44" stroke="#1e6bff" stroke-width="13" stroke-linecap="round" fill="none"/><polygon points="100,2 108,12 100,22 92,12" fill="#1e6bff"/><polygon points="198,100 188,108 178,100 188,92" fill="#e5383b"/><polygon points="100,198 92,188 100,178 108,188" fill="#12b76a"/><polygon points="2,100 12,92 22,100 12,108" fill="#b9f2ff"/></svg>`;
$("#lgb").innerHTML = logo(120);
$("#lgs").innerHTML = logo(32);
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
    if (!v("f1") || !v("f2") || !v("f5") || !v("f7") || !v("f8") || !v("f10")) return er.textContent = "Remplissez les champs marqu\xE9s *";
    const d = { prenom: v("f1"), nom: v("f2"), postnom: v("f3"), sexe: v("f4"), naissance: v("f5"), nationalite: v("f6"), pays: v("f7"), ville: v("f8"), adresse: v("f9"), tel: v("f10") };
    const { data, error } = await sb.auth.signUp({ email, password, options: { data: { name: d.prenom + " " + d.nom, country: d.pays, city: d.ville, details: d } } });
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
document.querySelectorAll("nav button").forEach((b) => b.onclick = () => {
  document.querySelectorAll("nav button").forEach((x) => x.classList.toggle("on", x === b));
  ["news", "feed", "dm", "me"].forEach((v) => $("#v-" + v).hidden = v !== b.dataset.v);
  if (b.dataset.v == "dm") {
    people();
    badge("bd", 0);
  }
  if (b.dataset.v == "me") {
    friends();
    badge("bf", 0);
  }
});
async function start() {
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
  const a = localStorage.getItem("hx_av");
  if (a && p) {
    const b = await (await fetch(a)).blob();
    try {
      const u = await up("avatars", b, "jpg");
      await sb.from("profiles").update({ avatar: u }).eq("id", me.id);
      p.avatar = u;
      localStorage.removeItem("hx_av");
    } catch (e) {
    }
  }
  me.p = p || {};
  $("#who").textContent = me.p.name || "";
  $("#mn").textContent = me.p.name || "";
  $("#mp").textContent = [me.p.city, me.p.country].filter(Boolean).join(", ");
  chips();
  loadNews("Monde");
  loadPosts();
  sb.channel("x").on("postgres_changes", { event: "*", schema: "public", table: "posts" }, loadPosts).on("postgres_changes", { event: "INSERT", schema: "public", table: "messages", filter: `receiver=eq.${me.id}` }, (m) => {
    if (peer == m.new.sender && !$("#v-dm").hidden) loadDm();
    else {
      notify("\u{1F4AC} Nouveau message");
      badge("bd", 1);
    }
  }).on("postgres_changes", { event: "INSERT", schema: "public", table: "friends", filter: `b=eq.${me.id}` }, () => {
    notify("\u{1F44B} Nouvelle demande d'ami");
    badge("bf", 1);
  }).subscribe();
}
const FEEDS = { Monde: "https://www.france24.com/fr/rss", Afrique: "https://www.rfi.fr/fr/afrique/rss", Europe: "https://www.rfi.fr/fr/europe/rss", Am\u00E9riques: "https://www.rfi.fr/fr/ameriques/rss", "Asie-Pacifique": "https://www.rfi.fr/fr/asie-pacifique/rss", "Moyen-Orient": "https://www.rfi.fr/fr/moyen-orient/rss" };
function chips() {
  $("#chips").innerHTML = Object.keys(FEEDS).map((k, i) => `<button class="${i ? "" : "on"}">${k}</button>`).join("");
  document.querySelectorAll("#chips button").forEach((b) => b.onclick = () => {
    document.querySelectorAll("#chips button").forEach((x) => x.classList.toggle("on", x === b));
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
      return n.innerHTML = '<p class="t" style="text-align:center">Actualit\xE9s indisponibles. V\xE9rifiez votre connexion.</p>';
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
    img = await small(f, 900, 0.7);
    $("#pv").textContent = "Photo pr\xEAte \u2714";
  }
};
$("#mic").onclick = async () => {
  if (rec) {
    rec.stop();
    return;
  }
  try {
    const s = await navigator.mediaDevices.getUserMedia({ audio: true });
    const ch = [];
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
async function loadPosts() {
  const { data } = await sb.from("posts").select("*,profiles(name,avatar),likes(user_id),comments(count)").order("created_at", { ascending: false }).limit(40);
  $("#posts").innerHTML = (data || []).map((p) => {
    var _a, _b, _c;
    const L = p.likes.some((l) => l.user_id == me.id);
    return `<div class="c"><div>${((_a = p.profiles) == null ? void 0 : _a.avatar) ? `<img class="av" src="${esc(p.profiles.avatar)}">` : ""}<b>${esc((_b = p.profiles) == null ? void 0 : _b.name)}</b> <span class="t">${new Date(p.created_at).toLocaleString()}</span></div>${p.activity ? `<div class="t">${esc(p.activity)}</div>` : ""}<div style="white-space:pre-wrap;margin-top:6px">${esc(p.body)}</div>${p.image ? `<img class="p" loading="lazy" src="${esc(p.image)}">` : ""}${p.audio ? `<audio controls src="${esc(p.audio)}" style="width:100%;margin-top:8px"></audio>` : ""}<div class="r"><div id="c${p.id}" style="width:100%"></div><button class="g" data-l="${p.id}" data-on="${L}">${L ? "\u{1F49C}" : "\u{1F90D}"} ${p.likes.length}</button><button class="g" data-c="${p.id}">\u{1F4AC} ${((_c = p.comments[0]) == null ? void 0 : _c.count) || 0}</button><button class="g" data-r="${p.id}">\u{1F6A9}</button>${p.user_id == me.id ? `<button class="g" data-d="${p.id}">\u{1F5D1}\uFE0F</button>` : ""}</div></div>`;
  }).join("") || '<p class="t" style="text-align:center">Aucune publication. Soyez le premier !</p>';
  document.querySelectorAll("[data-l]").forEach((b) => b.onclick = async () => {
    const id = b.dataset.l;
    b.dataset.on == "true" ? await sb.from("likes").delete().match({ post_id: id, user_id: me.id }) : await sb.from("likes").insert({ post_id: id });
    loadPosts();
  });
  document.querySelectorAll("[data-d]").forEach((b) => b.onclick = () => confirm("Supprimer ?") && sb.from("posts").delete().eq("id", b.dataset.d).then(loadPosts));
  document.querySelectorAll("[data-c]").forEach((b) => b.onclick = async () => {
    const box = $("#c" + b.dataset.c);
    if (box.innerHTML) {
      box.innerHTML = "";
      return;
    }
    const { data: data2 } = await sb.from("comments").select("*,profiles(name)").eq("post_id", b.dataset.c).order("created_at");
    box.innerHTML = (data2 || []).map((c) => {
      var _a;
      return `<div class="t" style="margin-top:6px"><b>${esc((_a = c.profiles) == null ? void 0 : _a.name)}</b> ${esc(c.body)}</div>`;
    }).join("") + `<div class="r"><input style="flex:1;width:auto" placeholder="Votre commentaire\u2026"><button>OK</button></div>`;
    box.querySelector("button").onclick = async () => {
      const v = box.querySelector("input").value.trim();
      if (v) {
        await sb.from("comments").insert({ post_id: b.dataset.c, body: v });
        loadPosts();
      }
    };
  });
  document.querySelectorAll("[data-r]").forEach((b) => b.onclick = async () => {
    const r = prompt("Motif du signalement ?");
    if (r) {
      await sb.from("reports").insert({ post_id: b.dataset.r, reason: r });
      alert("Merci, signalement envoy\xE9.");
    }
  });
}
async function people() {
  const { data } = await sb.from("profiles").select("id,name,country").neq("id", me.id).order("name").limit(200);
  $("#who2").innerHTML = '<option value="">Choisir une personne\u2026</option>' + (data || []).map((u) => `<option value="${u.id}">${esc(u.name)} (${esc(u.country)})</option>`).join("");
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
$("#dms").onclick = async () => {
  const b = $("#dmt").value.trim();
  if (!b || !peer) return;
  await sb.from("messages").insert({ receiver: peer, body: b });
  $("#dmt").value = "";
  loadDm();
};
let drec = null;
$("#dmic").onclick = async () => {
  if (drec) {
    drec.stop();
    return;
  }
  if (!peer) return alert("Choisissez une personne.");
  try {
    const s = await navigator.mediaDevices.getUserMedia({ audio: true }), ch = [];
    drec = new MediaRecorder(s);
    drec.ondataavailable = (e) => ch.push(e.data);
    drec.onstop = async () => {
      s.getTracks().forEach((t) => t.stop());
      drec = null;
      $("#dmic").textContent = "\u{1F3A4}";
      try {
        const u = await up("media", new Blob(ch, { type: "audio/webm" }), "webm");
        await sb.from("messages").insert({ receiver: peer, audio: u });
        loadDm();
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
async function friends() {
  const { data: f } = await sb.from("friends").select("*");
  const q = ($("#fs").value || "").trim().replace(/[,%()]/g, "");
  let qq = sb.from("profiles").select("id,name,country").neq("id", me.id);
  if (q) qq = qq.or(`name.ilike.%${q}%,country.ilike.%${q}%,city.ilike.%${q}%`);
  const { data: u } = await qq.order("name").limit(200);
  const st = (id) => (f || []).find((x) => x.a == id || x.b == id);
  $("#fr").innerHTML = (u || []).map((x) => {
    const r = st(x.id);
    let a;
    if (!r) a = `<button data-a="${x.id}">Ajouter</button>`;
    else if (r.status == "accepted") a = '<span class="t">\u2714 Ami</span>';
    else if (r.a == me.id) a = '<span class="t">Demande envoy\xE9e</span>';
    else a = `<button data-k="${x.id}">Accepter</button>`;
    return `<div class="r" style="justify-content:space-between"><span>${esc(x.name)} <span class="t">${esc(x.country)}</span></span>${a}</div>`;
  }).join("") || '<p class="t">Aucun autre membre pour le moment.</p>';
  $("#fr").querySelectorAll("[data-a]").forEach((b) => b.onclick = async () => {
    await sb.from("friends").insert({ b: b.dataset.a });
    friends();
  });
  $("#fr").querySelectorAll("[data-k]").forEach((b) => b.onclick = async () => {
    await sb.from("friends").update({ status: "accepted" }).match({ a: b.dataset.k, b: me.id });
    friends();
  });
}
let ft;
$("#fs").oninput = () => {
  clearTimeout(ft);
  ft = setTimeout(friends, 350);
};
const nb = { bd: 0, bf: 0 };
function badge(id, n) {
  nb[id] = n ? nb[id] + n : 0;
  const e = $("#" + id);
  e.textContent = nb[id];
  e.hidden = !nb[id];
  document.title = (nb.bd + nb.bf ? `(${nb.bd + nb.bf}) ` : "") + "Hexa";
}
function notify(t) {
  const e = $("#ts");
  e.textContent = t;
  e.style.display = "block";
  setTimeout(() => e.style.display = "none", 3500);
  try {
    if (document.hidden && Notification.permission == "granted") new Notification("Hexa", { body: t });
  } catch (x) {
  }
}
$("#nt").onclick = async () => {
  try {
    const r = await Notification.requestPermission();
    $("#nt").textContent = r == "granted" ? "\u{1F514} Notifications activ\xE9es" : "\u{1F515} Notifications refus\xE9es";
  } catch (e) {
  }
};
start();


};
