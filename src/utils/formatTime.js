import { format } from "date-fns";

export const convertUnixTimestampToISO = (timestamp) => {
    return format(new Date(timestamp), "dd/MM/yyyy' - 'HH:mm");
};
