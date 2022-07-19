function float fattoriale(int a)
{
    print(a);
    return fattoriale(a-1);
}

function int main() 
{
    fattoriale(4);
    return 0;
}