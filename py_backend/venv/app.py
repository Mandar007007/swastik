from flask import Flask, request, jsonify
from PyPDF2 import PdfReader
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.text_splitter import CharacterTextSplitter
from langchain.vectorstores import FAISS
import os
from langchain.chains.question_answering import load_qa_chain
from langchain.llms import OpenAI
from pymongo import MongoClient
import pickle 
from bson import ObjectId
from flask_cors import CORS

app = Flask(__name__)
CORS(app, supports_credentials=True,origins=['http://localhost:5173'])

@app.route('/api/data', methods=['GET'])
def get_data():
    data = {'message': 'Hello from the API'}
    return jsonify(data)

@app.route('/api/data/pdf', methods=['POST'])
def get_pdf():
    os.environ["OPENAI_API_KEY"] = ""

    client = MongoClient('mongodb://127.0.0.1:27017/Swastik')
    db = client['Swastik']
    collection = db['speech']

    if 'file' not in request.files:
        return jsonify({'error': 'invalid data'})

    pdf = PdfReader(request.files['file'])
    text = ""

    for i, page in enumerate(pdf.pages):
        content = page.extract_text()
        if content:
            text += content

    text_splitter = CharacterTextSplitter(
        separator="\n",
        chunk_size=800,
        chunk_overlap=200,
        length_function=len,
    )

    chunks = text_splitter.split_text(text=text)

    embeddings = OpenAIEmbeddings()

    VectorStore = FAISS.from_texts(chunks, embedding=embeddings)
    serialized_vector_store = pickle.dumps(VectorStore)

    collection.insert_one({"vector_store_data": serialized_vector_store})

    return jsonify({'message': 'successfully stored the data'})

@app.route('/api/ask', methods=['POST'])
def ask():
    os.environ["OPENAI_API_KEY"] = ""

    data = request.json
    client = MongoClient('mongodb://127.0.0.1:27017/Swastik')
    db = client['Swastik']
    collection = db['speech']

    user_id = data.get('id')
    query = data.get('query')

    object_id = ObjectId(user_id)
    stored_data = collection.find_one({"_id": object_id}).get('vector_store_data')
    VectorStore = pickle.loads(stored_data)

    chain = load_qa_chain(OpenAI(model="gpt-3.5-turbo-instruct"), chain_type="stuff")
    docs = VectorStore.similarity_search(query)
    message = chain.run(input_documents=docs, question=query)

    return jsonify({"message": message})

if __name__ == '__main__':
    app.run(debug=True)
