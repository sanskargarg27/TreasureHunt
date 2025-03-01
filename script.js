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

const hashedAnswersList = [
    "d95e4c65e7a88eb9e5e68edb0219a2f4f6c1a8f963c3f12a3b8f7b8ea9d4b7f4", // QUEEN
    "4a44dc15364204a80fe80e9039455cc1c3d1345e3dfc94c26a05b3b7b78d2012", // MARIE CURIE
    "e38ad214943daad1d64c102faec29de4afe9da3d902c3dc61d13568c4c04f4d9", // DARWIN
    "e1ff697b0dc267dacb6935b0fc2265511fa6b860d3920f435f0a24363637fc73", // HIMALAYA
    "db1a0e3f9a823bd2a17b07f1f91cd758fb56b318fcb9c5e54f9a60c35c96530e", // CITY
    "2f5064d4d7ec18b4e0d87a57367b2c4b10346bbde02139f6b3b5d4eacdbde7e1", // APPLE
    "c60b1b89d490523b48f8cf8acfd63c68ec3a8c9b84e9e05641870840b32f7a11", // PISCES
    "9b74c9897bac770ffc029102a200c5de7f39752d4b1ef8bbf4549c7e5a6b1d90", // DRAGON
    "15e2b0d3c338d87e6d9f7aafe6b6d8ad4377e36ea3a2c91d5f8d6a9f18b5a9b8", // PEACE
    "823e295a69d50831db9a31da41b3c4c8494b68ebd93a8e674c13d9b44a32f96c"  // AVYANNA
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

async function hashAnswer(answer) {
    const encoder = new TextEncoder();
    const data = encoder.encode(answer.toLowerCase().trim());
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(hashBuffer))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
}

function registerUser() {
    const teamname = document.getElementById('TeamName').value;
    teamName = teamname;
    if (teamname) {
        document.getElementById('registration').classList.add('hidden');
        document.getElementById('game').classList.remove('hidden');
        document.getElementById('hint').textContent = hints[currentHintIndex];
    } else {
        alert("Please fill out all fields.");
    }
}

async function submitAnswer() {
    const answer = document.getElementById('answer').value.toUpperCase();
    const feedback = document.getElementById('feedback');
    const hashedUserAnswer = await hashAnswer(answer);
    
    if (hashedUserAnswer === hashedAnswersList[currentHintIndex]) {
        correctAnswers++;
        currentHintIndex++;
        if (currentHintIndex < hints.length) {
            document.getElementById('hint').textContent = hints[currentHintIndex];
            document.getElementById('heading').textContent = QuestionNames[currentHintIndex];
            document.getElementById('answer').value = "";
            feedback.textContent = "Correct! Moving to the next hint.";
            feedback.style.color = "green";
            currentRetries = 0;
        } else {
            document.getElementById('heading').textContent = "That's all folks!";
            document.getElementById('game').classList.add('hidden');
            document.getElementById('encryptedSection').classList.remove('hidden');
            feedback.textContent = "Congratulations! You've completed the game.";
            feedback.style.color = "blue";
        }
    } else {
        if (currentRetries < 2) {
            currentRetries++;
            feedback.textContent = `Wrong answer. Try again. You have ${3 - currentRetries} retries left.`;
            feedback.style.color = "red";
        } else {
            currentRetries = 0;
            currentHintIndex++;
            if (currentHintIndex < hints.length) {
                document.getElementById('hint').textContent = hints[currentHintIndex];
                document.getElementById('heading').textContent = QuestionNames[currentHintIndex];
                document.getElementById('answer').value = "";
                feedback.textContent = "No retries left. Moving to the next hint.";
                feedback.style.color = "orange";
            } else {
                document.getElementById('heading').textContent = "That's all folks!";
                document.getElementById('game').classList.add('hidden');
                document.getElementById('encryptedSection').classList.remove('hidden');
                feedback.textContent = "Game over.";
                feedback.style.color = "blue";
            }
        }
    }
}
