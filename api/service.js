import * as uuid from "uuid";
import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";
const nodemailer = require("nodemailer");

//E-mail
const USER = "mundo.dos.minions@mundodosminions.com";
const PASS = "minions_123";

//POST
export const registerMinions = handler(async (event) => {
  const data = JSON.parse(event.body);
  const params = {
    TableName: "minions",
    Item: {
      userid: "123",
      minionid: uuid.v1(),
      name: data.name,
      description: data.description,
      image: data.image,
      price: data.price,
      createdAt: Date.now(),
    },
  };
  await dynamoDb.put(params);
  return params.Item;
});

export const createPurchase = handler(async (event) => {
  const data = JSON.parse(event.body);
  const params = {
    TableName: "minionsPurchase",
    Item: {
      userid: "123",
      purchaseid: uuid.v1(),
      name: data.name,
      phone: data.phone,
      amount: data.amount,
      email: data.email,
      minion: data.minion,
      createdAt: Date.now(),
    },
  };
  await dynamoDb.put(params);
  return params.Item;
});

export const sendMailPurchase = handler(async () => {
  const request = transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email enviado: " + info.response);
    }
  });
  return request;
});

//GET
export const getMinions = handler(async () => {
  const params = {
    TableName: "minions",
    KeyConditionExpression: "userid = :userid",
    ExpressionAttributeValues: {
      ":userid": "123",
    },
  };
  const result = await dynamoDb.query(params);
  return result.Items;
});

const transporter = nodemailer.createTransport({
  host: "smtp.umbler.com",
  port: 587,
  secure: false,
  auth: {
    user: USER,
    pass: PASS,
  },
});

const mailOptions = {
  from: USER,
  to: USER,
  subject: "E-mail enviado usando Node!",
  text: "Olha o seu e-mail com node ;)",
  html: "<h1>Título</h1><p>Texto!</p>",
};
