import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/core";
import { auth, db } from "../firebase";

export default function SignupClient() {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [cin, setCin] = useState("");
  const [numerodetelephone, setNumerodetelephone] = useState("");
  const [email, setEmail] = useState("");
  const [motdepasse, setMotdepasse] = useState("");
  const [motdepasseConfirmation, setMotdepasseConfirmation] = useState("");
  const handleSignup = () => {
    if (motdepasse !== motdepasseConfirmation) {
      alert("Les mots de passe ne correspondent pas");
      return;
    }
    auth
      .createUserWithEmailAndPassword(email, motdepasse)
      .then((userCredential) => {
        const user = userCredential.user;

        user
          .updateProfile({
            displayName: nom,
          })
          .then(() => {
            user
              .sendEmailVerification()
              .then(() => {})
              .catch((error) => {
                console.log(error.message);
              });
          })
          .catch((error) => {
            console.log(error.message);
          });

        db.collection("users")
          .doc(user.uid)
          .set({
            nom: nom,
            prenom: prenom,
            cin: cin,
            numerodetelephone: numerodetelephone,
            email: email,
            role: "client",
          })
          .then(() => {
            console.log("user ajouté!");
          })
          .catch((error) => {
            console.error("Error writing document: ", error);
          });
      })
      .then(() => {
        navigation.replace("validationsuccess");
      })

      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };
  const navigation = useNavigation();
  const handleBack = () => {
    navigation.replace("SignupChoix");
  };
  const s = require("../styles/Style");

  return (
    <View style={s.container}>
      <View style={s.headerView}>
        <Text style={s.TextInscrit}>Inscription!</Text>
        <Text style={s.TextbienvInscrit}>
          Vous êtes le bienvenue notre cher client !{" "}
        </Text>
      </View>

      <View style={s.NomPrenomViewInscrit}>
        <TextInput
          style={s.NomPrenomTextInputInscrit}
          placeholder="Nom "
          placeholderTextColor="#003f5c"
          value={nom}
          onChangeText={(text) => setNom(text)}
        />

        <TextInput
          placeholder="Prénom"
          style={s.NomPrenomTextInputInscrit}
          placeholderTextColor="#003f5c"
          value={prenom}
          onChangeText={(text) => setPrenom(text)}
        />
      </View>
      <View style={s.inputViewInscrit}>
        <TextInput
          style={styles.inputTextInscrit}
          placeholder="CIN "
          placeholderTextColor="#003f5c"
          value={cin}
          onChangeText={(text) => setCin(text)}
        />
        <TextInput
          style={styles.inputTextInscrit}
          placeholder="Numéro de telephone "
          placeholderTextColor="#003f5c"
          value={numerodetelephone}
          onChangeText={(text) => setNumerodetelephone(text)}
        />

        <TextInput
          placeholder="Email"
          style={styles.inputTextInscrit}
          placeholderTextColor="#003f5c"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />

        <TextInput
          style={styles.inputTextInscrit}
          placeholder="Mot de passe "
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          value={motdepasse}
          onChangeText={(text) => setMotdepasse(text)}
        />

        <TextInput
          placeholder="Confirmer mot de passe"
          style={styles.inputTextInscrit}
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          value={motdepasseConfirmation}
          onChangeText={(text) => setMotdepasseConfirmation(text)}
        />
      </View>

      <View style={s.buttonContainerInscrit}>
        <TouchableOpacity onPress={handleSignup} style={styles.buttonInscrit}>
          <Text style={s.buttonTextInscrit}>S'inscrire</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 20,
          width: "90%",
          top: -50,
        }}
      >
        <View style={{ flex: 1, height: 1.5, backgroundColor: "black" }} />
        <View>
          <Text style={{ width: 50, textAlign: "center", fontSize: 16 }}>
            Or
          </Text>
        </View>
        <View style={{ flex: 1, height: 1.5, backgroundColor: "black" }} />
      </View>
 
      <View
        style={{
          width: "90%",
          top: -40,
        }}
      >
        <Text style={s.TextcreerInscrit}>Vous avez déjà un compte ?</Text>
        <Text style={s.TextconnecterInscrit} onPress={()=> navigation.navigate("Signin")}>Connectez-vous</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  inputTextInscrit: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderRadius: 10,
    height: "13%",
    borderWidth: 1,
    marginBottom: 10,

    fontSize: 14,
  },
  buttonInscrit: {
    backgroundColor: "#2DBDBD",
    width: "80%",
    padding: 15,
    borderRadius: 10,
    marginLeft: "auto",
    marginRight: "auto",
    top: -70,
  },
});
