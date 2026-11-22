# PlayHard — Official Website

Hard Rock/Metal Band italiana fondata nel 1979, con musicisti storici di R.A.F., Vanadium, Bloody Skizz e Boarders.

**Sito:** [www.playhardrock.it](https://www.playhardrock.it)

## Architettura

Sito statico HTML/CSS/JavaScript deployato su GitHub Pages con dominio custom.

```
playhard/
├── index.html              # Pagina principale (single page)
├── cookie-policy.html      # Informativa cookie
├── style.css               # Stili (CSS Grid, Flexbox, animazioni)
├── script.js               # JavaScript vanilla (no framework)
├── data/
│   └── shows.json          # Date dei concerti (single source of truth)
├── images/                 # Foto band, membri, venue
├── build.js                # Genera HTML statico e JSON-LD da shows.json
├── deploy.sh               # Script di deploy su GitHub Pages
├── serve.sh                # Server locale per sviluppo
├── robots.txt              # Direttive crawler (SEO + AI bot)
├── sitemap.xml             # Sitemap XML
├── llms.txt                # Scheda band per crawler AI/LLM
├── CNAME                   # Dominio custom (www.playhardrock.it)
└── favicon.png
```

### Tecnologie

- HTML5 semantico con ARIA attributes
- CSS3 (Grid, Flexbox, custom properties, animazioni)
- JavaScript vanilla (ES5, nessuna dipendenza)
- Google Fonts (Space Grotesk)
- Formspree per il form di contatto
- GitHub Pages per l'hosting

## Gestione date concerti

Le date dei concerti sono gestite esclusivamente tramite `data/shows.json`. Ogni concerto ha questa struttura:

```json
{
  "date": "2026-11-14",
  "time": "22:00",
  "day": "Sabato",
  "venue": "The Old Jesse",
  "city": "Saronno",
  "address": "Via Maestri del Lavoro 27",
  "venueUrl": "https://www.facebook.com/THEOLDJESSE",
  "mapUrl": "https://www.google.com/maps/search/?api=1&query=...",
  "venueLogo": "images/old_jesse_logo.jpg"
}
```

### Workflow per aggiungere/modificare date

1. Modifica `data/shows.json`
2. Esegui `node build.js`
3. Commit e push (oppure usa `./deploy.sh` che esegue il build automaticamente)

### Come funziona il build

`build.js` legge `data/shows.json` e aggiorna `index.html` automaticamente:

- **JSON-LD MusicEvent**: genera dati strutturati Schema.org per ogni concerto (tra i marker `BUILD:EVENTS_JSONLD_START/END`)
- **Noscript fallback**: genera HTML statico visibile ai crawler che non eseguono JavaScript (tra i marker `BUILD:SHOWS_NOSCRIPT_START/END`)
- Classifica automaticamente i concerti in "Prossime Date" e "Date Passate" in base alla data corrente
- Lato client, `script.js` carica `shows.json` via fetch e rende le card dinamicamente, con la stessa logica di classificazione

## SEO e discoverability AI

### File SEO

- **`robots.txt`** — Consente accesso a tutti i crawler, inclusi bot AI (GPTBot, ClaudeBot, Google-Extended, PerplexityBot, Applebot-Extended)
- **`sitemap.xml`** — Mappa gli URL canonici del sito (homepage, cookie policy, llms.txt)
- **`llms.txt`** — Scheda informativa strutturata in Markdown per crawler AI/LLM: contiene bio della band, line-up, repertorio, technical rider e contatti

### Dati strutturati (Schema.org JSON-LD)

L'`<head>` di `index.html` contiene:

- **MusicGroup** — Nome, genere, anno di fondazione, membri con ruoli e bio, contatti, link social
- **MusicEvent** (array) — Generato da `build.js`, un evento per ogni concerto in `shows.json`

## Sviluppo locale

```bash
# Avvia server locale
./serve.sh
# Poi apri http://localhost:8000

# Dopo modifiche a shows.json, rigenera i contenuti statici
node build.js
```

## Deploy

```bash
# Deploy automatico (esegue build + commit + push)
./deploy.sh

# Oppure manualmente
node build.js
git add .
git commit -m "Descrizione delle modifiche"
git push
```

GitHub Pages serve i file dalla branch `main` (root). Il dominio custom `www.playhardrock.it` e' configurato tramite il file `CNAME` e i DNS.

## Contatti

- **Booking:** [booking@playhardrock.it](mailto:booking@playhardrock.it)
- **Facebook:** [PlayHardrockhardband](https://www.facebook.com/PlayHardrockhardband)
- **YouTube:** [@playhard5157](https://www.youtube.com/@playhard5157)
- **Management:** [Gerli Music Management](https://gerlimusicmanagement.it/artista/playhard/)
