import {DateTime} from "luxon";

export const shortDate = (isoDate: string) => {
    return DateTime.fromISO(isoDate).toLocaleString();
}