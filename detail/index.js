import { updateAccountListMonthly } from "./monthly-account-list.js";
import { getCurrentDate } from "../local-storage.js";

const currentDate = getCurrentDate();
updateAccountListMonthly(currentDate);
