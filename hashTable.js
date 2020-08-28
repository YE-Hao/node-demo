function HashTable () {
  this.table = new Array(137);
  this.simpleHash = simpleHash;
  this.showDistro = showDistro;
  this.put = put;
  this.get = get;
}
function simpleHash (data) {
  var total = 0;
  var H = 37;
  for(var i = 0; i < data.length; i += 1) {
    total += H * total + data.charCodeAt(i);
  }
  total = total % this.table.length;
  if (total < 0) {
    total += this.table.length - 1;
  }
  return total;
}
function put (key, data) {
  var pos = this.simpleHash(key);
  this.table[pos] = data;
}
function showDistro () {
  var n = 0;
  for (var i = 0; i < this.table.length; i++) {
    if (this.table[i]) {
      console.log(`${i}:${this.table[i]}`);
    }
  }
}
function get (key) {
  return this.table[this.simpleHash(key)];
}
var htable = new HashTable();
htable.put('David');
htable.put('Jennifer');
htable.put('Donnie');
htable.put('Raymond');
htable.put('Cynthia');
htable.put('Mike');
htable.put('Clayton');
htable.put('Danny');
htable.put('Jonathan');
console.log(htable.showDistro())