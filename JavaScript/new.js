function New(func){
  res = {}
  res.__proto__ = func.prototype;
  res = func.apply(res,arguments)
  return res
}