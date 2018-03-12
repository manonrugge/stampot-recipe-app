'use strict';

var dish = {};

// button scroll function 

$('button').on('click', function () {
    $('html').animate({
        scrollTop: $('#aboutStamppot').offset().top
    }, 1000);
});

// Recipes content 

var recipes = {
    beets: {
        title: "Stampot Raw Endive with Apples and Feta Cheese",
        ingredients: ["1 kilo potatoes", "bunch fresh kale", "2 onions chopped", "50g butter", "1 apple", "feta cheese"],
        illustrations: "./public/assets/tools_white.svg",
        photo: "./public/assets/recipe-03.jpg",
        direction: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit molestias delectus repellendus! Cupiditate delectus optio velit dolore harum, possimus quis asperiores, cum et id impedit? Aliquam accusantium voluptates deserunt et?"
    },
    kale: {
        title: "Stamppot Kale and Smoked Sausage",
        ingredients: ["1 kilo potatoes", "bunch fresh kale", "2 onions chopped", "50g butter"],
        illustrations: "./public/assets/tools_white.svg",
        photo: "./public/assets/recipe-02.jpg",
        direction: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit molestias delectus repellendus! Cupiditate delectus optio velit dolore harum, possimus quis asperiores, cum et id impedit? Aliquam accusantium voluptates deserunt et? Fugit molestias delectus repellendus! Cupiditate delectus optio velit dolore harum, possimus quis asperiores, cum et id impedit? Aliquam accusantium voluptates deserunt et?"
    }
};

// Carousel function 

function createCarouselCell(recipeIngredient) {

    var title = $('<h2>').text(recipes[recipeIngredient].title);

    var ingredientArray = recipes[recipeIngredient].ingredients;

    var ingredientsList = $('<ul>');

    for (var ind = 0; ind < ingredientArray.length; ind = ind + 1) {
        $('<li>').text(ingredientArray[ind]).appendTo(ingredientsList);
    }

    var recipeIngredients = $('<div>').addClass('recipe-ingredients').append('<h4>Ingredients</h4>', ingredientsList);

    var illustrations = $('<img>').attr("src", recipes[recipeIngredient].illustrations);

    var recipeIllustration = $('<div>').addClass('recipe-illustrations').append('<h4>Tools</h4>', illustrations);

    var subInfoContainer = $('<div>').addClass('recipe-container wrapper').append(recipeIngredients, recipeIllustration);

    var recipePhoto = $('<div>').addClass('recipePhoto').append($('<img>').attr("src", recipes[recipeIngredient].photo));

    var direction = $('<p>').text(recipes[recipeIngredient].direction);

    var recipeMethod = $('<div>').addClass('recipe-method').append('<h4>Directions</h4>', direction);

    var infoContainer = $('<div>').addClass('recipe-info wrapper').append(recipePhoto, recipeMethod);

    var carouselCell = $('<div>').addClass('carouselCell').append(title, subInfoContainer, infoContainer);

    $('.main-carousel').append(carouselCell);
};

function carousel() {
    $('.main-carousel').flickity({
        wrapAround: true,
        cellSelector: '.carouselCell'
    });
}

// Users selections

dish.events = function () {

    $('form').on('radio', function (event) {
        event.preventDefault();
        //this stops the form in this case from refreshing the page.
    });

    var ingredients = [];

    // first ingredient selection user

    $('input[name=ingredient]').on('change', function () {

        var selected = $('input[name=ingredient]:checked').val();

        $('.' + selected).removeClass('secHidden');
        $('.secIngredient').removeClass('hidden');
        if (selected === 'potato') {
            $('.mainIngredient .sweet-potato').addClass('hidden');
        } else {
            $('.mainIngredient .potato').addClass('hidden');
        }
        ingredients.push(selected);

        $('html').animate({
            scrollTop: $('.secIngredient').offset().top
        });
    });

    // second ingredient selection user

    $('input[name=secIngredient]').on('change', function () {
        var nextSelected = $('input[name=secIngredient]:checked').val();

        if (nextSelected === 'kale') {
            $('.vegetable').addClass('hidden'), $('.kale').removeClass('hidden'), $('.toppings').show('slow');
            $('.toppings .kale-toppings').show();
        } else if (nextSelected === 'beets') {
            $('.vegetable').addClass('hidden'), $('.beets').removeClass('hidden');
            $('.toppings').show('slow');
            $('.toppings .beets-toppings').show();
        } else if (nextSelected === 'raw-endive') {
            $('.vegetable').addClass('hidden'), $('.raw-endive').removeClass('hidden');
            $('.toppings').show('slow');
            $('.toppings .raw-endive-toppings').show();
        } else if (nextSelected === 'spinach') {
            $('.vegetable').addClass('hidden'), $('.spinach').removeClass('hidden');
            $('.toppings').show('slow');
            $('.toppings .spinach-toppings').show();
        } else {
            $('.vegetable').addClass('hidden'), $('.sprouts').removeClass('hidden');
            $('.toppings').show('slow');
            $('.toppings .sprouts-toppings').show();
        };

        $('html').animate({
            scrollTop: $('.toppings').offset().top
        });

        ingredients.push(nextSelected);
    });

    // Final Selection user

    $('input[name=toppings]').on('change', function () {
        var finalSelection = $('input[name=toppings]:checked').val();

        if (finalSelection === 'beets-toppings') {
            $('.result-recipe').removeClass('hidden');
            createCarouselCell("beets");
            createCarouselCell("kale");
        } else if (finalSelection === 'kale-toppings') {
            $('.result-recipe').removeClass('hidden');
            createCarouselCell("beets");
            createCarouselCell("kale");
        } else if (finalSelection === 'raw-endive-toppings') {
            $('.result-recipe').removeClass('hidden');
            createCarouselCell("beets");
            createCarouselCell("kale");
        } else if (finalSelection === 'spinach-toppings') {
            $('.result-recipe').removeClass('hidden');
            createCarouselCell("beets");
            createCarouselCell("kale");
        } else {
            $('.result-recipe').removeClass('hidden');
            createCarouselCell("beets");
            createCarouselCell("kale");
        };
        carousel();
    });
};

dish.events();