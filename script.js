document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("generate-btn");
  const display = document.getElementById("joke-display");
  const categorySelect = document.getElementById("category");

  // Define the available categories for the random logic
  const options = ["general", "programming", "knock-knock", "dad"];

  async function fetchJoke() {
    let selection = categorySelect.value;

    // Logic to handle the "Random" choice
    if (selection === "random") {
      selection = options[Math.floor(Math.random() * options.length)];
    }
    
    display.innerHTML = '<p style="color: #d6d6d6;">Fetching a good one...</p>';

    try {
      // We use the 'selection' variable here so 'random' works
      const response = await fetch(
        `https://official-joke-api.appspot.com/jokes/${selection}/random`
      );
      const data = await response.json();

      // API returns an array, so we grab the first object
      const joke = data[0];

      display.innerHTML = `
        <div class="setup">${joke.setup}</div>
        <div class="punchline">${joke.punchline}</div>
      `;
    } catch (error) {
      console.error("Error fetching joke:", error);
      display.innerHTML = '<p style="color: #ff6b6b;">Failed to load joke. Try again!</p>';
    }
  }

  btn.addEventListener("click", fetchJoke);
});