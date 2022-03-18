const search = document.getElementById("search");
const pokemon = async () => {
  let pokemon = search.value ? search.value.toLowerCase() : "1";

  const result = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
  result.status === 404
    ? (document.getElementById("error").className = "error")
    : (document.getElementById("error").className = "container-error");

  const res = await result.json();
  console.log(result.status);

  let types = "<h1 class='title'>Types</h1><div class='line'></div>";
  res.types.map(
    (type) =>
      (types += `<label class='type ${type.type.name}'>${type.type.name[0].toUpperCase()}${type.type.name.slice(1,)}</label>`)
  );
  document.getElementById("types").innerHTML = types;

  const statsNames = ["HP", "ATK", "DEF", "S-ATK", "S-DEF", "SPEED"];
  let stats = "<h1 class='title'>Stats</h1><div class='line'></div>";
  res.stats.map(
    (stat, i) =>
      (
        stats += `
        <div class='progress'>
          <label>${statsNames[i]}</label>
          <div class="bar-progress">
            <div style="background: grey; border-radius: 30px; width: 300px; max-height: 20px; ">
              <div class="w3-container w3-round-xlarge" style="max-width:${stat.base_stat}%; background: #bc0f22; color: white; max-height: 20px;">${stat.base_stat}</div>
            </div>
          </div>
        </div>`)
  );
  document.getElementById("stats").innerHTML = stats;

  let moves = "";
  res.abilities.map((move) => (moves += `<li>${move.ability.name[0].toUpperCase()}${move.ability.name.slice(1,)}</li>`));
  document.getElementById("list-moves").innerHTML = moves;

  document.getElementById("namePokemon").textContent =
    res.name[0].toUpperCase() + res.name.slice(1);
  document.getElementById("imgPokemon").src =
    res.sprites.other.home.front_default;
};
pokemon();

search.addEventListener("keypress", () => {
  if (event.keyCode == 13) pokemon();
});
