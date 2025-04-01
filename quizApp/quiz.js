document.addEventListener("DOMContentLoaded", function () {
    const links = document.querySelectorAll(".quiz-link");
    const quizCategories = document.querySelectorAll(".quiz-category");

    links.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();

            // Remove 'active' class from all links
            links.forEach(item => item.classList.remove("active"));

            // Add 'active' class to the clicked link
            this.classList.add("active");

            // Get the target category
            const targetCategory = this.getAttribute("data-target");

            // Hide all categories
            quizCategories.forEach(category => {
                category.classList.add("d-none");
            });

            // Show the target category
            document.getElementById(targetCategory).classList.remove("d-none");
        });
    });
});
// Handle dropdown change
document.getElementById("quiz-dropdown").addEventListener("change", function () {
    let target = this.value;
    document.querySelectorAll(".quiz-link").forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("data-target") === target) {
            link.classList.add("active");
        }
    });
    loadCards(target); // Replace with your card loading logic
});
function showCards(sectionId) {
    // Hide all sections
    document.querySelectorAll('.quiz-category').forEach(function (section) {
      section.classList.add('d-none');
    });
    // Show the selected section
    document.getElementById(sectionId).classList.remove('d-none');
  }