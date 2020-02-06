from django.db import models

class AnalysisRequest(models.Model):
    video = models.FileField(upload_to='videos')

    def __str__(self):
        return str(self.video)
