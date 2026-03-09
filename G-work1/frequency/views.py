from django.shortcuts import render

# Create your views here.
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .utils.frequency import (
    read_txt,
    read_docx,
    read_pdf,
    word_frequency
)

@api_view(["POST"])
def frequency_view(request):
    text = request.data.get("text", "").strip()
    file = request.FILES.get("file")

    extracted_text = ""

    # Plain text
    if text:
        extracted_text = text

    # File upload
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

    freq_dict, total_words = word_frequency(extracted_text)

    return Response({
        "total_words": total_words,
        "frequency": freq_dict
    })