class Chatbox {
    constructor() {
        this.args = {
            openButton: document.querySelector('.chatbox__button'),
            chatBox: document.querySelector('.chatbox__support'),
            sendButton: document.querySelector('.send__button'),
            resetButton: document.querySelector('#reset')  // Added reset button
        }

        this.state = false;
        this.messages = [];
        this.abusiveCounter = 0;  // Added counter for abusive behavior
    }

    display() {
        const {openButton, chatBox, sendButton, resetButton} = this.args;

        openButton.addEventListener('click', () => this.toggleState(chatBox));
        sendButton.addEventListener('click', () => this.onSendButton(chatBox));
        resetButton.addEventListener('click', () => this.resetChat(chatBox));  // Added event listener for reset button

        const node = chatBox.querySelector('input');
        node.addEventListener("keyup", ({key}) => {
            if (key === "Enter") {
                this.onSendButton(chatBox);
            }
        });
    }

    toggleState(chatbox) {
        this.state = !this.state;

        // show or hide the box
        if (this.state) {
            chatbox.classList.add('chatbox--active');
        } else {
            chatbox.classList.remove('chatbox--active');
        }
    }

    onSendButton(chatbox) {
        var textField = chatbox.querySelector('input');
        let text1 = textField.value;
        if (text1 === "") {
            return;
        }

        // Always push the user's message
        let msg1 = { name: "User", message: text1 };
        this.messages.push(msg1);
        this.updateChatText(chatbox);

        // If counter reached 3, respond with the final message and ignore fetching new responses
        if (this.abusiveCounter >= 3) {
            this.messages.push({ name: "Sam", message: "Please contact our team at team@nexxuslab.com. I will no longer entertain any of your messages. Thank you." });
            this.updateChatText(chatbox);
            textField.value = '';
            return;
        }

        fetch('https://loyscef.pythonanywhere.com/predict', {
            method: 'POST',
            body: JSON.stringify({ message: text1 }),
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json'
            },
          })
          .then(r => r.json())
          .then(r => {
            let msg2 = { name: "Sam", message: r.answer };

            // Check if the response is the specific abusive message
            if (r.answer === "I hope you understand, but we do not tolerate aggressive or inappropriate behavior. Please communicate respectfully. If this behavior continues, we will no longer entertain any more questions. Thank you for your understanding.") {
                this.abusiveCounter++;
            }

            this.messages.push(msg2);
            this.updateChatText(chatbox);
            textField.value = '';

        }).catch((error) => {
            console.error('Error:', error);
            textField.value = '';
          });
    }

    updateChatText(chatbox) {
        var html = '';
        this.messages.forEach(function(item) {
            if (item.name === "Sam") {
                html += '<div class="messages__item messages__item--visitor">' + item.message + '</div>';
            } else {
                html += '<div class="messages__item messages__item--operator">' + item.message + '</div>';
            }
        });

        const chatmessage = chatbox.querySelector('.chatbox__messages > div');
        chatmessage.innerHTML = html;
    }

    resetChat(chatbox) {
        // Clear all messages in the chatbox and reset the abusive counter
        this.messages = [];
        this.abusiveCounter = 0;
        this.updateChatText(chatbox);

        // Also clear the chatbox HTML
        const chatmessage = chatbox.querySelector('.chatbox__messages > div');
        chatmessage.innerHTML = '';
    }
}

const chatbox = new Chatbox();
chatbox.display();