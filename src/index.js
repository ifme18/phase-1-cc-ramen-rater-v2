
// Fetch and display all ramen images
const displayRamens = () => {
  fetch('http://localhost:3000/ramens')
    .then(response => response.json())
    .then(ramens => {
      const ramenMenu = document.getElementById('ramen-menu');
      ramens.forEach(ramen => {
        const img = document.createElement('img');
        img.src = ramen.image;
        img.alt = ramen.name;
        img.addEventListener('click', () => handleClick(ramen, img)); // Attach click event to each image
        ramenMenu.appendChild(img);
      });
    });
};

// Update ramen details when an image is clicked
const handleClick = (ramen, imgElement) => {
  const ramenDetail = document.querySelector('#ramen-detail');
  ramenDetail.querySelector('img').src = ramen.image;
  ramenDetail.querySelector('h2').textContent = ramen.name;
  ramenDetail.querySelector('h3').textContent = ramen.restaurant;
  document.querySelector('#rating-display').textContent = ramen.rating;
  document.querySelector('#comment-display').textContent = ramen.comment;

  // Add a delete button event listener
  const deleteButton = document.querySelector('#delete-ramen');
  deleteButton.onclick = () => handleDelete(imgElement); // Pass the image element to remove from #ramen-menu
};

// Handle ramen deletion
const handleDelete = (imgElement) => {
  // Remove ramen image from the #ramen-menu
  imgElement.remove();

  // Clear the ramen details section
  const ramenDetail = document.querySelector('#ramen-detail');
  ramenDetail.querySelector('img').src = '';
  ramenDetail.querySelector('h2').textContent = 'Insert Name Here';
  ramenDetail.querySelector('h3').textContent = 'Insert Restaurant Here';
  document.querySelector('#rating-display').textContent = '';
  document.querySelector('#comment-display').textContent = '';
};

// Add new ramen to the menu on form submission
const addSubmitListener = () => {
  const form = document.getElementById('new-ramen');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const newRamen = {
      name: e.target['name'].value,
      restaurant: e.target['restaurant'].value,
      image: e.target['image'].value,
      rating: e.target['rating'].value,
      comment: e.target['new-comment'].value,
    };
    
    const img = document.createElement('img');
    img.src = newRamen.image;
    img.alt = newRamen.name;
    img.addEventListener('click', () => handleClick(newRamen, img)); // Attach click event to new ramen
    document.getElementById('ramen-menu').appendChild(img);

    // Clear form fields after submission
    form.reset();
  });
};

// Main function to start the program after DOM loads
const main = () => {
  displayRamens(); // Fetch and display all ramen images
  addSubmitListener(); // Add form submission listener
};

main(); // Invoke the main function to start the logic

// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  handleDelete,
  main,
};



