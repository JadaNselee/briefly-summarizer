import re
from collections import Counter


STOP_WORDS = {
    "the", "and", "is", "in", "to", "of", "a", "an", "for", "on", "with",
    "as", "by", "at", "from", "that", "this", "it", "be", "are", "was",
    "were", "or", "but", "if", "then", "than", "so", "because", "about",
    "into", "over", "after", "before", "between", "through", "can", "could",
    "should", "would", "may", "might", "will", "also", "they", "their",
    "them", "he", "she", "we", "you", "your", "i", "our", "us", "not",
    "have", "has", "had", "do", "does", "did", "which", "what", "when",
    "where", "why", "how", "there", "these", "those", "such", "more",
    "most", "many", "some", "any", "all", "one", "two", "three", "like"
}


def split_sentences(text):
    """Split text into readable sentences."""
    sentences = re.split(r"(?<=[.!?])\s+", text.strip())
    return [sentence.strip() for sentence in sentences if sentence.strip()]


def get_words(text):
    """Return all alphabetic words from the text."""
    return re.findall(r"\b[a-zA-Z']+\b", text)


def clean_words(text):
    """Remove common words so keywords are more meaningful."""
    words = [word.lower() for word in get_words(text)]
    return [word for word in words if word not in STOP_WORDS and len(word) > 2]


def get_summary(text):
    """Create a simple summary using the beginning, middle, and end."""
    sentences = split_sentences(text)

    if not sentences:
        return "No summary available."

    if len(sentences) <= 3:
        return " ".join(sentences)

    first = sentences[0]
    middle = sentences[len(sentences) // 2]
    last = sentences[-1]

    return " ".join([first, middle, last])


def get_key_ideas(text):
    """Pull out sentences that are likely to contain useful information."""
    sentences = split_sentences(text)
    key_ideas = []

    for sentence in sentences:
        meaningful_words = clean_words(sentence)

        if len(meaningful_words) >= 5:
            key_ideas.append(sentence)

        if len(key_ideas) == 5:
            break

    return key_ideas if key_ideas else sentences[:3]


def get_keywords(text):
    """Find the most repeated meaningful terms."""
    words = clean_words(text)

    if not words:
        return ["study", "notes", "review"]

    counts = Counter(words)
    return [word for word, count in counts.most_common(8)]


def find_sentence_for_keyword(keyword, sentences):
    """Find the sentence that best explains a keyword."""
    for sentence in sentences:
        if keyword.lower() in sentence.lower():
            return sentence

    return "This term appears to be important based on how often it appears in the notes."


def get_flashcards(text):
    """Create flashcards from the strongest keywords."""
    keywords = get_keywords(text)
    sentences = split_sentences(text)
    flashcards = []

    for keyword in keywords[:5]:
        flashcards.append({
            "term": keyword.title(),
            "question": f"What should I remember about {keyword}?",
            "answer": find_sentence_for_keyword(keyword, sentences),
            "learned": False
        })

    return flashcards


def get_simple_explanation(text):
    """Explain the notes in beginner-friendly language."""
    keywords = get_keywords(text)
    summary = get_summary(text)
    keyword_preview = ", ".join(keywords[:3])

    return (
        f"In simple terms, these notes are mainly about {keyword_preview}. "
        f"The big idea is: {summary}"
    )


def get_session_type(text):
    """Estimate the kind of study session based on note length."""
    word_count = len(get_words(text))

    if word_count < 100:
        return "Quick Review"
    elif word_count < 300:
        return "Focused Study"
    return "Deep Study Session"


def get_study_plan(session_type):
    """Recommend a small study plan based on the session type."""
    plans = {
        "Quick Review": [
            "Read the quick summary first.",
            "Review the keywords.",
            "Flip through each flashcard once."
        ],
        "Focused Study": [
            "Read the summary carefully.",
            "Study the key ideas.",
            "Use the flashcards until you can answer most of them."
        ],
        "Deep Study Session": [
            "Read the summary and key ideas.",
            "Review the keywords before flashcards.",
            "Go through the flashcards twice and mark learned cards."
        ]
    }

    return plans.get(session_type, plans["Focused Study"])


def get_soundtrack(session_type):
    """Recommend a default soundtrack based on the study session type."""
    tracks = {
        "Quick Review": {
            "title": "Quick Review Lo-fi",
            "description": "Light background music for a short review session.",
            "youtube_embed": "https://www.youtube.com/embed/jfKfPfyJRdk",
            "open_url": "https://www.youtube.com/results?search_query=quick+study+lofi+playlist"
        },
        "Focused Study": {
            "title": "Soft Focus Study",
            "description": "Calm lo-fi or instrumental music for steady concentration.",
            "youtube_embed": "https://www.youtube.com/embed/jfKfPfyJRdk",
            "open_url": "https://www.youtube.com/results?search_query=soft+focus+study+playlist"
        },
        "Deep Study Session": {
            "title": "Deep Work Ambient",
            "description": "Ambient focus music for longer reading and review sessions.",
            "youtube_embed": "https://www.youtube.com/embed/5qap5aO4i9A",
            "open_url": "https://www.youtube.com/results?search_query=deep+work+ambient+study+music"
        }
    }

    return tracks.get(session_type, tracks["Focused Study"])


def analyze_notes(text):
    """Return the full Briefly study brief."""
    sentences = split_sentences(text)
    words = get_words(text)
    session_type = get_session_type(text)

    return {
        "summary": get_summary(text),
        "key_ideas": get_key_ideas(text),
        "keywords": get_keywords(text),
        "flashcards": get_flashcards(text),
        "simple_explanation": get_simple_explanation(text),
        "study_plan": get_study_plan(session_type),
        "soundtrack": get_soundtrack(session_type),
        "stats": {
            "word_count": len(words),
            "sentence_count": len(sentences),
            "session_type": session_type
        }
    }


if __name__ == "__main__":
    sample = """
    Object-oriented programming is a programming model based on classes and objects.
    A class acts like a blueprint, while an object is an instance created from that blueprint.
    Encapsulation protects data by keeping details inside a class.
    Inheritance allows one class to reuse features from another class.
    Polymorphism allows methods to behave differently depending on the object using them.
    """

    print(analyze_notes(sample))