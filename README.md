# Smart Visit Pisa

Web App installabile, che permette la visita della città di Pisa attraverso l'aiuto di una guida turistica virtuale

## Funzionalità

- Visualizzare sulla mappa i punti di interesse e la posizione dell'utente
- Reperire informazioni dettagliate sui punti di interesse
- Acquistare biglietti per monumenti o eventi
- Visualizzare i biglietti acquistati
- Possibilità di vedere eventi e biglietti scaduti
- Ottenere direzioni da Google Maps per arrivare alla destinazione
- (Solo amministratore) Inserire, modificare ed eliminare punti di interesse ed eventi
- (Solo amministratore) I biglietti e gli eventi passati non possono essere nè modificati nè eliminati, un po' come se agissero come uno storico da non toccare.
- Utilizzabile offline nel caso in cui il client perda la connessione per un periodo limitato, oppure se i dati necessari sono già tutti salvati in cache. Le modifiche vengono apportate al server quando il client torna online, automaticamente, mentre vengono visualizzate già nella applicazione offline. Se la cache non ha le informazioni necessarie per visualizzare la pagina, l'utente viene mandato ad una pagina di fallback.

## Errori / Scelte implementative:

- In cache vengono salvati anche i tiles della mappa, ho provato ad escluderla ma non sono riuscito. Per questo la cache arriva anche ad un paio di GB, ma ho deciso di lasciarla così e non limitare la sua dimensione perché almeno si può usare la mappa anche offline, ed inoltre non corro il rischio che la cache venga riempita in modo non ottimale solo dalla mappa. Ovviamente per una applicazione da pubblicare online non sarebbe la scelta corretta occupare troppo spazio sul client.
- Il database inizialmente veniva gestito con le getDocs invece che onSnapshot, per avere una esperienza migliore. Ho sostituito il metodo per reperire le informazioni dal server in tempo reale, però facendo ciò non riuscivo più a gestire le "chiavi secondarie" delle tabelle, quindi ho usato la ridondanza delle informazioni (ho letto che essendo un database basato su JSON è accettabile), anche se personalmente preferisco la metodologia SQL-like.
- Sulla console vengono stampati molti errori quando si è offline, è firebase che tenta di collegarsi alla rete. Non ho capito come posso fermarlo dal fare richieste, ma per tamponare il problema ho messo nell'event handler 'offline' la chiamata a disableNetwork(db), che mi ha aiutato a sopprimere alcuni errori, perché firestore guarda subito sulla cache.
- Quando aggiorno la pagina manualmente, spunta per mezzo secondo la pagina del login, probabilmente perché firebase ci mette un po a comunicare che l'utente è loggato.
Probabilmente ho usato male react router, ma non ho trovato la convenzione su come viene fatto di solito.
- Le dipendenze dei biglietti (nomeEvento, nomePoi), e degli eventi (nomePoi) non vengono aggiornate ma sono definitive.
- La mia idea per la notifica era che quando l'utente si avvicina ad un punto di interesse, arriva la notifica per visualizzare i dettagli.
- Per non complicare troppo l'implementazione ho fatto il contrario, se viene aperto il dettaglio arriva una notifica per visualizzare il punto sulla mappa.
- I markers dovevano essere raggruppati in un <MarkerClusterGroup>, che però non funzionava, quindi l'ho rimosso. Questo garantiva una migliore visualizzazione quando i marker si sovrapponevano.
