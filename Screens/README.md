# Screens
Applikationen byggs upp av ett antal skärmar. Vilken skärm som visas beror på hur man har navigerat i appen. De olika skärmarna är Chat, HomeScreen, Profile och QRScanner. Navigeringen är uppbyggd i filen App.js.

# App.js
Appens 4 sidor kan navigeras till på följande sätt, som definieras i App.js. Det finns en StackNavigator som har två vyer: hemvyn och chattvyn. Hemvyn byggs upp av en TabNavigator som har tre vyer: HomeScreen, Profile och QRScanner.

# HomeScreen.js
HomeScreen är den vy som visas när användaren öppnar appen. Här finns en lista av alla chatter som användaren har ackumulerat sedan hen skaffade appen. Det finns även möjlighet att söka efter specifika chatter med hjälp av sökfältet som ligger högst upp i vyn. Här kan man även skapa chatter genom att trycka på ett plustecken i det nedre vänstra hörnet.

## componentWillMount
Funktionen componentWillMount() är en del av React Natives Life Cycle Methods, som du kan läsa mer om här https://engineering.musefind.com/react-lifecycle-methods-how-and-when-to-use-them-2111a1b692b1. Den kallas på när skärmen ska öppnas. Funktionen används i detta fall till att ladda in vissa fonter, samt till att skapa en "Listener" som håller reda på när hem-vyn kommer in i fokus. "Listenern" ser till att kalla på uppdateringsfunktionen, se onRefresh nedan, så att eventuellt tillagda chatter dyker upp direkt i hem-vyn när man navigerar dit, samt att borttagna chatter ska försvinna från hem-vyn direkt.

## onRefresh
Denna funktion uppdaterar den data som ska synas i listan med chatter. När en chatt läggs till eller tas bort är det viktigt att hem-vyn uppdateras så att den reflekterar vilka chatter som faktiskt finns hos användaren. Funktionen hämtar alla chatter från den lokala enheten, via AsyncStorage, och renderar om innehållet som visas på skärmen.

## componentDidMount
Funktionen är en del av React Natives Life Cycle Methods och kallas på när skärmen har öppnats. Här läses alla chatter in från servern för att kunna renderas på skärmen.

## createChat
Navigerar till ett chattfönster som inte är aktiverat, men som innehåller en QR-kod som sedan ska skannas av en annan användare för att skapa kontakt. Det som skickas med till chattfönstret via "navigate" är information som krävs för att skapa en chatt.

## renderButton
Renderar knappen som skapar en chatt. Kallas på i render.

## renderHeader
Renderar headern som innehåller sökrutan. Kallas på i render.

## render
Renderar skärmens innehåll. Uppifrån och ned renderas en statusbar, headern med sökfunktionen, en lista med alla chatter och en knapp för att skapa nya chatter, och sedan en tab-bar längst ned på sidan.

# Chat.js
Chat.js är vyn som anvvändaren ser när hen skapar en ny chatt med någon eller navigerar till en chatt som redan existerar. Det är här kommunikationen med andra användare sker genom att skriva in meddelandet i textrutan längst ned, skicka det, varpå det renderas på skärmen. På samma sätt renderas meddelanden som den andra personen skickat. I chattvyn finns det även möjlighet att radera den aktuella chatten.

## ComponentWillMount
Funktionen kallas på när skärmen ska öppnas, innan renderfunktionen körs. Här laddas relevanta typsnitt in innan fönstret skall renderas.

## ComponentDidMount
Funktionen kallas på när skärmen har öppnats. Används setState i denna funktion triggas en ny rendering, men innan användaren ser något på skärmen. Här hämtas data som är kopplad till rummet, som t.ex. rumsID:et och användarnamnet på den andra användaren, parametrar som skickas med när man trycker på en specifik chatt i hemvyn, som sedan ska visas på skärmen. Även info om ens egen profil hämtas från det lokala lagringsutrymmet.

## renderFlatlist
Denna funktion returnerar de enskilda chattbubblorna: dvs avsändarens avatar, meddelande och klockslag. Utseendet varierar beroende på om det är den aktuella användarens bubbla eller inte.

## decryptMessage
Denna funktion använder den gemensamma kryptonyckeln för rummet (this.state.hash) och avkrypterar det meddelandet som kommer från servern med hjälp av AES-kryptering. För detta används biblioteket Crypto.js.

## sendMessage
Detta sker när användaren trycker på sänd-knappen. Om meddelandet inte är tomt krypteras meddelanndet och meddelande-datan skickas till servern med hjälp av sockets (mer om kommunikation via sockets i avsnitt Backend).

## handleDelete
Om papperskorg-ikonen trycks på dyker en ruta upp som frågar om användaren är säker på att den vill ta bort chatten, om detta görs tas chatten bort från det lokala lagringsutrymmet (mer om lokal lagring i avsnitt "AsyncStorage") och användaren navigeras tillbaka till hemskärmen, där chatten nu saknas.

## render
Renderar skärmens innheåll. Uppifrån och ned renderas en statusbar, header (med bakåtknapp, namn på chatten och delete-funktion), en Flatlist som renderar meddelandeobjekt och en skrivruta.

# QRScanner.js
Skannern är till för att skanna QR-koder för att kunna lägga till en chatt med en annan användare.

## ComponentWillMount
Funktionen kallas på när appen öppnas. Här definieras en "listener" som känner av när Skannern visas på skärmen och sätter en boolean isRead till false i samband med detta. Det är för att se till att det ska gå att läsa in en ny QR-kod. Anledningen till att variabeln finns är för att kameran bara ska läsa in QR-koden en gång innan man navigeras vidare in i den nyskapta chatten. Utan denna variabel hinner kameran läsa in QR-koden flera gånger vilket skapar problem med att flera av samma fönster öpnnas. Så fort en QR-kod läses in sätts alltså variabeln till true, som hindrar skannern från att fortsätta läsa in QR-koden.

## ComponentDidMount
I denna funktion kallas funktionen requestCameraPermission på.

## requestCameraPermission
Ber om användarens tillåtelse att använda kameran för att skanna QR-koder. Sparar svaret i ett state.

## maybeRenderString
Funktionens namn är inte så beskrivande, då den har kvar ett tidigt namn. Sedan dess har funktionens uppgift ändrats. Det funktionen gör är att den tar in en sträng som läses in från QR-koden, och sen delas strängen upp i de olika variablerna med hjälp av en split-funktion. variablerna sparas sedan som ett objekt i AsyncStorage för att lagra chatten i enheten.

# Profile.js
Profilsidan innehåller information om användaren och ger hen möjlighet att redigera sin avatar och användarnamn.

## ComponentWillMount
Funktionen kallas på när skärmen ska öppnas, innan renderfunktionen körs.
SKRIV HÄR

## ComponentWillUnmount
Funktionen kallas på precis innan skärmen stängs ned.
SKRIV HÄR

## ComponentDidMount
Här hämtas information om användaren från det lokala lagringsutrymmet och sparas i komponentens state för att kunna renderas på skärmen.

## saveData
Gör användaren ändringar i profilen och trycker här spras dessa i det lokala lagringsutymmet

## switchImage
Körs när användaren bläddrar mellan utseenden på sin Avatar.

## InfoModul
Trycker användaren på infoknappen högst upp till vänster triggas denna modul, som kort sammanfattar applikationens syfte och innnehåller kontaktinformation.

## render
Renderar skärmens innheåll. Uppifrån och ned renderas en StatusBar, en infoknapp, personens avatar och namn, knappar för att redigera dessa och en spara-knapp.

# QRSCanner

# AsyncStorage
