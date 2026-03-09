import nltk
from nltk.tokenize import word_tokenize
from collections import Counter
from docx import Document
import PyPDF2
import string

nltk.download("punkt")

# ---------------- FILE READERS ----------------

def read_txt(file):
    return file.read().decode("utf-8")


def read_docx(file):
    doc = Document(file)
    return "\n".join([p.text for p in doc.paragraphs])


def read_pdf(file):
    pdf = PyPDF2.PdfReader(file)
    text = ""
    for page in pdf.pages:
        extracted = page.extract_text()
        if extracted:
            text += extracted
    return text


# ---------------- FREQUENCY ----------------

def word_frequency(text):
    tokens = word_tokenize(text)

    # Normalize + remove punctuation
    words = [
        w.lower() for w in tokens
        if w not in string.punctuation
    ]

    freq = Counter(words)

    # Sort by most common
    sorted_freq = dict(freq.most_common())

    return sorted_freq, len(words)