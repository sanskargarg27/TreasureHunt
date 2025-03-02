let currentHintIndex = 0;
let currentRetries = 0; // Track retries for the current question
let correctAnswers = 0; // Track the number of correct answers
let teamName = "";

const hints = [
    "A warrior in history, brave and grand\nYet in my blood, a curse did stand\n.A show of romance, a Briderton series,\nAn actress fierce, on a trip to Paris.\nGuess me if you can!",
    "She has two Nobels to her name,\nbrought two elements into the game.\nShe unveiled a force both boon and bane,\nThere's also a biscuit in her name.\nWho is she?\n(2 Words answer)",
    "You live if you are fit,\nI said so, that's it.\nWho am I?",
    "Khud Mahadev ka vaas hai jahan\nMeghnath ke teer ka ilaaj bhi hai wahan\nWahan hai sabse unchi choti\nInsan to kya wahan ki mitti tak nahin hai khoti.\nBatao kaha?",
    "Simplicity   Curiosity\nEthnicity    Adversity\nSeen in some, heard in all,\nSpot me if you can!",
    "\"Mirror mirror on the wall\nWho's the fairest of all?\"\nFor the same tragedy did I befall,\nFrom man, to pies and eyes,\nI stand tall.\nWhat am I?",
    "The first vertebrate class on earth,\nI'm also a sun sign.",
    "From ancient lores to modern life,\nI'm in a fruit, a flower and a fly.",
    "Neither seen nor heard,\nMy absence makes you disturbed \nI'm not loud, nor do I shout,\nBut without me chaos comes about,\n'm sought by many, few truly find\nWhat am I, that calms the mind?",
    "You are here for a reason,\nSince I'm in season.\nI'm the fierce woman power,\nIt's me who holds this hour."
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

function stringToBase(inputString) {
    const base27 = [];
    for (let i = 0; i < inputString.length; i++) {
        const char = inputString[i].toLowerCase();  // Convert to lowercase
        if (char >= 'a' && char <= 'z') {  // Ensure the character is a letter
            base27.push(char.charCodeAt(0) - 'a'.charCodeAt(0));  // 'a' -> 0, 'b' -> 1, ..., 'z' -> 25
        }
        else if (char === ' ') {  // Space character
            base27.push(26);  // 26 represents space
        }
        else {
            throw new Error("String must only contain alphabetic characters.");
        }
    }
    return base27;
}

// Function to convert base 27 back to string
function baseToString(base27List) {
    let resultString = '';
    for (let i = 0; i < base27List.length; i++) {
        const num = base27List[i];
        if (num >= 0 && num <= 25) {  // Valid base 27 range for a-z
            resultString += String.fromCharCode(num + 'a'.charCodeAt(0));  // Convert number back to letter
        }
        else if (num === 26) {  // Space character
            resultString += ' ';
        } 
        else {
            throw new Error("Base 27 values must be between 0 and 25.");
        }
    }
    return resultString;
}

const correctEncAnswersList = [[16, 20, 4, 4, 13], [12, 0, 17, 8, 4, 26, 2, 20, 17, 8, 4], [3, 0, 17, 22, 8, 13], [7, 8, 12, 0, 11, 0, 24, 0], [2, 8, 19, 24], [0, 15, 15, 11, 4], [15, 8, 18, 2, 4, 18], [3, 17, 0, 6, 14, 13], [15, 4, 0, 2, 4], [0, 21, 24, 0, 13, 13, 0]];

let correctAnswersList = [];
for (let i = 0; i < correctEncAnswersList.length; i++) {
    correctAnswersList.push(baseToString(correctEncAnswersList[i]));
}


let key = [19, 7, 8, 18, 26, 8, 18, 26, 0, 26, 17, 4, 0, 11, 11, 24, 26, 17, 20, 3, 4, 12, 4, 13, 19, 0, 17, 24, 26, 22, 4, 1, 18, 8, 19, 4, 26, 13, 14, 19, 26, 19, 7, 0, 19, 26, 6, 14, 14, 3, 26, 1, 20, 19, 26, 22, 14, 17, 10, 18, 26, 5, 14, 17, 26, 19, 7, 4, 26, 15, 20, 17, 15, 14, 18, 4];

key = baseToString(key);
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
    const answer = document.getElementById('answer').value.trim();
    const feedback = document.getElementById('feedback');
    const correctAnswer = correctAnswersList[currentHintIndex];
    
    // Split input and correct answer into words
    const answerWords = answer.split(/\s+/);
    const correctAnswerWords = correctAnswer.split(/\s+/);
    
    // Check if the number of words is different
    if (answerWords.length !== correctAnswerWords.length) {
        feedback.textContent = "Invalid attempt! Ensure your answer has the correct number of words.";
        feedback.style.color = "orange";
        return; // Do not count this as an attempt
    }
    
    if (answer.toLowerCase() === correctAnswer.toLowerCase()) {
        // Answer is correct
        correctAnswers++;
        currentHintIndex++;
        if (currentHintIndex < hints.length) {
            document.getElementById('hint').textContent = hints[currentHintIndex];
            document.getElementById('heading').textContent = QuestionNames[currentHintIndex];
            document.getElementById('answer').value = "";
            feedback.textContent = "Moving to the next hint.";
            feedback.style.color = "green";
            currentRetries = 0; // Reset retry count for the next hint
        } else {
            let inputString = `${teamName}:${correctAnswers}`;
            const encryptedMessage = encryptMessage(inputString);
            document.getElementById('heading').textContent = "That's all folks!";
            document.getElementById('encryptedMessage').textContent = encryptedMessage;
            document.getElementById('game').classList.add('hidden');
            document.getElementById('encryptedSection').classList.remove('hidden');
            feedback.textContent = "Game over. Here's your encrypted message.";
            feedback.style.color = "blue";
        }
    } else {
        // Answer is incorrect
        if (currentRetries < 2) {
            currentRetries++;
            feedback.textContent = `Try again. You have ${3 - currentRetries} retries left.`;
            feedback.style.color = "red";
        } else {
            // Out of retries, move to the next hint
            currentRetries = 0;
            currentHintIndex++;
            if (currentHintIndex < hints.length) {
                document.getElementById('hint').textContent = hints[currentHintIndex];
                document.getElementById('heading').textContent = QuestionNames[currentHintIndex];
                document.getElementById('answer').value = "";
                feedback.textContent = "Moving to the next hint.";
                feedback.style.color = "orange";
            } else {
                let inputString = `${teamName}:${correctAnswers}`;
                const encryptedMessage = encryptMessage(inputString);
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
