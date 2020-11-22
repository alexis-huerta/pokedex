'use strict';

angular.module('pokemons')
.factory('PokemonFactory', function ($http) {
    var url = 'https://pokeapi.co/api/v2/pokemon/';
    const pokemonNumber = 80;
    var pokemonFactory = {};
    var pokemonList = [];

    pokemonFactory.fetchPokemons = async function (fetchPokemons) {
      for (let i = 1; i < pokemonNumber; i++) {
              await getPokemon(i);
      }
      return pokemonList
    }
    
    async function  getPokemon (id) {
      await $http.get(url + id, {}).then(function successCallback(response) {
        pokemonList.push(response.data);
       }, function errorCallback(response) {
         console.log('error');
        });
    }

    return pokemonFactory;

  });