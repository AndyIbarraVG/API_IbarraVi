let frases = [ "Hola", "¿Qué tal?", "Adiós", "Buenos días", "Buenas tardes", "Buenas noches" ];

export function ObtieneFrase() {
    return frases[Math.floor(Math.random() * frases.length)];
}