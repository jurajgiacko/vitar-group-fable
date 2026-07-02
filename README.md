# VITAR Group — korporátní web

Statický korporátní web **VITAR Group** (vitar.group / vitar-group.cz). „Statický svět" dle cílové architektury skupiny: prezentuje výrobce, brand house a zaměstnavatele — **neprodává** (žádný košík, žádný fulfillment; B2C prodej žije na e-shopech značek).

**Vizuál:** Bloomfield Brand Studio rebrand, **varianta 1B / v2** — periwinkle indigo + zelený pětilístek, zaoblená typografie, organické blob tvary.

## Struktura

| Soubor | Obsah |
|---|---|
| `index.html` | Homepage — claim, čísla skupiny, tři role (brand house / výrobce / zaměstnavatel) |
| `o-nas.html` | Příběh, milníky, hodnoty, čísla |
| `znacky.html` | Brand house — portfolio značek + „kde nakoupit" rozcestník na e-shopy |
| `vyroba.html` | B2B/OEM — vývoj na míru, private label, zakázková výroba, kvalita, RFQ formulář |
| `kariera.html` | Employer branding — týmy, proč k nám, CTA na pozice |
| `kontakt.html` | Kontakty a rozcestník |
| `css/styles.css` | Design systém (tokeny, komponenty) |
| `js/main.js` | Nav, scroll reveal, čítače — bez závislostí |
| `assets/sprite.svg` | SVG sprite: pětilístek, blobs, ikony |
| `assets/og.png` | Social share obrázek 1200×630 |

Žádný build step — soubory se servují tak, jak jsou. Lokálně: `python3 -m http.server 8000`.

## Brand tokeny (varianta 1B)

| Token | Hex | Použití |
|---|---|---|
| `--indigo` | `#5762D5` | Primární — logo, CTA, plochy |
| `--green` | `#97DF73` | Pětilístek, akcenty, checkmarky |
| `--coral` | `#F25F5C` | Doplňkový akcent |
| `--amber` | `#F4B266` | Doplňkový akcent |
| `--ink` | `#1D2050` | Text |
| `--paper` | `#FAFAF6` | Pozadí |

**Typografie:** `Baloo 2` (display — webová náhrada za RF Atlantic z brand decku; RF Atlantic je placený font od Renegade Fonts, po nákupu licence stačí vyměnit font-family) + `Inter` (text). Pozn.: Fredoka byla zavržena — chybí jí české glyfy (ě, č, ř, ů…).

**Pětilístek:** generovaný SVG (union 5 elips) — aproximace brandového symbolu. Po dodání finálních křivek od Bloomfieldu nahradit v `assets/sprite.svg` (symbol `#flower`) a `assets/favicon.svg`.

## Zdroje obsahu

Obsah vychází z projektové dokumentace `vitar-eshop-digitalizace` (KNOWLEDGE_BASE, L0–L7 architektura Tomáše Červinky, onboarding briefing, doménové zadání) a brand decku Bloomfield. Důvěrné údaje (finance BU, interní struktura, vendor pricing) na webu nejsou.

## ⚠️ K ověření před spuštěním

- [ ] **E-mail** `vitar@vitar.cz` — použit jako jediný kontaktní kanál (formuláře, kariéra, média). Potvrdit / nahradit oficiálními adresami.
- [ ] **Adresa** „třída Tomáše Bati 385, 763 02 Zlín" — převzata z brand decku (mockup polepu vozu). Ověřit proti OR.
- [ ] **IČO/DIČ** — záměrně neuvedeno, doplnit do patičky po ověření.
- [ ] **Čísla skupiny:** ~250 lidí, 27 mil. ks kapacita, ~40 exportních trhů (odhad), 16 značek, tržní podíl neuváděn. Ověřit s Tomášem/Karlem.
- [ ] **Certifikace** — na webu záměrně obecně („systém řízení kvality, HACCP, správná výrobní praxe"). Konkrétní certifikáty (ISO/IFS…) doplnit po dodání skenů/čísel.
- [ ] **Milníky na o-nas.html** — dekády jsou přibližné, přesná data doplnit z firemní kroniky.
- [ ] **Formy výroby** (gummies, stick packy…) — potvrdit skutečné technologické portfolio.
- [ ] **Timeline pozn.:** dle zápisu z 9. 6. 2026 padla preference „levé (serióznější)" varianty pro Group — tento web staví na **v2/1B** dle aktuálního zadání (2. 7. 2026). Pokud se rozhodnutí vrátí k v1, jde o výměnu tokenů v `styles.css`.
- [ ] **GDPR/cookies** — web nemá žádné trackery ani cookies; při nasazení analytiky doplnit lištu + privacy stránku.
- [ ] **EN verze** (vitar.eu → vitar.group/en) — připraveno strukturou, obsah zatím jen CZ.

## Deploy

Vercel (static). `vercel.json` nastavuje security headers a čisté URL. Cílová doména: **vitar.group** (+ přesměrování vitar-group.cz/.sk/.com/.eu dle doménového portfolia).
