import os
import pickle

import cv2
import face_recognition

folderPath='images'
pathList=os.listdir(folderPath)
imgList=[]
names=[]
for path in pathList:
    imgList.append(
        cv2.imread(
            os.path.join(folderPath,path)
        )
    )
    names.append(
        os.path.splitext(path)[0]
    )

#  start encodings 
encodeList=[]
for img in imgList:
    #  fr uses rgb , cv2 uses bgr
    img = cv2.cvtColor(img,cv2.COLOR_BGR2RGB);
    encode = face_recognition.face_encodings(img)[0]
    encodeList.append(encode)
file= open("encodedImg.p","ab+")
pickle.dump([encodeList,names],file)
file.close()
