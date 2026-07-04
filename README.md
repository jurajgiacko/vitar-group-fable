# VITAR Group — korporátní web

Statický korporátní web **VITAR Group** (vitar.group / vitar-group.cz). „Statický svět" dle cílové architektury skupiny: prezentuje výrobce, brand house a zaměstnavatele — **neprodává** (žádný košík, žádný fulfillment; B2C prodej žije na e-shopech značek).

**Vizuál:** Bloomfield Brand Studio rebrand, **varianta 1A / v1 (korporátní)** — dle rozhodnutí týmu. Elektrická modrá `#3B2CFF` + zelený pětilístek `#64DD6C`, černé panely s outline vzorem pětilístku, ostřejší typografie. **Logo lockupy i pětilístek jsou skutečné vektory extrahované z brand decku** (`assets/logo.svg` horizontální, `assets/logo-stacked.svg`, `assets/flower.svg`).

**Design pass (frontend-design skill):** hero = teze z VITARova světa — šumivá tableta rozpuštěná ve sklenici, maskovaná do tvaru pětilístku (signature element webu). Pod hero „šarže" linka v IBM Plex Mono (`// Zlín, CZ // zal. 1990 // … // každá šarže s CoA`) — odkaz na dohledatelnost šarží jako trust story. Role karty nesou data místo dekorativního číslování. Marquee odstraněno.

**Motion:** GSAP 3 + ScrollTrigger + Lenis (vendorováno v `js/vendor/`, žádný build step). Pinned hero se split-text revealem, scrub statement, stacked role cards, pinned horizontální brand rail, flower-mask reveal, scroll-reactive marquee, magnetic buttons, hide-on-scroll header. Vše s `prefers-reduced-motion` fallbackem.

**Brand assety:** `assets/brands/` obsahuje reálná loga a packshoty značek stažené z vitar.cz a nasevitaminy.cz (viz `assets/brands/manifest.json` se zdrojovými URL). Enervit a Royal Bay záměrně vynechány.

**Konkurenční prehľad:** `docs/KONKURENCNY-PREHLAD.md` — 10 benchmark profilů (Lonza, Catalent, Sirio, Queisser/Doppelherz, dsm-firmenich, Haleon, Kofola, Prazdroj, ŠKODA kariéra, Gelita), syntéza vzorů a motion playbook.

**RFQ kvalifikační modal** (`js/rfq.js`, vzor Sirio Pharma): každé CTA „Poptat výrobu" otevírá čtyřkrokový průvodce — typ spolupráce → formy produktu → objem a trh → kontakt. Výstupem je strukturovaný předvyplněný e-mail (mailto, bez backendu). Dvojjazyčný (čte `<html lang>`), klávesnice + Esc, fallback = klasický formulář na `vyroba.html#poptavka` (funguje i bez JS, protože trigger je odkaz na kotvu).

**EN mutace:** `en/` — zrcadlové stránky v angličtině (stejné slugy pro 1:1 mapování), hreflang v hlavičkách, přepínač CZ/EN v navigaci. Cíl dle doménové strategie: vitar.eu → vitar.group/en.

## Struktura

| Soubor | Obsah |
|---|---|
| `index.html` | Homepage — claim, čísla skupiny, tři role (brand house / výrobce / zaměstnavatel) |
| `o-nas.html` | Příběh, milníky, hodnoty, čísla |
| `znacky.html` | Brand house — portfolio značek + „kde nakoupit" rozcestník na e-shopy |
| `vyroba.html` | B2B/OEM — vývoj na míru, private label, zakázková výroba, kvalita, RFQ formulář |
| `kariera.html` | Employer branding — týmy, proč k nám, CTA na pozice |
| `kontakt.html` | Kontakty a rozcestník (IČ 00566632) |
| `kvalita.html` | ISO 22000, FSSC 22000, Charta kvality ČR, kontrola doplňků stravy |
| `eticky-kodex.html`, `whistleblowing.html` | Compliance (zák. 171/2023 Sb., pověřená osoba, kanály oznámení) |
| `css/styles.css` | Design systém (tokeny, komponenty) |
| `js/main.js` | Motion engine (GSAP ScrollTrigger + Lenis) |
| `js/vendor/` | gsap.min.js, ScrollTrigger.min.js, lenis.min.js |
| `assets/logo.svg` / `logo-white.svg` | Skutečný logotyp z decku (vektor) |
| `assets/brands/` | Reálná loga + packshoty značek (manifest.json) |
| `assets/sprite.svg` | SVG sprite: pětilístek (real), ikony |
| `docs/KONKURENCNY-PREHLAD.md` | Konkurenční benchmark + motion playbook |
| `assets/og.png` | Social share obrázek 1200×630 |

