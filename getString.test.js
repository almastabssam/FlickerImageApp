import {getImageURLStr, sumOfNum} from './component/index';

//Test case 1 to check if function's parameter are null or not

//Success
const urlStr = getImageURLStr('1', '578', '23451156376', '8983a8ebc7');

console.log('Check Url Str with Space', urlStr);
test('Image URL String Success Result', () => {
  expect(getImageURLStr('1', '578', '23451156376', '8983a8ebc7')).toBe(urlStr);
});

//Failure
test('Image URL String Fail Result', () => {
  expect(getImageURLStr(' ', '578', '23451156376', '8983a8ebc7')).toBe(true);
});

// sumOfNum

//success
test('sum of num success case', () => {
  expect(sumOfNum(1, 2)).toBe(true);
});

//failure
test('sum of num fail case', () => {
  expect(sumOfNum(2, 2)).toBe(false);
});
