import re
import json

num = ""
StartTime = ""
EndTime = ""
text = ""
a = []
go = True

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
    global go
    patternNum = re.compile("^[0-9]+$")
    patternTime = re.compile("^[0-9]{2}:[0-9]{2}:[0-9]{2},[0-9]{3} --> [0-9]{2}:[0-9]{2}:[0-9]{2},[0-9]{3}$")
    patternText = re.compile("^[a-zA-Z, ,\D]+$")
    patternBlank = re.compile("^[[:blank:]]+$")

    if(patternNum.match(line) != None):
        if go:
            num = line
            go = False
        else:
            createObj(num, StartTime, EndTime, text)
            text = ""
            go = True
    elif(patternTime.match(line) != None):
        lineArr = line.split()
        StartTime = lineArr[0]
        EndTime = lineArr[2]
    elif(patternText.match(line) != None):
        ##print("copy text: " + line)
        text = text + line + ""
        ##createObj(num, StartTime, EndTime, text)
        ##text = ""
    ##elif(len(line) == 0):
    ##    print("end")
    ##    createObj(num, StartTime, EndTime, text)
    ##    text = ""
    ##else:
    ##    print("else")
    return

with open("captionTest.txt", 'r') as f:
    for line in f:
        ##print(line)
        lineRead(line)
with open("result.json",'w') as f:
    json.dump(a, f, indent=2)
