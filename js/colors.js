function generateLetter(){
	let letters = ["a","b","c","d","e","f","0","1","2","3","4","5","6","7","8","9"];
	let number = (Math.random()*15).toFixed(0);

	return letters[number];
}
	
function colorHEX(){
	let color = "";

	for(var i=0; i < 6; i++) color += generateLetter() ;
	return `#${color}`;
}

function generateNumber(numero){
	return (Math.random()*numero).toFixed(0);
}

function colorRGB(){
	let color = "";
  
  color = `(${generateNumber(255)}, ${generateNumber(255)}, ${generateNumber(255)})`;
  return `rgb${color}`;
}

export {
  colorHEX,
  colorRGB,
};