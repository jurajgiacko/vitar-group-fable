/* VITAR Group — qualification RFQ modal (Sirio pattern: segment → form → volume/market → contact) */
(function () {
  "use strict";

  var LANG = (document.documentElement.lang || "cs").slice(0, 2) === "en" ? "en" : "cs";

  var T = {
    cs: {
      title: "Poptávka výroby",
      subtitle: "Čtyři rychlé kroky — ať se na vás obchodní tým připraví.",
      steps: ["Spolupráce", "Forma", "Objem a trh", "Kontakt"],
      q1: "Jaký typ spolupráce hledáte?",
      types: [
        ["private-label", "Private label", "Ověřené receptury s vaší etiketou"],
        ["oem", "Zakázková výroba (OEM)", "Výroba podle vaší receptury"],
        ["vyvoj", "Vývoj na míru", "Od nápadu k receptuře i produktu"],
        ["distribuce", "Export / distribuce", "Naše značky na vašem trhu"]
      ],
      q2: "Jaké formy produktu vás zajímají?",
      q2hint: "Vyberte jednu nebo více možností.",
      forms: ["Tablety", "Šumivé tablety", "Kapsle", "Sáčky / stick packy", "Sirupy a tekuté formy", "Želé / gummies", "Ještě nevím"],
      q3a: "Odhadovaný roční objem",
      volumes: ["do 5 000 ks", "5–20 tis. ks", "20–100 tis. ks", "100 tis.+ ks", "Zatím nevím"],
      q3b: "Cílový trh",
      markets: ["ČR / SK", "Evropská unie", "Mimo EU", "Více trhů"],
      q4: "Na koho se máme obrátit?",
      name: "Jméno a příjmení *",
      company: "Firma *",
      email: "E-mail *",
      message: "Poznámka (nepovinné)",
      msgPh: "Cokoli, co nám pomůže se připravit…",
      back: "Zpět",
      next: "Pokračovat",
      submit: "Odeslat poptávku",
      note: "Odesláním se otevře připravený e-mail ve vašem poštovním klientovi. Údaje zpracováváme pouze pro vyřízení poptávky.",
      close: "Zavřít",
      required: "Vyplňte prosím povinná pole.",
      pick: "Vyberte prosím jednu možnost.",
      mailSubject: "Poptávka výroby",
      mailLabels: ["Typ spolupráce", "Formy produktu", "Roční objem", "Cílový trh", "Jméno", "Firma", "E-mail", "Poznámka"]
    },
    en: {
      title: "Manufacturing inquiry",
      subtitle: "Four quick steps so our sales team can prepare for you.",
      steps: ["Partnership", "Format", "Volume & market", "Contact"],
      q1: "What type of partnership are you looking for?",
      types: [
        ["private-label", "Private label", "Proven formulas under your brand"],
        ["oem", "Contract manufacturing (OEM)", "Production to your formula"],
        ["vyvoj", "Custom development", "From idea to formula and product"],
        ["distribuce", "Export / distribution", "Our brands on your market"]
      ],
      q2: "Which product formats are you interested in?",
      q2hint: "Select one or more options.",
      forms: ["Tablets", "Effervescent tablets", "Capsules", "Sachets / stick packs", "Syrups & liquids", "Gummies", "Not sure yet"],
      q3a: "Estimated annual volume",
      volumes: ["up to 5,000 pcs", "5–20k pcs", "20–100k pcs", "100k+ pcs", "Not sure yet"],
      q3b: "Target market",
      markets: ["Czechia / Slovakia", "European Union", "Outside the EU", "Multiple markets"],
      q4: "Who should we get back to?",
      name: "Full name *",
      company: "Company *",
      email: "E-mail *",
      message: "Note (optional)",
      msgPh: "Anything that helps us prepare…",
      back: "Back",
      next: "Continue",
      submit: "Send inquiry",
      note: "Submitting opens a pre-filled e-mail in your mail client. We process your data solely to handle this inquiry.",
      close: "Close",
      required: "Please fill in the required fields.",
      pick: "Please select an option.",
      mailSubject: "Manufacturing inquiry",
      mailLabels: ["Partnership type", "Product formats", "Annual volume", "Target market", "Name", "Company", "E-mail", "Note"]
    }
  }[LANG];

  var state = { step: 0, type: null, forms: [], volume: null, market: null };

  /* ---------- markup ---------- */
  var root = document.createElement("div");
  root.className = "rfq";
  root.setAttribute("role", "dialog");
  root.setAttribute("aria-modal", "true");
  root.setAttribute("aria-label", T.title);
  root.hidden = true;

  function chips(name, items, multi) {
    return '<div class="rfq-chips" data-name="' + name + '" data-multi="' + (multi ? 1 : 0) + '">' +
      items.map(function (it) {
        return '<button type="button" class="rfq-chip" data-value="' + it + '">' + it + "</button>";
      }).join("") + "</div>";
  }

  root.innerHTML =
    '<div class="rfq-backdrop" data-close></div>' +
    '<div class="rfq-panel">' +
      '<button type="button" class="rfq-close" data-close aria-label="' + T.close + '">×</button>' +
      '<div class="rfq-head">' +
        '<p class="rfq-eyebrow">' + T.title + "</p>" +
        '<p class="rfq-sub">' + T.subtitle + "</p>" +
        '<ol class="rfq-progress">' + T.steps.map(function (s, i) {
          return '<li data-step="' + i + '"><span>' + (i + 1) + "</span>" + s + "</li>";
        }).join("") + "</ol>" +
      "</div>" +
      '<div class="rfq-body">' +

        '<section class="rfq-step" data-step="0">' +
          "<h3>" + T.q1 + "</h3>" +
          '<div class="rfq-cards">' + T.types.map(function (t) {
            return '<button type="button" class="rfq-card" data-value="' + t[1] + '"><strong>' + t[1] + "</strong><span>" + t[2] + "</span></button>";
          }).join("") + "</div>" +
        "</section>" +

        '<section class="rfq-step" data-step="1" hidden>' +
          "<h3>" + T.q2 + "</h3>" +
          '<p class="rfq-hint">' + T.q2hint + "</p>" +
          chips("forms", T.forms, true) +
        "</section>" +

        '<section class="rfq-step" data-step="2" hidden>' +
          "<h3>" + T.q3a + "</h3>" + chips("volume", T.volumes, false) +
          "<h3>" + T.q3b + "</h3>" + chips("market", T.markets, false) +
        "</section>" +

        '<section class="rfq-step" data-step="3" hidden>' +
          "<h3>" + T.q4 + "</h3>" +
          '<div class="rfq-fields">' +
            '<label>' + T.name + '<input type="text" name="name" autocomplete="name" required></label>' +
            '<label>' + T.company + '<input type="text" name="company" autocomplete="organization" required></label>' +
            '<label class="rfq-full">' + T.email + '<input type="email" name="email" autocomplete="email" required></label>' +
            '<label class="rfq-full">' + T.message + '<textarea name="message" rows="3" placeholder="' + T.msgPh + '"></textarea></label>' +
          "</div>" +
          '<p class="rfq-note">' + T.note + "</p>" +
        "</section>" +

        '<p class="rfq-error" hidden></p>' +
      "</div>" +
      '<div class="rfq-foot">' +
        '<button type="button" class="btn btn--ghost rfq-back" hidden>' + T.back + "</button>" +
        '<button type="button" class="btn rfq-next">' + T.next + ' <span class="arrow">→</span></button>' +
      "</div>" +
    "</div>";

  document.addEventListener("DOMContentLoaded", function () { document.body.appendChild(root); });
  if (document.readyState !== "loading") document.body.appendChild(root);

  /* ---------- behaviour ---------- */
  var lastFocus = null;

  function qs(s) { return root.querySelector(s); }
  function qsa(s) { return Array.prototype.slice.call(root.querySelectorAll(s)); }

  function setError(msg) {
    var e = qs(".rfq-error");
    e.textContent = msg || "";
    e.hidden = !msg;
  }

  function render() {
    qsa(".rfq-step").forEach(function (s) { s.hidden = +s.getAttribute("data-step") !== state.step; });
    qsa(".rfq-progress li").forEach(function (li) {
      var i = +li.getAttribute("data-step");
      li.classList.toggle("is-active", i === state.step);
      li.classList.toggle("is-done", i < state.step);
    });
    qs(".rfq-back").hidden = state.step === 0;
    qs(".rfq-next").innerHTML = (state.step === 3 ? T.submit : T.next) + ' <span class="arrow">→</span>';
    setError("");
  }

  function open() {
    lastFocus = document.activeElement;
    root.hidden = false;
    document.body.classList.add("rfq-open");
    requestAnimationFrame(function () { root.classList.add("is-open"); });
    var first = qs(".rfq-step:not([hidden]) button, .rfq-step:not([hidden]) input");
    if (first) first.focus();
  }

  function close() {
    root.classList.remove("is-open");
    document.body.classList.remove("rfq-open");
    setTimeout(function () { root.hidden = true; }, 250);
    if (lastFocus) lastFocus.focus();
  }

  root.addEventListener("click", function (e) {
    if (e.target.closest("[data-close]")) { close(); return; }

    var card = e.target.closest(".rfq-card");
    if (card) {
      qsa(".rfq-card").forEach(function (c) { c.classList.remove("is-selected"); });
      card.classList.add("is-selected");
      state.type = card.getAttribute("data-value");
      setTimeout(function () { state.step = 1; render(); }, 180);
      return;
    }

    var chip = e.target.closest(".rfq-chip");
    if (chip) {
      var group = chip.closest(".rfq-chips");
      var multi = group.getAttribute("data-multi") === "1";
      if (multi) {
        chip.classList.toggle("is-selected");
        state.forms = qsa('.rfq-chips[data-name="forms"] .is-selected').map(function (c) { return c.getAttribute("data-value"); });
      } else {
        qsa('.rfq-chips[data-name="' + group.getAttribute("data-name") + '"] .rfq-chip').forEach(function (c) { c.classList.remove("is-selected"); });
        chip.classList.add("is-selected");
        state[group.getAttribute("data-name")] = chip.getAttribute("data-value");
      }
      setError("");
    }
  });

  qs(".rfq-back").addEventListener("click", function () {
    if (state.step > 0) { state.step--; render(); }
  });

  qs(".rfq-next").addEventListener("click", function () {
    if (state.step === 0) {
      if (!state.type) return setError(T.pick);
      state.step = 1; render();
    } else if (state.step === 1) {
      if (!state.forms.length) return setError(T.pick);
      state.step = 2; render();
    } else if (state.step === 2) {
      if (!state.volume || !state.market) return setError(T.pick);
      state.step = 3; render();
      var f = qs('input[name="name"]'); if (f) f.focus();
    } else {
      var name = qs('input[name="name"]').value.trim();
      var company = qs('input[name="company"]').value.trim();
      var email = qs('input[name="email"]').value.trim();
      if (!name || !company || !email || email.indexOf("@") < 1) return setError(T.required);
      var msg = qs('textarea[name="message"]').value.trim();
      var L = T.mailLabels;
      var body =
        L[0] + ": " + state.type + "\n" +
        L[1] + ": " + state.forms.join(", ") + "\n" +
        L[2] + ": " + state.volume + "\n" +
        L[3] + ": " + state.market + "\n\n" +
        L[4] + ": " + name + "\n" +
        L[5] + ": " + company + "\n" +
        L[6] + ": " + email +
        (msg ? "\n\n" + L[7] + ":\n" + msg : "");
      window.location.href = "mailto:vitar@vitar.cz?subject=" +
        encodeURIComponent(T.mailSubject + " — " + company) +
        "&body=" + encodeURIComponent(body);
      close();
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !root.hidden) close();
  });

  /* triggers: every link pointing to the RFQ anchor */
  document.addEventListener("click", function (e) {
    var a = e.target.closest('a[href*="#poptavka"], a[href*="#inquiry"]');
    if (!a) return;
    e.preventDefault();
    state = { step: 0, type: null, forms: [], volume: null, market: null };
    qsa(".is-selected").forEach(function (el) { el.classList.remove("is-selected"); });
    render();
    open();
  });
})();
