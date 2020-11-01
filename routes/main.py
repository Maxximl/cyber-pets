from docxtpl import DocxTemplate
from docxtpl import InlineImage
from docx.shared import Mm
import sys
import json
from datetime import date



print(sys.argv[1])
data = json.loads(sys.argv[1])
print(data)

today = date.today()

print("Today's date:", today.day,today.month,today.year)
doc = DocxTemplate("./files/cardTemplate.docx")
context = { 'cardId': data['cardId'],
            'dd' : today.day,
            'month' : today.month,
            'shortName' : data['shortName'],
            'operatingOrganizationId' : data['operatingOrganizationId'],
            'aviary' : data['aviary'],
            'image' : InlineImage(doc,'./files/2.jpg',height=Mm(70)),
            'age' : data['age'],
            'weight' : data['weight'],
            'nickName' : data['nickName'],
            'breed' : data['breed'],
            'sex': data['sex'],
            'size' : data['size'],
            'tail' : data['tail'],
            'ears' : data['ears'],
            'identificationMark': data['identificationMark'],
            'sterilizationDate' : data['sterilizationDate'],
            'veterinarian' : data['veterinarian'],
            'socialized' : data['socialized'],
            'workOrder' : data['workOrder'],
            'captureAct' : data['captureAct'], 
            'catchingAddress' : data['catchingAddress'],
            'workOrderDate' : data['workOrderDate'],
            'receiptDate' : data['receiptDate']
                       
    }

doc.render(context)
doc.save("./files/generated.docx")


print(sys.argv[1])
data = json.loads(sys.argv[1])
print(data['name'])
print(data['age'])

print('Ok')

