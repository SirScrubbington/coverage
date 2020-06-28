/**
 * Pokemon data structure
 * Stores stuff related to the Pokemon we're dealing with.
 */

// Pad number (int) - for picking pokemon sprites
// Pads one single space (using zeros) by default
Number.prototype.pad = function(size=2, op='0')
{
	// Convert self to string
	var s = String(this);
	
	// While the length of the string is
	// less than the required length
	while(s.length < size)
	{
		// Add another zero to the start
		s = op + s;
	}
	
	// Return the resulting string
	return s;
}

// Between number (self, minimum, maximum) 
// True if number is a < this < b, false if not
Number.prototype.between = function(min,max)
{
	// True if is in range, false if not
	return (this >= min && this <= max);
}

// Constructor. Takes in data.
 function Pokemon(data) {
 	this.data = data;

 	// init other values to nil to be safe.
 	this.ability = undefined;
 	this.moves = new Array(4);

 	// autocomplete
 	this.generateAutocompleteList();
 }

// set this pokemon's current ability based off of what was selected (default = undefined)
Pokemon.prototype.setAbility = function(ability) {
	this.ability = ability;
}
Pokemon.prototype.getAbility = function() {
	return this.ability;
};

Pokemon.prototype.setMoves = function(move, idx) {
	this.moves[idx] = pokedex.moves[move];
	console.log(this.moves);
};
Pokemon.prototype.getMoves = function() {
	return this.moves;
}
Pokemon.prototype.moveIsSTAB = function(move) {
	return this.data["types"].indexOf(move["type"]) >= 0;
}

Pokemon.prototype.urlNumber = function () {
	var urlNumber;

	var number = this.data["num"];
	if (number != undefined) {
		urlNumber = number;
	} else {
		return ""; // if the number isn't defined, this isn't a pokemon.
	}

	var formeLetter = this.data["formeLetter"];
	if (formeLetter) {
		urlNumber += formeLetter;
	}

	return urlNumber;
}

