import json
  
# Opening JSON file
f = open('./src/silverroute.json')
  
# returns JSON object as 
# a dictionary
data = json.load(f)
  
# Iterating through the json
# list

output_list = []

for index in data:
    index['lat'] = float(index['lat'])
    index['lng'] = float(index['lng'])
    print(index)
    #output_list.append(temp_dict)

# Closing file
f.close()

#3201 == silver
#16380 == green
#26308 == shuttle
#31969 == expanded housing
#3406 == charter

# Serializing json
json_object = json.dumps(data)
 
# Writing to sample.json
with open("./src/silverroute.json", "w") as outfile:
    outfile.write(json_object)
