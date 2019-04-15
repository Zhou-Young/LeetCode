//
//  main.cpp
//  code3
//
//  Created by 周扬 on 2018/3/15.
//  Copyright © 2018年 周扬. All rights reserved.
//  寻找最长无重复字符的子串

#include <iostream>
#include <string.h>
#include <string>

using namespace std;

int lengthOfLongestSubstring(string s) {
    string newStr = "";
    string::size_type idx;
    int count = 0;
    while(count <= s.length() - newStr.length()) {
        string oldStr = newStr;
        newStr = "";
        for(int i = count;i < s.length();i++) {
            idx = newStr.find(s[i]);
            if(idx == string::npos) {
                newStr += s[i];
            }else break;
        }
        if(oldStr.length() > newStr.length()) {
            newStr = oldStr;
        }
        count++;
    }
    return newStr.length();
}

int main(int argc, const char * argv[]) {
    // insert code here...
    string str = "pwwkew";
    int newstr = lengthOfLongestSubstring(str);
    cout<<newstr<<endl;
    return 0;
}
