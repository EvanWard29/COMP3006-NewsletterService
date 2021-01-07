class Newsletter {
    constructor(NewsletterID, TopicID, Title, Date, URL) {
        this.newsletterID = NewsletterID;
        this.topicID = TopicID;
        this.title = Title;
        this.date = Date;
        this.url = URL;
    }

    /* IssueNo */
    get getNewsletterID() {
        return this.newsletterID;
    }

    set setNewsletterID(NewsletterID) {
        this.newsletterID = NewsletterID;
    }

    /* Date */
    get getDate() {
        return this.date;
    }

    set setDate(Date) {
        this.date = Date;
    }

    /* Topic */
    get getTopicID() {
        return this.topicID;
    }

    set setTopicID(TopicID) {
        this.topicID = TopicID;
    }

    /* Title */
    get getTitle() {
        return this.title;
    }

    set setTitle(Title) {
        this.title = Title;
    }

    /* URL */
    get getURL() {
        return this.url;
    }

    set setURL(URL) {
        this.url = URL;
    }
}
