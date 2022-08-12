import { getSelectedDate } from "./calender.js";
import { postAccount } from "./server/api.js";

const getSelectedDateForPost = () => new Date(+getSelectedDate() + 3240 * 10000).toISOString();

const submitAccountEvent = (e) => {
    e.preventDefault();
    postAccount({
        date: getSelectedDateForPost(),
        type: document.querySelector("#combo-type").value,
        description: document.querySelector("#input-description").value,
        money: Number(document.querySelector("#input-money").value),
    });
};

const setSubmitAccountListener = () =>
    document.querySelector("#form-submit").addEventListener("click", submitAccountEvent);

export { setSubmitAccountListener };
