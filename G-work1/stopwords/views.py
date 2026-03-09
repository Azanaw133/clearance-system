# import os
# from django.http import JsonResponse
# from django.views.decorators.csrf import csrf_exempt
# from .utils import extract_text_from_file, remove_stopwords

# # Make sure TEMP_DIR exists
# TEMP_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "temp")
# os.makedirs(TEMP_DIR, exist_ok=True)

# @csrf_exempt
# def upload_file_nlp(request):
#     if request.method == "POST" and request.FILES.get("file"):
#         uploaded_file = request.FILES["file"]
#         file_path = os.path.join(TEMP_DIR, uploaded_file.name)

#         # Save uploaded file
#         with open(file_path, "wb+") as f:
#             for chunk in uploaded_file.chunks():
#                 f.write(chunk)

#         try:
#             # Extract text and remove stopwords
#             text = extract_text_from_file(file_path)
#             processed_text = remove_stopwords(text)
#         except Exception as e:
#             return JsonResponse({"error": str(e)}, status=500)

#         # Optional: delete temp file after processing
#         os.remove(file_path)

#         return JsonResponse({"processed_text": processed_text})

#     return JsonResponse({"error": "Invalid request"}, status=400)



# import os
# from django.http import JsonResponse
# from django.views.decorators.csrf import csrf_exempt
# from .utils import extract_text_from_file, remove_stopwords

# # Make sure TEMP_DIR exists
# TEMP_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "temp")
# os.makedirs(TEMP_DIR, exist_ok=True)

# @csrf_exempt
# def upload_file_nlp(request):
#     if request.method == "POST" and request.FILES.get("file"):
#         uploaded_file = request.FILES["file"]
#         file_path = os.path.join(TEMP_DIR, uploaded_file.name)

#         # Save uploaded file
#         with open(file_path, "wb+") as f:
#             for chunk in uploaded_file.chunks():
#                 f.write(chunk)

#         try:
#             # Extract text
#             original_text = extract_text_from_file(file_path)
#             processed_text = remove_stopwords(original_text)
#         except Exception as e:
#             return JsonResponse({"error": str(e)}, status=500)
#         finally:
#             # Optional: delete temp file after processing
#             if os.path.exists(file_path):
#                 os.remove(file_path)

#         # Return both original and processed text
#         return JsonResponse({
#             "original_text": original_text,
#             "processed_text": processed_text
#         })

#     return JsonResponse({"error": "Invalid request"}, status=400)



# views.py
import os
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .utils import extract_text_from_file, remove_stopwords

TEMP_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "temp")
os.makedirs(TEMP_DIR, exist_ok=True)

@csrf_exempt
def upload_file_nlp(request):
    if request.method == "POST" and request.FILES.get("file"):
        uploaded_file = request.FILES["file"]
        file_path = os.path.join(TEMP_DIR, uploaded_file.name)

        # Save uploaded file
        with open(file_path, "wb+") as f:
            for chunk in uploaded_file.chunks():
                f.write(chunk)

        try:
            # Extract text
            text = extract_text_from_file(file_path)
            processed_text = remove_stopwords(text)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

        os.remove(file_path)

        # 🔹 Return BOTH original and processed text
        return JsonResponse({
            "original_text": text,
            "processed_text": processed_text
        })

    return JsonResponse({"error": "Invalid request"}, status=400)

import os
from django.http import JsonResponse

# Path to your amh_stopwords.txt inside this app
STOPWORDS_FILE = os.path.join(os.path.dirname(__file__), "amh_stopwords.txt")

def get_stopwords(request):
    """Return stopwords as JSON"""
    try:
        with open(STOPWORDS_FILE, encoding="utf-8") as f:
            stopwords = [line.strip() for line in f if line.strip()]
        return JsonResponse({"stopwords": stopwords})
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)