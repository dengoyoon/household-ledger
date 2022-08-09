/*
0. 버튼들 이벤트 리스너
1. 이번달 증감값을 서버에서 가져오기
2. 화면에 그리기
    2-1. 오늘 날짜에 데이터가 있다면 리스트까지 그리기, 없으면 리스트가 아예 안 보여야 함
    2-2. 오늘 날짜에 선택 표시가 있어야 함
3. 
*/

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

const getMonthName = (monthIndex) =>
    [
        "January",
        "Feburary",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ][monthIndex];

const drawCalendarHead = (currentYear, currentMonthIndex) =>
    (document.getElementById("calendar-header-title").innerHTML = `${getMonthName(
        currentMonthIndex
    )} ${currentYear}`);

const isLeap = (year) => (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

const getEndDayOfMonth = (year, monthIndex) =>
    isLeap(year)
        ? [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][monthIndex]
        : [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][monthIndex];

const getMonthDates = (year, monthIndex, endDayOfMonth) =>
    go(
        range(endDayOfMonth).map((number) => number + 1),
        (daysOfMonth) => daysOfMonth.map((day) => new Date(year, monthIndex, day))
    );

const createEmptyObjArray = (length) => range(length).map((_) => {}); //eslint-disable-line no-unused-vars

const attachEmptyObjToMonthDates = (monthDates) =>
    go([monthDates[0].getDay(), monthDates.top().getDay()], ([firstDayOfWeek, lastDayOfWeek]) => [
        ...createEmptyObjArray(firstDayOfWeek),
        ...monthDates,
        ...createEmptyObjArray(6 - lastDayOfWeek),
    ]);

const splitWeekMonthDates = (monthDates) =>
    go(
        monthDates.length / 7,
        (weekNumber) => range(weekNumber).map((week) => range(7).map((day) => monthDates.shift())) //eslint-disable-line no-unused-vars
    );

const convertDatesForDraw = (monthDates) =>
    go(attachEmptyObjToMonthDates(monthDates), (monthDates) => splitWeekMonthDates(monthDates));

const getBlankIfFalse = (str) => (str ? str : "");

const getHTMLOfWeeks = (monthDatesForDraw) =>
    monthDatesForDraw.map(
        (week) => `
        <tr>
            <td><div class = "text-sunday">${getBlankIfFalse(week[0]?.getDate())}</div></td>
            <td><div>${getBlankIfFalse(week[1]?.getDate())}</div></td>
            <td><div>${getBlankIfFalse(week[2]?.getDate())}</div></td>
            <td><div>${getBlankIfFalse(week[3]?.getDate())}</div></td>
            <td><div>${getBlankIfFalse(week[4]?.getDate())}</div></td>
            <td><div>${getBlankIfFalse(week[5]?.getDate())}</div></td>
            <td><div class = "text-saturday">${getBlankIfFalse(week[6]?.getDate())}</div></td>
        </tr>
`
    );

const updateCalenderHTML = (calenderHTML) =>
    (document.getElementById("calendar-table").innerHTML =
        `<tr>
            <th class = "text-sunday">일</th>
            <th>월</th>
            <th>화</th>
            <th>수</th>
            <th>목</th>
            <th>금</th>
            <th class = "text-saturday">토</th>
        </tr>` + calenderHTML);

const getDatesForDraw = (date) =>
    go(
        date,
        (date) => [date.getFullYear(), date.getMonth()],
        ([year, monthIndex]) => {
            drawCalendarHead(year, monthIndex);
            return [year, monthIndex, getEndDayOfMonth(year, monthIndex)];
        },
        ([year, monthIndex, endDayOfMonth]) => getMonthDates(year, monthIndex, endDayOfMonth),
        (monthDates) => convertDatesForDraw(monthDates)
    );

const makeCalendar = (monthDatesForDraw) =>
    go(
        monthDatesForDraw,
        (monthDatesForDraw) => getHTMLOfWeeks(monthDatesForDraw),
        (htmlOfWeeks) => htmlOfWeeks.join(""),
        (calenderHTML) => updateCalenderHTML(calenderHTML)
    );

const isClickableCell = (cellContent) => Boolean(cellContent);

const getClickedCellIndex = (e) =>
    isNaN((e.path[1].rowIndex - 1) * 7 + e.target.cellIndex)
        ? -1
        : (e.path[1].rowIndex - 1) * 7 + e.target.cellIndex;

const setClickListenerOnTdElements = (monthDates) =>
    document.querySelector("#calendar-table").addEventListener("click", (e) => {
        // alert(e.target);
        if (e.target.tagName === "TD") {
            const clickedDates = monthDates[getClickedCellIndex(e)];
            if (isClickableCell(clickedDates)) {
                alert(clickedDates);
            }
        }
        log(monthDates);
        log((e.path[1].rowIndex - 1) * 7 + e.target.cellIndex);
    });

// 이벤트 버블링 캡쳐링 -> 이벤트 위임 delegation -> 테이블에 한번만 리스너를 붙여줄 수 있음 -> 이벤트 타겟을 이용해서 td에 이벤트가 발생한건지 확인 가능.

const drawCalenderOfDate = (date) =>
    go(
        date,
        (date) => getDatesForDraw(date),
        (monthDatesForDraw) => {
            makeCalendar(monthDatesForDraw);
            setClickListenerOnTdElements(monthDatesForDraw.flat());
        }
    );

const currentDate = new Date();
drawCalenderOfDate(currentDate);

// 달력 이동 했을때 기존 이벤트 핸들러 다 떼어야 함.
// querySelector, SelectorAll를 더 많이 써볼 것. css 문법?으로 선택 가능함.

const leftMoveButton = document.getElementsByClassName("calendar-header-button")[0];
const rightMoveButton = document.getElementsByClassName("calendar-header-button")[1];

leftMoveButton.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    drawCalenderOfDate(currentDate);
});

rightMoveButton.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    drawCalenderOfDate(currentDate);
});
