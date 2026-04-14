from fastapi import FastAPI

from app.database import engine
from app.models import Base
from app.precios_service import buscar_precio_mas_alto


app = FastAPI(title="API Pasteleria")


@app.on_event("startup")
def startup_event() -> None:
    Base.metadata.create_all(bind=engine)


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@app.get("/precios/{producto}")
async def obtener_precio(producto: str) -> dict:
    return await buscar_precio_mas_alto(producto=producto)
