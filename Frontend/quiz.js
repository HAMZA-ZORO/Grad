function checkQuiz(formId) {
    const answers = {
        'aboutQuiz': ['b', 'c'],
        'threatsQuiz': ['b', 'b'],
        'preventionQuiz': ['b', 'a'],
        'practicesQuiz': ['c', 'b']
    };

    let form = document.getElementById(formId);
    let score = 0;
   
    if (form.q1.value === answers[formId][0]) score++;
    if (form.q2.value === answers[formId][1]) score++;
    
    let percentage = (score / 2) * 100;
    
    let feedback;
    if (percentage === 100) {
        feedback = 'Perfect score! Excellent work!';
    } else if (percentage === 50) {
        feedback = 'Good try! Review the material and try again.';
    } else {
        feedback = 'Keep studying! You can do better!';
    }
    
    alert(`Your Score: ${score}/2 (${percentage}%)\n${feedback}`);
    
    return false;
}

window.onload = function() {
    let quizForms = document.querySelectorAll('.quiz-form');
    
    quizForms.forEach(form => {
        form.onsubmit = function() {
            return checkQuiz(this.id);
        };
    });
};