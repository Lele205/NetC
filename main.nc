function float fattoriale(int a)
{
    if(a==1)
    {
        return a;
    }
    float s = fattoriale(a-1);
    s *= a;
    return s;
}

function int main() 
{
    int a = fattoriale(10);
    print(a);
    return 0;
}