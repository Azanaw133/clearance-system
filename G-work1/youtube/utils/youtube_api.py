import requests

API_KEY = "AIzaSyBISPt-P2FUJuH8L28cp3zZ__WrQXCeAYQ"

def get_comments(video_id, max_results=20):
    url = f"https://www.googleapis.com/youtube/v3/commentThreads"
    params = {
        "part": "snippet",
        "videoId": video_id,
        "key": API_KEY,
        "maxResults": max_results,
        "textFormat": "plainText",
    }

    response = requests.get(url, params=params)
    data = response.json()

    comments = []
    for item in data.get("items", []):
        comment = item["snippet"]["topLevelComment"]["snippet"]["textDisplay"]
        comments.append(comment)

    return comments