# # toknize/views.py
# from rest_framework.decorators import api_view
# from rest_framework.response import Response
# from .utils.tokenizer import tokenize_text

# @api_view(['POST'])
# def tokenize(request):
#     """
#     Accept text and return tokenized sentences and words.
#     """
#     text = request.data.get('text', '')

#     if not text:
#         return Response({"error": "Please provide some text to tokenize."}, status=400)

#     result = tokenize_text(text)
#     return Response(result)



# tokenizer/views.py

from rest_framework.decorators import api_view
from rest_framework.response import Response
from .utils.tokenizer import read_txt, read_docx, read_pdf, tokenize_text

@api_view(['POST'])
def tokenize(request):
    text = ""

    # ✅ 1. Check if file was uploaded
    uploaded_file = request.FILES.get("file")

    if uploaded_file:
        filename = uploaded_file.name.lower()

        if filename.endswith(".txt"):
            text = read_txt(uploaded_file)

        elif filename.endswith(".docx"):
            text = read_docx(uploaded_file)

        elif filename.endswith(".pdf"):
            text = read_pdf(uploaded_file)

        else:
            return Response(
                {"error": "Unsupported file type. Use TXT, DOCX, or PDF."},
                status=400
            )

    # ✅ 2. If no file, check plain text
    elif request.data.get("text"):
        text = request.data.get("text")

    # ❌ Nothing provided
    else:
        return Response(
            {"error": "Please provide some text to tokenize."},
            status=400
        )

    # ✅ 3. Tokenize
    sentences, words = tokenize_text(text)

    return Response({
        "original_text": text,
        "sentences": sentences,
        "words": words,
        "sentence_count": len(sentences),
        "word_count": len(words),
    })