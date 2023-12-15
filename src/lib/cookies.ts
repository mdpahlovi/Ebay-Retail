import Cookies from "js-cookie";

export function setCookies(token: string) {
    return Cookies.set("ebay-retail-auth", token, { expires: 1 });
}

export function getCookies() {
    return Cookies.get("ebay-retail-auth");
}

export function removeCookies() {
    return Cookies.remove("ebay-retail-auth");
}
