
import sys
import os.path
from libsbml import *
import json


jsonfile1 = [] 
jsonfile2 = []
info = {}

def check_name_duplicated(model):
    name_duplicated = False
    name_dic = {}
    for s in model.getListOfSpecies():
        if s.getName() in name_dic:
            name_duplicated = True
            break
        name_dic[s.getName()] = s.getId()
    return name_duplicated


# ESPECES #
def getnodes(model):
    name_duplicated = check_name_duplicated(model)
    v = False
    for sp in model.getListOfSpecies():
        if name_duplicated and v :
            v = True

            info ={"id": sp.getId()[-7:],"name" : sp.getId(), "compartment" : sp.getCompartment(),"group" : "nodes"}
        else :
            info ={"id": sp.getId()[-7:],"name" : sp.getName(), "compartment" : sp.getCompartment()}
            jsonfile1.append(info)

# REACTIONS #
def getlink(model):
    for reaction in model.getListOfReactions():
        for r in reaction.getListOfReactants():
            for prod in reaction.getListOfProducts():
                bigdico = {}
                reaction_dico_id = reaction.getId()
                bigdico['id'] = reaction_dico_id
                react_id = r.getId()
                compartment_reaction = reaction.getCompartment()
                bigdico['compartment'] = compartment_reaction
                bigdico['source'] = react_id[-7:]
                prod_id = prod.getId()
                bigdico['target'] = prod_id[-7:]
                jsonfile2.append(bigdico)

def creation_sbml_objects(file):
    doc = readSBML(file)
    mod = doc.getModel()
    getnodes(mod)
    getlink(mod)
    jsonfinal = {"nodes" : jsonfile1, "edges" : jsonfile2}
    return jsonfinal

jsonf = creation_sbml_objects('att.sbml')
f = open('ff73.json', "w")
json.dump(jsonf, f, ensure_ascii=False, indent=2)
f.close()