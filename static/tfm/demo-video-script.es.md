# Open Projects Hub: guion del vídeo de demostración

Versión en español de [demo-video-script.md](./demo-video-script.md).

Duración objetivo: unos 6,5 minutos, empezando por la demostración. Escrito para la API v0.2.0 y la web v0.3.0 (2026-10-28).

El vídeo es un entregable distinto de la presentación (`open-projects-hub-tfm.pptx`), así que muestra la aplicación en funcionamiento y usa las diapositivas solo para plantear la idea y para explicar los límites. La arquitectura y la producción se dejan para la presentación.

Los pasos siguen los flujos documentados y el ejemplo ficticio del "formulario de contacto de un cliente" de la [guía del revisor](https://oph-docs.alonsovndev.com/docs/00-context/reviewer-guide). El guion se ha escrito a partir del código y de la documentación, no de una grabación real, así que conviene comprobar el texto de los botones durante el ensayo.

Los textos de la interfaz (**Create Account**, **Got it**, **Copy client link**…) se dejan en inglés porque así aparecen en pantalla. Solo se traduce lo que se dice en voz alta.

## Antes de grabar

- Usar una cuenta nueva para que aparezca la bienvenida de primer uso, o usar Settings > Reset onboarding.
- Usar una bandeja de entrada real a la que se pueda acceder. El código del correo caduca a los 5 minutos, y el correo incluye además un enlace que lo rellena automáticamente.
- Cada refinamiento gasta uno de los 5 créditos gratuitos de la cuenta, así que no hay que ensayar con la cuenta de la grabación.
- Una respuesta real de la IA tarda entre 10 y 45 segundos. Cortar la espera en la edición.
- Grabar a 1080p con el zoom del navegador al 110 % y sin marcadores visibles. Abrir una ventana privada para Client Review.
- Usar solo datos sintéticos. No mostrar contraseñas, claves de API ni las credenciales del usuario de prueba.

## Escenas

### 1. La idea (0:00-0:30)

**Pantalla:** la página de inicio en `https://oph.alonsovndev.com`, o la diapositiva con el flujo de cinco pasos.

**Decir:** "Los requisitos de un cliente llegan como correos, llamadas y listas de ideas. Open Projects Hub ayuda a un freelance a convertir eso en algo que ambas partes acuerdan. La idea es sencilla: la IA propone, el freelance decide. Nada llega al backlog, ni al cliente, sin una aprobación humana explícita."

### 2. Registro (0:30-1:30)

**Pantalla:** en la página de inicio, pasar el ratón por la cabecera y pulsar **Create Account**. Rellenar el formulario y enviarlo. Abrir la bandeja de entrada e introducir el código, o pulsar el enlace del correo.

**Decir:** "Create Account lleva directamente al registro. Cada registro crea su propio espacio de trabajo, en el que yo soy el administrador. Verifico mi correo con un código de seis caracteres que caduca en cinco minutos, y no puedo iniciar sesión hasta haberlo verificado."

**Edición:** cortar el tiempo de espera del correo.

### 3. Primer inicio de sesión y bienvenida (1:30-2:00)

**Pantalla:** iniciar sesión. El panel muestra la bienvenida. Leerla, pulsar **Got it** y recargar la página para mostrar que sigue oculta.

**Decir:** "La primera vez que un administrador inicia sesión aparece una breve bienvenida con los primeros pasos sugeridos. Al cerrarla, se guarda en el servidor, así que no vuelve a aparecer. Puedo recuperarla más tarde desde Settings."

### 4. Cliente y proyecto (2:00-2:40)

**Pantalla:** crear el cliente "Cedar Studio" y después el proyecto "Website enquiry form".

**Decir:** "Organizo el trabajo por cliente. Un espacio de trabajo está limitado a tres proyectos activos, lo que mantiene el alcance acotado."

### 5. Refinamiento con IA (2:40-4:10)

Es el núcleo de la demostración.

**Pantalla:** abrir Refinement y seleccionar el proyecto. Pegar la nota de tres líneas de la guía del revisor:

```text
Visitors should be able to send us an enquiry from our website.
Ask for their name, email address, and message. Notify us when it arrives.
Show visitors whether their enquiry was sent successfully.
```

Mostrar la elección de proveedor (créditos de la plataforma) y generar. Mostrar la historia candidata. Editar un criterio de aceptación, aprobarla y descartar otro borrador.

**Decir:** "Pego las palabras del propio cliente, hasta 5.000 caracteres. Puedo usar los créditos gratuitos de la plataforma o mi propia clave de Gemini, OpenAI o DeepSeek. El modelo propone historias de usuario con criterios de aceptación. Son borradores, guardados solo en esta pestaña del navegador. Edito una, apruebo otra y descarto otra. Solo se almacenan las historias aprobadas. La IA puede equivocarse, y por eso una persona aprueba cada historia."

### 6. Backlog y exportación (4:10-4:50)

**Pantalla:** abrir el backlog del proyecto, que muestra solo la historia aprobada. Pulsar Export y mostrar el archivo Markdown.

**Decir:** "El backlog contiene solo lo que se ha acordado. Puedo exportar el alcance de un proyecto a Markdown para una propuesta o un repositorio."

### 7. Client Review (4:50-5:45)

**Pantalla:** abrir el diálogo de edición del proyecto y usar **Copy client link**. Cambiar a la ventana privada, pegar el enlace y mostrar la página de solo lectura. De vuelta en la aplicación, regenerar el código de acceso. Recargar el enlace antiguo y mostrar que ya no funciona.

**Decir:** "El cliente no necesita una cuenta. Comparto un código de acceso por proyecto, y solo ven las historias aprobadas, nunca mi espacio de trabajo. Si regenero el código, el anterior deja de funcionar."

### 8. Límites y cierre (5:45-6:30)

**Pantalla:** la diapositiva de evidencias ("Delivered capabilities, evidence and open gaps") y después la diapositiva de agradecimiento con los enlaces.

**Decir:** "Quiero ser claro sobre lo que no está demostrado. Todavía no hay un estudio con usuarios, no hay copias de seguridad automáticas de la base de datos y las pruebas de extremo a extremo no se ejecutan en CI. Los próximos pasos son probarlo con freelances reales, las copias de seguridad y esas pruebas. La aplicación, la documentación y los cuatro repositorios están enlazados aquí. Gracias."

## Qué no decir

- Que la herramienta ahorra tiempo. No se ha medido ningún ahorro de tiempo.
- Que la aplicación es accesible según WCAG. No se ha hecho ninguna auditoría.
- Que la entrega del correo está garantizada. La entrega no se ha medido.

## Añadidos opcionales

- **Si el vídeo debe entenderse por sí solo** (la presentación no se expone en ningún otro sitio): añadir la diapositiva del problema a la escena 1 y una diapositiva de arquitectura de 15 segundos antes de la escena 8. Así el vídeo dura unos 7 minutos.
- **Versión de tres minutos:** conservar las escenas 1, 2 (acortada), 5, 7 y 8.

## Después de grabar

1. Sustituir `TBD` en la fila "Demo video" del `README.md` del repositorio por el enlace.
2. Opcionalmente, añadir el enlace bajo "TRY IT" en la última diapositiva de `open-projects-hub-tfm.pptx`.
