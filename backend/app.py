from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import openai

# If you're using python-dotenv:
from dotenv import load_dotenv
load_dotenv()  # This will load .env file into environment variables

app = Flask(__name__)
CORS(app)

openai.api_key = os.getenv("OPENAI_API_KEY")  # Retrieve from environment variables

@app.route('/', methods=['GET'])
def home():
    return "MoodMade Backend is running with OpenAI!", 200

@app.route('/api/mood', methods=['POST'])
def get_content():
    data = request.json
    mood = data.get('mood')

    if not mood:
        return jsonify({"error": "Mood is required."}), 400

    try:
        # Build the prompt
        # Build the prompt
        prompt = (
            f"Provide an authentic Quranic verse relevant to someone feeling {mood}. "
            f"Additionally, provide motivational content from the life of Prophet Muhammad (PBUH), authentic from collections of Imam Bukhari, for someone feeling {mood}, "
            f"a worldly motivational quote for someone feeling {mood}, "
            f"and a short meditation exercise suitable for someone who is feeling {mood}."
        )

        # Call OpenAI ChatCompletion endpoint
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",  # or whichever model you prefer
            max_tokens=300,
            messages=[
                {"role": "user", "content": prompt}
            ]
        )

        # Extract the content from OpenAI's response
        content = response['choices'][0]['message']['content'].strip()

        # Assuming the response is split into three parts by double newlines
        content_parts = content.split('\n\n')
        if len(content_parts) < 4:
          return jsonify({"error": "Unexpected response format from OpenAI."}), 500

        # Remove unwanted labels from each part
        quran_ayah = (content_parts[0]
                      .replace("Quranic verse:", "")
                      .replace("Quranic Verse:", "")
                      .strip())

        seerah_motivation = (content_parts[1]
                             .replace("Motivational content from the life of Prophet Muhammad (PBUH):", "")
                             .replace("Motivational Content from the life of Prophet Muhammad (PBUH):", "")
                             .strip())

        worldly_motivation = (content_parts[2]
                              .replace("Worldly motivational quote:", "")
                              .replace("Worldly Motivational Quote:", "")
                              .strip())

        meditation_exercise = (content_parts[3]
                               .replace("Meditation exercise:", "")
                               .replace("Meditation Exercise:", "")
                               .strip())

        return jsonify({
            "quranAyah": quran_ayah,
            "seerahMotivation": seerah_motivation,
            "worldlyMotivation": worldly_motivation,
            "meditationExercise": meditation_exercise
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
