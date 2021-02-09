//const apiUrl="https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata"
const apiUrl = "https://www.themealdb.com/api/json/v1/1/";


const userDemandFood = document.getElementById('userDemandFood');
const listOfFoods = document.getElementById('listOfFoods');
const errorMessage = document.getElementById('errorMessage');
const selectedFood = document.getElementById('selectedFood');
const results = document.getElementById('results');

const SearchingFood = () => {
    selectedFood.innerHTML = "";
    results.innerText = "";
    if (!userDemandFood.value) {
        listOfFoods.innerHTML = "";
        errorHandler("Please search another a meal..");
    }
    else {
        fetch(`${apiUrl}search.php?s=${userDemandFood.value}`)
            .then(res => res.json())
            .then(data => showFoods(data.meals))
            .catch(() => errorHandler("Not Available now!! Please try again later!."));
    }
    userDemandFood.value = "";
};


const enterKeypress = (e) => {
    if (e.key === "Enter") {
        SearchingFood();
    }
};
userDemandFood.addEventListener("keypress", enterKeypress)

const showFoods = (meals) => {
    if (!meals) {
        listOfFoods.innerHTML = "";
        errorHandler("Not Found now..");
    }
    else {
        let result = "";
        errorHandler("");
        meals.forEach(meal => {
            const { strMeal, strMealThumb, idMeal } = meal;
            result += `
                <div onclick="singleLoad(${idMeal})" class="col-6 col-md-4 col-lg-3 my-2">
                    <div class="food h-100 bg-white">
                        <img class="img-fluid food-img" src="${strMealThumb}" alt="">
                        <h3 class="text-center p-3">${strMeal}</h3>
                    </div>
                </div>`

        })
        listOfFoods.innerHTML = result;
    };
};

const singleLoad = (idMeal) => {
    fetch(`${apiUrl}lookup.php?i=${idMeal}`)
        .then(res => res.json())
        .then(data => singleMeal(data.meals[0]))
        .catch(() => errorHandler("Something went wrong!! Please try again later!."));
};

const singleMeal = (data) => {
    const { strMealThumb, strMeal } = data;
    selectedFood.innerHTML = `
        <div class="bg-white single mx-auto food">
            <div class="food bg-white">
                <img class="img-fluid food-img" src="${strMealThumb}" alt="">
                <div class="p-3">
                    <h3 class="text-center">${strMeal}</h3>
                    <h4 class="my-4">Ingredients</h4>
                    <div id="ingredients"></div>
                </div>
            </div>
        </div>
         `
    displayFoods(data);
};

const displayFoods = (data) => {
    const { strIngredient1, strIngredient2, strIngredient3, strIngredient4, strIngredient5, strIngredient6, strIngredient7, strIngredient8, strIngredient9, strIngredient10, strIngredient11, strIngredient12, strIngredient13, strIngredient14, strIngredient15, strIngredient16, strIngredient17, strIngredient18, strIngredient19, strIngredient20, strMeasure1, strMeasure2, strMeasure3, strMeasure4, strMeasure5, strMeasure6, strMeasure7, strMeasure8, strMeasure9, strMeasure10, strMeasure11, strMeasure12, strMeasure13, strMeasure14, strMeasure15, strMeasure16, strMeasure17, strMeasure18, strMeasure19, strMeasure20 } = data;
    const ingredients = [
        `${strIngredient1} ${strMeasure1}`,
        `${strIngredient2} ${strMeasure2}`,
        `${strIngredient3} ${strMeasure3}`,
        `${strIngredient4} ${strMeasure4}`,
        `${strIngredient5} ${strMeasure5}`,
        `${strIngredient6} ${strMeasure6}`,
        `${strIngredient7} ${strMeasure7}`,
        `${strIngredient8} ${strMeasure8}`,
        `${strIngredient9} ${strMeasure9}`,
        `${strIngredient10} ${strMeasure10}`,
        `${strIngredient11} ${strMeasure11}`,
        `${strIngredient12} ${strMeasure12}`,
        `${strIngredient13} ${strMeasure13}`,
        `${strIngredient14} ${strMeasure14}`,
        `${strIngredient15} ${strMeasure15}`,
        `${strIngredient16} ${strMeasure16}`,
        `${strIngredient17} ${strMeasure17}`,
        `${strIngredient18} ${strMeasure18}`,
        `${strIngredient19} ${strMeasure19}`,
        `${strIngredient20} ${strMeasure20}`,
    ];
    ingredients.map(ingredient => {
        const ingredientsItems = document.getElementById('ingredients');
        if (ingredient !== " " && ingredient !== "  " && ingredient !== "null null" && ingredient !== " null" && ingredient !== "null ") {
            ingredientsItems.innerHTML += `<p> <span class="ms-2">${ingredient}</span></p>`
        }
    })
}
const errorHandler = err => {
    errorMessage.innerText = err;
}
