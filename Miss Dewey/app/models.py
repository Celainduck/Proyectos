from sqlalchemy import Column, Float, Integer, JSON, String
from sqlalchemy.orm import declarative_base


Base = declarative_base()


class Ingrediente(Base):
    __tablename__ = "ingredientes"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String, nullable=False, unique=True, index=True)
    precio = Column(Float, nullable=False)
    unidad = Column(String, nullable=False)


class Receta(Base):
    __tablename__ = "recetas"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String, nullable=False, unique=True, index=True)
    ingredientes_list = Column(JSON, nullable=False, default=list)
