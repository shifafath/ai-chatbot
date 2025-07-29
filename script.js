async function sendMessage() {
    let input = document.getElementById("userInput").value;
    if (!input.trim()) return;

    addMessage("You", input, "user-msg");

    let res = await fetch("http://localhost:3000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input })
    });

    let data = await res.json();
    addMessage("Bot", data.reply, "bot-msg");

    document.getElementById("userInput").value = "";
}

function addMessage(sender, text, className) {
    let chatBox = document.getElementById("chatBox");
    let messageDiv = document.createElement("div");
    messageDiv.className = className;
    messageDiv.innerHTML = `<b>${sender}:</b> `;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;

    if (sender === "Bot") {
        let i = 0;
        function typeWriter() {
            if (i < text.length) {
                messageDiv.innerHTML += text.charAt(i);
                i++;
                chatBox.scrollTop = chatBox.scrollHeight;
                setTimeout(typeWriter, 30); // typing speed
            }
        }
        typeWriter();
    } else {
        messageDiv.innerHTML += text;
    }

    saveHistory(sender, text, className);
}


function saveHistory(sender, text, className) {
    let history = JSON.parse(localStorage.getItem("chatHistory")) || [];
    history.push({ sender, text, className });
    localStorage.setItem("chatHistory", JSON.stringify(history));
}

function loadHistory() {
    let history = JSON.parse(localStorage.getItem("chatHistory")) || [];
    history.forEach(msg => addMessage(msg.sender, msg.text, msg.className));
}

function newChat() {
    localStorage.removeItem("chatHistory");
    document.getElementById("chatBox").innerHTML = "";
}
function toggleDarkMode() {
    document.body.classList.toggle("dark");
    localStorage.setItem("darkMode", document.body.classList.contains("dark"));
}

// Load dark mode on page start
window.onload = function () {
    loadHistory();
    if (localStorage.getItem("darkMode") === "true") {
        document.body.classList.add("dark");
    }
};


window.onload = loadHistory;
