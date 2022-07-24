import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

const db = admin.firestore();
const fcm = admin.messaging();


interface ClothsArray extends admin.firestore.DocumentData {
  price?: number;
  title?: string;
  favorites?: Array<any>;

}

interface UsersArray extends admin.firestore.DocumentData {
  token?: string;

}


export const notifyNewMessage = functions.firestore
    .document("clothes/{clothId}")
    .onUpdate(async (snapshot, context) => {
      // const message = snapshot.after.data();

      const event = context.params.clothId;

      console.log(event);

      const dataU = (await db
          .collection("clothes")
          .doc(event)
          .get()).data() as ClothsArray;

      const {price, title, favorites} = dataU;

      console.log(title);
      console.log(price);
      console.log(favorites);

      favorites?.forEach(async (element) => {
        console.log("favorite: "+element);
        const dataUser = (await db
            .collection("user")
            .doc(element)
            .get()).data() as UsersArray;

        const {token} = dataUser;
        const tk = token || "";
        console.log("token: "+tk);

        const payload: admin.messaging.MessagingPayload = {
          notification: {
            title: title,
            body: "Alguem fez uma oferta neste produto que é dos"+
            " seus favoritos. O preço é agora: " + price + "€",
            clickAction: "FLUTTER_NOTIFICATION_CLICK",
          },
        };
        fcm.sendToDevice(
            tk, payload);
      });
    });

