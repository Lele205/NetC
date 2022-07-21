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
    window win;
    win.LoadInterface("./index.html");
    return 0;
}