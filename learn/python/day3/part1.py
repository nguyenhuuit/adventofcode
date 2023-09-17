from copy import deepcopy

class Matrix:
  def __init__(self,s):
    if type(s) == list:
      self.d = s
    elif type(s) == str:
      rows = s.split("\n")
      self.d = list(map(lambda x:list(map(int, x.split())),rows))
    else:
      raise ValueError("s should be list or str")
    
  def __str__(self):
    a = map(lambda x:" ".join(map(str, x)),self.d)
    a = "\n".join(a)
    return a
  
  @property
  def size(self):
    return (len(self.d),len(self.d[0]))
  
  def transpose(self):
    a = self.d
    k = []
    for i in range(len(a[0])):
      t = []
      for j in range(len(a)):
        t.append(a[j][i])
      k.append(t)
    self.d = k
  
  def reshape(self,r,c):
    rows,cols = self.size
    if r*c != rows*cols:
      raise ValueError
    a = self.d
    k = [[]]
    for i in range(len(a)):
      for j in range(len(a[0])):
        if len(k[-1]) < c:
          k[-1].append(a[i][j])
        else:
          k.append([a[i][j]])
    self.d = k
    
  def __add__(self,other):
    if type(other) == int:
      a = deepcopy(self.d)
      for i in range(len(a)):
        for j in range(len(a[0])):
          a[i][j] += other
      return Matrix(a)
    elif type(other) == Matrix:
      if other.size != self.size:
        raise ValueError("size of matrixes are not matched")
      c = deepcopy(self.d)
      for i in range(len(c)):
        for j in range(len(c[0])):
          c[i][j] += other.d[i][j]
      return Matrix(c)
    else:
      raise ValueError      
  
  def __mul__(self,other):
    if type(other) == int:
      a = deepcopy(self.d)
      for i in range(len(a)):
        for j in range(len(a[0])):
          a[i][j] *= other
      return Matrix(a)
    elif type(other) == Matrix:
      m,n = self.size
      l = other.size[1]
      if other.size[0] != self.size[1]:
        raise ValueError("size of matrixes are not matched")
      d = [[0 for i in range(l)] for i in range(m)]
      for i in range(m):
        for j in range(l):
          s = 0
          for k in range(n):
            s += self.d[i][k]*other.d[k][j]
          d[i][j] = s
      return Matrix(d)
      
    else:
      raise ValueError      
      
    
def solution(input):
  inputs = input.split("\n\n")
  mt = Matrix(inputs[0])
  mt1 = Matrix(inputs[1])
  print(mt.size)
  print(mt1.size)
  print(mt*mt1)