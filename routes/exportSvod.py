from docxtpl import DocxTemplate
from docxtpl import InlineImage
from docx.shared import Mm
import sys
import json
from datetime import date

tpl = DocxTemplate('./files/svodTemplate.docx')

#print(sys.argv[1])
data = json.loads(sys.argv[1])
#print(data)

shelter = data['shelter']
print(shelter['address'])
pets = data['pets']

today = date.today()

tmp_key = []
i = 1
for key in pets:
    tmp_key.append({'label': i, 'cols':  list(key.values()) })
    i = i + 1
print(tmp_key)

context = {
    'dd' : today.day,
    'mm' : today.month,
    'yy' : today.year,
    'address' : shelter['address'],
    'col_labels': ['fruit', 'vegetable', 'stone', 'thing'],
    'tbl_contents': tmp_key,
}

print('Ok')


tpl.render(context)
tpl.save('./files/generated_svod.docx')

