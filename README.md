# Frontend (React + Vite + TypeScript)

## Beskrivning

Detta är frontend-delen av applikationen som använder **React**, **Vite** och **TypeScript** för att skapa en snabb och responsiv webbklient. Den kommunicerar med backend-API\:et (Spring Boot) för att hantera vårdmateriel, visa lagerstatus och uppdatera kvantiteter.
Länk till Backend projektet: (https://github.com/AliMalla/item-service.git)
## Installation & körning

### Förutsättningar

* Node.js (version 18 eller högre rekommenderas)
* npm (medföljer Node.js)

### Steg för steg

1. Klona detta repo eller ladda ner källkoden.

   ```bash
   git clone <frontend-repo-url>
   cd <projektmapp>
   ```

2. Installera beroenden:

   ```bash
   npm install
   ```

3. Starta utvecklingsservern:

   ```bash
   npm run dev
   ```

   Standardadress blir: [http://localhost:5173](http://localhost:5173)

4. Se till att backend (Spring Boot) körs på den port som är konfigurerad i `src/api/api.ts` (`http://localhost:8080`).


## Struktur

* `src/components` - Återanvändbara React-komponenter (t.ex. tabell, formulär).
* `src/api` - Axios-anrop till backend.
* `src/types` - TypeScript-typer för produkt-DTO\:er.
* `src/pages` - Sidorna

## Utvecklingsanteckningar
* Ikoner hanteras med `react-icons`.
