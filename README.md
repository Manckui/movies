# Movies Dashboard

Dashboard per esplorare il catalogo [TMDB](https://www.themoviedb.org/) e scrivere recensioni personali.

**Demo:** https://movies-ten-phi-66.vercel.app

## Cosa fa

- **Catalogo film** con paginazione (20 film per pagina), ricerca per titolo e filtri per anno e lingua originale
- **Dettaglio film** con poster, generi, voto medio TMDB e form di recensione (voto 1-5 + testo, validati)
- **Le mie recensioni**: elenco delle recensioni scritte, con voto medio personale
- **Profilo** con nome e avatar modificabili
- Layout responsive con sidebar che diventa menu su mobile

## Stack

Next.js 15 (App Router) · React 19 · TypeScript · MUI + MUI X DataGrid · react-hook-form · Zustand

## Architettura

```
app/
  page.tsx                Server Component: legge i filtri dall'URL e carica i film
  movies-filters.tsx      form dei filtri (next/form, nessuno stato React)
  movies-view.tsx         client: metriche, tabella, cambio pagina
  details/[id]/page.tsx   Server Component: carica il film
  details/[id]/review-form.tsx   client: form di recensione
  reviews/  user/         recensioni e profilo (client, dati nel localStorage)
  loading.tsx error.tsx   caricamento ed errore gestiti da Next
services/tmdb.ts          chiamate a TMDB (solo lato server)
hooks/                    store Zustand (recensioni, utente)
components/               tabella, form RHF, layout, sidebar
```

## Scelte tecniche

**Dati caricati sul server.** Le pagine catalogo e dettaglio sono Server Components: chiamano TMDB direttamente sul server e mandano al browser l'HTML già pronto. Il token (`TMDB_ACCESS_TOKEN`, senza prefisso `NEXT_PUBLIC_`) non arriva mai al browser, quindi non serve un proxy. Le risposte sono in cache per un'ora.

**Lo stato del catalogo è nell'URL.** Pagina e filtri sono parametri dell'URL (`/?title=matrix&page=2`). I filtri sono un form: premendo "Cerca" Next aggiorna l'URL e la pagina viene rigenerata sul server. Il cambio pagina della tabella fa lo stesso con `router.push`. Gli URL sono condivisibili e il tasto indietro funziona.

**Client solo dove serve.** Sono componenti client solo le parti interattive o che leggono il `localStorage`: tabella, form di recensione, recensioni, profilo.

**Pagine da 20.** TMDB restituisce sempre 20 risultati per pagina, quindi la tabella usa la stessa misura: pagina N della tabella = pagina N di TMDB. Il totale è limitato a 10.000 perché TMDB non serve pagine oltre la 500.

**Ricerca per titolo e lingua.** L'endpoint di ricerca di TMDB non supporta il filtro per lingua originale: durante la ricerca per titolo la lingua viene ignorata (indicato sotto il campo).

**Stato client con Zustand + persist.** Non c'è un backend utenti: recensioni e profilo sono salvati nel `localStorage`. Zustand per la poca boilerplate e il middleware `persist` già pronto.

**Form con react-hook-form.** Wrapper `RHF*` attorno ai componenti MUI (`components/form`), così ogni form gestisce validazione ed errori allo stesso modo.

## Limiti noti

- Recensioni e profilo vivono nel browser: non sono condivisi tra dispositivi e non esistono recensioni di altri utenti
- L'avatar è salvato come data URL nel `localStorage`: immagini molto grandi possono superarne il limite
- Ordinamento delle colonne non attivo
- La dimensione della pagina è fissa a 20

## Avvio

```bash
cp .env.example .env.local   # inserisci il tuo TMDB "API Read Access Token"
npm install
npm run dev                  # http://localhost:3000
```
