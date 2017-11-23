# MasherMaker
Proyecto Bases de Datos Avanzadas

# Pre-procesar datos
1) Save on your PC subtitles files .srt
2) Install pymongo with: $python -m easy_install pymongo
2) Start MongoServer
3) edit srt_to_json.py line: 45 to connect to the correct mongo
4) run: pyhton srt_to_json.py selecting the file you want to upload
5) in mongo change to the subs db
6) type: db.subs_collection.find()
