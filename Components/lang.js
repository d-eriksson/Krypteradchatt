import { NativeModules } from 'react-native'

const TERMS = {};

export function setTerms(i18nLocale, objectTerms) {
  TERMS[i18nLocale] = objectTerms;
}

export function __translate(term) {

  //check if localeIdentifier exists
  if (NativeModules.I18nManager.localeIdentifier) {

    const i18nLocale = NativeModules.I18nManager.localeIdentifier;

    //Check if has registered terms in current i18nLocale;
    if (TERMS[i18nLocale]){
      
      //Return the registered or empty string to prevent error
      return TERMS[i18nLocale][term] || '';

    } else {
      
      //Check if has language without a especific region like 
      //Example en-CA to en
      const simplei18nLocale = i18nLocale.split('_')[0];

      return TERMS[simplei18nLocale][term] || '';

    }
  }
}
export function buildTerms(){
  setTerms("en", {
      "Home" : "Home",
      "Profile" : "Profile",
      "Scanner" : "Scanner",
      "Search..." : "Search...",
      "Edit avatar" : "Edit avatar",
      "Username" : "Username",
      "Save" : "Save",
      "Change emote" : "Change emote",
      "Back to profile" : "Back to profile",
      "Type something secret..." : "Type something secret...",
      "Let a friend scan the QR-code" : "Let a friend scan the QR-code",
      "New chat" : "New chat",
      "Delete" : "Delete",
      "Cancel" : "Cancel",
      "Next" : "Next",
      "Back" : "Back",
      "Do you want to delete this account? You cannot undo this action." : "Do you want to delete this account? You cannot undo this action.",
      "Welcome to mumblr" : "Welcome to mumblr",
      "The chat app where everybody is your friend!" : "The chat app where everybody is your friend!",
      "Click a button like this one!" : "Click a button like this one!",
      "To create a chat with your firend!" : "To create a chat with your firend!",
      "Have a friend scan your QR-code" : "Have a friend scan your QR-code",
      "And bob's your uncle!" : "And bob's your uncle!",
      "Pick an avatar!" : "Pick an avatar!",
      "Lastly add a name" : "Lastly add a name",
      "Name" : "Name",
  });
  setTerms("sv", {
      "Home" : "Hem",
      "Profile" : "Profil",
      "Scanner" : "Skanner",
      "Search..." : "Sök...",
      "Edit avatar" : "Redigera avatar",
      "Username" : "Användarnamn",
      "Save" : "Spara",
      "Change emote" : "Ändra uttryck",
      "Back to profile" : "Tillbaka till profilen",
      "Type something secret..." : "Skriv något hemligt...",
      "Let a friend scan the QR-code" : "Låt en vän skanna QR-koden",
      "New chat" : "Ny chatt",
      "Delete" : "Ta bort",
      "Cancel" : "Avbryt",
      "Next" : "Nästa",
      "Back" : "Tillbaka",
      "Do you want to delete this account? You cannot undo this action." : "Vill du ta bort det här kontot? Du kan inte ångra detta.",
      "Welcome to mumblr" : "Välkommen till mumblr",
      "The chat app where everybody is your friend!" : "Chatt appen där alla är kompisar",
      "Click a button like this one!" : "Klicka på en knapp som denna!",
      "To create a chat with your firend!" : "För att skapa en chatt med din vän",
      "Have a friend scan your QR-code" : "Låt en vän skanna din QR-kod",
      "And bob's your uncle!" : "Och Bob är din farbror",
      "Pick an avatar!" : "Välj en avatar",
      "Lastly add a name" : "Lägg till ett namn",
      "Name" : "Namn",
  });
  setTerms("es", {
      "Home" : "Casa",
      "Profile" : "Perfil",
      "Scanner" : "Escáner",
      "Search..." : "Buscar...",
      "Edit avatar" : "Editar Avatar",
      "Username" : "Nombre de usuario",
      "Save" : "Salvar",
      "Change emote" : "Cambiar emote",
      "Back to profile" : "Volver al perfil",
      "Type something secret..." : "Escribe algo secreto...",
      "Let a friend scan the QR-code" : "Deje que un amigo escanee el código QR",
      "New chat" : "Nueva conversación",
      "Delete" : "Borrar",
      "Cancel" : "Cancelar",
      "Next" : "Siguiente",
      "Back" : "Espalda",
      "Do you want to delete this account? You cannot undo this action." : "¿Quieres eliminar esta cuenta? No puedes deshacer esta acción.",
      "Welcome to mumblr" : "Bienvenido a mumblr",
      "The chat app where everybody is your friend!" : "¡La aplicación de chat donde todos son tus amigos!",
      "Click a button like this one!" : "Haga clic en un botón como este!",
      "To create a chat with your firend!" : "Para crear una conversación con tu amigo!",
      "Have a friend scan your QR-code" : "Haga que un amigo escanee su código QR",
      "And bob's your uncle!" : "¡Y Bob es tu tío!",
      "Pick an avatar!" : "Elige un avatar!",
      "Lastly add a name" : "Por último agrega un nombre",
      "Name" : "Nombre",
  });
}