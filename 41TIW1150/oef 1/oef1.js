/*
    In this file you create 4 classes (Horse, Rider, Competition, InputError)

    A competition has contestants (horses with riders)

    When the competition starts, it will be randomly decided which horse of the contestants get to take
    one step forward. This will happen via a for-loop that loops 100 times.

    At the end of the competition an overview is shown, that shows how many steps were taken by every horse.

    This exercise is run in the console via Node.js. Avoid duplication.

    The class InputError extends Error.

    The class Rider has member variables (_name and _firstname). It has a constructor with values
    for these fields.
    Create getters for these fields.
    Create a toString method. This returns a string in the form: 'name firstname'.

    The class Horse has member variables (_name, _race, _count, _rider). It has a constructor with values for
    for these fields.
        - Rider needs to be a Rider-Object. If this is not a case an InputError should be thrown.
    Create getters for all the fields.
    Create a setter for count.
        - count needs to be an integer. If this is not the case an InputError should be thrown.
    Via the toString method a string representation of the rider and the horse is returned.
    'riderName riderFirstname with horse: horseName, (race) horseRace - # Steps: 0'

    The class Competition has member variables (_date, _circuit, _contestants (=array)).
    It has a constructor with values for the fields date and circuit. In this constructor the field _contestants
    is set equal to an empty array.
        - Date needs to be a Date-Object. If this is not the case an InputError should be thrown.
        - Circuit needs to be a string. If this is not the case an InputError should be thrown.
    Create getters for all the fields.
    Create a setter for contestants. You'll use this to add a Horse object to the list of participants.
    Via the toString method a string representation of the competition is generated.
    'Competition : ( 4/6/2020 - Hippodroom : Les Tilleuls (Kortijk))'
 */

class InputError extends Error {
    constructor() {
        super();
    }
}

class Rider {
    constructor(name, firstname) {
        this._name = name;
        this._firstname = firstname;
    }

    get name() {
        return this._name;
    }

    get firstname() {
        return this._firstname;
    }

    toString() {
        return `${this._name} ${this._firstname}`;
    }
}

class Horse {
    constructor(name, race, rider, count) {
        this._name = name;
        this._race = race;
        this._rider = this.assertRider(rider);
        this._count = this.assertNumber(count);
    }

    get name() {
        return this._name;
    }

    get race() {
        return this._race;
    }

    get count() {
        return this._count;
    }

    get rider() {
        return this._rider;
    }

    set count(count) {
        this._count = this.assertNumber(count);
    }

    assertRider(rider) {
        if (!rider instanceof Rider) {
            throw new InputError('Not a valid RiderObject');
        }
        return rider;
    }

    assertNumber(input) {
        if (!Number.isInteger(input)) {
            throw new InputError('Not a number');
        }
        return input;
    }

    toString() {
        return `${this._rider.toString()} with horse: ${this._name}, (race) ${this._race} - # Steps: ${this._count}`;
    }
}

class Competition {
    constructor(date, circuit) {
        this._date = this.assertDate(date);
        this._circuit = this.assertCircuit(circuit);
        this._contestants = [];
    }

    get date() {
        return this._date;
    }

    get circuit() {
        return this._circuit;
    }

    get contestants() {
        return this._contestants;
    }


    set contestants(value) {
        this._contestants = value;
    }

    assertDate(date) {
        if (typeof date != "object") {
            throw new InputError("Incorrect date");
        }
        return date;
    }

    assertCircuit(circuit) {
        if (typeof circuit != "string") {
            throw new InputError("Input isn't an alphanumerical value");
        }
        return circuit;
    }

    toString() {
        return `Competition: (${this._date.getDate()}/${this._date.getMonth()}/${this._date.getFullYear()} - ${this._circuit}`;
    }
}


let rider, horse, competition;

    
        //  Definieer competition - Dit is mogelijke testcode

            competition = new Competition(new Date(2020,6,2),'Les Tilleuls (Kortijk)');

        //  Definieer horse, wijs rider aan horse toe, wijs horse aan deelnemerslijst toe

            rider = new Rider('van Asten', 'Leopold');
            horse = new Horse('Amerigo', 'Appaloosa', rider,0);
            competition.contestants.push(horse);

            rider = new Rider('Bartels', 'Tineke');
            horse = new Horse('Brego', 'Asturcion', rider,0);
            competition.contestants.push(horse);

            rider = new Rider('Brink', 'Jan');
            horse = new Horse('Huaso', 'Haflinger', rider,0);
            competition.contestants.push(horse);

            rider = new Rider('Capellmann', 'Nadine');
            horse = new Horse('Pegasus', 'connemara', rider,0);
            competition.contestants.push(horse);


        //  start competition
            function getRandomInt(max) {
                return Math.floor(Math.random() * Math.floor(max));
            }

            for (let i = 0; i < 100; i++) {
                let contestant = getRandomInt(competition.contestants.length);
                competition.contestants[contestant].count++;
            }

           

        //  Toon OUTPUT (=klassement)
            console.log(competition.toString());
            for (let contestant of competition.contestants) {
                console.log(contestant.toString());
            }

