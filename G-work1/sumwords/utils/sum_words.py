import nltk
from nltk.tokenize import word_tokenize
from docx import Document
import PyPDF2
import string

nltk.download('punkt')

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


# ---------------- SUM WORDS ----------------

def count_words(text):
    tokens = word_tokenize(text)

    words = [
        w for w in tokens
        if w not in string.punctuation
    ]

    return len(words), words