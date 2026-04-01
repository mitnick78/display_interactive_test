from pydantic import BaseModel

class CustomerResponse(BaseModel):
    id: int
    title: str
    lastname: str
    firstname: str
    postcode: str
    city: str
    email: str

    class Config:
        from_attributes = True
