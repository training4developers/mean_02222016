"use strict";

function Person(firstName, lastName) {
	this.firstName = firstName;
	this.lastName = lastName;
}

Person.prototype.getFullName = function() {
	return this.firstName + " " + this.lastName;
};

function Student(studentId, firstName, lastName) {
	this._super.call(this, firstName, lastName);
	this.studentId = studentId;
}

Student.prototype = Object.create(Person.prototype);
Student.prototype.constructor = Student;
Student.prototype._super = Person;

var student = new Student(1, "Bob", "Smith");
console.log(student.getFullName());
