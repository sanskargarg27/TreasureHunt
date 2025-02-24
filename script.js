let currentHintIndex = 0;
let currentRetries = 0; // Track retries for the current question
let correctAnswers = 0; // Track the number of correct answers
let teamName = "";

const hints = [
    "A warrior in history, brave and grand\nYet in my blood, a curse did stand\n.A show of romance, a Briderton series,\nAn actress fierce, on a trip to Paris.\nGuess me if you can!",
    "She has two Nobels to her name,\nbrought two elements into the game.\nShe unveiled a force both boon and bane,\nThere's also a biscuit in her name.\nWho is she?",
    "You live if you are fit,\nI said so, that's it.\nWho am I?",
    "Khud Mahadev ka vaas hai jahan\nMeghnath ke teer ka ilaaj bhi hai wahan\nWahan hai sabse unchi choti\nInsan to kya wahan ki mitti tak nahin hai khoti.\nBatao kaha?",
    "Simplicity   Curiosity\nEthnicity    Adversity\nSeen in some, heard in all,\nSpot me if you can!",
    "\"Mirror mirror on the wall\nWho's the fairest of all?\"\nFor the same tragedy did I befall,\nFrom man, to pies and eyes,\nI stand tall.\nWhat am I?",
    "The first vertebrate class on earth,\nI'm also a sun sign.",
    "From ancient lores to modern life,\nI'm in a fruit, a flower and a fly.",
    "Neither seen nor heard,\nMy absence makes you disturbed \nI'm not loud, nor do I shout,\nBut without me chaos comes about,\n'm sought by many, few truly find\nWhat am I, that calms the mind?",
    "You are here for a reason,\nSince I'm in season.\nI'm the fierce woman power,\nIt's me who holds this hour."
];

const correctAnswersList = [
    "QUEEN",
    "MARIE CURIE",
    "DARWIN",
    "HIMALAYA",
    "CITY",
    "APPLE",
    "PISCES",
    "DRAGON",
    "PEACE",
    "AVYANNA"
];

const QuestionNames = [
    "THE QUEEN'S GATE ",
    "INVENTOR'S ACADEMY",
    "SCHOLAR'S CITADEL",
    "CROWNSPIRE SUMMIT ",
    "CITY OF NOBLES",
    "HEALER'S SANCTUARY",
    "LAKE OF SERENITY",
    "ETERNAL DRAGONS",
    "SAGE'S MANOR",
    "JUBILEE ARENA "
];

let key = "This Is a Really Rudementary website. Not that good, but works for the purpose";
function registerUser() {
    const teamname = document.getElementById('TeamName').value;
    teamName = teamname;
    // const username = document.getElementById('username').value;
    if (teamname) {
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
    
    if (answer === correctAnswersList[currentHintIndex].toLowerCase()) {
        // Answer is correct
        correctAnswers++;
        currentHintIndex++;
        if (currentHintIndex < hints.length) {
            document.getElementById('hint').textContent = hints[currentHintIndex];
            document.getElementById('heading').textContent = QuestionNames[currentHintIndex];
            document.getElementById('answer').value = "";
            feedback.textContent = "Correct! Moving to the next hint.";
            feedback.style.color = "green";
            currentRetries = 0; // Reset retry count for the next hint
        } else {

            let inputString = `${teamName}:${correctAnswers}`;
            const encryptedMessage =    encryptMessage(inputString);
            document.getElementById('heading').textContent = "That's all folks!";
            document.getElementById('encryptedMessage').textContent = encryptedMessage;
            document.getElementById('game').classList.add('hidden');
            document.getElementById('encryptedSection').classList.remove('hidden');
            feedback.textContent = "Congratulations! You've completed the game.";
            feedback.style.color = "blue";
        }
    } else {
        // Answer is incorrect
        if (currentRetries < 2) {
            currentRetries++;
            feedback.textContent = `Wrong answer. Try again. You have ${3 - currentRetries} retries left.`;
            feedback.style.color = "red";
        } else {
            // Out of retries, move to the next hint
            currentRetries = 0;
            currentHintIndex++;
            if (currentHintIndex < hints.length) {
                document.getElementById('hint').textContent = hints[currentHintIndex];
                document.getElementById('heading').textContent = QuestionNames[currentHintIndex];
                document.getElementById('answer').value = "";
                feedback.textContent = "No retries left. Moving to the next hint.";
                feedback.style.color = "orange";
            } else {
                let inputString = `${teamName}:${correctAnswers}`;
                const encryptedMessage =    encryptMessage(inputString);
                document.getElementById('heading').textContent = "That's all folks!";
                document.getElementById('encryptedMessage').textContent = encryptedMessage;
                document.getElementById('game').classList.add('hidden');
                document.getElementById('encryptedSection').classList.remove('hidden');
                feedback.textContent = "Game over. Here's your encrypted message.";
                feedback.style.color = "blue";
            }
        }
    }
}

function encryptMessage(inputString) {
    // Convert the string and key into byte arrays
    let inputBytes = Array.from(new TextEncoder().encode(inputString));
    let keyBytes = Array.from(new TextEncoder().encode(key));

    // Encrypt each byte using XOR
    let encryptedBytes = inputBytes.map((byte, i) => byte ^ keyBytes[i % keyBytes.length]);

    // Convert the encrypted bytes to an alphanumeric string (hex representation)
    let encryptedString = encryptedBytes.map(byte => byte.toString(16).padStart(2, '0')).join('');
    
    return encryptedString;
}

function decryptMessage(encryptedString) {
    // Convert the encrypted string back to byte array
    let encryptedBytes = [];
    for (let i = 0; i < encryptedString.length; i += 2) {
        encryptedBytes.push(parseInt(encryptedString.substring(i, i + 2), 16));
    }

    let keyBytes = Array.from(new TextEncoder().encode(key));

    // Decrypt each byte using XOR
    let decryptedBytes = encryptedBytes.map((byte, i) => byte ^ keyBytes[i % keyBytes.length]);

    // Convert decrypted bytes back to string
    let decryptedString = new TextDecoder().decode(new Uint8Array(decryptedBytes));
    
    return decryptedString;
}