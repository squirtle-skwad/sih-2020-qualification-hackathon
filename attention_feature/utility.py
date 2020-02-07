import numpy as np
from scipy.spatial import distance as dist
from google.cloud import speech_v1p1beta1
import io


def get_start_end(word):
    start = float((str(word.start_time.seconds)+"."+str(word.start_time.nanos))[0:3])
    end = float((str(word.end_time.seconds)+"."+str(word.end_time.nanos))[0:3])
    return start, end

def sample_long_running_recognize(local_file_path):
    client = speech_v1p1beta1.SpeechClient()

    enable_speaker_diarization = True

    language_code = "en-US"
    config = {
        "enable_speaker_diarization": enable_speaker_diarization,
        "language_code": language_code,   
    }
    with io.open(local_file_path, "rb") as f:
        content = f.read()
    audio = {"content": content}
    
    operation = client.long_running_recognize(config, audio)

    print(u"Waiting for operation to complete...")
    response = operation.result()
    alternative = response.results[0].alternatives[0]
    result_list = []
    for word in alternative.words:
        start, end = get_start_end(word) 
        result_list.append({"start":start,"end": end,"value":word.word})
    return result_list


def get_score(drowsy, yawn, center):
    score = 0
    if not drowsy:
        score +=1
    else:
        score +=0.25
    if not yawn:
        score+=1
    if center == None:
        score += 0.25
    elif center == True:
        score += 1
    return score

def calculate_eye_aspect_ratio(eye):
    A = dist.euclidean(eye[1], eye[5])
    B = dist.euclidean(eye[2], eye[4])
    C = dist.euclidean(eye[0], eye[3])
    
    eye_aspect_ratio = (A+B)/(2.0*C)
    
    return eye_aspect_ratio

def get_landmarks(im, predictor, detector):
    


    rects = detector(im, 1)

    if len(rects) > 1:
        return "error"
    if len(rects) == 0:
        return "error"
    return np.matrix([[p.x, p.y] for p in predictor(im, rects[0]).parts()])


def top_lip(landmarks):
    top_lip_pts = []
    for i in range(50,53):
        top_lip_pts.append(landmarks[i])
    for i in range(61,64):
        top_lip_pts.append(landmarks[i])
    top_lip_mean = np.mean(top_lip_pts, axis=0)
    return int(top_lip_mean[:,1])

def bottom_lip(landmarks):
    bottom_lip_pts = []
    for i in range(65,68):
        bottom_lip_pts.append(landmarks[i])
    for i in range(56,59):
        bottom_lip_pts.append(landmarks[i])
    bottom_lip_mean = np.mean(bottom_lip_pts, axis=0)
    return int(bottom_lip_mean[:,1])

def mouth_open(image, predictor, detector):
    landmarks = get_landmarks(image, predictor, detector)
    
    if landmarks == "error":
        return image, 0
    
    top_lip_center = top_lip(landmarks)
    bottom_lip_center = bottom_lip(landmarks)
    lip_distance = abs(top_lip_center - bottom_lip_center)
    return lip_distance

def format_data(data_list):
    formatted_data = {}
    label_s = []
    labels = []
    drowsy_data = []
    points = []
    for data in data_list: 
        label_s.append(str(round(data[0],1)) + " s")
        labels.append(round(data[0],1))
        drowsy_data.append(data[1]["score"])
        points.append(dict({"x":round(data[0],1),"y": data[1]["score"]}))
    formatted_data["labels"] = labels
    formatted_data["info"] = drowsy_data
    formatted_data["labels_string"] = label_s
    formatted_data["points"] = points
    return formatted_data




