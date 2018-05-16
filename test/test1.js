/**
 * Created by Neil
 * 2018-05-16 10:27
 */
const R=require('ramda')
const glob=require('glob')
const {resolve}=require('path')


// // var double = x => x * 2;
// // x=R.map(double)([1,2,3])
// // console.log(x);
// var printKeyConcatValue = (value, key) => console.log(key + ':' + value);
// R.forEachObjIndexed(printKeyConcatValue, {x: 1, y: 2}); //=> {x: 1, y: 2}
// logs x:1

glob.sync(resolve("D:\\node-template\\server\\routes", '*.js')).forEach((x)=>{
    console.log(x);
})