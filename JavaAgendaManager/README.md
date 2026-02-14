# Agenda Manager (Java) 🗓️

Este proyecto consiste en un sistema de gestión de recordatorios desarrollado en **Java**. Fue diseñado poniendo especial énfasis en la eficiencia de las estructuras de datos y el manejo de la memoria.

## 🛠️ Aspectos Técnicos Destacados

* **Estructura Redimensionable Propia:** En lugar de utilizar librerías estándar, implementé un `ArregloRedimensionableDeRecordatorios` manual.
* **Gestión de Memoria Amortizada:** El arreglo utiliza una estrategia de redimensionamiento dinámico (crecimiento exponencial), garantizando una complejidad de inserción amortizada de $O(1)$.
* **Encapsulamiento y Aliasing:** Implementación de copias defensivas en los constructores y métodos de acceso para asegurar la integridad de los datos de `Fecha`, `Horario` y `Recordatorio`.
* **Sobrecarga de Métodos:** Implementación personalizada de `equals` y `toString` para facilitar el testeo y la legibilidad del sistema.

## 🚀 Cómo ejecutarlo

1. Clona el repositorio:
   ```bash
   git clone [https://github.com/tu-usuario/java-agenda-manager.git](https://github.com/tu-usuario/java-agenda-manager.git)