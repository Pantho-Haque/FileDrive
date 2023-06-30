import os
import pickle
import cvzone
import cv2
import face_recognition
import numpy as np

cap = cv2.VideoCapture(0)
cap.set(3, 1280)
cap.set(4, 720)

file = open("encodedImg.p", "rb")
encodedList, names = pickle.load(file)
file.close()
print(names)


while True:
    success, img = cap.read()

    imgs = cv2.resize(img, (0, 0), None, 0.25, 0.25)
    imgs = cv2.cvtColor(imgs, cv2.COLOR_BGR2RGB)

    faceCurrentFrame = face_recognition.face_locations(imgs)
    encodeCurrentFrame = face_recognition.face_encodings(
        imgs, faceCurrentFrame)

    for encodFace, faceLock in zip(encodeCurrentFrame, faceCurrentFrame):
        # list fo boolian which matches with the data
        matches = face_recognition.compare_faces(encodedList, encodFace)
        # list of how close the image is to the data
        facedis = face_recognition.face_distance(encodedList, encodFace)

        print(names)
        print(matches)
        print(facedis)
        matchIndex = np.argmin(facedis)

        if(matches[matchIndex]):
            y1, x2, y2, x1 = faceLock
            y1, x2, y2, x1 = y1*4, x2*4, y2*4, x1*4
            bbox = x1, y1, x2-x1, y2-y1
            cvzone.cornerRect(img, bbox)
            print(names[matchIndex])

    cv2.imshow("face attendance", img)
    cv2.waitKey(1)
