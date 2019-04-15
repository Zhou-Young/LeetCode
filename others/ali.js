your code here

webcosket是那一层
头文件
动画gpu加速
delete 删原型链吗
闭包延长作用域？

export default function parseCSSString(cssString) {
  // your code here
  patt = '/:root.*{}/';
  if (patt.test(sccString)) {
    word = word.replace(/(:root.*)(\{.*)/, '$2');
    word = word.replace(/:(.*);/, ':\'$1\',')
  } else {
    console.log('请输入正确格式!')
  }
}

// }
word = '{a:b;b:c}'
patt = /:root.*\{/;
patt.test(':root');
console.log(patt.test(word))

console.log(word.replace(/:(.*);/, ':\'$1\','))

{
  "110000": [
    "北京",
    "1",
    "bei jing"
  ],
  "110100": [
    "北京市",
    "110000",
    "bei jing shi"
  ],
}

[{
    "label": {
      "type": "i18n",
      "en_US": "bei jing",
      "zh_CN": "北京"
    },
    "value": "110000",
    "children": [{
      "label": {
        "type": "i18n",
        "en_US": "bei jing shi",
        "zh_CN": "北京市"
      },
    }]
    {
      "110000": [
        "北京",
        "1",
        "bei jing"
      ],
      "110100": [
        "北京市",
        "110000",
        "bei jing shi"
      ],
      "110101": [
        "东城区",
        "110100",
        "dong cheng qu"
      ],
      "110102": [
        "西城区",
        "110100",
        "xi cheng qu"
      ],
      "310000": [
        "上海",
        "1",
        "shang hai"
      ],
      "310100": [
        "上海市",
        "310000",
        "shang hai shi"
      ],
      "310101": [
        "黄浦区",
        "310100",
        "huang pu qu"
      ],
      "310103": [
        "卢湾区",
        "310100",
        "lu wan qu"
      ]
    }

    [{
      "label": {
        "type": "i18n",
        "en_US": "bei jing",
        "zh_CN": "北京"
      },
      "value": "110000",
      "children": [{
        "label": {
          "type": "i18n",
          "en_US": "bei jing shi",
          "zh_CN": "北京市"
        },
        "value": "110100",
        "children": [{
          "label": {
            "type": "i18n",
            "en_US": "dong cheng qu",
            "zh_CN": "东城区"
          },
          "value": "110101"
        }, {
          "label": {
            "type": "i18n",
            "en_US": "xi cheng qu",
            "zh_CN": "西城区"
          },
          "value": "110102"
        }]
      }]
    }, {
      "label": {
        "type": "i18n",
        "en_US": "shang hai",
        "zh_CN": "上海"
      },
      "value": "310000",
      "children": [{
        "label": {
          "type": "i18n",
          "en_US": "shang hai shi",
          "zh_CN": "上海市"
        },
        "value": "310100",
        "children": [{
          "label": {
            "type": "i18n",
            "en_US": "huang pu qu",
            "zh_CN": "黄浦区"
          },
          "value": "310101"
        }, {
          "label": {
            "type": "i18n",
            "en_US": "lu wan qu",
            "zh_CN": "卢湾区"
          },
          "value": "310103"
        }]
      }]
    }]