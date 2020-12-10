class Subscription {
    constructor(SubscriptionID, UserID, TopicID) {
        this.subscriptionID = SubscriptionID;
        this.userID = UserID;
        this.topicID = TopicID;
    }

    /* SubscriptionID */
    get getSubscriptionID() {
        return this.subscriptionID;
    }

    set setSubscriptionID(SubscriptionID) {
        this.subscriptionID = SubscriptionID;
    }

    /* UserID */
    get getUserID() {
        return this.userID;
    }

    set setUserID(UserID) {
        this.userID = UserID;
    }

    /* TopicID */
    get getTopicID() {
        return this.topicID;
    }

    set setTopicID(TopicID) {
        this.topicID = TopicID;
    }
}