Žádný build step — soubory se servují tak, jak jsou. Lokálně: `python3 -m http.server 8000`.

## Brand tokeny (varianta 1A / v1)

| Token | Hex | Použití |
|---|---|---|
| `--indigo` | `#3B2CFF` | Primární elektrická modrá — logo, CTA, akcenty |
| `--green` | `#64DD6C` | Pětilístek, čísla na tmavé, checkmarky |
| `--indigo-dark` | `#0B0B10` | Černé panely (stats, footer) s outline vzorem |
| `--ink` | `#101015` | Text |
| `--paper` | `#FBFBFB` | Pozadí |

**Typografie:** `Space Grotesk` (display — webová náhrada za font Youth od Jana Nováka z decku; Youth je placený, po nákupu licence stačí vyměnit font-family; Space Grotesk má plnou češtinu) + `Inter` (text).

**Pětilístek + logotypy:** extrahované vektorové křivky přímo z PDF brand decku (strany 13 a 19) — skutečné tvary od Bloomfieldu včetně ®. Outline vzor pětilístku na černých plochách odpovídá stranám 28–29 decku.

## Zdroje obsahu

Obsah vychází z projektové dokumentace `vitar-eshop-digitalizace` (KNOWLEDGE_BASE, L0–L7 architektura Tomáše Červinky, onboarding briefing, doménové zadání) a brand decku Bloomfield. Důvěrné údaje (finance BU, interní struktura, vendor pricing) na webu nejsou.

## ⚠️ K ověření před spuštěním

- [ ] **E-mail** `vitar@vitar.cz` — použit jako jediný kontaktní kanál (formuláře, kariéra, média). Potvrdit / nahradit oficiálními adresami.
- [ ] **Adresa** „třída Tomáše Bati 385, 763 02 Zlín" — převzata z brand decku (mockup polepu vozu). Ověřit proti OR.
- [x] **IČ** — 00566632 (z vitar.cz) doplněno na kontakt. DIČ doplnit.
- [ ] **Čísla skupiny:** ~250 lidí, 27 mil. ks kapacita, ~40 exportních trhů (odhad), 16 značek, tržní podíl neuváděn. Ověřit s Tomášem/Karlem.
- [x] **Certifikace** — doplněno z vitar.cz: ISO 22000, FSSC 22000, Charta kvality ČR (stránka kvalita.html). Pozor: certifikátové PDF na vitar.cz jsou z r. 2023 — ověřit platnost/recertifikaci.
- [ ] **Milníky na o-nas.html** — dekády jsou přibližné, přesná data doplnit z firemní kroniky.
- [x] **Formy výroby** — sladěno s vitar.cz/vyroba-a-vyvoj: šumivé tablety, tablety, kapsle, sypké směsi, sirupy, pitíčka; balení tuby/blistry/krabičky/dózy/sáčky/stick packy. Gummies odstraněny — vitar.cz je neuvádí.
- [ ] **Fotografie interiérů** (`assets/photos/` — výroba, laboratoř, kancelář) jsou **AI-modernizované verze** reálných fotek z vitar.cz (Gemini 2.5 Flash Image; stejná scéna a kompozice, vyčištěný interiér a světlo — viz `note` v manifestu). Před spuštěním nahradit skutečným fotoshootem, nebo nechat schválit brandem. Budova Zlín a letecký Tišnov jsou originály. `sklad-expedice.jpg` a `rodina-lifestyle.jpg` jsou **plně AI-generované** (reálná předloha neexistovala). Soubory na webu mají suffix `-v2` kvůli cache-bustingu (assets mají rok immutable cache).
- [ ] **GDPR/cookies** — web nemá žádné trackery ani cookies; při nasazení analytiky doplnit lištu + privacy stránku.
- [ ] **EN verze** (vitar.eu → vitar.group/en) — připraveno strukturou, obsah zatím jen CZ.

## Deploy

Vercel (static). `vercel.json` nastavuje security headers a čisté URL. Cílová doména: **vitar.group** (+ přesměrování vitar-group.cz/.sk/.com/.eu dle doménového portfolia).
