// 按需导入extend函数
import { extend } from 'vee-validate'

// 导入全部规则
import * as rules from 'vee-validate/dist/rules'
// rules是一个大对象，内部有各个导入的成员

// Object.keys(rules) // 返回该对象全部成员名称，以"数组"形式返回
// ['required','length','email'……]

Object.keys(rules).forEach(rule => {
  // extend是vee-validate固定函数，用作规则“注册”使用的
  // extend(规则名称，规则内容) 注册规则
  // rule:代表各个 规则名称，
  // rules[rule]:代表规则内容
  // extend('requied', required规则对象内容)  required规则就注册好了
  extend(rule, rules[rule])
})
