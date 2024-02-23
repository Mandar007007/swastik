from flask import Flask, request, jsonify
import speech_recognition as sr
from playsound import playsound
from tempfile import NamedTemporaryFile
from openai import OpenAI
import os
from flask_cors import CORS
from pymongo import MongoClient
import torch
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score,recall_score,precision_score,f1_score
import torch
from transformers import TrainingArguments,Trainer
from transformers import BertTokenizer,BertForSequenceClassification
from dotenv import load_dotenv

app = Flask(__name__)
CORS(app, supports_credentials=True,origins=['http://localhost:5173'])
load_dotenv()

app.config['OPENAI_API_KEY'] = os.environ.get('OPENAI_API_KEY')
# Global variable to control listening state
listening = False

@app.route('/api/stop_listening', methods=['POST'])
def stop_listening():
    global listening
    listening = False
    return jsonify({'message': 'Listening stopped'})

@app.route('/api/getspeech', methods=['GET'])
def get_speech():
    try:
        client = MongoClient('mongodb://127.0.0.1:27017/Swastik')
        db = client['Swastik']
        collection = db['speech']
        projection = {'vector_store_data': 0}

        speeches = list(collection.find({},projection))


        for speech in speeches:
            speech['_id'] = str(speech['_id'])

        client.close()

        return jsonify({"success": True, "speeches": speeches})

    except Exception as e:
        return jsonify({"success": False, "error": str(e)})



@app.route('/api/process_audio', methods=['POST'])
def audio_process():

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
    print(transcript.text)
    return jsonify({'message':transcript.text})

# Load model and tokenizer
loaded_model = torch.load('star_rating.pth', map_location=torch.device('cpu'))
tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')

@app.route('/api/predictratings', methods=['POST'])
def predictRatings():
    try:
        # Extract text from the request
        data = request.get_json()
        text = data['text']

        # Tokenize on CPU
        inputs = tokenizer(text, padding=True, truncation=True, return_tensors='pt')

        # Model inference on CPU
        outputs = loaded_model(**inputs)

        # Softmax and move predictions to CPU for further processing (if necessary)
        predictions = torch.nn.functional.softmax(outputs.logits, dim=-1).detach().numpy().tolist()
        max_index = np.argmax(predictions).item()

        return jsonify({'predictions': max_index})

    except Exception as e:
        return jsonify({'error': str(e)})
    


if __name__ == '__main__':
    app.run(debug=True, port=8080)
