let currentHintIndex = 0;
const hints = [
    "Go to the main library.",
    "Find the tallest building on campus.",
    "Locate the cafeteria entrance."
];

function registerUser() {
    const name = document.getElementById('name').value;
    const username = document.getElementById('username').value;
    if (name && username) {
        document.getElementById('registration').classList.add('hidden');
        document.getElementById('game').classList.remove('hidden');
        document.getElementById('hint').textContent = hints[currentHintIndex];
    } else {
        alert("Please fill out all fields.");
    }
}

function submitAnswer() {
    const answer = document.getElementById('answer').value.toLowerCase();
    const feedback = document.getElementById('feedback');
    if (answer === "correct") {
        currentHintIndex++;
        if (currentHintIndex < hints.length) {
            document.getElementById('hint').textContent = hints[currentHintIndex];
            document.getElementById('answer').value = "";
            feedback.textContent = "Correct! Here's your next hint.";
            feedback.style.color = "green";
        } else {
            feedback.textContent = "Congratulations! You've completed the hunt.";
            feedback.style.color = "blue";
        }
    } else {
        feedback.textContent = "Wrong answer. Try again.";
        feedback.style.color = "red";
    }
}
