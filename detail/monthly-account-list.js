import { getAccountMonthly } from "../server/api.js";

Array.prototype.isEmpty = function () {
    return this.length === 0;
};

const updateAccountListTitle = (currentDate) =>
    (document.querySelector("#section-title").innerHTML = `${currentDate.getFullYear()}년 ${
        currentDate.getMonth() + 1
    }월의 내역입니다.`);

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

const updateAccountListContent = (accountsOfCurrentDate) =>
    (document.querySelector("#section-list").innerHTML = accountsOfCurrentDate
        .map(getHtmlForList)
        .join(""));

const getCurrentDateForGet = (currentDate) =>
    new Date(+currentDate + 3240 * 10000).toISOString().substring(0, 8);

const updateAccountListMonthly = async (currentDate) => {
    updateAccountListTitle(currentDate);
    const { result: accountsOfCurrentDate } = await getAccountMonthly(
        getCurrentDateForGet(currentDate)
    );
    updateAccountListContent(accountsOfCurrentDate);
};

export { updateAccountListMonthly };
