class TrieNode:
  def __init__(self) -> None:
    self.children = [None for i in range(62)]
    self.end = False
    
def getindex(a):
  if "a" <= a <= "z":
    return ord(a)-ord("a")
  elif "A" <= a <= "Z":
    return ord(a)-ord("A")+26
  elif "0" <= a <= "9":
    return int(a) + 52
  raise KeyError

def getchr(i):
  if 0 <= i <= 25:
    return chr(i+ord("a"))
  elif 26 <= i <= 51:
    return chr(i+ord("A")-26)
  elif 52 <= i <= 61:
    return str(i - 52)
  raise IndexError
  
def insertTrie(root,value):
  if value == "":
    root.end = True
  else:
    c = value[0]
    i = getindex(c)
    if root.children[i] == None:
      root.children[i] = TrieNode()
    insertTrie(root.children[i],value[1:])
    
def printTrie(root,prefix):
  if root.end:
    print(prefix)
  for i in range(62):
    if root.children[i] != None:
      printTrie(root.children[i],prefix+getchr(i))
  
    
def searchTrie(root,value):
  if value == "":
    return root.end
  i = getindex(value[0])
  if root.children[i] == None:
    return False
  return searchTrie(root.children[i], value[1:])
   
  
def solution(input):
  root = TrieNode()
  insertTrie(root,"aa")
  insertTrie(root,"ab")
  insertTrie(root,"acd")
  insertTrie(root,"123Aa")
  printTrie(root,"")
  print(searchTrie(root,"aaz"))