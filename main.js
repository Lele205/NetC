const blib = require('./basicLib.js')
function fattoriale(a)
{
	console.log(a);
	return fattoriale( a - 1 );
}

function main()
{
	fattoriale(4);
	return 0;
}


main()
