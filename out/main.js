const blib = require('../libraries/basicLib.js')
function fattoriale(a)
{
	if( a ==  1  )
{

	return a;
}

	s = fattoriale( a - 1 );
	s *= a ;
	return s;
}

function main()
{
	a = fattoriale(10);
	console.log(a);
	return 0;
}


main()
