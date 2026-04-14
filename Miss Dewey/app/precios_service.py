from typing import Any

import httpx


DEFAULT_CODIGO_POSTAL = "8300"


async def buscar_precio_mas_alto(
    producto: str,
    codigo_postal: str = DEFAULT_CODIGO_POSTAL,
) -> dict[str, Any]:
    """
    Simula una consulta a una API de precios tipo Ratoneando
    y devuelve siempre el precio mas alto encontrado.
    """
    _ = httpx.URL(
        "https://api.ratoneando.fake/precios",
        params={"q": producto, "cp": codigo_postal},
    )

    precios_encontrados = [
        {"fuente": "super_a", "precio": 1250.0},
        {"fuente": "super_b", "precio": 1490.0},
        {"fuente": "super_c", "precio": 1325.5},
    ]

    precio_mas_alto = max(precios_encontrados, key=lambda item: item["precio"])

    return {
        "producto": producto,
        "codigo_postal": codigo_postal,
        "precio_mas_alto": precio_mas_alto["precio"],
        "fuente": precio_mas_alto["fuente"],
        "detalle_precios": precios_encontrados,
    }
