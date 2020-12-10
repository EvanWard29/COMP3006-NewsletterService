class User {
    constructor(UserID, FirstName, LastName, Username, Email, DOB, Gender) {
        this.userID = UserID;
        this.firstName = FirstName;
        this.lastName = LastName;
        this.username = Username;
        this.email = Email;
        this.dob = DOB;
        this.gender = Gender;
    }

    /* UserID */
    get getUserID() {
        return this.userID;
    }

    set setUserID(UserID) {
        this.userID = UserID;
    }

    /* First Name */
    get getFirstName() {
        return this.firstName;
    }

    set setFirstName(FirstName) {
        this.firstName = FirstName;
    }

    /* Last Name */
    get getLastName() {
        return this.lastName;
    }

    set setLastName(LastName) {
        this.lastName = LastName;
    }

    /* Username */
    get getUsername() {
        return this.username;
    }

    set setUsername(Username) {
        this.username = Username;
    }

    /* Email */
    get getEmail() {
        return this.email;
    }

    set setEmail(Email) {
        this.email = Email;
    }

    /* DOB */
    get getDOB() {
        return this.dob;
    }

    set setDOB(DOB) {
        this.dob = DOB;
    }

    /* Gender */
    get getGender() {
        return this.gender;
    }

    set setGender(Gender) {
        this.gender = Gender;
    }
}

class Admin extends User {
    constructor(UserID, FirstName, LastName, Username, Email, DOB, Gender, AdminID) {
        super(UserID, FirstName, LastName, Username, Email, DOB, Gender);
        this.adminID = AdminID;
    }

    /* AdminID */
    get getAdminID() {
        return this.adminID;
    }

    set setAdminID(AdminID) {
        this.adminID = AdminID;
    }
}
