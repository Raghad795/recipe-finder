const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const message = document.getElementById("message");
const recipeList = document.getElementById("recipeList");
const recipeDetailsContainer = document.getElementById("recipeDetails");

searchButton.addEventListener("click", async function() {
    const query = searchInput.value.trim();
    if (query) {
        try {
            const recipes = await getRecipes(query);
            message.textContent = "";
            displayRecipes(recipes);
        }catch (error) {
            message.textContent = error.message;
        }
    }else {
        message.textContent = "Please enter what you are looking for.";
    }
})
async function getRecipes(query) {
    const recipeUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;
    const response = await fetch(recipeUrl);
        if (!response.ok){
            throw new Error("Failed to fetch recipes")
        }
    const data = await response.json();
        if (!data.meals) {
            throw new Error("No recipes found");
        }

        return data.meals;
}

function createRecipeCard(recipe) {
    const card = document.createElement("div");
    const recipeImage = document.createElement("img");
    const recipeName = document.createElement("h2");
    const recipeCategory = document.createElement("p");
    const viewButton = document.createElement("button");

    card.classList.add("recipe-card");

    recipeName.textContent = recipe.strMeal;
    recipeImage.src = recipe.strMealThumb;
    recipeImage.alt = recipe.strMeal;
    recipeCategory.textContent = recipe.strCategory;
    viewButton.textContent = "View Recipe";

    viewButton.addEventListener("click", async function () {
        try {
            const idMeal = recipe.idMeal;
            const recipeDetails = await getRecipeDetails(idMeal);
            const ingredients = getIngredients(recipeDetails);

            displayRecipeDetails(recipeDetails, ingredients);

        }catch (error) {
            message.textContent = error.message;
        }


        
    });

    card.appendChild(recipeImage);
    card.appendChild(recipeName);
    card.appendChild(recipeCategory);
    card.appendChild(viewButton);
    
    return card;
}

async function getRecipeDetails(id) {
    const recipeDetailsUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    const response = await fetch(recipeDetailsUrl);

    if (!response.ok) {
        throw new Error("Failed to fetch recipe details");
    }

    const data = await response.json();

    if (!data.meals) {
        throw new Error("Recipe details not found");
    }

    return data.meals[0];
}

function getIngredients(recipe) {
    const ingredients = [];

    for (let i = 1; i <= 20; i++) {
        const ingredient = (recipe[`strIngredient${i}`] || "").trim();
        const measure = (recipe[`strMeasure${i}`] || "").trim();
        if (ingredient) {

            ingredients.push({
                ingredient,
                measure
            });
        }
    }

    return ingredients;
}

function displayRecipes(recipes) {

    recipeList.innerHTML="";

    recipes.forEach(recipe => {

        const card = createRecipeCard(recipe);

        recipeList.appendChild(card);
    });
}

function displayRecipeDetails(recipe, ingredients) {
    recipeDetailsContainer.innerHTML="";

    const recipeName = document.createElement("h2");
    const recipeImage = document.createElement("img");
    const recipeCategory = document.createElement("p");
    const recipeArea = document.createElement("p");
    const ingredientsHeading = document.createElement("h3");
    const ingredientsList = document.createElement("ul");
    const instructionsHeading = document.createElement("h3");
    const instructions = document.createElement("p");

    recipeName.textContent = recipe.strMeal;
    recipeImage.src = recipe.strMealThumb;
    recipeImage.alt = recipe.strMeal;
    recipeCategory.textContent = `Category: ${recipe.strCategory}`;
    recipeArea.textContent = `Area: ${recipe.strArea}`;
    ingredientsHeading.textContent = "Ingredients";
    instructionsHeading.textContent = "Instructions";
    instructions.textContent = recipe.strInstructions;

    ingredients.forEach(ingredient => {
        const ingredientItem = document.createElement("li");

        ingredientItem.textContent =
            `${ingredient.measure} ${ingredient.ingredient}`;

        ingredientsList.appendChild(ingredientItem);
    });

    recipeDetailsContainer.appendChild(recipeName);
    recipeDetailsContainer.appendChild(recipeImage);
    recipeDetailsContainer.appendChild(recipeCategory);
    recipeDetailsContainer.appendChild(recipeArea);
    recipeDetailsContainer.appendChild(ingredientsHeading);
    recipeDetailsContainer.appendChild(ingredientsList);
    recipeDetailsContainer.appendChild(instructionsHeading);
    recipeDetailsContainer.appendChild(instructions);

}

