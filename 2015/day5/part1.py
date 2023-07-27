def kiemtra(s):
  vowels = ["a","u","e","i","o"]
  cam = ["ab","cd","pq","xy"]
  sna = 0
  lien_tiep = False
  if s[0] in vowels:
    sna += 1
  for i in range(1,len(s)):
    if s[i] in vowels:
      sna += 1
    if s[i] == s[i-1]:
      lien_tiep = True
    if s[i-1] + s[i] in cam:
      return False
  if sna > 2:
    if lien_tiep:
      return True
  return False
    
def solution(input):
  kq = 0
  chuoi = input.split("\n")
  for j in chuoi:
    if kiemtra(j):
      kq += 1
  return kq