# Screens
Applikationen byggs upp av ett antal skärmar. Vilken skärm som visas beror på hur man har navigerat i appen. De olika skärmarna är Chat, HomeScreen, Profile och QRScanner.

# HomeScreen
HomeScreen är den vy som visas när användaren öppnar appen. Här finns en lista av alla chatter som användaren har ackumulerat sedan hen skaffade appen. Det finns även möjlighet att söka efter specifika chatter med hjälp av sökfältet som ligger högst iupp i vyn. Här kan man även skapa chatter genom att trycka på ett plustecken i det nedre vänstra hörnet.

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

# ChatScreen

## 
