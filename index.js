/*
0. 버튼들 이벤트 리스너
1. 이번달 증감값을 서버에서 가져오기
2. 화면에 그리기
    2-1. 오늘 날짜에 데이터가 있다면 리스트까지 그리기, 없으면 리스트가 아예 안 보여야 함
    2-2. 오늘 날짜에 선택 표시가 있어야 함
3. 
*/

import { drawCalenderOfDate, setChangeMonthListener } from "./calender.js";

Array.prototype.top = function () {
    return this.length !== 0 ? this[this.length - 1] : undefined;
};

const log = console.log; //eslint-disable-line no-unused-vars

const go = (...as) => as.reduce((a, f) => f(a));

const range = (stop) => {
    const result = [];
    for (let i = 0; i < stop; i++) {
        result.push(i);
    }
    return result;
};

const currentDate = new Date();
drawCalenderOfDate(currentDate);
setChangeMonthListener(currentDate);

// 달력 이동 했을때 기존 이벤트 핸들러 다 떼어야 함.
// querySelector, SelectorAll를 더 많이 써볼 것. css 문법?으로 선택 가능함.
