export function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD') // Rozbija znaki diakrytyczne (np. ę -> e + ˛, ü -> u + ¨)
    .replace(/[\u0300-\u036f]/g, '') // Usuwa znaki akcentów
    .replace(/ł/g, 'l') // Specjalna obsługa 'ł' (NFD go nie zamienia)
    .replace(/Ł/g, 'l')
    .replace(/[^a-z0-9\s-]/g, '') // Usuwa znaki specjalne (!?.() itp.)
    .trim() // Usuwa spacje z początku i końca
    .replace(/\s+/g, '-'); // Zamienia spacje (jedną lub wiele) na myślnik
}