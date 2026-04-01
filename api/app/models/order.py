from __future__ import annotations

from sqlalchemy import Integer, String, Float, ForeignKey
from sqlalchemy.orm import relationship, Mapped, mapped_column
from app.database import Base



from typing import TYPE_CHECKING
if TYPE_CHECKING:
    from app.models.customer  import Customer

class Order(Base):
    __tablename__ = "orders"

    id: Mapped[int] = mapped_column(Integer,primary_key=True, index=True)
    customer_id: Mapped[int] = mapped_column(ForeignKey("customers.id"), nullable=False)
    purchase_identifier: Mapped[str] = mapped_column(String,nullable=False)
    product_id: Mapped[int] = mapped_column(Integer,nullable=False)
    quantify: Mapped[int] = mapped_column(Integer, nullable=False)
    price: Mapped[float] = mapped_column(Float,nullable=False)
    currency: Mapped[str] = mapped_column(String,nullable=False)
    date: Mapped[str] = mapped_column(String,nullable=False)

    orders: Mapped[list["Customer"]] = relationship("Customer", back_populates="orders")