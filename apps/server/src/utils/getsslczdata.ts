import config from "../config/index.js";
import { IPayment } from "../models/payment/interface.js";
import { IUser } from "../models/user/interface.js";

const getsslczdata = (payment: IPayment, user: IUser) => {
    return {
        currency: "BDT",
        tran_id: payment.tran_id,
        total_amount: payment.plan === "professional" ? 99 : 199,
        success_url: `${config.server_url}/success/${payment.id}`,
        fail_url: `${config.server_url}/fail/${payment.id}`,
        cancel_url: `${config.server_url}/cancel/${payment.id}`,
        ipn_url: `${config.server_url}/ipn`,
        shipping_method: "Courier",
        product_name: "Computer.",
        product_category: "Electronic",
        product_profile: "general",
        cus_name: user.name,
        cus_email: user.email,
        cus_add1: user.address,
        cus_add2: "Dhaka",
        cus_city: "Dhaka",
        cus_state: "Dhaka",
        cus_postcode: "1000",
        cus_country: "Bangladesh",
        cus_phone: user.phone,
        cus_fax: user.phone,
        ship_name: user.name,
        ship_add1: user.address,
        ship_add2: "Dhaka",
        ship_city: "Dhaka",
        ship_state: "Dhaka",
        ship_postcode: 1000,
        ship_country: "Bangladesh",
    };
};

export default getsslczdata;
