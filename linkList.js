function node(e) {
  this.element = e;
  this.next = null;
  this.previous = null;
}
function linkList () {
  this.head = new node('head');
  this.insert = insert;
  this.find = find;
  this.remove = remove;
  // this.findPrevious = findPrevious;
  this.display = display;
  this.findLast = findLast;
  this.displayReverse = displayReverse;
}
function find (item){
  var currNode = this.head;
  while(currNode.element !== item) {
    currNode = currNode.next;
  }
  return currNode;
}
function insert (newElement, item) {
  var newNode = new node(newElement);
  var currNode = this.find(item);
  newNode.next = currNode.next;
  currNode.next = newNode;
  newNode.previous = currNode;
}
function display (){
  var currNode = this.head;
  while(currNode.next){
    console.log(currNode.next.element);
    currNode = currNode.next;
  }
}
// function findPrevious(item){
//   var currNode = this.head;
//   while(currNode.next && currNode.next.element !== item) {
//     currNode = currNode.next;
//   }
//   return currNode;
// }
function remove(element) {
  var currNode = this.find(element);
  if (currNode.next) {
    currNode.previous.next = currNode.next;
    currNode.next.previous = currNode.previous;
    currNode.next = null;
    currNode.previous = null;
  } else {
    // 如果是最后一个那么清空上一个的next;
    currNode.previous.next = null;
  }
  // var preNode = this.findPrevious(element);
  // if (preNode.next) {
  //   preNode.next = preNode.next.next;
  // }
}
function findLast() {
  var currNode = this.head;
  while(currNode.next) {
    currNode = currNode.next;
  }
  return currNode;
}
function displayReverse() {
  var currNode = this.head;
  currNode = this.findLast();
  while(currNode.previous) {
    console.log(currNode.element);
    currNode = currNode.previous;
  }
}
var cities = new linkList();
cities.insert('first','head');
cities.insert('second','first');
cities.insert('third','second');
cities.display();

