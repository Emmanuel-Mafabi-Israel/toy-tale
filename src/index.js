let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const collection = document.getElementById('toy-collection');

  const add_toy_form =  document.getElementById('add_toy_form');

  function generate_html(name, image, likes, id) {
    const card = document.createElement('div');
    card.className = "card";
    const h2 = document.createElement('h2');
    h2.innerText = name;
    const img = document.createElement('img');
    img.src = image;
    img.className ="toy-avatar";
    const p = document.createElement('p');
    p.innerText = `${likes} likes`;
    const button = document.createElement('button');
    button.className = "like-btn";
    button.id = id;
    button.innerText = "Like ❤️";
    card.appendChild(h2);
    card.appendChild(img);
    card.appendChild(p);
    card.appendChild(button);

    collection.appendChild(card);

    let likes_ = likes;

    button.addEventListener('click', function() {
      likes_++;
      fetch(`http://localhost:3000/toys/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          "likes": likes_
        })
      }).then(function(SERVER_RESPONSE) {
        return SERVER_RESPONSE;
      }).then(function(DATA) {
        //console.log(DATA);
      }).catch(function(ERROR) {
        console.error(ERROR);
      });
    });
  }

  // function for gettclsing data from the storage - always update
  (function(){
    fetch('http://localhost:3000/toys').then(function(SERVER_RESPONSE) {
      return SERVER_RESPONSE.json();
    }).then(function(DATA) {
      DATA.forEach(function(character) {
        generate_html(character.name, character.image, character.likes, character.id);
      });
      // for debugging purposes
      // console.log(DATA);
    }).catch(function(ERROR) {
      console.log(ERROR);
    });
  })();

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
      addBtn.innerText = "Close";
    } else {
      toyFormContainer.style.display = "none";
      addBtn.innerText = "Add Toy!";
    }
  });

  add_toy_form.addEventListener('submit', function(SUBMIT_EVENT) {
    SUBMIT_EVENT.preventDefault();
    const formData = new FormData(add_toy_form);
    const toy = {
      name: formData.get('name'),
      image: formData.get('image'),
      likes: "0"
    };

    fetch('http://localhost:3000/toys', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(toy)
    }).then(function(SERVER_RESPONSE) {
      return SERVER_RESPONSE.json();
    }).then(function(DATA) {
      console.log(DATA);
    }).catch(function(error) {
      console.error(error);
    });
  });
});
