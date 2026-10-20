# Movies Dashboard

Dashboard per esplorare il catalogo [TMDB](https://www.themoviedb.org/) e scrivere recensioni personali.

**Demo:** <!-- TODO: link Vercel -->

## Cosa fa

- **Catalogo film** con paginazione server-side, ricerca per titolo (con debounce) e filtri per anno e lingua originale
- **Dettaglio film** con poster, generi, voto medio TMDB e form di recensione (voto 1-5 + testo, validati)
- **Le mie recensioni**: elenco delle recensioni scritte, con voto medio personale
- **Profilo** con nome e avatar modificabili
- Layout responsive con sidebar che diventa menu su mobile

## Stack

Next.js 15 (App Router) · React 19 · TypeScript · MUI + MUI X DataGrid · react-hook-form · Zustand · Vitest

## Architettura

```
app/
  api/tmdb/[...path]/route.ts   proxy server-side verso TMDB
  page.tsx                      catalogo (tabella + filtri)
  details/[id]/                 dettaglio + form recensione
  reviews/  user/               recensioni e profilo
services/api/movies/            chiamate TMDB e logica di paginazione
hooks/                          store Zustand (recensioni, utente) e useTable
components/                     tabella, form RHF, layout, sidebar
utils/api.ts                    client HTTP generico
```

## Scelte tecniche

**Token TMDB solo sul server.** Il browser chiama `/api/tmdb/...`, un route handler che aggiunge il token e inoltra a TMDB. Il proxy accetta solo i tre endpoint usati dall'app (`movie/:id`, `discover/movie`, `search/movie`), così non diventa un accesso libero all'API col nostro token. Le risposte sono cachate per un'ora.

**Paginazione tra due sistemi diversi.** TMDB restituisce sempre pagine da 20 risultati, la tabella ne mostra 5, 10, 15, 20 o 50. `getTmdbPageWindow` converte "pagina N da M righe" nell'intervallo di pagine TMDB da richiedere (in parallelo) e nell'offset da cui tagliare. Il totale è limitato a 10.000 risultati perché TMDB non serve pagine oltre la 500. La logica è isolata in una funzione pura e coperta da test.

**Risposte fuori ordine.** Mentre si digita nel filtro, una risposta vecchia può arrivare dopo quella nuova. Ogni richiesta ha un id e viene applicata solo l'ultima.

**Ricerca per titolo e lingua.** L'endpoint di ricerca di TMDB non supporta il filtro per lingua originale. Invece di filtrare la pagina lato client (con conteggi e paginazione sbagliati), il filtro lingua viene disabilitato durante la ricerca per titolo.

**Stato client con Zustand + persist.** Non c'è un backend utenti: recensioni e profilo sono salvati nel `localStorage`. Zustand è stato scelto per la poca boilerplate rispetto a Context + reducer e per il middleware `persist` già pronto.

**Form con react-hook-form.** Wrapper `RHF*` attorno ai componenti MUI (`components/form`), così ogni form gestisce validazione ed errori allo stesso modo.

## Limiti noti

- Recensioni e profilo vivono nel browser: non sono condivisi tra dispositivi e non esistono recensioni di altri utenti
- L'avatar è salvato come data URL nel `localStorage`: immagini molto grandi possono superarne il limite
- Ordinamento delle colonne non attivo (TMDB lo supporta solo su alcuni campi in `discover`)

## Avvio

```bash
cp .env.example .env.local   # inserisci il tuo TMDB "API Read Access Token"
npm install
npm run dev                  # http://localhost:3000
npm test                     # test della paginazione
```
