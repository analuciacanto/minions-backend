import * as uuid from "uuid";
import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

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

//GET

export const getMinion = handler(async (event) => {
  const params = {
    TableName:"minions",
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