
import nltk
from nltk.stem import WordNetLemmatizer, PorterStemmer
from nltk.corpus import wordnet
from nltk.tokenize import word_tokenize
from nltk import pos_tag
import re
from docx import Document
import PyPDF2

# Download required NLTK data
nltk.download('punkt')
nltk.download('wordnet')
nltk.download('omw-1.4')
nltk.download('averaged_perceptron_tagger')

lemmatizer = WordNetLemmatizer()
stemmer = PorterStemmer()

# Words we do NOT want to lemmatize/stem
PROTECTED_WORDS = {
    "is", "are", "was", "were", "be", "been",
    "am", "the", "a", "an", "and", "or",
    "in", "on", "at", "to", "of"
}

# Map NLTK POS tags to WordNet POS
def get_wordnet_pos(tag):
    if tag.startswith("J"):
        return wordnet.ADJ
    elif tag.startswith("V"):
        return wordnet.VERB
    elif tag.startswith("N"):
        return wordnet.NOUN
    elif tag.startswith("R"):
        return wordnet.ADV
    else:
        return wordnet.NOUN

def clean_word(word):
    return re.sub(r"[^\w]", "", word)

def advanced_lemmatize(word, pos_tag_word):
    original = word
    clean = clean_word(word.lower())
    
    if clean in PROTECTED_WORDS or len(clean) < 2:
        return original
    
    # POS-aware lemmatization
    lemma = lemmatizer.lemmatize(clean, pos=get_wordnet_pos(pos_tag_word))
    
    # Optional: aggressive stemming (comment out if not needed)
    stemmed = stemmer.stem(lemma)
    
    return original.replace(clean, stemmed)

def lemmatize_text(text):
    tokens = word_tokenize(text)
    tagged_tokens = pos_tag(tokens)
    lemmatized_words = [advanced_lemmatize(word, tag) for word, tag in tagged_tokens]
    return " ".join(lemmatized_words)

# -----------------------------
# File reading functions
# -----------------------------
def read_txt(file):
    return file.read().decode('utf-8')

def read_docx(file):
    doc = Document(file)
    return "\n".join([p.text for p in doc.paragraphs])

def read_pdf(file):
    reader = PyPDF2.PdfReader(file)
    return "\n".join([page.extract_text() for page in reader.pages])