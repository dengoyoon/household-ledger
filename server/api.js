const URL = "http://localhost:3000";
const header = {
    "Content-Type": "application/json",
};

const postAccount = async (body) => {
    const response = await fetch(`${URL}/account`, {
        method: "POST",
        headers: header,
        body: JSON.stringify(body),
    });
    return response.json();
};

const getAccountDaily = async (date) => {
    const response = await fetch(`${URL}/account/date?date=${date}`);
    return response.json();
};

const getAccountMonthly = async (yearMonth) => {
    const response = await fetch(`${URL}/account/month?yearMonth=${yearMonth}`);
    return response.json();
};

const getAll = async () => {
    const response = await fetch(`${URL}/`);
    return response.json();
};

export { getAll, postAccount, getAccountDaily, getAccountMonthly };
