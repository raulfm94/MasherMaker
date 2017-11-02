import re
import json

num = 0
StartTime = ""
EndTime = ""
text = ""
a = []

def createObj(number, Start_Time, End_Time, word):
    global a
    entry = {"number" : number, "line" : word,"StartTime" : Start_Time,"EndTime" : End_Time}
    a.append(entry)

    return


def lineRead (line):
    global num
    global StartTime
    global EndTime
    global text
    patternNum = re.compile("^[0-9]+$")
    patternTime = re.compile("^[0-9]{2}:[0-9]{2}:[0-9]{2},[0-9]{3} --> [0-9]{2}:[0-9]{2}:[0-9]{2},[0-9]{3}$")
    patternText = re.compile("^[a-zA-Z, ,\D]+$")

    if(patternNum.match(line) != None):
        num = int(line)
    elif(patternTime.match(line) != None):
        lineArr = line.split()
        StartTime = lineArr[0]
        EndTime = lineArr[2]
    elif(patternText.match(line) != None):
        text = text + line
    #if(num !=  0 and StartTime != "" and EndTime != "" and text != "" and text != "\n"):
    if(line == "\n"):
        #print("else")
        createObj(num, StartTime, EndTime, text)
        text = ""
        num = 0
        StartTime = ""
        EndTime = ""
    return

with open("captionTest.txt", 'r') as f:
    for line in f:
        lineRead(line)
with open("result.json",'w') as f:
    json.dump(a, f, indent=2)
