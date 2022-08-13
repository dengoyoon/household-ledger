const key = {
    CURRENT_DATE: "CURRENT_DATE",
    SELECTED_DATE: "SELECTED_DATE",
};

const setCurrentDate = (date) =>
    localStorage.setItem(key.CURRENT_DATE, JSON.stringify(new Date(+date + 3240 * 10000)));

const getCurrentDate = () => JSON.parse(localStorage.getItem(key.CURRENT_DATE));

const setSelectedDate = (date) =>
    localStorage.setItem(key.SELECTED_DATE, JSON.stringify(new Date(+date + 3240 * 10000)));

const getSelectedDate = () => JSON.parse(localStorage.getItem(key.SELECTED_DATE));

export { key, setCurrentDate, getCurrentDate, setSelectedDate, getSelectedDate };
