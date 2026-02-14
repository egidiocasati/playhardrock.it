#!/bin/bash

# Play Hard Website - Deploy Script
# Questo script ti aiuta a fare il deploy su GitHub Pages

echo "🎸 PLAY HARD - GitHub Pages Deploy Script 🎸"
echo ""

# Check if git is initialized
if [ ! -d .git ]; then
    echo "Inizializzazione repository Git..."
    git init
    echo "✅ Git inizializzato"
else
    echo "✅ Repository Git già presente"
fi

# Add all files
echo ""
echo "Aggiunta dei file..."
git add .

# Commit
echo ""
read -p "Inserisci il messaggio di commit (default: 'Update website'): " commit_message
commit_message=${commit_message:-"Update website"}
git commit -m "$commit_message"
echo "✅ Commit creato"

# Check if remote exists
if ! git remote | grep -q 'origin'; then
    echo ""
    echo "⚠️  Nessun repository remoto configurato."
    echo ""
    read -p "Inserisci l'URL del repository GitHub (es. https://github.com/username/playhard-website.git): " repo_url

    if [ -n "$repo_url" ]; then
        git remote add origin "$repo_url"
        echo "✅ Repository remoto aggiunto"
    else
        echo "❌ URL non fornito. Esci e configura manualmente con:"
        echo "   git remote add origin YOUR_REPO_URL"
        exit 1
    fi
fi

# Push
echo ""
echo "Push su GitHub..."
git branch -M main
git push -u origin main

echo ""
echo "✅ Deploy completato!"
echo ""
echo "Per abilitare GitHub Pages:"
echo "1. Vai su https://github.com/YOUR_USERNAME/YOUR_REPO/settings/pages"
echo "2. Source: Deploy from a branch"
echo "3. Branch: main / (root)"
echo "4. Salva"
echo ""
echo "Il sito sarà disponibile all'indirizzo:"
echo "https://YOUR_USERNAME.github.io/YOUR_REPO/"
echo ""
echo "🤘 Rock on! 🤘"
