import os
from PyPDF2 import PdfReader
from docx import Document

# Load Amharic stopwords
STOPWORDS_FILE = "stopwords/amh_stopwords.txt"
with open(STOPWORDS_FILE, encoding="utf-8") as f:
    AMH_STOPWORDS = set(f.read().splitlines())

# File text extraction
def extract_text_from_file(file_path):
    ext = os.path.splitext(file_path)[1].lower()
    text = ""

    if ext == ".txt":
        with open(file_path, encoding="utf-8") as f:
            text = f.read()

    elif ext == ".pdf":
        reader = PdfReader(file_path)
        for page in reader.pages:
            text += page.extract_text() + "\n"

    elif ext == ".docx":
        doc = Document(file_path)
        for para in doc.paragraphs:
            text += para.text + "\n"

    else:
        raise ValueError("Unsupported file type")

    return text.strip()

# 1️⃣ Amharic Stopword Removal
def remove_stopwords(text):
    words = text.split()
    filtered = [w for w in words if w not in AMH_STOPWORDS]
    return " ".join(filtered)
