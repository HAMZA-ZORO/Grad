// Simple Quiz Handler
function checkQuiz(formId) {
    // Correct answers for each quiz
    const answers = {
        'aboutQuiz': ['b', 'c'],
        'threatsQuiz': ['b', 'b'],
        'preventionQuiz': ['b', 'a'],
        'practicesQuiz': ['c', 'b']
    };

    // Get the form
    let form = document.getElementById(formId);
    let score = 0;
    
    // Check answers
    if (form.q1.value === answers[formId][0]) score++;
    if (form.q2.value === answers[formId][1]) score++;
    
    // Calculate percentage
    let percentage = (score / 2) * 100;
    
    // Create feedback message
    let feedback;
    if (percentage === 100) {
        feedback = 'Perfect score! Excellent work!';
    } else if (percentage === 50) {
        feedback = 'Good try! Review the material and try again.';
    } else {
        feedback = 'Keep studying! You can do better!';
    }
    
    // Show result
    alert(`Your Score: ${score}/2 (${percentage}%)\n${feedback}`);
    
    // Prevent form submission
    return false;
}

// Add event listeners when page loads
window.onload = function() {
    // Get all quiz forms
    let quizForms = document.querySelectorAll('.quiz-form');
    
    // Add onsubmit handler to each form
    quizForms.forEach(form => {
        form.onsubmit = function() {
            return checkQuiz(this.id);
        };
    });
};