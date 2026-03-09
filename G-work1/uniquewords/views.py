from django.shortcuts import render

# Create your views here.
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .utils.unique_words import (
    read_txt,
    read_docx,
    read_pdf,
    extract_unique_words
)

@api_view(["POST"])
def unique_words_view(request):
    text = request.data.get("text", "").strip()
    file = request.FILES.get("file")

    extracted_text = ""

    # Plain text
    if text:
        extracted_text = text

    # File input
    elif file:
        name = file.name.lower()

        if name.endswith(".txt"):
            extracted_text = read_txt(file)
        elif name.endswith(".docx"):
            extracted_text = read_docx(file)
        elif name.endswith(".pdf"):
            extracted_text = read_pdf(file)
        else:
            return Response({"error": "Unsupported file type"}, status=400)

    else:
        return Response({"error": "Provide text or file"}, status=400)

    unique_words, count = extract_unique_words(extracted_text)

    return Response({
        "unique_count": count,
        "unique_words": unique_words,
        "original_text": extracted_text
    })