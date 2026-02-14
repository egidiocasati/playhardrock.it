#!/bin/bash

# Play Hard Website - Local Server Script
# Avvia un server locale per testare il sito

echo "🎸 PLAY HARD - Local Development Server 🎸"
echo ""
echo "Avvio del server locale..."
echo ""

# Check if Python 3 is available
if command -v python3 &> /dev/null; then
    echo "✅ Server avviato con Python 3"
    echo ""
    echo "🌐 Il sito è disponibile all'indirizzo:"
    echo "   http://localhost:8000"
    echo ""
    echo "Premi CTRL+C per fermare il server"
    echo ""
    python3 -m http.server 8000
# Check if Python 2 is available
elif command -v python &> /dev/null; then
    echo "✅ Server avviato con Python 2"
    echo ""
    echo "🌐 Il sito è disponibile all'indirizzo:"
    echo "   http://localhost:8000"
    echo ""
    echo "Premi CTRL+C per fermare il server"
    echo ""
    python -m SimpleHTTPServer 8000
# Check if Node.js is available
elif command -v node &> /dev/null && command -v npx &> /dev/null; then
    echo "✅ Server avviato con Node.js (http-server)"
    echo ""
    echo "🌐 Il sito è disponibile all'indirizzo:"
    echo "   http://localhost:8000"
    echo ""
    echo "Premi CTRL+C per fermare il server"
    echo ""
    npx http-server -p 8000
else
    echo "❌ Nessun server HTTP trovato."
    echo ""
    echo "Installa uno dei seguenti:"
    echo "  - Python 3: brew install python3"
    echo "  - Node.js: brew install node"
    echo ""
    echo "Oppure apri direttamente il file index.html nel browser:"
    echo "  open index.html"
fi
