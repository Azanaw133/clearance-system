from django.db import models

class UploadedFile(models.Model):
    file = models.FileField(upload_to='uploads/')
    filename = models.CharField(max_length=255)
    uploaded_at = models.DateTimeField(auto_now_add=True)
    extracted_text = models.TextField(blank=True, null=True)        # raw extracted text
    processed_text = models.TextField(blank=True, null=True)        # stopwords removed + stemmed
    unique_words = models.TextField(blank=True, null=True)          # comma-separated
    word_count = models.IntegerField(default=0)
    frequency = models.JSONField(blank=True, null=True)             # word frequency

    def __str__(self):
        return self.filename