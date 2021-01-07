class Admin {
    constructor(AdminID, UserID) {
        this.adminID = AdminID;
        this.userID = UserID;
    }

    /* User ID */
    get getUserID() {
        return this.userID;
    }

    set setUserID(UserID) {
        this.userID = UserID;
    }

    /* Admin ID */
    get getAdminID() {
        return this.adminID;
    }

    set setAdminID(AdminID) {
        this.adminID = AdminID;
    }
}