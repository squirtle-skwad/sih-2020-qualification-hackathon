from django.shortcuts import render
from .forms import AnalysisForm


def index(request):
    return render(request, template_name='index.html')


def video_upload(request):
    if request.method == 'POST':
        form = AnalysisForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return render(request, template_name='index.html')

    video_upload_form = AnalysisForm()
    return render(request, template_name='upload.html', context={
        "form": video_upload_form,
    })


def student_video(request):
    return render(request, template_name='student_conf.html')
