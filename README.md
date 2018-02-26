# Krypteradchatt
En krypterad chatt applikation med web of trust teknologi

# Installation av React-Native (V1.0)


1. Installera Node, detta görs via länken: https://nodejs.org/en/download/ -> Välj operativsystem -> Kör filen

2. Kör kommandot: "npm install -g create-react-native-app" -> Paketen packas upp & installeras -> Vid fel, använd denna version av Node: https://nodejs.org/en/blog/release/v6.11.1/

### Ett annat alternativ är att använda Yarn: https://yarnpkg.com/en/docs/install
1. Kör kommandot: "create-react-native-app krypteradchatt"
2. Kör kommandot: "cd krypteradchatt"
3. Kör kommandot: "npm start"
4. Projektet lägger sig i mappen: Användare/"Ditt-namn"/krypteradchatt
5. Öppna "App.js"(inte app.json) för att modifiera koden för applikationen

# Git-rutiner
För att göra säkra commits kommer vi använda oss av branches för varje sprint och ifrån den sprinten en branch för varje 'task'.

### Skapa en branch
För att skapa en branch används kommandot:
```
git checkout -b <branch-name>
```
Det är viktigt att tänka på vart ifrån branchen skapas, den skapas från den branch som du befinner dig på när du skriver kommandot ovan. 
> Exempel: Ska vi skapa en branch för sprint1 är vi på master branchen kör sedan kommandot ovan, sedan för att skapa task1 från sprint1 så är vi på sprint1 och kör samma kommando igen fast med det nya branch namnet.
För att byta branch används:
```
git checkout <branch-name>
```
### Pusha och commita på en branch
För att göra nya commits på en branch används dessa kommandon (givet att du är på rätt branch):
```
git add <files> (Alt. -A för alla)
git commit -m "<commit-message>"
git push origin <branch-name>
```
### Mergea branches 
När man känner att sin uppgift är avklarad och man vill mergea den med resten av teamet så används följande kommandon:
```
git checkout <Sprint-Branch-Name>
git pull
git merge <branch-name>
```

### Övrigt

Övriga kommandon som kan vara bra att använda: 
```
git branch // Visar vilka branches som finns och vad de heter.
git status // Se vilken branch du är på samt ifall du har filer att commita
```
Youtube länkar som förklarar arbetsflödet lite mer ingående:

[GIT: Working with Branches](https://www.youtube.com/watch?v=JTE2Fn_sCZs).

[GIT: Merging and Workflow](https://www.youtube.com/watch?v=0iuqXh0oojo).
