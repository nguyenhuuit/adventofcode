from collections import deque
from random import shuffle
from customtools import drawTree

class TreeNode:
  def __init__(self,val,l,r,h):
    self.l = l
    self.r = r
    self.val = val
    self.h = h
  def __str__(self):
    return str(self.val) + ":" + str(self.h)

def printTreeBFS(node,d = "LR"):
  if not node:
    print("empty",end = " ")
    return 
  queue = deque([node])
  while len(queue):
    s = queue.popleft()
    print(s,end = " ")
    print("(",end = " ")
    if s.l:
      print(s.l,end = " ")
    print("|",end = " ")
    if s.r:
      print(s.r,end = " ")
    print(")",end = " ")
    if d == "LR":
      next = [s.l,s.r]
    else:
      next = [s.r,s.l]
    for i in next:
      if i:
        queue.append(i)
    

def printTreeDFS(node,d = "LR",o = "inorder"):
  def printNode():
    if node:
      print(node,end = " ")
  def printLeft():
    if node.l:
      printTreeDFS(node.l,d = d,o = o)
  def printRight():
    if node.r:
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
    
def insertAVL(root,node):
  if not root:
    return node
  if not node:
    return root
  else:
    if node.val > root.val:
      root.r = insertAVL(root.r,node)
      root.r = balance(root.r)
    elif node.val < root.val:
      root.l = insertAVL(root.l,node)
      root.l = balance(root.l)
  update_height(root)
  return balance(root)

def deleteAVL(root,value):
  if not root:
    return
  if root.val > value:
    root.l = deleteAVL(root.l,value)
    update_height(root)
    return balance(root)
  if root.val < value:
    root.r = deleteAVL(root.r,value)
    update_height(root)
    return balance(root)
  if root.val == value:
    if root.l or root.r:
      if get_height(root.l) >= get_height(root.r):
        root.l.r = insertAVL(root.r,root.l.r)
        update_height(root.l)
        return balance(root.l)
      else:
        root.r.l = insertAVL(root.l,root.r.l)
        update_height(root.r)
        return balance(root.r)
    return None
  
def rotate_LL(root):
  new_root = root.r
  t = new_root.l
  new_root.l = root
  root.r = t
  update_height(root)
  update_height(new_root)
  return new_root
    
def rotate_RR(root):
  new_root = root.l
  t = new_root.r
  new_root.r = root
  root.l = t
  update_height(root)
  update_height(new_root)
  return new_root

def rotate_RL(root):
  root.r = rotate_RR(root.r)
  return rotate_LL(root)

def rotate_LR(root):
  root.l = rotate_LL(root.l)
  return rotate_RR(root)

def update_height(root):
  root.h = 1+max(get_height(root.l),get_height(root.r))
      
def get_height(node):
  if node:
    return node.h
  return 0

def balance(root):
  new_root = root
  if get_height(root.l) - get_height(root.r) > 1:
    if get_height(root.l.r) > get_height(root.l.l):
      new_root = rotate_LR(root)
    else:
      new_root = rotate_RR(root)
  if get_height(root.r) - get_height(root.l) > 1:
    if get_height(root.r.r) < get_height(root.r.l):
      new_root = rotate_RL(root)
    else:
      new_root = rotate_LL(root)
  if new_root.l:
    new_root.l = balance(new_root.l)
  if new_root.r:
    new_root.r = balance(new_root.r)
  update_height(new_root)
  return new_root

def check(root):
  if not root:
    return True
  queue = deque([root])
  while len(queue):
    s = queue.popleft()
    if s.l:
      queue.append(s.l)
    if s.r:
      queue.append(s.r)
    if abs(get_height(s.l)-get_height(s.r)) > 1:
      print("Unbalanced")
      return False
    if s.h != 1+max(get_height(s.l),get_height(s.r)):
      print("Wrong height")
      return False
  return True

def solution(input):
  ds = [i for i in range(1,100)]
  for _ in range(10):
    root = None
    shuffle(ds)
    for i in ds:
      root = insertAVL(root,TreeNode(i,None,None,1))
      if not check(root):
        return "Insert not OK"
    shuffle(ds)
    for i in ds:
      root = deleteAVL(root,i)
      if not check(root):
        return "Delete not OK"
    
  ds = [i for i in range(1,17)]
  shuffle(ds)
  root = None
  for i in ds:
    root = insertAVL(root,TreeNode(i,None,None,1))
  drawTree(root)
  return "Well done!"
