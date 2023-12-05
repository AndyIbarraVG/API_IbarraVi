# Principios de la Arquitectura REST

## 1. Cliente-Servidor:

**Principio:** La arquitectura REST sigue el modelo cliente-servidor, donde el cliente y el servidor son entidades separadas y se comunican a través de una interfaz bien definida. Esta separación permite la evolución independiente de las interfaces de usuario y la lógica del servidor. Los clientes no necesitan conocer la implementación interna del servidor, lo que mejora la escalabilidad y la portabilidad.

**Implicaciones:** Mejora la escalabilidad y la portabilidad al desacoplar la presentación de la aplicación de la lógica de negocio.

## 2. Sin Estado (Stateless):

**Principio:** Cada solicitud del cliente al servidor contiene toda la información necesaria para entender y procesar la solicitud. El servidor no almacena información sobre el estado del cliente entre solicitudes. Esto significa que cada solicitud es independiente y autocontenido. La falta de estado en el servidor simplifica la implementación y mejora la confiabilidad y la escalabilidad del sistema.

**Implicaciones:** Facilita la escalabilidad y la confiabilidad al no depender del estado almacenado en el servidor.
## 3. Cacheable:

**Principio:** Las respuestas del servidor deben indicar si pueden ser almacenadas en caché por el cliente. Al permitir el almacenamiento en caché, se mejora la eficiencia de la red y se reduce la carga en el servidor, ya que el cliente puede reutilizar respuestas previas sin tener que realizar solicitudes adicionales al servidor.

**Implicaciones:** Mejora la eficiencia al permitir que el cliente reutilice respuestas almacenadas en caché, reduciendo así la latencia y el consumo de recursos.

## 4. Interfaz Uniforme:

**Principio:** La interfaz entre el cliente y el servidor debe ser uniforme y consistente. Incluye cuatro restricciones:

- **Identificación de recursos:** Cada recurso debe tener una identificación única (URI).
    
- **Manipulación de recursos a través de representaciones:** Los recursos son manipulados a través de representaciones, como JSON o XML. El cliente puede enviar una representación al servidor para modificar o crear un recurso.
    
- **Mensajes auto descriptivos:** Cada mensaje contiene toda la información necesaria para entender y procesar la solicitud o respuesta, lo que facilita la comprensión sin necesidad de estados adicionales.
    
- **HATEOAS (Hipermedia como Motor del Estado de la Aplicación):** El cliente interactúa con la aplicación exclusivamente a través de hipermedios proporcionados de forma dinámica por las aplicaciones servidores. Esto permite una mayor flexibilidad y evita la necesidad de que el cliente tenga un conocimiento previo de la aplicación.

## 5. Sistema Distribuido:

**Principio:** La arquitectura REST está diseñada para ser escalable en entornos distribuidos, donde los componentes pueden estar ubicados en diferentes nodos de red. Cada recurso es identificado por un URI único, lo que facilita su ubicación y acceso en un entorno distribuido.

**Implicaciones:** Facilita la implementación y el escalado de sistemas distribuidos a través de la simplicidad y la independencia de los componentes.

## 6. Representaciones:

**Principio:** Los recursos en la arquitectura REST son representados y manipulados a través de representaciones, que pueden ser en formatos como JSON, XML, HTML, etc. Esto permite la flexibilidad y la interoperabilidad, ya que los clientes y servidores pueden negociar y trabajar con diferentes formatos de representación según sus capacidades y preferencias.

**Implicaciones:** Permite la flexibilidad y la interoperabilidad al admitir diferentes formatos de representación para los recursos.
