from django import forms
from .models import AnalysisRequest

class AnalysisForm(forms.ModelForm):
    class Meta:
        model = AnalysisRequest
        fields = '__all__'
