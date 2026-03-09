
import nltk
from nltk.tokenize import sent_tokenize, word_tokenize
from docx import Document
import PyPDF2
import string

# Ensure punkt is downloaded
nltk.download('punkt')

# ----------------------------
# File Readers
# ----------------------------

def read_txt(file):
    return file.read().decode("utf-8")


def read_docx(file):
    doc = Document(file)
    return "\n".join([para.text for para in doc.paragraphs])


def read_pdf(file):
    pdf = PyPDF2.PdfReader(file)
    text = ""
    for page in pdf.pages:
        extracted = page.extract_text()
        if extracted:
            text += extracted
    return text


# ----------------------------
# Tokenizer
# ----------------------------

def tokenize_text(text):
    # Sentence tokenization
    sentences = sent_tokenize(text)

    # Word tokenization
    raw_words = word_tokenize(text)

    # Remove punctuation tokens
    words = [
        word for word in raw_words
        if word not in string.punctuation
    ]

    return sentences, words