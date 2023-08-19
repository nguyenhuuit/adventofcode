from collections import deque

class TreeNode:
  def __init__(self,val,l,r):
    self.l = l
    self.r = r
    self.val = val
  def __str__(self):
    return str(self.val)

def printTreeBFS(node,d = "LR"):
  queue = deque([node])
  while len(queue) != 0:
    s = queue.popleft()
    print(s,end = " ")
    print("(",end = " ")
    if s.l:
      print(s.l,end = " ")
    print(":",end = " ")
    if s.r:
      print(s.r,end = " ")
    print(")",end = " ")
    if d == "LR":
      next = [s.l,s.r]
    else:
      next = [s.r,s.l]
    for i in next:
      if i != None:
        queue.append(i)
    

def printTreeDFS(node,d = "LR",o = "inorder"):
  def printNode():
    if node != None:
      print(node,end = " ")
  def printLeft():
    if node.l != None:
      printTreeDFS(node.l,d = d,o = o)
  def printRight():
    if node.r != None:
      printTreeDFS(node.r,d = d,o = o)
  m = {
    ("LR","inorder"):[printLeft,printNode,printRight],
    ("LR","postorder"):[printLeft,printRight,printNode],
    ("LR","preorder"):[printNode,printLeft,printRight],
    ("RL","inorder"):[printRight,printNode,printLeft],
    ("RL","postorder"):[printRight,printLeft,printNode],
    ("RL","preorder"):[printNode,printRight,printLeft],
  }
  for i in m[(d,o)]:
    i()
    
def insertBST(root,value):
  if root == None:
    return TreeNode(value,None,None)
  else:
    if value > root.val:
      if root.r == None:
        root.r = TreeNode(value,None,None)
      else:
        insertBST(root.r,value)
    if value < root.val:
      if root.l == None:
        root.l = TreeNode(value,None,None)
      else:
        insertBST(root.l,value)
  return root
      
def findNearestLeft(root):
  s = root.l
  while s.r != None:
    s = s.r
  return s

def findNearestRight(root):
  s = root.r
  while s.l != None:
    s = s.l
  return s

def deleteBST(root,value):
  if root == None:
    return
  if root.val > value:
    root.l = deleteBST(root.l,value)
    return root
  if root.val < value:
    root.r = deleteBST(root.r,value)
    return root
  if root.val == value:
    if root.l != None:
      t = findNearestRight(root)
      x = root.l.r
      root.l.r = root.r
      t.l = x
      return root.l
    return None
  
    
def solution(input):
  root = None
  ds = [4,2,6,1,3,5,7]
  for i in ds:
    root = insertBST(root,i)
  root = deleteBST(root,4)
  printTreeDFS(root,d = "LR",o = "inorder")
  # printTreeBFS(root)
  return ""