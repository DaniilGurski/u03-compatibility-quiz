# U03 - Compatibility Quiz

## Tips

### Klona projektet till din dator

- Öppna ett nytt fönster i VS Code.
- Klicka på **"Clone Repository"** (du behöver vara inloggad på ditt GitHub-konto).
- Gå till projektets GitHub-sida och kopiera repository-URL:en (visas när du hovrar över **Code**-knappen).
- Klistra in URL:en i VS Code.
- Välj en mapp där projektkoden ska sparas, t.ex. "FJS25/frontend/".
- När kloningen är klar kan du öppna mappen och börja arbeta !

### Skapa en ny branch

- Se till att du är på main-branchen:

```console
git checkout main
```

- Hämta den senaste versionen av koden:

```console
git pull
```

- Skapa och byt till en ny branch

```console
git checkout -b [namn-på-din-branch]
```

- Nu kan du jobba som vanligt – staga och committa din kod.
  När du är klar, ladda upp din branch till GitHub:

```console
git push -u origin [namn-på-din-branch]
```
