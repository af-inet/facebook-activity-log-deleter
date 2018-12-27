(function () {

    function clickConfirmDeleteButton() {
        var confirmDeleteButton = findConfirmDeleteButton();
        // show the user we're about to click this button
        confirmDeleteButton.style.border = "solid 2px red"
        setTimeout(function () {
            // finally we can delete this post
            confirmDeleteButton.click();
            // wait for the post to disappear
            setTimeout(function () {
                deletePost()
            }, 4000)
        }, 100)
    }

    function findConfirmDeleteButton() {
        var elements = document.querySelectorAll('button[type="submit"]');
        for (var i = 0; i < elements.length; i++) {
            if (elements[i].textContent.toLowerCase() === "delete") {
                return elements[i];
            }
        }
        throw new Error("failed to find confirm delete button")
    }

    function findDeleteButton() {
        var elements = []
        var iterator = document.evaluate("//a[contains(., 'Delete')]", document, null, XPathResult.ANY_TYPE, null);
        var element = null;
        while (element = iterator.iterateNext()) {
            elements.push(element)
        }
        if (elements.length <= 0) {
            throw new Error("did not find delete button")
        }
        return elements[elements.length - 1]
    }

    function clickDeleteButton() {
        var deleteButton = findDeleteButton()
        // show the user we're about to click this button
        deleteButton.style.border = "solid 2px red"
        setTimeout(function () {
            deleteButton.click()
            setTimeout(clickConfirmDeleteButton, 1000);
        }, 100)
    }

    function findNextPost() {
        var elements = document.querySelectorAll('[data-tooltip-content="Edit"], [data-tooltip-content="Allowed on timeline"], [data-tooltip-content="Hidden from timeline"]');
        if (elements.length > 0) {
            return elements[0];
        }
        return null;
    }

    function deletePost() {
        var target = findNextPost()
        if (target) {
            // show the user we're about to click this button
            target.style.border = "solid 2px red";
            setTimeout(function () {
                target.click();
                // don't click that shit again
                target.parentElement.removeChild(target);
                setTimeout(clickDeleteButton, 100);
            }, 100)
        } else {
            console.log("failed to find a post, scrolling down and starting over. We might have run out of posts...");
            // this part is annoying because we need to scroll down and wait for new posts to load,
            // so we scroll, wait, scroll, wait, etc...
            setTimeout(function () {
                window.scrollTo(0, document.body.scrollHeight);
                setTimeout(function () {
                    window.scrollTo(0, document.body.scrollHeight);
                    setTimeout(function () {
                        window.scrollTo(0, document.body.scrollHeight);
                        setTimeout(function () {
                            window.scrollTo(0, document.body.scrollHeight);
                            setTimeout(function () {
                                deletePost()
                            }, 1000)
                        }, 1000);
                    }, 1000);
                }, 1000);
            }, 1000);
        }
    }

    deletePost()

})()
