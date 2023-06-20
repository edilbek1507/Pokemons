const list = document.querySelector(".list");

async function getData() {
  const res = await fetch(
    "https://pokeapi.co/api/v2/pokemon?offset=${(page - 1) * 20}&limit=20"
  );
  const data = await res.json();
  return data;
}

render();
async function render() {
  const pokemonData = await getData();
  const pokemonList = pokemonData.results;
  pageTotalCount = Math.ceil(pokemonData.count / 20);

  list.innerHTML = "";
  pokemonList.forEach(async (pokemon) => {
    const res = await fetch(pokemon.url);
    const data = await res.json();
    const imageUrl = data.sprites.front_default;
    const types = data.types[0];

    list.innerHTML += `
    <div class="flip-card">
    <div class="flip-card-inner">
        <div class="flip-card-front">
            <img class="image" src="${imageUrl}" alt="${pokemon.name}" />
        </div>
        <div class="flip-card-back">
            <span class="name">${data.name}</span>
            <span class="title">Type: ${types.type.name}</span>
            <span class="title">Height: ${data.height}</span>
            <span class="title">Weight: ${data.weight}</span>
        </div>
    </div>
</div>
    `;
  });
}
