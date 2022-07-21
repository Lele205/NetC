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
	var win;
	blib.LoadInterface("./index.html");
	return 0;
}


main()
