// Function to generate a letter
const generateLetter = () => {
	let letters = ["a","b","c","d","e","f","0","1","2","3","4","5","6","7","8","9"];
	let number = Math.round(Math.random()*(letters.length-1));

	return letters[number];
}

// Function to generate a number betwen 0 and 255
const generateNumber = numero => Math.round(Math.random()*numero);

// Function to generate a Hex color
const colorHEX = () => {
	let color = "";

	for(var i=0; i < 6; i++) color += generateLetter() ;
	return `#${color}`;
}

// Function to generate a RGB color
const colorRGB = () => {
	let color = "";
  
  color = `(${generateNumber(255)}, ${generateNumber(255)}, ${generateNumber(255)})`;
  return `rgb${color}`;
}

// Export
export {
  colorHEX,
  colorRGB,
};