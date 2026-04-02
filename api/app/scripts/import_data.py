#!/usr/bin/

import pandas as pd
from app.database import session_local
from app.models.customer import Customer
from app.models.order import Order
import os
import sys
from app.database import Base, engine

Base.metadata.create_all(bind=engine)
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

db = session_local()

base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

TITLE_MAPPING = {"1": "mme", "2": "m"}

customers_df = pd.read_csv(os.path.join(base_dir, "data", "customers.csv"), sep=";")
orders_df = pd.read_csv(os.path.join(base_dir, "data", "purchases.csv"), sep=";")
customers_df = customers_df.dropna(subset=["customer_id", "lastname", "firstname", "email"])
orders_df = orders_df.dropna(subset=[
        "customer_id",
        "purchase_identifier",
        "product_id",
        "quantity",
        "price",
        "currency",
        "date"
    ])

try:
    # Nettoyage tables
    db.query(Order).delete()
    db.query(Customer).delete()
    db.commit()

    #import customers
  
    customers_df = customers_df.dropna(subset=["customer_id", "lastname", "firstname", "email"])

    for _, row in customers_df.iterrows():
        customer = Customer(
            id=int(row["customer_id"]),
            title=TITLE_MAPPING.get(str(int(row["title"])), "unknown") if pd.notna(row["title"]) else "unknown",
            lastname=str(row["lastname"]).strip(),
            firstname=str(row["firstname"]).strip(),
            postcode=None if pd.isna(row["postal_code"]) else str(int(row["postal_code"])),
            city=None if pd.isna(row["city"]) else str(row["city"]).strip(),
            email=str(row["email"]).strip().lower(),
        )
        db.add(customer)

    db.commit()
    print("Customers importés")

    # import orders

    for _, row in orders_df.iterrows():
        order = Order(
            customer_id=int(row["customer_id"]),
            purchase_identifier=str(row["purchase_identifier"]).strip(),
            product_id=int(row["product_id"]),
            quantity=int(row["quantity"]),
            price=float(row["price"]),
            currency=str(row["currency"]).strip(),
            date=str(row["date"]).strip(),
        )
        db.add(order)

    db.commit()
    print("Orders importés")

except Exception as e:
    db.rollback()
    print(f"Erreur : {e}")

finally:
    db.close()
print(customers_df.head())
print(orders_df.head())



customers_df = customers_df    
