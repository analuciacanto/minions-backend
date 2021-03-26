import * as uuid from "uuid";
import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";
const nodemailer = require("nodemailer");
var express = require("express");

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
  return "sucesso";
});

//GET

export const getMinion = handler(async (event) => {
  const params = {
    TableName: "minions",
    Key: {
      minionid: event.pathParameters.id, // The id of the note from the path
    },
  };

  const result = await dynamoDb.get(params);
  if (!result.Item) {
    throw new Error("Item not found.");
  }
  return result.Item;
});

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
