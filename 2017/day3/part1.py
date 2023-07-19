def phia_truoc(diem,huong,delta):
  d = delta[huong]
  return diem[0] + d[0], diem[1] + d[1]

def solution(input):
  delta = { "left": (-1,0), "right": (1, 0), "up": (0,1), "down": (0, -1)}
  directions = ['right', 'up', 'left', 'down']
  current_direction = 3
  toa_do = (0,0)
  marked = set()
  n = int(input)
  marked.add(toa_do)
  for i in range(1,n):
    next_direction = (current_direction + 1) % 4
    diem_phia_truoc = phia_truoc(toa_do, directions[next_direction],delta)
    if diem_phia_truoc not in marked:
      current_direction = next_direction
      toa_do = diem_phia_truoc
      marked.add(diem_phia_truoc)
    else:
      t = phia_truoc(toa_do, directions[current_direction],delta)
      marked.add(t)
      toa_do = t
    print(toa_do[0],toa_do[1])
  return abs(toa_do[0]) + abs(toa_do[1])