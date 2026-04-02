from pydantic import BaseModel
from typing import Optional

class CustomerResponse(BaseModel):
    id: int
    title: str
    lastname: str
    firstname: str
    postcode: Optional[str]
    city: Optional[str]
    email: str

    class Config:
        from_attributes = True
