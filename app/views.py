from django.shortcuts import render
from .forms import AnalysisForm
from attention_feature.get_features import get_analysis
import os

def index(request):
    return render(request, template_name='index.html')


def video_upload(request):
    if request.method == 'POST':
        form = AnalysisForm(request.POST, request.FILES)
        if form.is_valid():
            video = form.save()
            result_list = get_analysis(os.getcwd()+"/media/"+str(video))
            print(result_list)
            return render(request, template_name='index.html')

    video_upload_form = AnalysisForm()
    return render(request, template_name='upload.html', context={
        "form": video_upload_form,
    })
