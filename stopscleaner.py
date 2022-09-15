import json
  
# Opening JSON file
f = open('stopsfrompassio.json')
  
# returns JSON object as 
# a dictionary
data = json.load(f)
  
# Iterating through the json
# list

output_list = []

for index in data:
    temp_dict = {}

    pos_dict={}
    pos_dict['lat'] = data[index]['latitude']
    pos_dict['lng'] = data[index]['longitude']

    temp_dict['position'] = pos_dict
    temp_dict['name'] = data[index]['name']
    temp_dict['route']  = data[index]['routeName']
    output_list.append(temp_dict)

# Closing file
f.close()


# Serializing json
json_object = json.dumps(output_list, indent=4)
 
# Writing to sample.json
with open("src\stops.json", "w") as outfile:
    outfile.write(json_object)
