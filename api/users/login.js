import "../../config"

import { doc, setDoc } from "firebase/firestore"; 

await setDoc(doc(db, "cities", "new-city-id"), data);