Pokemon.prototype.getIconImageURL = function() {
	
	// Constant for where icons are stored
	var imageURL = "media/pokemon/icons/";

	// Retrieve pokedex no from mon data
	var number = this.data["num"];
	
	// If the number is defined
	if (number != undefined) {
		
		// pad the number (needs to be 3 digits)
		imageURL += number.pad(3);
	} 
	// number isn't defined
	else 
	{
		return ""; // this isn't a pokemon.
	}

	// Default extnesion is blank
	let extension = '';
	
	
	// Pikachu - bunch of fuck off costumes lol
	if (number == 25)
	{
		switch(this.data['forme'])
		{
			case "PHD": extension = "Ph"; break;
			case "Hoenn": extension = "H"; break;
			case "Kalos": extension = "K"; break;
			case "Unova": extension = "U"; break;
			case "Belle": extension = "Be"; break;
			case "Libre": extension = "Li"; break;
			case "Partner": extension = "P"; break;
			case "Starter": extension = "S"; break;
			case "Original": extension = "O"; break;
			case "Cosplay": extension = "Co"; break;
			case "Pop-Star": extension = "Po"; break;
			case "Rock-Star": extension = "Ro"; break;
		}
	}
	
	// Unown - Take a random letter lol
	else if (number == 201)
	{
		// Get random letter, convert it to a string (via char indexing) then upper case
		number = parseInt(Math.random() * 26) + 65;
		// console.log('Number: ' + number);
		
		// Convert to a character
		letter = String.fromCharCode(number);
		// console.log('Letter: ' + letter);
		
		// Set the extension to the letter
		extension = letter;
	}
	
	// Deoxys - 3 alt formes
	else if (number == 386)
	{
		// Switch on forme, adding suffix
		switch(this.data['forme'])
		{
			case 'Attack': extension = 'A'; break;
			case 'Defense': extension = 'D'; break;
			case 'Speed': extension = 'S'; break;
		}
	}
	
	// Burmy / Wormadam - Two formes
	else if (number.between(412,413))
	{
		// Check for different formes
		switch(this.data['forme'])
		{
			case 'Sand': extension = "G"; break;
			case 'Trash': extension = "S"; break;
		}
	}
	
	// If number is either shellos or gastrodon
	else if (number.between(422,423))
	{
		// 50% of the time, use the east forme :)
		if(parseInt(Math.round(Math.random())))
		{
			// Set the form to east
			extension = 'E';
		}
	}
	
	// Rotom formes
	else if (number == 479)
	{
		// Switch on forme, for adding suffix
		switch(this.data['forme'])
		{
			case 'Fan': extension = 'F'; break;
			case 'Mow': extension = 'L'; break;
			case 'Heat': extension = 'O'; break;
			case 'Wash': extension = 'W'; break;
			case 'Frost': extension = 'R'; break;
		}
	}
	
	// Dialga - Chance to be primal lol
	else if (number == 483)
	{
		// 50% of the time, use the primal forme :)
		if(parseInt(Math.round(Math.random())))
		{
			// Set the form to east
			extension = 'P';
		}
	}
	
	// Sawsbuck Formes - Randomly pick one
	else if (number == 586)
	{
		// Pick random sawsbuck forme
		switch(parseInt(Math.floor(Math.random() * 4)))
		{
			case 1: extension = 'A'; break;
			case 2: extension = 'S'; break;
			case 3: extension = 'W'; break;
			
		}
	}
	
	// Vivillion - Wierd pokemon, 2 rare formes, if normal pick random region forme
	else if (number == 666)
	{
		// List of extensions
		let ext = ['','Arc','Con','Ele','Gar','Hig','Icy','Jun','Mar','Mod','Mon','Oce','Pol','Riv','San','Sav','Sun','Tun'];
		
		// Switch on formes
		switch(this.data['forme'])
		{
			case "Fancy": extension = "Fan"; break;
			case "Pokeball": extension = "Pok"; break;
			default: extension = ext[Math.floor(Math.random() * ext.length)]; break;
		}
	}
	
	// Florges / Floette / Flabebe
	else if (number.between(669,671))
	{
		// List of extensions
		ext = ['B','O','W','Y']
		
		// Switch on formes
		switch(this.data['forme'])
		{
			case 'Eternal': extension = 'E'; break;
			default: extension = ext[Math.floor(Math.random() * ext.length)]; break;
		}
	}
	
	// Furfrou hairstyles
	else if (number == 676)
	{
		// List of extensions
		ext = ['Da','De','Di','He','Ka','La','Ma','Ph','St'];
		
		// Set to random member
		extension = ext[Math.floor(Math.random() * ext.length)];
	}
	
	// Pokemon with specific female forms 
	else if ([668,593,592,521].includes(number))
	{
		// 50% of the time, use the primal forme :)
		if(parseInt(Math.round(Math.random())))
		{
			// Set the form to east
			extension = 'F';
		}
	}
	
	// Xerneas - Chance to be the other wierd forme lol
	else if (number == 716)
	{
		// 50% of the time, use the primal forme :)
		if(parseInt(Math.round(Math.random())))
		{
			// Set the form to east
			extension = 'N';
		}
	}
	
	// Oricorio - Pick the different formes lol
	else if (number == 741)
	{
		// Switch on formes
		switch(this.data['forme'])
		{
			case 'Pom-Pom': extension = 'Po'; break;
			case 'Pa\'u': extension = 'Pa'; break;
			case 'Sensu': extension = 'Se'; break;
		}
	}
	
	// Lycanroc formes - Pick the different formes lol
	else if (number == 745)
	{
		// Switch on formes
		switch(this.data['forme'])
		{
			case 'Dusk': extension = 'D'; break;
			case 'Midnight': extension = 'Mn'; break;
		}
	}
	
	// Minior - Meteor Forme, and Normal Forme
	else if (number == 774)
	{
		// List of extensions
		ext = ['B','G','I','O','R','V','Y']
		
		// Switch on formes
		switch(this.data['forme'])
		{
			case 'Meteor': extension = ''; break; // Default sprite is meteor forme
			default: extension = ext[Math.floor(Math.random() * ext.length)]; break;
		}
	}
	
	// Cramorant sprites - Gorging and Gulping forme
	else if (number == 845)
	{
		// Switch on formes
		switch(this.data['forme'])
		{
			case 'Gorging': extension = 'Go'; break;
			case 'Gulping': extension = 'Gu'; break;
		}
	}
	
	// Alcremie sprites - Pick a random colour
	else if (number == 869)
	{
		// List of extensions
		ext = ['CaS','LeC','MaC','MiC','RaS','RuC','RuS','SaC']
		
		// Switch on formes
		switch(this.data['forme'])
		{
			case 'Gmax': extension = 'Gi'; break;
			default: extension = ext[Math.floor(Math.random() * ext.length)]; break;
		}
	}
	
	// Any other pokemon - few different formes
	else
	{
		// Switch on forme, for adding suffix
		switch(this.data['forme'])
		{
			case "F": extension = "F"; break;
			case "Zen": extension = "Z"; break;
			case "Sky": extension = "S"; break;
			case "Ash": extension = "A"; break;
			case "Mega": extension = "m"; break;
			case "Gmax": extension = "Gi"; break;
			case "Ultra": extension = "U"; break;
			case "Alola": extension = "a"; break;
			case "Galar": extension = "g"; break;
			case "Blade": extension = "b"; break;
			case "Noice": extension = "n"; break;
			case "Primal": extension = "P"; break;
			case "Origin": extension = "O"; break;
			case "School": extension = "Sc"; break; 
			case "Therian": extension = "T"; break;
			case "Mega-X": extension = "mx"; break;
			case "Mega-Y": extension = "my"; break;
			case "Unbound": extension = "u"; break;
			case "Low-Key": extension = "L"; break;
			case "Crowned": extension = "C"; break;
			case "Complete": extension = "C"; break;
			case "Resolute": extension = "R"; break;
			case "Starter": extension = "Pa"; break;
			case "Original": extension = "O"; break;
			case "Sunshine": extension = "S"; break;
			case "Eternamax": extension = "E"; break;
			case "Galar-Zen": extension = "GZ"; break;
			case "Dusk-Mane": extension = "DM"; break;
			case "Dawn-Wings": extension = "DW"; break;
			case "Blue-Striped": extension = "B"; break;
		}
	}
	
	console.log('Sprite Name' + imageURL + extension + ".png");
	
	// Return the image URL, plus the new extension 
	return imageURL + extension + ".png";
}

