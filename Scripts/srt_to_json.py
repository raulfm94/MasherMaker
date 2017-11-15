import re
import json
from Tkinter import Tk
from tkFileDialog import askopenfilename

Tk().withdraw() # we don't want a full GUI, so keep the root window from appearing
##filename must include episode like S00E00
filename = askopenfilename() # show an "Open" dialog box and return the path to the selected file

x = 1
episode = re.findall('S[0-9]{2}E[0-9]{2}', filename)[0]
##from bcoughlan in stack overflow
def srt_time_to_seconds(time):
    split_time=time.split(',')
    major, minor = (split_time[0].split(':'), split_time[1])
    return int(major[0])*1440 + int(major[1])*60 + int(major[2]) + float(minor)/1000

def srt_to_dict(srtText):
    global x
    global episode
    subs=[]
    for s in re.sub('\r\n', '\n', srtText).split('\n\n'):
        st = s.split('\n')
        if len(st)>=3:
            split = st[1].split(' --> ')
            subs.append({'num' : x,
                         'episode' : episode,
                         'start': (split[0].strip()),
                         'end': (split[1].strip()),
                         'text': '<br />'.join(j for j in st[2:len(st)])
                        })
            x = x + 1
    return subs

##implementation
with open(filename, "r") as f:
        srtText = f.read()
        ##print srt_to_dict(srtText)
with open('result.json', 'w') as fp:
    json.dump(srt_to_dict(srtText), fp, indent=4)
