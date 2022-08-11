const URL = "http://localhost:3000";
const header = {
    "Content-Type": "application/json",
};

const postAccount = async (body) => {
    return await fetch(`${URL}/account`, {
        headers: header,
        body: JSON.stringify(body),
    }).json();
};

const getTest = async () => {
    return await (await fetch(`${URL}/`)).json();
};

export { getTest };
