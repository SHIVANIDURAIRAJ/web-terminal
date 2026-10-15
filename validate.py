
from lxml import etree

parser = etree.XMLParser(dtd_validation=True)

try:
    etree.parse("student.xml", parser)
    print("XML is valid according to DTD!")
except etree.XMLSyntaxError as e:
    print("XML validation failed:")
    print(e)
