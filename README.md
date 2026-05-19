# Briefly — Study Notes Summarizer

Briefly is a Flask-based study app that turns messy notes into organized study material. Users can paste class notes, textbook paragraphs, or article text and receive a clear study brief with a summary, key ideas, keywords, flashcards, a study plan, and a focus soundtrack.

The goal of Briefly is to make studying feel less overwhelming by transforming long text into smaller, reviewable sections.

## Live Demo

Coming soon.

## Features

- Time-based welcome screen
- Personalized name and theme preferences
- Multiple study themes:
  - Lavender Study
  - Ocean Notes
  - Peach Desk
  - Midnight Focus
- Paste notes and generate a study brief
- Sample notes for quick testing
- Quick summary generation
- Key idea extraction
- Keyword detection
- Flashcards with flip animation
- “Mark learned” progress tracking
- Study plan recommendation
- Embedded focus music player
- Custom music link support
- Copy summary button
- Download study brief as a `.txt` file
- Recent briefs saved locally in the browser

## Tech Stack

- Python
- Flask
- HTML
- CSS
- JavaScript
- LocalStorage
- Gunicorn

## How It Works

Briefly uses a Flask backend to process text submitted by the user. The Python logic analyzes the notes by splitting sentences, identifying meaningful keywords, selecting key ideas, generating flashcards, and creating a simple study plan.

The front end displays the results in an interactive study dashboard with saved preferences, themes, flashcards, and local browser storage.

## Project Structure

```text
briefly-summarizer/
├── app.py
├── text_tools.py
├── requirements.txt
├── Procfile
├── README.md
├── .gitignore
├── static/
│   ├── script.js
│   └── style.css
└── templates/
    └── index.html
