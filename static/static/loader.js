// May need to hook or bake into base implementation
(function() {
    const observer = new MutationObserver((mutationsList) => {
        for (const mutation of mutationsList) {
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach(node => {
                    // Check if the added node is an element and has the target ID
                    if (node.nodeType === Node.ELEMENT_NODE && node.id === 'chat-input') {
                        node.setAttribute('enterkeyhint', 'Send');
                        setupEventListener(node);
                        // Optionally, disconnect the observer if you only want to react once
                        // observer.disconnect();
                    }
                });
            }
        }
    });

    // Start observing the document body for child node changes
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    function setupEventListener(inputElement) {

        inputElement.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
		    let currentValue = inputElement.value;

		    if (!currentValue && !inputElement.innerHTML) { inputElement.value = ""; return; }

                    /*
		    if (!currentValue.trim()) {
                        currentValue = currentValue.replace(/\n*$/, '');
                    }

		    if (currentValue === "\n") {
			currentValue = "";
		    }

                    inputElement.value = currentValue;

                    if (currentValue.trim().length === 0) {
		        event.preventDefault();
                        return;
                    }
		    */
            }
	});
	/*
        inputElement.addEventListener('keyup', function(event) {
            if (event.key === 'Enter') {
		    let currentValue = inputElement.value;

		    if (!currentValue) { inputElement.innerHTML = ""; return; }

                    if (!currentValue.trim()) {
                        currentValue = currentValue.replace(/\n*$/, '');
                    }

                    inputElement.value = currentValue;

                    if (currentValue.trim().length === 0) {
		        event.preventDefault();
                        return;
                    }
            }
	});
	/**/

        inputElement.addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {


                if (event.shiftKey) {
                    // Shift + Enter: Insert a new line
                    event.preventDefault(); // Prevent the default behavior

		    let currentValue = inputElement.value;

		    if (!currentValue && !inputElement.innerText && !inputElement.innerHTML) {
			    inputElement.innerHTML = "";
			    return;
		    }
		    /**/
                    inputElement.value += '\n';
                    // Move the cursor to the end of the line
                    const startPos = inputElement.selectionStart;
                    const endPos = inputElement.selectionEnd;
                    inputElement.value = inputElement.value.substring(0, startPos) + '\n' + inputElement.value.substring(endPos);
                    inputElement.selectionStart = startPos + 1;
                    inputElement.selectionEnd = startPos + 1;
		    /**/

		    currentValue = inputElement.value;

		    if ((!currentValue && !inputElement.innerText && !inputElement.innerHTML) || (currentValue && currentValue === '\n')) {
			    inputElement.innerHTML = "";
		    }

                } else {
                    // Enter: Trigger form submission without inserting a new line
                    event.preventDefault(); // Prevent the default behavior

                    const form = inputElement.form;

                    if (form) {
                        // Trigger form submission
                        form.submit();
                    } else {
                        const sendButton = document.getElementById('send-message-button');
                        if (sendButton) {
                            // Try to submit the button directly
                            sendButton.click();
                        } else {
                            console.error('Send button with ID "send-message-button" not found');
                        }
                    }
                }

		    let currentValue = inputElement.value;

		    if (!currentValue) {
			    event.preventDefault();
			    inputElement.innerHTML = "";
			    return;
		    }

            }

        });
    }
}());
