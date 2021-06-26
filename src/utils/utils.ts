import { toast } from "react-toastify";

export interface ProxyObjectType { }

const emptyProxyObject: ProxyObjectType = new Proxy({}, {});

const isEmpty = (val: any) => {
    if (val === emptyProxyObject) return true;
    if (val === undefined) return true;
    if (
        typeof val == "function" ||
        typeof val == "number" ||
        typeof val == "boolean" ||
        Object.prototype.toString.call(val) === "[object Date]"
    )
        return false;
    if (val == null || val.length === 0)
        return true;
    if (typeof val == "object") if (Object.keys(val).length === 0) return true;
    return false;
};

export const getValue = (val: any) => {
    return isEmpty(val) ? "-" : val;
};

export const notify = (type: string, message: string) => {
    type === "success"
        ? toast.success(message, {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 2000,
        })
        : toast.error(message, {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 2000,
        });
};

export { isEmpty, emptyProxyObject };