#include <stdio.h>
#include <stdint.h>
#include <iostream>
#include <sys/stat.h>
#include <unistd.h>
#include <string>
#include <fstream>

inline bool exists (const std::string& name) {
  struct stat buffer;   
  return (stat (name.c_str(), &buffer) == 0); 
}

int main(int argc, char** argv)
{   
    std::string stt = (argc > 1) ? argv[1] : "";  

    std::string command1 = "node packer.js ";
    command1 += stt;
    int ret = system(command1.c_str());
    if(exists("./ern.nco"))
    {
        remove("./ern.nco");
        return 0;
    }
    std::string command2 = stt;
    command2.replace(command2.find(".nc"), 3, ".js");
    command2 = "node " + command2;
    system(command2.c_str());
    return 0;
}