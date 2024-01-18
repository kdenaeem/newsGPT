class Chatbox {
   constructor() {
      this.args = {
         openButton: document.querySelector('.chatbox__button'),
         chatBox : document.querySelector('.chatbox__suport'),
         sendButton : document.querySelector('.send__button')
      }

      this.state = false;
      this.message = [];
   }

   display() {
      const {openButton, chatBox, sendButton} = this.args;

      openButton.addEventListener('click', ()=>this.toggleState(chatBox))
      sendButton.addEventListener('click', () => this.onSendButton(chatBox))

      const node = chatBox.querySelector('input');
      node.addEventListener("keyup", ({key}) => {
         if (key == "Enter") {
            this.onSendButton(chatBox)
         }
      })
   }

   toggleState(chatBox) {
      this.state = !this.state

      //  show or hide the chat bot
      if (this.state) {
         // add of remove chatbox active class
         chatBox.classList.add('chatbox--active')
      } else {
         chatBox.classList.remove('chatbox--active')
      }
   }

   onSendButton(chatBox) {
      var textField = chatBox.querySelector('input')
      let textField1 = textField.value;
      if (textField1 == "") {
         return;
      }
      // define a dictionary which will be sent to the chatbot
      // the message key has to be same as in flask
      let msg1 = {name : "user", message : textField1}
      this.message = [];
       

// SCRIPT ROOT is defined 
      fetch($SCRIPT_ROOT + '/predict', {
         method : 'POST',
         // stringify the message
         body : JSON.stringify({message: text1}),
         // Allow cors
         mode : 'cors',
         headers : {
            'Content-Type' : 'application/json'
         },
         // Wait for the response and until you get the json back
      }).then(r => r.json()).then(r => {
         let msg2 = {name : "Sam", message : r.answer};
         this.message.push(msg2);
         this.updateChatText(chatBox);
         textField.value = ''
      }).catch((error) => {
         console.error('Error', error);
         this.updateChatText(chatBox)
         textField.value = ''
      })
   }

   updateChatText(chatBox) {
      var html = '';
      this.messages.slice().reverse().forEach(function(item, index) {
         if (item.name == "Sam") {
            html += '<div class="messages__item messages__item--visitor">' + item.message + '</div>'

         } else {
            html += '<div class="messages__item messages__item--operator">' + item.message + '</div>'

         }
      })
      const chatmessages = Chatbox.querySelector('.chatbox__messages');
      chatmessages.innerHTML = html;

   }

}


const chatObject = new Chatbox();
chatObject.display();
