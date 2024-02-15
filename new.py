from flask import Flask, request, jsonify
import speech_recognition as sr
from playsound import playsound
from tempfile import NamedTemporaryFile
from openai import OpenAI
import os
from flask_cors import CORS
import torch
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score,recall_score,precision_score,f1_score
import torch
from transformers import TrainingArguments,Trainer
from transformers import BertTokenizer,BertForSequenceClassification

app = Flask(__name__)
CORS(app, supports_credentials=True,origins=['http://localhost:5173'])

# Global variable to control listening state
listening = False

@app.route('/api/stop_listening', methods=['POST'])
def stop_listening():
    global listening
    listening = False
    return jsonify({'message': 'Listening stopped'})

@app.route('/api/process_audio', methods=['POST'])
def audio_process():

    os.environ["OPENAI_API_KEY"] = "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"

    recognizer = sr.Recognizer()

    def capture_voice_input():
        with sr.Microphone() as source:
            print("Listening...")
            audio = recognizer.listen(source)
        return audio

    global listening
    listening = True
    transcript = None

    while listening:
        audio = capture_voice_input()

        with NamedTemporaryFile(suffix=".wav", delete=False) as temp_file:
            temp_file.write(audio.get_wav_data())
            temp_file.seek(0)
            file_path = temp_file.name

        client = OpenAI()
        

        with open(file_path, "rb") as audio_file:
            transcript = client.audio.transcriptions.create(
                model="whisper-1", 
                file=audio_file
            )

        playsound(file_path)

    return jsonify({'message': transcript.text})

@app.route("/api/predictratings", methods=['POST'])
def predictRatings():
    tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
    loaded_model = torch.load('star_rating.pth', map_location=torch.device('cpu'))

    def predict_sentiment(text, model, tokenizer):
        # Tokenize on CPU
        inputs = tokenizer(text, padding=True, truncation=True, return_tensors='pt')

        # Model inference on CPU
        outputs = model(**inputs)

        # Softmax and move predictions to CPU for further processing (if necessary)
        predictions = torch.nn.functional.softmax(outputs.logits, dim=-1).detach().numpy()
        return predictions
    text = (request.json).get('text') 
    predictions = predict_sentiment(text, loaded_model, tokenizer)
    predictions = predictions.tolist()
    return jsonify({'message': predictions})


if __name__ == '__main__':
    app.run(debug=True, port=8080)
