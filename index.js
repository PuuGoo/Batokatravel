import express from "express";
import moment from "moment";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import querystring from "qs";
import crypto from "crypto";
const app = express();
const router = express.Router();

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res, next) => {
  res.sendFile(__dirname + "/public/order.html");
});

app.post("/create_payment_url", (req, res, next) => {
  let totalPrice = 0;
  console.log(totalPrice);

  const data = async () => {
    try {
      const data_api = await fetch("http://localhost:3000/orders", {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => {
          for (const item of data) {
            totalPrice += Number(item.idProd.price) * Number(item.quantity);
          }
           let date = new Date();
           let createDate = moment(date).format("YYYYMMDDHHmmss");
           let ipAddr =
             req.headers["x-forwarded-for"] ||
             req.connection.remoteAddress ||
             req.socket.remoteAddress ||
             req.connection.socket.remoteAddress;
           let tmnCode = "DJCI0NST";
           let secretKey = "ABUZDCFOBMBVJTJBCOTICVYVXGGXMONG";
           let vnpUrl = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
           let returnUrl = "http://localhost:4200/checkoutSuccess";
           let orderId = moment(date).format("DDHHmmss");
           let amount = totalPrice;
           // let amount = req.body.amount;
           let bankCode = "VNBANK";
           let locale = "vn";
           if (locale === null || locale === "") {
             locale = "vn";
           }
           let currCode = "VND";
           let vnp_Params = {};
           vnp_Params["vnp_Version"] = "2.1.0";
           vnp_Params["vnp_Command"] = "pay";
           vnp_Params["vnp_TmnCode"] = tmnCode;
           vnp_Params["vnp_Locale"] = locale;
           vnp_Params["vnp_CurrCode"] = currCode;
           vnp_Params["vnp_TxnRef"] = orderId;
           vnp_Params["vnp_OrderInfo"] = "Thanh toan cho ma GD:" + orderId;
           vnp_Params["vnp_OrderType"] = "other";
           vnp_Params["vnp_Amount"] = amount * 100;
           vnp_Params["vnp_ReturnUrl"] = returnUrl;
           vnp_Params["vnp_IpAddr"] = ipAddr;
           vnp_Params["vnp_CreateDate"] = createDate;
           if (bankCode !== null && bankCode !== "") {
             vnp_Params["vnp_BankCode"] = bankCode;
           }
           vnp_Params = sortObject(vnp_Params);
           let signData = querystring.stringify(vnp_Params, { encode: false });
           let hmac = crypto.createHmac("sha512", secretKey);
           let signed = hmac
             .update(new Buffer(signData, "utf-8"))
             .digest("hex");
           vnp_Params["vnp_SecureHash"] = signed;
           vnpUrl += "?" + querystring.stringify(vnp_Params, { encode: false });
           res.redirect(vnpUrl);
        });
    } catch (err) {
      console.log(`${err}`);
    }
  };

  data();

  //   const data_api = fetch("http://localhost:3000/order", {
  //     method: "GET",
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       for (const item of data) {
  //         console.log(item);
  //         totalPrice += Number(item.idProd.price) * Number(item.quantity);
  //       }

  //   let date = new Date();
  //   let createDate = moment(date).format("YYYYMMDDHHmmss");

  //   let ipAddr =
  //     req.headers["x-forwarded-for"] ||
  //     req.connection.remoteAddress ||
  //     req.socket.remoteAddress ||
  //     req.connection.socket.remoteAddress;

  //   let tmnCode = "DJCI0NST";
  //   let secretKey = "ABUZDCFOBMBVJTJBCOTICVYVXGGXMONG";
  //   let vnpUrl = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
  //   let returnUrl = "http://localhost:8888/order/vnpay_return";
  //   let orderId = moment(date).format("DDHHmmss");
  //   let amount = totalPrice;
  //   // let amount = req.body.amount;
  //   let bankCode = req.body.bankCode;

  //   let locale = req.body.language;
  //   if (locale === null || locale === "") {
  //     locale = "vn";
  //   }
  //   let currCode = "VND";
  //   let vnp_Params = {};
  //   vnp_Params["vnp_Version"] = "2.1.0";
  //   vnp_Params["vnp_Command"] = "pay";
  //   vnp_Params["vnp_TmnCode"] = tmnCode;
  //   vnp_Params["vnp_Locale"] = locale;
  //   vnp_Params["vnp_CurrCode"] = currCode;
  //   vnp_Params["vnp_TxnRef"] = orderId;
  //   vnp_Params["vnp_OrderInfo"] = "Thanh toan cho ma GD:" + orderId;
  //   vnp_Params["vnp_OrderType"] = "other";
  //   vnp_Params["vnp_Amount"] = amount * 100;
  //   vnp_Params["vnp_ReturnUrl"] = returnUrl;
  //   vnp_Params["vnp_IpAddr"] = ipAddr;
  //   vnp_Params["vnp_CreateDate"] = createDate;
  //   if (bankCode !== null && bankCode !== "") {
  //     vnp_Params["vnp_BankCode"] = bankCode;
  //   }

  //   vnp_Params = sortObject(vnp_Params);

  //   let signData = querystring.stringify(vnp_Params, { encode: false });
  //   let hmac = crypto.createHmac("sha512", secretKey);
  //   let signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");
  //   vnp_Params["vnp_SecureHash"] = signed;
  //   vnpUrl += "?" + querystring.stringify(vnp_Params, { encode: false });

  //   res.redirect(vnpUrl);
  // });
});

function sortObject(obj) {
  let sorted = {};
  let str = [];
  let key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      str.push(encodeURIComponent(key));
    }
  }
  str.sort();
  for (key = 0; key < str.length; key++) {
    sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
  }
  return sorted;
}

app.listen(8080, () => {
  console.log("Sever dang chay");
});
