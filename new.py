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
CORS(app) 

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
    return jsonify({'message':transcript.text})

if __name__ == '__main__':
    app.run(debug=True, port=8080)
