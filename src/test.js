function test() {
  if(Math.random()* 10)
    return 11;
  return 42;
}


describe('test', function () {
  it('should work', function () {
    assert(test).equals(42)
  });
});