// creates summary string for display
Pokemon.prototype.summary = function() {
	var finalString = "";
	if (this.ability != undefined) {
		finalString += "<small>Ability:</small> " + this.ability + " ";
	}

	var movesString = "";
	for (var i = 0; i < this.moves.length; ++i) {
		if (this.moves[i] == undefined) {
			break;
		}

		if (i > 0) {
			movesString += " / ";
		}

		movesString += this.moves[i]['name'];
	}
	if (movesString != "") {
		finalString += "<small>Moves:</small> " + movesString;
	}
	return finalString;
}

Pokemon.prototype.getAutocompleteArray = function() {
	return this.autocomplete;
};
// create moveset autocomplete list
Pokemon.prototype.generateAutocompleteList = function() {
	if (this.autocompleteArray) {
		return; // only do this once per pokemon
	}

	console.log(this.data);

	// THIS WILL FAIL WITH ROTOM/PUNCTUATION FIGURE OUT A BETTER WAY TO DO THIS.
	var pokemon = pokedex.learnsets[this.data["species"].toLowerCase().replace(/[^a-zA-Z0-9]/g, '')];

	string = string

	if (!pokemon) {
		pokemon = pokedex.learnsets[this.data["baseSpecies"].toLowerCase().replace(/[^a-zA-Z0-9]/g, '')];
	}

	var learnset = pokemon["learnset"];
	
	this.autocomplete = [];
	for (move in Object.keys(learnset)) {
		this.autocomplete.push(move);
	}
}