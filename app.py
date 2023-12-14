from flask import Flask, request, jsonify 
from PyPDF2 import PdfReader
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.text_splitter import CharacterTextSplitter
from langchain.vectorstores import FAISS
import os
from langchain.chains.question_answering import load_qa_chain
from langchain.llms import OpenAI



app = Flask(__name__)

@app.route('/api/data', methods=['GET'])
def get_data():
    data = {'message': 'Hello from the API'}
    return jsonify(data)

@app.route('/api/data/pdf',methods=['GET'])
def get_pdf():
    os.environ["OPENAI_API_KEY"] = "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"
    
    if 'file' not in request.files:
        return jsonify({'error':'invalid data'})
    
    pdf = PdfReader(request.files['file'])
    text = ""
    
    for i,page in enumerate(pdf.pages):
        content = page.extract_text()
        if content:
            text += content

    text_splitter = CharacterTextSplitter(
        separator = "\n",
        chunk_size = 800,
        chunk_overlap = 200,
        length_function = len,
    )

    chunks = text_splitter.split_text(text=text)

    embeddings = OpenAIEmbeddings()

    VectorStore = FAISS.from_texts(chunks,embedding=embeddings)

    chain = load_qa_chain(OpenAI(),chain_type="stuff")
    query = "who is PM?"
    docs = VectorStore.similarity_search(query)
    message = chain.run(input_documents=docs,question=query)

    return jsonify({'message':message})

if __name__ == '__main__':
    app.run(debug=True)


