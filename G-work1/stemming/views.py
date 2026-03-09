# stemming/views.py
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from nltk.stem import WordNetLemmatizer
from nltk.tokenize import word_tokenize
import nltk

# Ensure required NLTK resources are downloaded
nltk.download('punkt', quiet=True)
nltk.download('wordnet', quiet=True)
nltk.download('omw-1.4', quiet=True)
nltk.download('averaged_perceptron_tagger', quiet=True)

@csrf_exempt
def upload_file(request):
    if request.method != "POST":
        return JsonResponse({"error": "POST method required."}, status=405)

    text = ""

    try:
        # Get text from frontend
        if "text" in request.POST and request.POST["text"].strip() != "":
            text = request.POST["text"]

        elif "file" in request.FILES:
            file = request.FILES["file"]
            ext = file.name.split('.')[-1].lower()

            if ext == "txt":
                text = file.read().decode("utf-8")
            elif ext == "docx":
                from docx import Document
                doc = Document(file)
                text = "\n".join([p.text for p in doc.paragraphs])
            elif ext == "pdf":
                import PyPDF2
                reader = PyPDF2.PdfReader(file)
                text = ""
                for page in reader.pages:
                    page_text = page.extract_text()
                    if page_text:
                        text += page_text + "\n"
            else:
                return JsonResponse({"error": "Unsupported file type."}, status=400)
        else:
            return JsonResponse({"error": "No text or file provided."}, status=400)

        # Safe lemmatization
        lemmatizer = WordNetLemmatizer()
        words = word_tokenize(text)
        stemmed_words = [lemmatizer.lemmatize(w) for w in words]
        stemmed_text = " ".join(stemmed_words)

        return JsonResponse({
            "original_text": text,
            "stemmed_text": stemmed_text,
            "word_count": len(words),
            "stemmed_word_count": len(stemmed_words)
        })

    except Exception as e:
        # Return full traceback in development for debugging
        import traceback
        return JsonResponse({"error": str(e), "trace": traceback.format_exc()}, status=500)