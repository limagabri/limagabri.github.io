# Data model

- Language: union en | pt-BR. Initial state en; transition only on explicit language button click.
  Reload destroys the state and restores en. No storage or browser locale inputs.
- Profile: name (exact approved string), initials GL, photo /images/profile.jpg, bilingual role.
- Contact: stable service id; brand name; approved href; bilingual description; local icon path.
  Exactly six initial entries in approved order. Each href is nonempty and http/https;
  Lattes preserves the owner-provided http URL. No tracking parameters.
- Copy: language-group accessible name, navigation label, photo alt, outgoing label and document description.
  Every key must exist in both languages. Brand names and hrefs do not vary by language.
- Photo state: loading -> loaded or error; error exposes GL and removes broken image from presentation.
  File replacement changes deployment content without component changes.
