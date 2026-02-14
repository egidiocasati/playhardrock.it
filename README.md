# PLAY HARD - Official Website

Hard Rock/Metal Band italiana con membri storici di R.A.F., Vanadium, Bloody Skizz e Boarders.

## 🎸 About

Play Hard è una band hard rock/metal composta da musicisti con una storia che abbraccia decenni di palchi nazionali e internazionali. Membri che hanno condiviso il palco con leggende come Metallica, Manowar, Iron Maiden, Kiss e Helloween.

## 🚀 Deployment su GitHub Pages

### Setup Iniziale

1. Crea un nuovo repository su GitHub (es. `playhard-website`)

2. Inizializza git nella cartella del progetto:
```bash
cd /Users/motor/Documents/workspace.nosync/playhard
git init
git add .
git commit -m "Initial commit: Play Hard website"
```

3. Collega il repository remoto:
```bash
git remote add origin https://github.com/TUO-USERNAME/playhard-website.git
git branch -M main
git push -u origin main
```

4. Abilita GitHub Pages:
   - Vai su Settings > Pages
   - Source: Deploy from a branch
   - Branch: main / (root)
   - Salva

5. Il sito sarà disponibile all'indirizzo:
   `https://TUO-USERNAME.github.io/playhard-website/`

### Dominio Personalizzato (Opzionale)

Se vuoi usare un dominio personalizzato (es. `playhard.band`):

1. Crea un file `CNAME` con il tuo dominio:
```bash
echo "playhard.band" > CNAME
```

2. Configura i DNS del tuo dominio:
   - Tipo A record: punta a `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - Oppure CNAME record: punta a `TUO-USERNAME.github.io`

## 📝 Personalizzazione

### Contact Form

Il form di contatto è attualmente configurato per mostrare un messaggio di successo locale. Per integrare un servizio di invio email:

#### Opzione 1: Formspree (Consigliato - Gratuito)

1. Vai su [formspree.io](https://formspree.io) e crea un account
2. Crea un nuovo form e ottieni il tuo endpoint
3. In `script.js`, sostituisci il commento con:

```javascript
const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
    method: 'POST',
    body: formData,
    headers: {
        'Accept': 'application/json'
    }
});

if (response.ok) {
    showMessage('Grazie per il tuo messaggio! Ti contatteremo al più presto.', 'success');
    contactForm.reset();
} else {
    throw new Error('Form submission failed');
}
```

#### Opzione 2: EmailJS

1. Crea un account su [emailjs.com](https://www.emailjs.com/)
2. Configura un servizio email
3. Aggiungi lo script EmailJS e configura come da documentazione

### Aggiungere Immagini

Per migliorare ulteriormente il sito, puoi aggiungere:

1. **Logo della band**: Sostituisci il testo "PLAY HARD" nel navbar con un'immagine
2. **Foto dei membri**: Aggiungi le foto nella sezione membri
3. **Background hero**: Sostituisci il background SVG con una foto della band dal vivo

Esempio per aggiungere foto membri:
```html
<div class="member-photo">
    <img src="images/maurizio.jpg" alt="Maurizio Roveron">
</div>
```

### Modificare Contenuti

- **Setlist**: Modifica la sezione `#setlist` in `index.html`
- **Informazioni tecniche**: Aggiorna la sezione `#technical`
- **Contatti**: Modifica email e telefono nella sezione `#contact`

## 🎨 Struttura del Progetto

```
playhard/
├── index.html          # Pagina principale
├── style.css           # Stili
├── script.js           # JavaScript
├── README.md           # Questo file
└── images/            # (da creare) Per foto e immagini
```

## 🛠️ Tecnologie Utilizzate

- HTML5
- CSS3 (Grid, Flexbox, Animations)
- JavaScript (Vanilla)
- Google Fonts (Bebas Neue, Roboto)

## 📱 Responsive Design

Il sito è completamente responsive e ottimizzato per:
- Desktop (1920px+)
- Laptop (1024px - 1919px)
- Tablet (768px - 1023px)
- Mobile (< 768px)

## 🎯 Features

- ✅ Design moderno e accattivante in stile metal/rock
- ✅ Navigazione smooth scroll
- ✅ Menu mobile responsive
- ✅ Effetti parallax e animazioni
- ✅ Form di contatto
- ✅ Link ai social media
- ✅ Sezione technical rider completa
- ✅ SEO friendly

## 📧 Contatti

Per informazioni sulla band:
- Email: info@playhard.band
- Tel: +39 02 7531452
- Management: Gerli Music Management

## 📄 Licenza

© 2026 Play Hard. All rights reserved.
