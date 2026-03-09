from django.shortcuts import render

# Create your views here.
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .utils.youtube_api import get_comments
from tokenizer.utils.tokenizer import tokenize_text  # your existing tokenizer

@api_view(["POST"])
def extract_comments(request):
    video_url = request.data.get("video_url", "")
    if not video_url:
        return Response({"error": "Please provide a YouTube video URL"}, status=400)

    # Extract video ID from URL
    import re
    match = re.search(r"(?:v=|youtu\.be/)([\w-]+)", video_url)
    if not match:
        return Response({"error": "Invalid YouTube URL"}, status=400)
    video_id = match.group(1)

    # Get comments
    comments = get_comments(video_id, max_results=50)
    all_text = "\n".join(comments)

    # Tokenize
    sentences, words = tokenize_text(all_text)

    # Unique words
    unique_words = list(set(words))

    # Word frequency
    from collections import Counter
    word_freq = dict(Counter(words))

    return Response({
        "original_text": all_text,
        "sentences": sentences,
        "sentence_count": len(sentences),
        "words": words,
        "word_count": len(words),
        "unique_words": unique_words,
        "unique_word_count": len(unique_words),
        "word_frequency": word_freq
    })