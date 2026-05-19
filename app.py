from flask import Flask, render_template, request, jsonify
from text_tools import analyze_notes

app = Flask(__name__)


@app.route("/")
def home():
    """Display the main Briefly app."""
    return render_template("index.html")


@app.route("/analyze", methods=["POST"])
def analyze():
    """Receive notes from the front end and return a study brief."""
    data = request.get_json()
    text = data.get("text", "").strip()

    if not text:
        return jsonify({
            "error": "Please paste some notes before creating a study brief."
        }), 400

    results = analyze_notes(text)
    return jsonify(results)


if __name__ == "__main__":
    app.run(debug=True)