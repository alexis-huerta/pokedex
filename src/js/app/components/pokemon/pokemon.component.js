'use strict'

angular.module('pokemon')
.component('pokemon', {
    templateUrl: './templates/pokemon.html',
    controller: function(PokemonFactory, $scope,  $mdDialog, $mdMedia) {
        var itemsPerPage = 20;
        const colors = {
          fire: '#f3b3ae',
          grass: '#bff3c2',
          electric: '#fff5a1',
          water: '#bbe4f7',
          ground: '#f4e7da',
          rock: '#d5d5d4',
          fairy: '#fceaff',
          poison: '#e4cef1',
          bug: '#f8d5a3',
          dragon: '#97b3e6',
          psychic: '#eaeda1',
          flying: '#F5F5F5',
          fighting: '#E6E0D4',
          normal: '#F5F5F5'
        };
        const mainTypes = Object.keys(colors);

        $scope.active =  false;
        $scope.showCleanButton = false;
        $scope.showPagination = true;
        $scope.currentPage = 1;
        $scope.pageSize = 20;
        $scope.totalPages = 0;
        $scope.pokemonTemp = [];
        $scope.pokemonName = "";
        $scope.showNotFoundMessage = false;

       PokemonFactory.fetchPokemons().then(function(value) {
          $scope.pokemons = value; 
          $scope.pokemonTemp = value;
          $scope.totalPages = Math.ceil( $scope.pokemonTemp.length / $scope.pageSize);
           $scope.$apply(function () {
            $scope.active = true;
          });
          
      }, function(reason) {
      });

      $scope.getBgColor = function(type) {
        return { 'background-color': colors[type]};
      }

      $scope.search = function() {
        $scope.pokemonTemp = $scope.pokemons.filter(pokemon => pokemon.name === $scope.pokemonName);

        if($scope.pokemonTemp.length === 0) {
          $scope.showNotFoundMessage = true;
        } else {
          $scope.showNotFoundMessage = false
        }
        $scope.showCleanButton = true;
        $scope.showPagination = false
      }

      $scope.activeCleanButton = function() {
        $scope.pokemonTemp = $scope.pokemons;
        $scope.pokemonName = "";
        $scope.showCleanButton = false;
        $scope.showPagination = true;
      }

      $scope.next = function() {
        $scope.currentPage++;
        if ($scope.currentPage <= $scope.totalPages ) {
          $scope.pokemonTemp = $scope.pokemons.slice( $scope.pageSize , $scope.pageSize + itemsPerPage )
          $scope.pageSize = $scope.pageSize + itemsPerPage;
        } else {
          $scope.currentPage = $scope.totalPages;
        }
      }

      $scope.prev = function() {
        $scope.currentPage--;
        if( $scope.currentPage >= 1) {
          $scope.pageSize = $scope.pageSize - itemsPerPage;
          $scope.pokemonTemp = $scope.pokemons.slice($scope.pageSize - itemsPerPage, $scope.pageSize );
        } else {
          $scope.currentPage = 1;
        }
      }


      /*Diallos*/
      $scope.customFullscreen = $mdMedia('xs') || $mdMedia('sm');
    
      $scope.showAdvanced = function(ev,selectedPokemon) {
        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
        $mdDialog.show({
          controller: DialogController,
          templateUrl: './templates/dialog.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose:true,
          fullscreen: useFullScreen,
          locals : {
            pokemon : selectedPokemon
        }
        })
        .then(function(answer) {});
        $scope.$watch(function() {
          return $mdMedia('xs') || $mdMedia('sm');
        }, function(wantsFullScreen) {
          $scope.customFullscreen = (wantsFullScreen === true);
        });
      };
    }
})

function DialogController($scope, $mdDialog, pokemon) {
  $scope.pokemon = pokemon;
  $scope.hide = function() {
    $mdDialog.hide();
  };
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
  $scope.answer = function(answer) {
    $mdDialog.hide(answer);
  };
}

