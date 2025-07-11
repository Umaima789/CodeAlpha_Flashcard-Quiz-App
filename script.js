let flashcards = [];
let currentCard = 0;
let showingAnswer = false;

function saveCards() {
  localStorage.setItem('flashcards', JSON.stringify(flashcards));
}

function loadCards() {
  const saved = localStorage.getItem('flashcards');
  if (saved) {
    flashcards = JSON.parse(saved);
  } else {
    flashcards = [
      { question: 'What is the capital of USA?', answer: 'Washington, D.C.', image: '' },
      { question: 'HTML stands for?', answer: 'HyperText Markup Language', image: '' }
    ];
  }
}

function displayCard() {
  const flashcard = document.getElementById('flashcard');
  if (flashcards.length === 0) {
    flashcard.innerHTML = '<p>No cards available</p>';
    return;
  }
  const card = flashcards[currentCard];
  flashcard.innerHTML = `
    <div>${showingAnswer ? card.answer : card.question}</div>
    ${card.image ? `<img src="${card.image}" class="card-img" alt="Image" />` : ''}
  `;
}

function showAnswer() {
  showingAnswer = !showingAnswer;
  displayCard();
}

function nextCard() {
  currentCard = (currentCard + 1) % flashcards.length;
  showingAnswer = false;
  displayCard();
}

function prevCard() {
  currentCard = (currentCard - 1 + flashcards.length) % flashcards.length;
  showingAnswer = false;
  displayCard();
}

function addCard() {
  const q = document.getElementById('questionInput').value;
  const a = document.getElementById('answerInput').value;
  const img = document.getElementById('imageInput').value;
  if (q && a) {
    flashcards.push({ question: q, answer: a, image: img });
    saveCards();
    document.getElementById('questionInput').value = '';
    document.getElementById('answerInput').value = '';
    document.getElementById('imageInput').value = '';
    alert('Card added!');
    displayCard();
  }
}

function editCard() {
  const q = document.getElementById('questionInput').value;
  const a = document.getElementById('answerInput').value;
  const img = document.getElementById('imageInput').value;
  if (q && a) {
    flashcards[currentCard] = { question: q, answer: a, image: img };
    saveCards();
    alert('Card updated!');
    displayCard();
  }
}

function deleteCard() {
  if (flashcards.length > 1) {
    flashcards.splice(currentCard, 1);
    currentCard = 0;
    showingAnswer = false;
    saveCards();
    alert('Card deleted!');
    displayCard();
  } else {
    alert('Cannot delete last card!');
  }
}

function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
}

// Initialize app
loadCards();
displayCard();
