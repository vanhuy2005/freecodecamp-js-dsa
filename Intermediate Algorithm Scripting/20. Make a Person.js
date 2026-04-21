const Person = function(first, last) {
  let firstName = first;
  let lastName = last;

  this.getFirstName = function() {
    return firstName;
  };

  this.getLastName = function() {
    return lastName;
  };

  this.getFullName = function() {
    return firstName + " " + lastName;
  };

  this.setFirstName = function(name) {
    firstName = name;
  };

  this.setLastName = function(name) {
    lastName = name;
  };

  this.setFullName = function(first, last) {
    firstName = first;
    lastName = last;
  };
};

const bob = new Person("Bob", "Ross");
bob.getFullName();