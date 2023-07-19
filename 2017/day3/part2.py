def phia_truoc(diem,huong,delta):
  d = delta[huong]
  return diem[0] + d[0], diem[1] + d[1]

def tinh_o_vuong(diem,marked):
  delta2 = [(0,1),
            (1,0),
            (-1,0),
            (0,-1),
            (1,1),
            (-1,1),
            (1,-1),
            (-1,-1)]
  k = 0
  for x,y in delta2:
    a = diem[0] + x
    b = diem[1] + y
    if (a,b) in marked:
      k = k + marked[(a,b)]
  return k 
           
def solution(input):
  delta = { "left": (-1,0), "right": (1, 0), "up": (0,1), "down": (0, -1)}
  directions = ['right', 'up', 'left', 'down']
  current_direction = 3
  toa_do = (0,0)
  marked = dict()
  n = int(input)
  marked[toa_do] = 1
  while marked[toa_do] < n:
    next_direction = (current_direction + 1) % 4
    diem_phia_truoc = phia_truoc(toa_do, directions[next_direction],delta)
    if diem_phia_truoc not in marked:
      current_direction = next_direction
      toa_do = diem_phia_truoc
      marked[toa_do] = tinh_o_vuong(toa_do, marked)
    else:
      t = phia_truoc(toa_do, directions[current_direction],delta)
      marked[t] = tinh_o_vuong(t, marked)
      toa_do = t
  return marked[toa_do]
