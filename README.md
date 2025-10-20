3D Interactive Carousel — README

Idée : un outil web en p5.js pour créer un carrousel 3D interactif dans lequel l'utilisateur·rice importe ses images/vidéos, choisit un fond (couleur ou image), manipule la rotation/zoom, puis exporte le rendu en vidéo (WEBM) téléchargeable — et convertible en MP4 si besoin.

Pitch (courte description)

Un micro-outil créatif qui transforme des images et vidéos personnelles en une animation carousel 3D soignée et personnalisable. L'utilisateur peut glisser/déposer ses médias, piloter la rotation (manuellement ou en autoplay), changer le fond, et enregistrer le rendu en vidéo pour le partager.

Fonctionnalités principales

Import multiple d'images et de courtes vidéos (drag & drop ou sélection de fichiers).

Visualisation 3D : chaque média est affiché sur une face plane organisée en cercle (carrousel) et tournant en 3D (WebGL p5.js).

Interactions : drag pour faire tourner, molette pour zoom, curseur de vitesse, autoplay on/off.

Choix de fond : couleur unie (color picker) ou upload d'une image de fond.

Export vidéo : enregistrement du rendu canvas en WEBM via MediaRecorder (bouton Start/Stop + temps d'enregistrement facultatif).

Téléchargement immédiat du fichier vidéo; conversion en MP4 recommandée via ffmpeg si besoin.

UI / UX (raisonnement)

Simplicité d'usage : 1 panneau latéral contenant les contrôles essentiels (upload, fond, vitesse, export). L'aire centrale contient le canvas 3D avec instructions contextuelles.

Feedback direct : tout changement (vitesse, fond, ajout) est appliqué en temps réel pour encourager l'exploration.

Modes novices & avancés : valeurs par défaut conviviales (autoplay activé, vitesse moyenne) mais contrôle fin disponible pour les utilisateurs avancés.

Accessibilité : utilisation au clavier possible (flèches pour rotation, +/- pour zoom), textes clairs et boutons assez grands.

Architecture du projet

Fichiers fournis :

index.html — structure HTML + liens scripts

style.css — styles simples pour l'UI

sketch.js — logique p5.js (chargement de médias, rendu 3D, interactions)