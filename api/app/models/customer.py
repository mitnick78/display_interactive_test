from __future__ import annotations
from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship, Mapped, mapped_column
from app.database import Base
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from app.models.order import Order

class Customer(Base):
    __tablename__ = "customers"

    id: Mapped[int] = mapped_column(Integer,primary_key=True, index=True)
    title: Mapped[str] = mapped_column(String,nullable=False)
    lastname: Mapped[str] = mapped_column(String, nullable=False)
    firstname: Mapped[str] = mapped_column( String, nullable=False)
    postcode:Mapped[str] = mapped_column(String, nullable=False)
    city: Mapped[str] = mapped_column(String, nullable=False)
    email: Mapped[str] = mapped_column(String, nullable=False, unique=True)

    orders: Mapped[list["Order"]] = relationship("Order", back_populates="customer", cascade="all, delete")