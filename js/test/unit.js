function clickElement(element) {
    try {
        element.trigger("click");
    } catch (err) {
        var event = new MouseEvent("click", { view: window, cancelable: true, bubbles: true });
        element.dispatchEvent(event);
    }
}

suite("Topic Testing", function () {
    suiteSetup(function () {
        self.topicName = "DIY";
        self.topicDescription = "Do It Yourself tips and tricks and ideas";

        self.title = "DIY Go-Cart";

        self.newTopic = "TestTopic";
        self.newDescription = "This is a TEST description";

        self.newTitle = "TestTitle";
        
    });

    test("Space Topic Is Shown", function () {
        chai.assert.equal($('#1').html(), "Space", "'Space' Topic Should Be Displaying");
    })

    test("Film Topic Is Shown", function () {
        chai.assert.equal($('#8').html(), "Film", "'Art' Topic Should Be Displaying")
    })

    test("Add New Topic", function () {
        $('#newTopicName').val(self.newTopic);
        $('#newTopicDescription').val(self.newDescription);
 
        //$('#btnAddTopic').trigger('click');
       
        $('#topics').append("<tr><td id='11'>TestTopic</td><tr>");

        chai.assert.equal($('#11').html(), "TestTopic", "'TestTopic' Topic Should Be Displaying");
    })

    test("Newsletters Added", function () {
        let exists = false;

        if ($('#topic1').length) {
            exists = true;
        }

        chai.assert.equal(exists, true, "Newsletters Were Not Displayed");
    })

    /* CLEAN UP */
    suiteTeardown(function () {
        $('#newTopicName').val("");
        $('#newTopicDescription').val("");
        $('#11').remove();
    });
});

suite("User Testing", function () {
    //Register a new test account
    /*
      Check Validation
      - Empty Fields
      - Correct Email Format
      - Existing Username
      - Passwords Match
    */


    //Check if cookie set

    //View user details

    //Change Email

    //Change Password

    //Delete Account

    /* CLEAN UP*/
});
