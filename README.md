# MasherMaker
Proyecto Bases de Datos Avanzadas

#Pre-procesar datos
Save on your PC subtitles files .srt
Install pymongo with: $python -m easy_install pymongo
Start MongoServer
edit srt_to_json.py line: 45 to connect to the correct mongo
run: pyhton srt_to_json.py selecting the file you want to upload
in mongo change to the subs db
type: db.subs_collection.find()
