import { getAccountDaily } from "./server/api.js";

Array.prototype.isEmpty = function () {
    return this.length === 0;
};

const updateAccountListTitle = (selectedDate) =>
    (document.querySelector("#footer-title").innerHTML = `${selectedDate.getFullYear()}년 ${
        selectedDate.getMonth() + 1
    }월 ${selectedDate.getDate()}일의 내역입니다.`);

const getClassByAccountType = (accountType) =>
    accountType === "plus" ? "list-text-plus" : "list-text-minus";
const getStringByAccountType = (accountType) => (accountType === "plus" ? "입금" : "출금");

const getHtmlForList = (account) => `
<li>
    <div class="${getClassByAccountType(account.type)}">${getStringByAccountType(account.type)} ${
    account.money
}원</div>
    <div class="list-text-description">${account.description}</div>
</li>
`;

const updateAccountListContent = (accountsOfSelectedDate) =>
    (document.querySelector("#footer-list").innerHTML = accountsOfSelectedDate
        .map(getHtmlForList)
        .join(""));

const getSelectedDateForGet = (selectedDate) =>
    new Date(+selectedDate + 3240 * 10000).toISOString().substring(0, 10);

const showAccountList = () => (document.querySelector("footer").style.visibility = "visible");
const hideAccountList = () => (document.querySelector("footer").style.visibility = "hidden");

const updateAccountList = async (selectedDate) => {
    updateAccountListTitle(selectedDate);
    const { result: accountsOfSelectedDate } = await getAccountDaily(
        getSelectedDateForGet(selectedDate)
    );
    if (accountsOfSelectedDate.isEmpty()) {
        hideAccountList();
    } else {
        updateAccountListContent(accountsOfSelectedDate);
        showAccountList();
    }
};

export { updateAccountList };
