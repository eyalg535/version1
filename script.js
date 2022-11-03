async function main() {
      const allBeers = await getListOfBeers();
      const divCollect = document.querySelector('#beer-collection');
      createBeersClassDivs(allBeers, divCollect);
      document.querySelectorAll('.card');
      document.querySelector("#beer-collection > div:nth-child(1) > div");
      filterBtns();
    }
    
    async function getListOfBeers() {
      const api = await fetch('https://api.punkapi.com/v2/beers');
      return api.json();
    }
    
    function createBeersClassDivs(allBeers, divCollect) {
      allBeers.forEach(beer => {
        createCardFromBeer(beer, divCollect);
        divToClass(beer.abv)
        filterSelection("all")
      });
    }
    
    function createCardFromBeer(beer, divCollect) {
      const beerMesh = getBeerMesh(beer);
      const beerIngredientsMalt = getBeerIngredientsMalt(beer);
      const beerIngredientsHops = getBeerIngredientsHops(beer);
      const beerDetails = getBeerDetails(beer);
      const beerRecipe = getBeerRecipe(beer, beerMesh, beerIngredientsMalt, beerIngredientsHops);
      const cardElements = createCardElements();
      const img = createImageElement(beer);
      const headers = createHeaderElement(beer);
      const p1 = createParagraphElement(beerRecipe);
      const recipeBtn = createButton(p1, beerRecipe, 'View Recipe');
      const beerBtn = createButton(p1, beerDetails, 'View Beer');
      const scrollUpBeer = addScrollUpBeer(cardElements);
    
      addEventListenerToCardInner(cardElements, p1, beerDetails);
    
      divCollect.append(cardElements.card);
      cardElements.card.append(cardElements.cardInner);
      cardElements.cardInner.append(cardElements.cardFaceFront, cardElements.cardFaceBack);
      cardElements.cardFaceFront.append(headers.h2, img, headers.h1);
      cardElements.cardFaceBack.append(cardElements.cardContent);
      cardElements.cardContent.append(cardElements.cardHeader, cardElements.cardBody, scrollUpBeer);
      cardElements.cardHeader.append(recipeBtn, beerBtn);
      cardElements.cardBody.append(p1);
      return cardElements.card.id;
    }
    
    function getBeerMesh(beer) {
      let beerMesh = '';
      for (let i = 0; i < beer.method.mash_temp.length; i++) {
        beerMesh += `<span ><b>Temp:</b></span><br>
                     ${beer.method.mash_temp[i].temp.value}\ Degree\
                     ${beer.method.mash_temp[i].temp.unit}<br>
                     <span ><b>Duration:</b></span><br>
                     ${beer.method.mash_temp[i].duration}\ minutes<br><br>
                     `
      };
      return beerMesh;
    }
    
    function getBeerIngredientsMalt(beer) {
      let beerIngredientsMalt = '';
      for (let i = 0; i < beer.ingredients.malt.length; i++) {
        beerIngredientsMalt += `
                      ${beer.ingredients.malt[i].name}:<br>
                      ${beer.ingredients.malt[i].amount.value}
                      ${beer.ingredients.malt[i].amount.unit}<br><br>
                      `
      };
      return beerIngredientsMalt;
    }
    
    function getBeerIngredientsHops(beer) {
      let beerIngredientsHops = '';
      for (let i = 0; i < beer.ingredients.hops.length; i++) {
        beerIngredientsHops += `
                      ${beer.ingredients.hops[i].name}:<br>
                      ${beer.ingredients.hops[i].amount.value}
                      ${beer.ingredients.hops[i].amount.unit}<br>
                      <span ><b>Add:</b></span>
                      ${beer.ingredients.hops[i].add}<br>
                      <span ><b>Attribute:</b></span>
                      ${beer.ingredients.hops[i].attribute}<br><br>
                      `
      };
      return beerIngredientsHops;
    }
    
    function getBeerDetails(beer) {
      return `
        <span style="font-size: 144%; "><b>First brewed:</b></span><br>${beer.first_brewed}
        <br><br>
        <span style="font-size: 144%; "><b>About me:</b></span><br>${beer.description}
        <br><br>
        <span style="font-size: 144%; "><b>Food pairing:</b></span><br>${beer.food_pairing}
        <br><br>
        <span style="font-size: 144%; "><b>Contributed by:</b></span><br>${beer.contributed_by}
        `;
    }
    
    function getBeerRecipe(beer, beerMesh, beerIngredientsMalt, beerIngredientsHops) {
      return `
        <span style="font-size: 144%; "><b class=Abv title="Alcohol by Volume (ABV)
        ABV is the most common measurement of alcohol content in beer; it simply indicates how much of the total volume of liquid in a beer is made up of alcohol'">Abv:</b></span>\n${beer.abv}
        <br>
        <span style="font-size: 144%; "><b title="International Bitterness Units, a scale to gauge the level of a beer's bitterness. More specifically, IBUs measure the parts per million of isohumulone from hops in a beer, which gives beer bitterness.">Ibu:</b></span>\n\n${beer.ibu}
        <br>
        <span style="font-size: 144%; "><b title="Final gravity measures the attenuation of the beer, which is the reduction of the wort's density caused by the fermentation of sugars into alcohol and carbon dioxide.">Final gravity:</b></span>\ ${beer.target_fg}
        <br>
        <span style="font-size: 144%; "><b title="
        Original Gravity (OG), sometimes called original extract, is a measure of the solids content originally in the wort, before alcoholic fermentation has commenced to produce the beer.">Original gravity:</b></span>\ ${beer.target_og}
        <br>
        <span style="font-size: 144%; "><b title="Color Units Ebc (European Brewery Convention) refer to the color of a beer measured in a technical manner">Ebc:</b></span>\ ${beer.ebc}
        <br>
        <span style="font-size: 144%; "><b title="
        Standard Reference Method (Srm) is the method for color assessment of wort or beer as published in the recommended methods of the American Society of Brewing Chemists.">Srm:</b></span>\ ${beer.srm}
        <br>
        <span style="font-size: 144%; "><b title="
        pH is an important factor in brewing quality beer. The pH levels during various stages of the brewing process affect extract potential, beer color, hot-break formation, foam stability, hop oil extraction, hop bitterness and lauterability of the beer.">Ph:</b></span>\ ${beer.ph}
        <br>
        <span style="font-size: 144%; "><b title="Attenuation is the degree to which yeast ferments the sugar in a wort or must.">Attenuation level:</b></span>\ ${beer.attenuation_level}
        <br>
        <span style="font-size: 144%; "><b>Volume:</b></span>\ ${beer.volume.value}\ ${beer.volume.unit}
        <br>
        <span style="font-size: 144%; "><b>Boil volume:</b></span>\ ${beer.boil_volume.value}\ ${beer.boil_volume.unit}
        <br><br>
        <span style="font-size: 144%; "><b>Method:</b></span><br><li><span ><b>Fermentation:</b></span></li>${beer.method.fermentation.temp.value}\ Degree\ ${beer.method.fermentation.temp.unit}<br><br>
         <li><span ><b>Mash:</b></span><br></li>\ ${beerMesh}
         <span style="font-size: 144%; "><b>Twist:</b></span><br>${beer.method.twist}
         <br><br>
         <span style="font-size: 144%; "><b>Ingredients:</b></span>
         <br>
         <li><span ><b>Malt</b></span></li>${beerIngredientsMalt}
         <br>
         <li><span ><b>Hops:</b></span></li><br>${beerIngredientsHops}
         <span style="font-size: 144%; "><b>Yeast:</b></span><br> ${beer.ingredients.yeast}
         <br><br>
         <span style="font-size: 144%; "><b>Brewers tips:</b></span><br> ${beer.brewers_tips}
        `;
    }
    
    function createCardElement(attributeElement) {
      const DIV = 'div';
      const CLASS = 'class';
      const card = document.createElement(DIV);
      card.setAttribute(CLASS, attributeElement);
      return card;
    }
    
    function createCardElements() {
      const card = createCardElement('card');
      const cardInner = createCardElement('card__inner');
      const cardFaceFront = createCardElement('card__face card__face--front');
      const cardFaceBack = createCardElement('card__face card__face--back');
      const cardContent = createCardElement('card__content');
      const cardHeader = createCardElement('card__header');
      const cardBody = createCardElement('card__body');
      return { card, cardInner, cardFaceFront, cardFaceBack, cardContent, cardHeader, cardBody }
    }
    
    function createImageElement(beer) {
      let img = document.createElement('img');
      img.setAttribute('src', beer.image_url);
      img.setAttribute('class', 'beer-img');
      return img;
    }
    
    function createHeaderElement(beer) {
      const h1 = document.createElement('h1');
      h1.setAttribute('id', 'tagline');
      h1.innerText = beer.tagline;
      const h2 = document.createElement('h2');
      h2.innerText = beer.name;
      return { h1, h2 };
    }
    
    function createParagraphElement(beerRecipe) {
      const p1 = document.createElement('p1');
      p1.innerHTML = beerRecipe;
      return p1;
    }
    
    function createButton(paragraph, innerHTML, innerText) {
      const button = document.createElement('button');
      button.setAttribute('class', 'get_recipe');
      button.innerText = innerText;
      button.addEventListener('mouseover', () => {
        paragraph.innerHTML = innerHTML
      });
      return button;
    }
    
    function addEventListenerToCardInner(cardElements, paragraph, beerDetails) {
      cardElements.cardInner.addEventListener('dblclick', () => {
        paragraph.innerHTML = beerDetails;
        cardElements.cardInner.classList.toggle('is-flipped');
        function scrollUp() {
          cardElements.cardFaceBack.scrollTop = 0;
        }
        setTimeout(scrollUp, 1000)
      });
    }
    
    function addScrollUpBeer(cardElements) {
      const scrollUpBeer = document.createElement('button');
      scrollUpBeer.setAttribute('class', 'go_up');
      scrollUpBeer.innerText = 'Click to scroll up!';
      scrollUpBeer.addEventListener('click', () => {
        cardElements.cardFaceBack.scrollTop = 0
      });
      return scrollUpBeer;
    }
    
    function filterSelection(c) {
      let x, i;
      x = document.getElementsByClassName("filterDiv");
      if (c === "all") {
        c = "";
      }
      for (i = 0; i < x.length; i++) {
        removeClass(x[i], "show");
        if (x[i].className.indexOf(c) > -1) addClass(x[i], "show");
      }
    }
    
    function addClass(element, name) {
      let i, arr1, arr2;
      arr1 = element.className.split(" ");
      arr2 = name.split(" ");
      for (i = 0; i < arr2.length; i++) {
        if (arr1.indexOf(arr2[i]) == -1) {
          element.className += " " + arr2[i];
        }
      }
    }
    
    function removeClass(element, name) {
      let i, arr1, arr2;
      arr1 = element.className.split(" ");
      arr2 = name.split(" ");
      for (i = 0; i < arr2.length; i++) {
        while (arr1.indexOf(arr2[i]) > -1) {
          arr1.splice(arr1.indexOf(arr2[i]), 1);
        }
      }
      element.className = arr1.join(" ");
    }
    
    function filterBtns() {
      const btns = document.getElementById("myBtnContainer").getElementsByClassName("btn");
      for (let i = 0; i < btns.length; i++) {
        btns[i].addEventListener("click", function () {
          let current = document.getElementsByClassName("active");
          current[0].className = current[0].className.replace(" active", "");
          this.className += " active";
          let innerCardClass = document.querySelectorAll('.card__inner')
          innerCardClass.forEach(card => {
            if (card.className === 'card__inner is-flipped') {
              card.className = 'card__inner'
            }
          })
        });
      }
    }
    
    function divToClass(abv) {
      if (abv <= 5) {
        document.querySelector('.card').setAttribute('class', 'filterDiv AbvUpTo5')
      } else if (abv > 5 && abv < 10) {
        document.querySelector('.card').setAttribute('class', 'filterDiv Abv5-10')
      } else if (abv >= 10) {
        document.querySelector('.card').setAttribute('class', 'filterDiv Abv10AndUp')
      }
    }
    
    // MAIN
    main();