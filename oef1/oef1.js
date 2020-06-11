/*
    Create classes Person, Contractor and Manager.

    Person has a constructor with values for the fields id and name.
        - id needs to be an Integer bigger than 0. If this isn't the case an Error should be thrown.
        - name needs to be a string. If this isn't the case an Error should be thrown.
    It needs to have a toString method. The return-value of this method should be in this form '[1] jan' (for a Person with id 1 and name jan).

    Contractor inherits from the Class Person.
    In the constructor of Contractor are values for the fields id, name, payPerHour and hoursWorked.
        - id needs to be an Integer bigger than 0. If this isn't the case an Error should be thrown.
        - name needs to be a string. If this isn't the case an Error should be thrown.
        - payPerHour needs to be an Integer bigger than 0. If this isn't the case an Error should be thrown.
        - hoursWorked needs to be an Integer bigger than 0. If this isn't the case an Error should be thrown.
    It needs to have a calculateWage method. The return-value of this method is an integer that is calculated like this:
        wage = hoursWork * payPerHour
    It needs to have a toString method. The return-value for a Contractor with id 2, name tim, hoursWorked 11, payPerHour 20 is a string in this form '[2] tim = 220'.

    Manager inherits from the class Person.
    In the constructor are values for the fields id and name and the field contractors is set equal to an empty array.
        - id needs to be an Integer bigger than 0. If this isn't the case an Error should be thrown.
        - name needs to be a string. If this isn't the case an Error should be thrown.
    The method addContractor expects a value for contractor as an argument, this value is added to the array of contractors.
        - if the input value is not a Contractor an Error should be thrown.
    In the calculateWage method the wage for a manager is calculated by adding up the wages of all the contractors in the array and multiplying this by 0.2.
    This result is rounded to the nearest integer.
    In the toString method you return a string in this form '[3] sofie = 110'. Where 110 is the calculated wage.
 */

class Person {
    constructor(id, name) {
        this._id = this.assertNumberBiggerThanZero(id);
        this._name = this.assertString(name);
    }

    assertNumberBiggerThanZero(number) {
        if (!Number.isInteger(number) || number <= 0) {
            throw `Incorrect input, not a number bigger than 0.`;
        }
        return number;
    }

    assertString(value) {
        if (typeof value != "string") {
            throw `Incorrect input, not a string.`;
        }
        return value;
    }

    set id(id) {
        this._id = this.assertNumberBiggerThanZero(id);
    }

    set name(name) {
        this._name = this.assertString(value);
    }

    toString() {
        return `[${this._id}] ${this._name}`;
    }
}

class Contractor extends Person{
    constructor(id, name, payPerHour, hoursWorked) {
        super(id, name);
        this._payPerHour = this.assertNumberBiggerThanZero(payPerHour);
        this._hoursWorked = this.assertNumberBiggerThanZero(hoursWorked);
    }

    set payPerHour(payPerHour) {
        this._payPerHour = this.assertNumberBiggerThanZero(payPerHour);
    }

    set hoursWorked(hoursWorked) {
        this._hoursWorked = this.assertNumberBiggerThanZero(hoursWorked);
    }

    calculateWage() {
        return this._hoursWorked * this._payPerHour;
    }


    toString() {
        return `${super.toString()} = ${this.calculateWage()}`;
    }
}

class Manager extends Person {
    constructor(id, name) {
        super(id, name);
        this._contractors = [];
    }

    addContractor(contractor) {
        this._contractors.push(this.assertContractor(contractor));
    }

    assertContractor(contractor) {
        if (!contractor instanceof Contractor) {
            throw `Not a contractor.`
        }
        return contractor;
    }

    calculateWage() {
        let wage = 0;
        this._contractors.forEach(contractor => wage += contractor.calculateWage());
        return Math.round(wage * 0.2);
    }


    toString() {
        return `${super.toString()} = ${this.calculateWage()}`;
    }
}


let person = new Person(1,"mike");
let manager=new Manager(2,"jan");
let contractor1=new Contractor(3,"tim",11,13);
let contractor2=new Contractor(4,"sofie",2,50);
manager.addContractor(contractor1);
manager.addContractor(contractor2);
console.log(person.toString());
// [1] mieke
console.log(contractor1.toString());
// [3] tim = 143
console.log(contractor2.toString());
// [4] sofie = 100
console.log(manager.toString());
// [2] jan = 49

