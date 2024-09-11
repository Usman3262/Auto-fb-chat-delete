(async () => {
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

    // Load more conversations by scrolling
    console.log("Loading conversations...");
    for (let i = 0; i < 10; i++) { // Adjust the number to load more chats
        window.scrollTo(0, document.body.scrollHeight);
        await delay(2000); // Wait for the conversations to load
    }
    console.log("Finished loading conversations.");

    // Select all conversation option menus
    let chats = document.querySelectorAll('[aria-label="Menu"]');
    console.log(`Found ${chats.length} conversations to delete.`);

    for (let i = 0; i < chats.length; i++) {
        console.log(`Deleting conversation ${i + 1} of ${chats.length}...`);

        let chat = chats[i];

        // Check if the chat menu is visible and interactable
        if (chat && chat.offsetParent !== null) {
            // Simulate click on the "Menu" button to open the options
            chat.dispatchEvent(new MouseEvent('click', { bubbles: true }));
            await delay(1000); // Wait for the menu to open

            // Find the "Delete Chat" option by the inner text
            let deleteOption = [...document.querySelectorAll('span')]
                .find(item => item.innerText.includes('Delete Chat'));

            if (deleteOption) {
                // Simulate click on the "Delete Chat" option
                deleteOption.dispatchEvent(new MouseEvent('click', { bubbles: true }));
                await delay(1000); // Wait for confirmation dialog

                // Automatically click the confirm button to delete the conversation
                let confirmButton = document.querySelector('[aria-label="Delete Chat"]');
                if (confirmButton && confirmButton.offsetParent !== null) {
                    confirmButton.dispatchEvent(new MouseEvent('click', { bubbles: true }));
                    console.log(`Conversation ${i + 1} deleted.`);
                } else {
                    console.log(`Confirmation dialog not found or not visible for conversation ${i + 1}.`);
                }
                await delay(2000); // Wait before deleting the next one
            } else {
                console.log(`Delete option not found for conversation ${i + 1}.`);
            }
        } else {
            console.log(`Menu not visible or interactable for conversation ${i + 1}.`);
        }
    }

    console.log("Finished deleting all conversations.");
})();
//use in mesenger.com
