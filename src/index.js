const baseUrl = "http://localhost:3000/ramens";

// Function to display all ramen images in #ramen-menu div
const displayRamens = () => {
  fetch(baseUrl)
    .then(response => response.json())
    .then(ramens => {
      const ramenMenu = document.getElementById("ramen-menu");
      ramens.forEach(ramen => {
        const img = document.createElement('img');
        img.src = ramen.image;
        img.alt = ramen.name;
        img.addEventListener('click', () => handleClick(ramen));
        ramenMenu.appendChild(img);
      });
    });
};

// Function to handle click on ramen image to display ramen details
const handleClick = (ramen) => {
  document.querySelector('.detail-image').src = ramen.image;
  document.querySelector('.detail-image').alt = ramen.name;
  document.querySelector('.name').textContent = ramen.name;
  document.querySelector('.restaurant').textContent = ramen.restaurant;
  document.getElementById('rating-display').textContent = ramen.rating;
  document.getElementById('comment-display').textContent = ramen.comment;
};

// Function to attach a submit listener to the new-ramen form
const addSubmitListener = () => {
  const form = document.getElementById('new-ramen');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    
    // Create a new ramen object from form data
    const newRamen = {
      name: event.target["new-name"].value,
      restaurant: event.target["new-restaurant"].value,
      image: event.target["new-image"].value,
      rating: event.target["new-rating"].value,
      comment: event.target["new-comment"].value,
    };

    // Add new ramen to the #ramen-menu div
    const img = document.createElement('img');
    img.src = newRamen.image;
    img.alt = newRamen.name;
    img.addEventListener('click', () => handleClick(newRamen));
    document.getElementById('ramen-menu').appendChild(img);

    // Reset form
    form.reset();
  });
};

// Main function to initialize the program logic
const main = () => {
  displayRamens();  // Display all ramen images
  addSubmitListener();  // Add listener for form submission
};

main();  // Initialize app

