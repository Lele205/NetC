const blib = require('../libraries/basicLib.js')
function fattoriale(a)
{
	if( a ==  1  )
{

	
	return a;
}

	var s = fattoriale( a - 1 );
	s *= a ;
	return s;
}

function main()
{
	var a = Math.random();
	console.log(a);
	return 0;
}


main()
