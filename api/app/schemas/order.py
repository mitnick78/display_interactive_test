from pydantic import BaseModel

class OrderResponse(BaseModel):
    id: int
    last_name: str
    customer_id: int
    purchase_identifier: str
    product_id: int
    quantity: int
    price: float
    currency: str
    date: str

    class Config:
        from_attributes = True