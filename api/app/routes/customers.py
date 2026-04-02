from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session  
from typing import List

from app.database import get_db
from app.models.customer import Customer
from app.models.order import Order
from app.schemas.customer import CustomerResponse
from app.schemas.order import OrderResponse

router = APIRouter(prefix="/customers", tags=["customers"])

@router.get("", response_model=List[CustomerResponse])
def get_customers(db: Session = Depends(get_db)):
    customers = db.query(Customer).all()
    return customers

@router.get("/{customer_id}/orders", response_model=List[OrderResponse])
def get_customer_orders(customer_id: int, db: Session = Depends(get_db)):
    customer = db.query(Customer).filter(Customer.id == customer_id).first()

    if not customer:
        raise HTTPException(status_code=404, detail="Customer not found")
    
    orders = db.query(Order).filter(Order.customer_id == customer_id).all()
    return [
        OrderResponse(
            id=order.id,
            customer_id=order.customer_id,
            last_name=customer.lastname,
            purchase_identifier=order.purchase_identifier,
            product_id=order.product_id,
            quantity=order.quantity,
            price=order.price,
            currency=order.currency,
            date=order.date
        ) for order in orders
    ]
