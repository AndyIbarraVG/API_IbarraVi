# Web Services y API REST

Este documento resume las definiciones, tecnologías y estructuras fundamentales para entender la comunicación entre sistemas.

---

## 1. Definiciones

### Web Service
Es una aplicación de software que permite la comunicación y el intercambio de datos entre diferentes sistemas o aplicaciones a través de una red, generalmente Internet, utilizando protocolos y estándares estandarizados como HTTP, XML o JSON.

### API
Es un conjunto de reglas, protocolos y herramientas que permiten que dos aplicaciones de software se comuniquen entre sí, intercambiando datos, servicios o funcionalidades.

---

## 2. Tecnologías y Protocolos

Existen diferentes formas de implementar la comunicación entre sistemas:

### Arquitecturas y Protocolos
* **REST:** Utiliza métodos HTTP y formatos ligeros como JSON. Es el estándar de la web moderna.
* **SOAP:** Protocolo estricto basado en XML. Muy utilizado en entornos bancarios por su alta seguridad y transaccionalidad.
* **GraphQL:** Lenguaje de consulta que permite al cliente pedir exactamente los datos que necesita.
* **gRPC:** Protocolo de Google de alto rendimiento que utiliza buffers binarios (Protocol Buffers).



### Formatos de Intercambio de Datos
* **JSON (JavaScript Object Notation):** Formato ligero, fácil de leer para humanos y máquinas. Es el estándar en REST.
* **XML (eXtensible Markup Language):** Formato más robusto y verboso, utilizado principalmente en SOAP.

---

## 3. Frameworks de Implementación

Dependiendo del lenguaje de programación, estos son los frameworks líderes para crear APIs:

| Lenguaje | Frameworks Populares |
| :--- | :--- |
| **JavaScript (Node.js)** | Express.js, NestJS |
| **Python** | FastAPI, Django REST Framework, Flask |
| **Java** | Spring Boot |
| **C#** | ASP.NET Core |
| **PHP** | Laravel, Symfony |

---

## 4. Anatomía de una Petición REST

Las peticiones se realizan sobre "Recursos" (como usuarios, productos o pedidos) utilizando los métodos del protocolo HTTP:

### Métodos HTTP
* `GET /usuarios`: Recupera la lista de usuarios.
* `POST /usuarios`: Crea un nuevo usuario (envía datos en el cuerpo).
* `PUT /usuarios/1`: Actualiza el usuario con ID 1.
* `DELETE /usuarios/1`: Elimina al usuario con ID 1.

### Ejemplo de una respuesta en formato JSON:
```json
{
  "id": 1,
  "nombre": "Andy Ibarra",
  "email": "AndyIbarraVG@outlook.com",
  "edad": 24
}