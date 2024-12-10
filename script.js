document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("recipe-form");
  const recipesContainer = document.getElementById("recipes-container");
  const searchBar = document.getElementById("search-bar");

  // Load recipes from localStorage
  function loadRecipes() {
    const recipes = JSON.parse(localStorage.getItem("recipes")) || [];
    displayRecipes(recipes);
  }

  // Display recipes
  function displayRecipes(recipes) {
    recipesContainer.innerHTML = "";
    recipes.forEach((recipe, index) => {
      const card = document.createElement("div");
      card.className = "recipe-card";
      card.innerHTML = `
          <img src="${recipe.image}" alt="${recipe.name}">
          <h3>${recipe.name}</h3>
          <p><strong>Ingredients:</strong> ${recipe.ingredients}</p>
          <button onclick="viewRecipe(${index})">View Details</button>
        `;
      recipesContainer.appendChild(card);
    });
  }

  // Handle form submission
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const ingredients = document.getElementById("ingredients").value.trim();
    const steps = document.getElementById("steps").value.trim();
    const imageFile = document.getElementById("image").files[0];

    if (!name || !ingredients || !steps || !imageFile) {
      alert("Please fill all fields and upload an image.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const recipes = JSON.parse(localStorage.getItem("recipes")) || [];
      recipes.push({
        name,
        ingredients,
        steps,
        image: reader.result,
      });
      localStorage.setItem("recipes", JSON.stringify(recipes));
      form.reset();
      loadRecipes();
    };
    reader.readAsDataURL(imageFile);
  });

  // Search recipes
  searchBar.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase();
    const recipes = JSON.parse(localStorage.getItem("recipes")) || [];
    const filteredRecipes = recipes.filter(
      (recipe) =>
        recipe.name.toLowerCase().includes(query) ||
        recipe.ingredients.toLowerCase().includes(query)
    );
    displayRecipes(filteredRecipes);
  });

  // View recipe details (using alert for simplicity)
  window.viewRecipe = (index) => {
    const recipes = JSON.parse(localStorage.getItem("recipes")) || [];
    const recipe = recipes[index];
    alert(`
        Name: ${recipe.name}
        Ingredients: ${recipe.ingredients}
        Steps: ${recipe.steps}
      `);
  };

  // Load recipes on page load
  loadRecipes();
});
