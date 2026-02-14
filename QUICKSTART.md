# 🎸 PLAY HARD - Guida Rapida

## 🚀 Testing Locale

### Metodo 1: Apertura diretta
```bash
open index.html
```

### Metodo 2: Server locale (consigliato)
```bash
./serve.sh
```
Poi vai su http://localhost:8000

## 📤 Deploy su GitHub Pages

### Setup Rapido
```bash
./deploy.sh
```
Lo script ti guiderà passo-passo.

### Setup Manuale
```bash
# 1. Inizializza Git (se non fatto)
git init

# 2. Aggiungi i file
git add .

# 3. Commit
git commit -m "Initial commit: Play Hard website"

# 4. Aggiungi repository remoto
git remote add origin https://github.com/USERNAME/REPO.git

# 5. Push
git branch -M main
git push -u origin main
```

### Abilita GitHub Pages
1. Vai su GitHub.com → il tuo repository
2. Settings → Pages
3. Source: "Deploy from a branch"
4. Branch: main / (root)
5. Salva

Il sito sarà live in pochi minuti su:
`https://USERNAME.github.io/REPO/`

## 📧 Configurare il Form di Contatto

### Con Formspree (gratuito, consigliato)

1. Vai su https://formspree.io
2. Crea un account gratuito
3. Crea un nuovo form
4. Copia il tuo Form ID

5. Apri `script.js` e trova questa sezione:
```javascript
// For GitHub Pages, you can use a service like Formspree
// Example: await fetch('https://formspree.io/f/YOUR_FORM_ID', { ... })
```

6. Sostituisci con:
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

7. Salva, commit e push:
```bash
git add script.js
git commit -m "Add Formspree integration"
git push
```

## 🖼️ Aggiungere Immagini

1. Metti le immagini nella cartella `images/`
2. Aggiorna i riferimenti in `index.html`

Esempio per sostituire il logo:
```html
<!-- Trova questa riga nel navbar -->
<div class="logo">PLAY HARD</div>

<!-- Sostituisci con -->
<div class="logo">
    <img src="images/logo.png" alt="Play Hard" style="height: 50px;">
</div>
```

## ✏️ Modifiche Comuni

### Cambiare i colori
Apri `style.css` e modifica le variabili in `:root`:
```css
:root {
    --primary-color: #c41e3a;    /* Rosso principale */
    --secondary-color: #8b0000;   /* Rosso scuro */
    --dark-bg: #0a0a0a;          /* Sfondo scuro */
}
```

### Aggiornare la setlist
Apri `index.html` e trova la sezione `<section id="setlist">`.
Modifica le liste come preferisci.

### Modificare i contatti
Trova la sezione `<section id="contact">` in `index.html`.

## 🆘 Problemi Comuni

### Il sito non si carica
- Controlla la console del browser (F12)
- Verifica che tutti i file siano nella stessa cartella
- Prova con `./serve.sh` invece di aprire direttamente il file

### Le modifiche non appaiono su GitHub Pages
- GitHub Pages può richiedere qualche minuto per aggiornarsi
- Forza il refresh del browser: Cmd+Shift+R (Mac) o Ctrl+F5 (Win)
- Svuota la cache del browser

### Il form non funziona
- Configura Formspree (vedi sopra)
- Verifica la console del browser per errori

## 📞 Supporto

Per problemi o domande, apri una issue su GitHub o contatta direttamente.

## 🤘 Rock on!
